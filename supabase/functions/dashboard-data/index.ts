// ═══════════════════════════════════════════════════════════════
//  StoreMind — dashboard-data  (Supabase Edge Function, OKUMA)
//  Repo: supabase/functions/dashboard-data/index.ts
//
//  Dashboard'un canlı veri kaynağı. service_role ile view'leri okur,
//  tek JSON döndürür. Tarayıcıya sır gitmez (key sunucuda kalır).
//  Read-only, tek mağazaya (?store=slug) kapsamlı. Pilot için açık;
//  production'da token/scoping eklenir.
//
//  Deploy:
//    supabase functions deploy dashboard-data --no-verify-jwt
//  URL:
//    https://ulolaujtarzuvhopiktu.supabase.co/functions/v1/dashboard-data?store=storemind-demo
// ═══════════════════════════════════════════════════════════════
import { createClient } from "jsr:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const DEFAULT_STORE = Deno.env.get("DEFAULT_STORE_SLUG") ?? "storemind-demo";
const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "content-type": "application/json" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const slug = new URL(req.url).searchParams.get("store") ?? DEFAULT_STORE;
  const { data: store, error: se } =
    await sb.from("stores").select("id,display_name,fixed_daily_cost").eq("slug", slug).single();
  if (se || !store) return json({ ok: false, error: `store yok: ${slug}` }, 422);
  const sid = store.id;
  const todayISO = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

  const [dash, prods, inv, pairsRaw, prodMap, baskets, evRows] = await Promise.all([
    sb.from("manager_live_dashboard").select("*").eq("store_id", sid).maybeSingle(),
    sb.from("v_product_performance").select("name,revenue,margin_pct").eq("store_id", sid),
    sb.from("v_inventory_critical").select("item_name,current_stock,min_stock_level,stock_status").eq("store_id", sid),
    sb.from("v_basket_pairs").select("product_a,product_b,together_count").eq("store_id", sid),
    sb.from("products").select("id,name").eq("store_id", sid),
    sb.from("baskets").select("total_amount").eq("store_id", sid).gte("created_at", todayISO),
    sb.from("v_store_events_feed").select("*").eq("store_id", sid),
  ]);

  // hata varsa sessizce yutma — yüzeye çıkar
  const firstErr = [dash, prods, inv, pairsRaw, prodMap, baskets, evRows].find((r: any) => r.error);
  if (firstErr?.error) return json({ ok: false, error: firstErr.error.message }, 500);

  const d: any = dash.data ?? {};
  const dashboard = {
    daily_revenue: num(d.daily_revenue), basket_count: num(d.basket_count),
    gross_profit: num(d.gross_profit), avg_basket_value: num(d.avg_basket_value),
    breakeven_basket_value: d.breakeven_basket_value != null ? num(d.breakeven_basket_value) : null,
    avg_ebitda_contribution: d.avg_ebitda_contribution != null ? num(d.avg_ebitda_contribution) : null,
  };

  // dağılım: ham sepet tutarlarından 25₺'lik bantlar
  const bands = ["0–25","25–50","50–75","75–100","100–125","125–150","150–175","175–200","200+"];
  const distribution = bands.map((band) => ({ band, n: 0 }));
  for (const b of (baskets.data ?? [])) {
    let i = Math.floor(num(b.total_amount) / 25); if (i > 8) i = 8; if (i < 0) i = 0;
    distribution[i].n++;
  }

  const nameById: Record<string, string> = {};
  for (const p of (prodMap.data ?? [])) nameById[p.id] = p.name;

  const products = (prods.data ?? []).filter((p: any) => num(p.revenue) > 0)
    .map((p: any) => ({ name: p.name, revenue: num(p.revenue), margin: num(p.margin_pct) }));

  const pairs = (pairsRaw.data ?? []).slice(0, 6)
    .map((p: any) => ({ a: nameById[p.product_a] ?? "?", b: nameById[p.product_b] ?? "?", together: num(p.together_count) }));

  const inventory = (inv.data ?? [])
    .map((i: any) => ({ item: i.item_name, stock: num(i.current_stock), min: num(i.min_stock_level), status: i.stock_status }));

  const events = (evRows.data ?? []).map((e: any) => ({
    tier: e.tier, severity: e.severity, source: e.source, zone: e.zone, role: e.role,
    text: e.title, solution: e.solution, action: e.action,
    ago: e.age_minutes != null ? `${e.age_minutes} dk` : "",
    image_url: e.image_url, person_id: e.person_id,
  }));

  return json({ ok: true, store: { name: store.display_name }, dashboard, distribution, products, pairs, inventory, events });
});

function num(v: unknown): number { const n = Number(v); return isFinite(n) ? n : 0; }
function json(p: unknown, status = 200): Response {
  return new Response(JSON.stringify(p), { status, headers: CORS });
}
