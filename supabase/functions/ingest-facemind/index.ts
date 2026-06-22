// ═══════════════════════════════════════════════════════════════
//  StoreMind — FaceMind ingest  (Supabase Edge Function)
//  Repo'da konum:  supabase/functions/ingest-facemind/index.ts
//
//  Rol: StoreMind tüketicidir. FaceMind notify_all_vmind fan-out'unu alır,
//  MEVCUT store_events tablosuna NATIVE şekilde (kind/cam/payload/image_url)
//  yazar. Normalize alanları DB tarafında v_store_events_feed view'i türetir.
//  Mesajlaşma token'ı TUTMAZ; inbound doğrulama yalnız paylaşımlı sır iledir.
//
//  Deploy:
//    supabase link --project-ref ulolaujtarzuvhopiktu
//    supabase secrets set INGEST_SECRET=<güçlü-sır> DEFAULT_STORE_SLUG=storemind-demo
//    supabase functions deploy ingest-facemind --no-verify-jwt
//
//  Public URL:
//    https://ulolaujtarzuvhopiktu.supabase.co/functions/v1/ingest-facemind
// ═══════════════════════════════════════════════════════════════
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL  = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;   // edge runtime otomatik enjekte eder
const INGEST_SECRET = Deno.env.get("INGEST_SECRET") ?? "";
const DEFAULT_STORE = Deno.env.get("DEFAULT_STORE_SLUG") ?? "storemind-demo";

const sb = createClient(SUPABASE_URL, SERVICE_ROLE);

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ ok: false, error: "POST bekleniyor" }, 405);

  // Inbound paylaşımlı sır — mesajlaşma token'ı DEĞİL, yalnız ingest doğrulaması
  if (INGEST_SECRET && req.headers.get("x-ingest-secret") !== INGEST_SECRET)
    return json({ ok: false, error: "yetkisiz" }, 401);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "geçersiz JSON" }, 400);   // sessiz catch yok — açıkça dön
  }

  // store çözümle (payload'da store_slug yoksa varsayılan; cam→store eşlemesi sözleşmeyle netleşecek)
  const slug = (body.store_slug as string) ?? DEFAULT_STORE;
  const { data: store, error: se } = await sb
    .from("stores").select("id").eq("slug", slug).single();
  if (se || !store) return json({ ok: false, error: `store bulunamadı: ${slug}` }, 422);

  // NATIVE şekil: tier/severity/zone/title DB'de view tarafından türetilir.
  const source = ((body.source as string) ?? "FaceMind").toLowerCase();
  const state  = ((body.state as string) ?? "event").toLowerCase();

  const row = {
    id: crypto.randomUUID(),                  // kolon default'a bağlı kalma
    store_id: store.id,
    kind: `${source}.${state}`,               // ör. "facemind.silent"
    cam: (body.cam_id as string) ?? (body.cam as string) ?? null,
    payload: body,                            // ham gövde — view buradan türetir, hiçbir şey kaybolmaz
    image_url: (body.image_url as string) ?? null,
  };

  const { error: ie } = await sb.from("store_events").insert(row);
  if (ie) return json({ ok: false, error: ie.message }, 500);   // hata yüzeye çıkar

  return json({ ok: true, id: row.id });
});

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}
