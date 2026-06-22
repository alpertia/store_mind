/* eslint-disable */
// @ts-nocheck
"use client";
import { useEffect } from "react";

const CSS = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@500;600;700&display=swap');
:root{--ink:#1A1B23;--ink-soft:#5C5E6B;--paper:#EEECE6;--surface:#FFFFFF;--line:#E2DDD2;
    --profit:#157F5B;--loss:#C8453A;--tag:#E3A012;--info:#2D6E8E;--stage:#13151B;--cam:#0E1014;}
  *{box-sizing:border-box} html,body{margin:0}
  body{font-family:'Inter',system-ui,sans-serif;color:var(--ink);background:var(--paper);line-height:1.5;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1060px;margin:0 auto;padding:18px}
  /* header */
  .head{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:16px}
  .hl{display:flex;align-items:center;gap:12px}
  .brand{display:flex;align-items:baseline;gap:8px}
  .brand .mark{color:var(--tag);font-size:17px}
  .brand .name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;letter-spacing:-.02em}
  .site{font-size:13px;font-weight:600;color:var(--ink-soft)}
  .live-pill{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--profit)}
  .live-pill .blip{width:7px;height:7px;border-radius:50%;background:var(--profit);animation:pulse 1.6s infinite}
  .hr{display:flex;align-items:center;gap:14px}
  .clock{display:flex;flex-direction:column;align-items:flex-end;line-height:1.2}
  .clock .t{font-family:'JetBrains Mono',monospace;font-weight:600;font-size:14px}
  .clock .d{font-size:11px;color:var(--ink-soft)}
  .roleview{display:flex;gap:4px;background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:3px}
  .roleview button{font-family:inherit;font-size:12px;font-weight:600;border:none;background:none;padding:6px 12px;border-radius:7px;cursor:pointer;color:var(--ink-soft)}
  .roleview button.on{background:var(--profit);color:#fff}
  /* nav menu */
  html{scroll-behavior:smooth}
  .nav{position:sticky;top:0;z-index:30;display:flex;gap:6px;flex-wrap:nowrap;overflow-x:auto;background:var(--paper);padding:9px 0 11px;margin-bottom:8px;border-bottom:1px solid var(--line)}
  .nav::-webkit-scrollbar{height:0}
  .navlink{font-size:13px;font-weight:500;color:var(--ink-soft);text-decoration:none;padding:7px 14px;border-radius:9px;white-space:nowrap;transition:background .15s,color .15s}
  .navlink:hover{background:#0000000a}
  .navlink.on{background:var(--ink);color:#fff;font-weight:600}
  [id^="sec-"]{scroll-margin-top:62px}
  /* top cards */
  .row{display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:12px;margin-bottom:14px}
  .card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:15px 16px}
  .card-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
  .card-h .ttl{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:14px;display:flex;align-items:center;gap:7px}
  .card-h .meta{font-size:12px;color:var(--ink-soft)}
  .empty{font-size:12.5px;color:var(--ink-soft);text-align:center;padding:14px 0}
  .person{display:flex;align-items:center;gap:11px;margin-bottom:10px}
  .ava{width:38px;height:38px;border-radius:50%;flex:none;background:#e7e3da;object-fit:cover;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid var(--tag);overflow:hidden}
  .ava svg,.ava img{width:100%;height:100%;display:block;object-fit:cover}
  .person .nm{font-weight:600;font-size:13px}
  .person .sb{font-size:11.5px;color:var(--ink-soft);font-family:'JetBrains Mono',monospace}
  .bignum{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:34px;line-height:1}
  .bignum small{font-size:13px;color:var(--ink-soft);font-weight:500;margin-left:6px;font-family:'Inter'}
  /* events */
  .ev{display:flex;align-items:center;gap:9px;padding:8px 0;border-bottom:1px solid var(--line);font-size:13px}
  .ev:last-child{border-bottom:none}
  .ev .evthumb{flex:none;width:42px;height:42px;border-radius:8px;overflow:hidden;background:#15171c;border:1px solid var(--line)}
  .ev .evthumb svg,.ev .evthumb img{display:block;width:100%;height:100%;object-fit:cover}
  .ev .ad{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#7a7d86}
  .ev .et{flex:1;min-width:0}
  .ev .ez{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:11px;color:#55585f}
  .ev .eg{font-size:11px;color:var(--ink-soft);font-family:'JetBrains Mono',monospace;white-space:nowrap}
  /* cameras */
  .sec-h{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;margin:0 0 11px;display:flex;align-items:center;gap:8px}
  .cams{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:14px}
  .cam{background:var(--cam);border:1px solid #2a2d36;border-radius:12px;overflow:hidden}
  .cam svg{display:block;width:100%;height:auto}
  .cam-ft{display:flex;justify-content:space-between;align-items:center;padding:7px 10px;font-size:11px;color:#aeb2bf}
  .cam-ft .nm{font-family:'Space Grotesk',sans-serif;font-weight:600;color:#e6e7ea}
  .cam-ft .cnt{font-family:'JetBrains Mono',monospace}
  .cam-ft .cnt.alert{color:#ff9e92}
  .cam-ft .zn{font-family:'Space Grotesk',sans-serif;font-weight:600;color:#e6e7ea}
  .cam-ft .ag{font-family:'JetBrains Mono',monospace;color:#9aa0ad}
  .cam-ft .td{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px;vertical-align:middle}
  /* map */
  .mapcard{background:var(--stage);border:1px solid #262a33;border-radius:14px;padding:14px 15px;margin-bottom:14px}
  .mapcard .sec-h{color:#EDEEF2}
  .mapcard .right{margin-left:auto;font-size:12px;color:#8A8E9C;font-family:'JetBrains Mono',monospace}
  .map svg{display:block;width:100%;height:auto}
  /* park */
  .park{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--line);font-size:13px}
  .parkmap{background:#0e1016;border:1px solid var(--line);border-radius:11px;margin-bottom:13px;overflow:hidden}
  .parkmap svg{display:block;width:100%;height:auto}
  .park:last-child{border-bottom:none}
  .park .pl{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:14px}
  .park .pg{font-size:11px;color:var(--ink-soft)}
  .park .st{font-size:10.5px;font-weight:600;padding:3px 9px;border-radius:99px}
  .park .st.pending{background:#f1ede3;color:#6b6e7b}
  .park .st.alert{background:#f7e7e4;color:var(--loss)}
  .park .st.in{background:#e6f1eb;color:var(--profit)}
  .foot{font-size:11.5px;color:var(--ink-soft);text-align:center;margin-top:18px;padding-top:13px;border-top:1px solid var(--line)}
  code{font-family:'JetBrains Mono',monospace;font-size:.82em;background:#0000000a;padding:1px 5px;border-radius:4px}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  @media (max-width:820px){.row{grid-template-columns:1fr}.cams{grid-template-columns:repeat(2,1fr)}}
  @media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}

  /* edge / health / logs / staff */
  .subgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
  .node{background:#f8f7f3;border:1px solid var(--line);border-radius:10px;padding:11px 13px}
  .node .nh{display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:13px;margin-bottom:9px}
  .node .stp{font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:#e6f1eb;color:var(--profit)}
  .gauge{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:11.5px}
  .gauge .gl{width:34px;color:var(--ink-soft)} .gauge .gb{flex:1;height:6px;background:#eceae4;border-radius:99px;overflow:hidden}
  .gauge .gb span{display:block;height:100%} .gauge .gv{font-family:'JetBrains Mono',monospace;font-size:11px;width:38px;text-align:right}
  .svcgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
  .svc{display:flex;align-items:center;gap:7px;background:#f8f7f3;border:1px solid var(--line);border-radius:9px;padding:9px 10px;font-size:12.5px}
  .svc .sd{width:8px;height:8px;border-radius:50%;background:var(--profit);flex:none}
  .svc .sn{font-weight:600;flex:1} .svc .sm{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--ink-soft)}
  .htiles{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
  .htile{background:#f8f7f3;border:1px solid var(--line);border-radius:10px;padding:11px 12px}
  .htile .hl{font-size:11px;color:var(--ink-soft)} .htile .hv{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:17px;margin:3px 0} .htile .hs{font-size:10.5px;color:var(--ink-soft)}
  .logtable{font-family:'JetBrains Mono',monospace;font-size:12px}
  .logrow{display:grid;grid-template-columns:72px 88px 1fr auto;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid var(--line)}
  .logrow:last-child{border-bottom:none} .logrow .lt{color:var(--ink-soft)} .logrow .lk{font-weight:600}
  .logrow .ls{font-size:10px;font-weight:700;padding:1px 7px;border-radius:99px;justify-self:end}
  .ls.ok{background:#e6f1eb;color:var(--profit)} .ls.warn{background:#fbf0d8;color:#8a6300} .ls.crit{background:#f7e7e4;color:var(--loss)}
  .staffrow{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--line);font-size:13px}
  .staffrow:last-child{border-bottom:none} .staffrow .sdot{width:9px;height:9px;border-radius:50%;flex:none}
  .sdot.online{background:var(--profit)} .sdot.field{background:var(--info)} .sdot.busy{background:var(--tag)} .sdot.brk{background:#9aa0ad}
  .staffrow .snm{font-weight:600} .staffrow .sro{font-size:11.5px;color:var(--ink-soft)} .staffrow .sst{margin-left:auto;font-size:11px;color:var(--ink-soft)}
  .dlbl{font-size:11px;color:var(--ink-soft);margin:12px 0 8px;font-weight:600}
  .disp{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);font-size:13px}
  .disp:last-child{border-bottom:none}
  .disp .di{flex:none;width:30px;height:30px;border-radius:7px;background:#e6f1eb;color:var(--profit);display:flex;align-items:center;justify-content:center}
  .disp .dt{flex:1;min-width:0} .disp .dto{font-weight:600;font-size:12px} .disp .dx{font-size:12.5px} .disp .dm{font-size:11px;color:var(--ink-soft);font-family:'JetBrains Mono',monospace}
  .disp .dst{font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;align-self:center;background:#f1ede3;color:#6b6e7b;white-space:nowrap}
  .disp .dst.read{background:#e6f1eb;color:var(--profit)}
  @media (max-width:820px){.subgrid{grid-template-columns:1fr}.svcgrid{grid-template-columns:repeat(2,1fr)}.htiles{grid-template-columns:repeat(2,1fr)}.logrow{grid-template-columns:64px 1fr auto}.logrow .lsrc{display:none}}`;

const BODY = `<div class="wrap">
  <header class="head">
    <div class="hl">
      <div class="brand"><span class="mark">◆</span><span class="name">StoreMind</span></div>
      <span class="site" id="site" data-i18n="site">Pilot Mağaza · Site-002</span>
      <span class="live-pill"><span class="blip"></span><span data-i18n="live">CANLI</span></span>
    </div>
    <div class="hr">
      <div class="clock"><span class="t" id="clk">—</span><span class="d" id="day">—</span></div>
      <div class="roleview" id="roleview"><button class="on" data-v="mudur" data-i18n="mudur">Müdür</button><button data-v="personel" data-i18n="personel">Personel</button></div>
      <div class="roleview" id="langtog"><button class="on" data-l="tr">TR</button><button data-l="en">EN</button></div>
    </div>
  </header>

  <nav class="nav" id="nav">
    <a href="#sec-overview" class="navlink on" data-i18n="nav_overview">Genel Bakış</a>
    <a href="#sec-cams" class="navlink" data-i18n="nav_cams">Kameralar</a>
    <a href="#sec-map" class="navlink" data-i18n="nav_map">Harita</a>
    <a href="#sec-park" class="navlink" data-i18n="nav_park">Otopark</a>
    <a href="#sec-logs" class="navlink" data-i18n="nav_logs">Olay Kayıtları</a>
    <a href="#sec-staff" class="navlink" data-i18n="nav_staff">Personel</a>
    <a href="#sec-edge" class="navlink" data-i18n="nav_edge">EDGE Altyapı</a>
    <a href="#sec-sys" class="navlink" data-i18n="nav_sys">Sistem Sağlığı</a>
  </nav>

  <div class="row" id="sec-overview">
    <section class="card">
      <div class="card-h"><span class="ttl">👤 <span data-i18n="c_people">Sahada Kişi</span></span><span class="meta" id="peopleMeta">— aktif</span></div>
      <div class="bignum" id="peopleNum">—<small>kişi</small></div>
      <div class="meta" style="margin-top:8px;font-size:12px;color:var(--ink-soft)" id="peopleSub"></div>
    </section>
    <section class="card">
      <div class="card-h"><span class="ttl">⭐ <span data-i18n="c_vip">Tanınan Müşteri</span></span><span class="meta" id="vipMeta"></span></div>
      <div id="vipList"></div>
    </section>
    <section class="card" id="sec-events">
      <div class="card-h"><span class="ttl">⚡ <span data-i18n="c_events">Son Olaylar</span></span><span class="meta" data-i18n="live_feed">canlı akış</span></div>
      <div id="evList"></div>
    </section>
  </div>

  <h3 class="sec-h" id="sec-cams">📹 <span data-i18n="c_cams">Kameralar</span></h3>
  <div class="cams" id="cams"></div>

  <section class="mapcard" id="sec-map">
    <div class="sec-h">🗺️ <span data-i18n="c_map">Canlı Harita</span> <span class="right" id="mapCount">— kişi</span></div>
    <div class="map" id="map"></div>
  </section>

  <section class="card" id="sec-park">
    <div class="card-h"><span class="ttl">🚗 <span data-i18n="c_park">Otopark & Yükleme</span></span><span class="meta" data-i18n="parkmind">ParkMind</span></div>
    <div id="parkList"></div>
  </section>

  <section class="card" id="sec-logs">
    <div class="card-h"><span class="ttl">🧾 <span data-i18n="c_logs">Olay Kayıtları</span></span><span class="meta" data-i18n="logs_meta">son kayıtlar</span></div>
    <div class="logtable" id="logList"></div>
  </section>

  <section class="card" id="sec-staff">
    <div class="card-h"><span class="ttl">💬 <span data-i18n="c_staff">Personel İletişim</span></span><span class="meta" data-i18n="talkmind">TalkMind</span></div>
    <div id="staffList"></div>
    <div class="dlbl" data-i18n="staff_sent">Gönderilen görevler</div>
    <div id="dispList"></div>
  </section>

  <section class="card" id="sec-edge">
    <div class="card-h"><span class="ttl">🛰️ <span data-i18n="c_edge">EDGE Altyapı</span></span><span class="meta" data-i18n="edge_meta">kenar düğümleri & servisler</span></div>
    <div class="subgrid" id="nodeList"></div>
    <div class="svcgrid" id="svcList"></div>
  </section>

  <section class="card" id="sec-sys">
    <div class="card-h"><span class="ttl">❤️ <span data-i18n="c_sys">Sistem Sağlığı</span></span><span class="meta" data-i18n="sys_meta">StoreMind yığını</span></div>
    <div class="htiles" id="healthList"></div>
  </section>

  <div class="foot" id="foot"></div>
</div>`;

export default function DemoPage() {
  useEffect(() => {
    const __ids = [];
    const setIntervalT = (fn, ms) => { const id = window.setInterval(fn, ms); __ids.push(id); return id; };

const FN_URL = "https://ulolaujtarzuvhopiktu.supabase.co/functions/v1/dashboard-data?store=storemind-demo";

// ── Sentetik operasyon verisi (görsel; gerçek olaylar canlı akışla üstüne biner) ──
const SITE = "Pilot Mağaza · Site-002";
let PEOPLE = 23;
const VIP = [
  {name:"Tanınan Müşteri", cam:"cam23", ago:"3 dk", glyph:"⭐"}
];
const EVENTS = [
  {tier:"security", kind:"face_unknown", zone:"REYON 4", text:"Tanınmayan kişi dolaşıyor", ago:"2 dk"},
  {tier:"order",    kind:"fall",         zone:"REYON 2", text:"Kişi düştü — yerde", ago:"1 dk"},
  {tier:"order",    kind:"spill",        zone:"MANAV", text:"Yerde sıvı/dökülme", ago:"4 dk"},
  {tier:"order",    kind:"shelf",        zone:"REYON A", addr:"Batı · 4-15", product:"CZ-Süt 1L", text:"Boş raf", ago:"6 dk"},
  {tier:"order",    kind:"shelf",        zone:"REYON C", addr:"Doğu · 2-08", product:"BS-Bisküvi", text:"Boş raf", ago:"9 dk"},
  {tier:"order",    kind:"door",         zone:"SOĞUK ODA", text:"Kapı 4 dk'dır açık", ago:"5 dk"},
  {tier:"security", kind:"vehicle",      zone:"YÜKLEME", text:"Tanınmayan araç rampada", ago:"11 dk"},
  {tier:"customer", kind:"face_match",   zone:"GİRİŞ", text:"Tanınan müşteri girişte", ago:"3 dk"},
  {tier:"customer", kind:"queue",        zone:"KASA 2", text:"Kasada kuyruk oluştu", ago:"2 dk"}
];
const SYN_EVENTS = EVENTS.map(o=>({...o}));
const CAMS = [
  {id:"cam12", name:"KASA", people:3, kind:"checkout",
   boxes:[{x:90,y:120,w:34,h:54,c:"#2fd99a",l:"kişi"},{x:135,y:128,w:32,h:50,c:"#2fd99a",l:"kişi"},{x:178,y:134,w:32,h:48,c:"#e3a012",l:"kuyruk"}]},
  {id:"cam08", name:"GİRİŞ", people:2, kind:"door",
   boxes:[{x:120,y:96,w:34,h:60,c:"#2fd99a",l:"kişi"},{x:170,y:104,w:32,h:56,c:"#2fd99a",l:"kişi"}]},
  {id:"cam14", name:"REYON 4", people:1, kind:"aisle",
   boxes:[{x:150,y:90,w:34,h:62,c:"#ff9e92",l:"tanınmayan"}]},
  {id:"cam21", name:"YÜKLEME", people:0, kind:"dock", alert:true,
   boxes:[{x:70,y:108,w:130,h:60,c:"#e3a012",l:"34 BFR 217"}]}
];
const ISO = {TW:26, TH:13, OX:305, OY:54, W:14, D:10};
function iso(gx,gy){ return [ISO.OX+(gx-gy)*ISO.TW, ISO.OY+(gx+gy)*ISO.TH]; }
const ISO_ZONES = [
  {t:"dock",   n:"YÜKLEME RAMPASI", gx:0.4,  gy:0.4, w:3.4,  d:1.6, h:11},
  {t:"box",    n:"STOK",            gx:4.2,  gy:0.4, w:3.2,  d:1.6, h:20},
  {t:"cold",   n:"SOĞUK ODA",       gx:7.8,  gy:0.4, w:2.4,  d:1.6, h:24},
  {t:"produce",n:"MANAV",           gx:10.6, gy:0.4, w:3.0,  d:1.6, h:10},
  {t:"aisle",  n:"REYON 1",         gx:1.8,  gy:3.0, w:0.95, d:4.2, h:22},
  {t:"aisle",  n:"REYON 2",         gx:4.0,  gy:3.0, w:0.95, d:4.2, h:22},
  {t:"aisle",  n:"REYON 3",         gx:6.2,  gy:3.0, w:0.95, d:4.2, h:22},
  {t:"aisle",  n:"REYON 4",         gx:8.4,  gy:3.0, w:0.95, d:4.2, h:22, flag:"sec"},
  {t:"aisle",  n:"REYON 5",         gx:10.6, gy:3.0, w:0.95, d:4.2, h:22, flag:"low"},
  {t:"counter",n:"KASA 1",          gx:1.8,  gy:8.4, w:1.1,  d:0.9, h:11},
  {t:"counter",n:"KASA 2",          gx:3.6,  gy:8.4, w:1.1,  d:0.9, h:11, flag:"busy"},
  {t:"counter",n:"KASA 3",          gx:5.4,  gy:8.4, w:1.1,  d:0.9, h:11},
  {t:"door",   n:"GİRİŞ",           gx:8.5,  gy:8.6, w:3.2,  d:1.0, h:0}
];
const PPL_LANES = [
  {gx:3.0,gy:4.5,n:2},{gx:5.2,gy:5.5,n:3},{gx:7.4,gy:4.2,n:2},{gx:9.6,gy:5.0,n:2},
  {gx:10.2,gy:7.9,n:4},{gx:2.4,gy:7.5,n:2},{gx:4.2,gy:7.5,n:2},{gx:12.0,gy:2.0,n:3},
  {gx:6.0,gy:1.4,n:2},{gx:9.0,gy:1.2,n:2}
];
const PARK = [
  {plate:"34 BFR 217", ago:"12 dk önce · rampada", status:"alert", label:"izinsiz"},
  {plate:"34 MUE 294", ago:"207 dk önce", status:"pending", label:"bekliyor"},
  {plate:"34 PJH 147", ago:"245 dk önce", status:"pending", label:"bekliyor"},
  {plate:"34 GRF 273", ago:"368 dk önce", status:"in", label:"otoparkta"},
  {plate:"34 KNU 737", ago:"970 dk önce", status:"pending", label:"bekliyor"}
];


// ════ i18n: statik etiket sözlüğü (data-i18n) ════
const I18N = {
  tr:{ site:"Pilot Mağaza · Site-002", live:"CANLI", live_feed:"canlı akış",
    mudur:"Müdür", personel:"Personel",
    nav_overview:"Genel Bakış", nav_cams:"Kameralar", nav_map:"Harita", nav_park:"Otopark",
    nav_logs:"Olay Kayıtları", nav_staff:"Personel", nav_edge:"EDGE Altyapı", nav_sys:"Sistem Sağlığı",
    c_people:"Sahada Kişi", c_vip:"Tanınan Müşteri", c_events:"Son Olaylar", c_cams:"Kameralar",
    c_map:"Canlı Harita", c_park:"Otopark & Yükleme", c_logs:"Olay Kayıtları",
    c_staff:"Personel İletişim", c_edge:"EDGE Altyapı", c_sys:"Sistem Sağlığı",
    parkmind:"ParkMind", talkmind:"TalkMind", logs_meta:"son kayıtlar",
    staff_sent:"Gönderilen görevler", edge_meta:"kenar düğümleri & servisler", sys_meta:"StoreMind yığını" },
  en:{ site:"Pilot Store · Site-002", live:"LIVE", live_feed:"live feed",
    mudur:"Manager", personel:"Staff",
    nav_overview:"Overview", nav_cams:"Cameras", nav_map:"Map", nav_park:"Parking",
    nav_logs:"Event Log", nav_staff:"Staff", nav_edge:"EDGE Infra", nav_sys:"System Health",
    c_people:"People on Floor", c_vip:"Recognized Customer", c_events:"Recent Events", c_cams:"Cameras",
    c_map:"Live Map", c_park:"Parking & Loading", c_logs:"Event Log",
    c_staff:"Staff Comms", c_edge:"EDGE Infra", c_sys:"System Health",
    parkmind:"ParkMind", talkmind:"TalkMind", logs_meta:"latest records",
    staff_sent:"Dispatched tasks", edge_meta:"edge nodes & services", sys_meta:"StoreMind stack" }
};
let LANG = "tr";
function applyStatic(){
  const dict = I18N[LANG];
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if(dict[k]!=null) el.textContent = dict[k];
  });
}

const esc = s => String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

// ── Kamera CCTV mock (stilize) ──
function camSVG(cam){
  const t=new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
  let scene=`
    <defs>
      <linearGradient id="fl${cam.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2f3a"/><stop offset="1" stop-color="#0e1014"/></linearGradient>
      <radialGradient id="lg${cam.id}" cx="0.5" cy="0.28" r="0.85"><stop offset="0" stop-color="#3a4150" stop-opacity="0.45"/><stop offset="1" stop-color="#0e1014" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="320" height="200" fill="#0e1014"/>
    <polygon points="60,68 260,68 320,200 0,200" fill="url(#fl${cam.id})"/>
    <g stroke="#1c2129" stroke-width="1" opacity="0.7">
      <line x1="0" y1="200" x2="120" y2="68"/><line x1="320" y1="200" x2="200" y2="68"/>
      <line x1="20" y1="158" x2="300" y2="158"/><line x1="45" y1="118" x2="275" y2="118"/><line x1="62" y1="90" x2="258" y2="90"/>
    </g>`;
  if(cam.kind==="checkout"){
    scene+=`<rect x="38" y="150" width="244" height="24" rx="2" fill="#262b35"/><rect x="38" y="150" width="244" height="5" fill="#333a47"/><rect x="248" y="130" width="36" height="44" rx="2" fill="#2c3340"/>`;
  } else if(cam.kind==="aisle"){
    scene+=`<polygon points="0,68 42,68 72,200 0,200" fill="#1a1f29"/><polygon points="278,68 320,68 320,200 248,200" fill="#1a1f29"/>
      <g stroke="#262c38">${[92,122,152].map(y=>`<line x1="2" y1="${y}" x2="58" y2="${y}"/><line x1="262" y1="${y}" x2="318" y2="${y}"/>`).join("")}</g>`;
  } else if(cam.kind==="dock"){
    scene+=`<rect x="58" y="40" width="204" height="120" rx="3" fill="#15191f" stroke="#2a3038"/><line x1="58" y1="72" x2="262" y2="72" stroke="#222831"/><line x1="58" y1="104" x2="262" y2="104" stroke="#222831"/>`;
  } else {
    scene+=`<rect x="118" y="52" width="84" height="124" rx="2" fill="#161a22" stroke="#2a3038"/><rect x="156" y="52" width="46" height="124" fill="#1a1f29"/>`;
  }
  scene+=`<rect width="320" height="200" fill="url(#lg${cam.id})"/><g opacity="0.05">${Array.from({length:25},(_,i)=>`<line x1="0" y1="${i*8}" x2="320" y2="${i*8}" stroke="#fff"/>`).join("")}</g>`;
  let boxes="";
  const person = cam.kind!=="dock";
  (cam.boxes||[]).forEach(b=>{
    boxes+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="${b.c}" stroke-width="2" rx="2"/>`;
    if(person){
      boxes+=`<circle cx="${b.x+b.w/2}" cy="${b.y+b.h*0.27}" r="${b.w*0.26}" fill="${b.c}" opacity="0.5"/>
        <path d="M${b.x+b.w*0.16} ${b.y+b.h} Q${b.x+b.w*0.16} ${b.y+b.h*0.48} ${b.x+b.w/2} ${b.y+b.h*0.48} Q${b.x+b.w*0.84} ${b.y+b.h*0.48} ${b.x+b.w*0.84} ${b.y+b.h} Z" fill="${b.c}" opacity="0.4"/>`;
    } else {
      boxes+=`<rect x="${b.x+10}" y="${b.y+18}" width="${b.w-20}" height="${b.h-30}" rx="5" fill="${b.c}" opacity="0.28"/><rect x="${b.x+22}" y="${b.y+10}" width="${b.w-44}" height="14" rx="3" fill="${b.c}" opacity="0.2"/>`;
    }
    const lbl=tr(b.l); boxes+=`<rect x="${b.x}" y="${b.y-13}" width="${lbl.length*6+8}" height="13" fill="${b.c}"/><text x="${b.x+4}" y="${b.y-3}" font-size="9" fill="#0e1014" font-family="monospace">${esc(lbl)}</text>`;
  });
  return `<svg viewBox="0 0 320 200">${scene}${boxes}
    <circle cx="14" cy="14" r="4" fill="#ff4d4d"/><text x="24" y="18" font-size="10" fill="#e6e7ea" font-family="monospace">REC ${esc(cam.id.toUpperCase())}</text>
    <text x="316" y="18" font-size="10" fill="#9aa0ad" font-family="monospace" text-anchor="end">${t}</text></svg>`;
}

// ── Her olayın mikro resmi (gerçek best_photo_url yoksa stilize kırpma) ──

// ════ i18n: dinamik metin sözlüğü (veri içeriği) ════
const DICT = {
  // zonlar
  "REYON 4":"AISLE 4","REYON 2":"AISLE 2","REYON A":"AISLE A","REYON C":"AISLE C",
  "MANAV":"PRODUCE","SOĞUK ODA":"COLD ROOM","YÜKLEME":"LOADING","GİRİŞ":"ENTRANCE","KASA 2":"CHECKOUT 2",
  "REYON 1":"AISLE 1","REYON 3":"AISLE 3","REYON 5":"AISLE 5","YÜKLEME RAMPASI":"LOADING DOCK","STOK":"STOCK","KASA 1":"CHECKOUT 1","KASA 3":"CHECKOUT 3","BOŞ RAF":"EMPTY SHELF",
  "Giriş":"Entrance","Kasa 2":"Checkout 2","Kasa 1":"Checkout 1","Reyon 2":"Aisle 2","Reyon 4":"Aisle 4",
  "Manav":"Produce","Soğuk Oda":"Cold Room","Koridor":"Corridor","Reyon A 4-15":"Aisle A 4-15","Reyon C 2-08":"Aisle C 2-08",
  // olay metinleri
  "Tanınmayan kişi dolaşıyor":"Unrecognized person wandering",
  "Kişi düştü — yerde":"Person fell — on floor",
  "Yerde sıvı/dökülme":"Liquid spill on floor",
  "Boş raf":"Empty shelf",
  "Kapı 4 dk'dır açık":"Door open for 4 min",
  "Tanınmayan araç rampada":"Unrecognized vehicle at dock",
  "Tanınan müşteri girişte":"Recognized customer at entrance",
  "Kasada kuyruk oluştu":"Queue forming at checkout",
  // adresler
  "Batı · 4-15":"West · 4-15","Doğu · 2-08":"East · 2-08",
  // park etiketleri
  "izinsiz":"unauthorized","bekliyor":"waiting","otoparkta":"parked",
  "12 dk önce · rampada":"12 min ago · at dock","207 dk önce":"207 min ago","245 dk önce":"245 min ago",
  "368 dk önce":"368 min ago","970 dk önce":"970 min ago",
  // personel
  "Kasa":"Checkout","Güvenlik":"Security","Reyon":"Aisles","Temizlik":"Cleaning","Yükleme":"Loading",
  "çevrimiçi":"online","sahada":"on floor","meşgul":"busy","molada":"on break",
  // görev metinleri
  "Ayşe (Kasa)":"Ayşe (Checkout)","Mehmet (Güvenlik)":"Mehmet (Security)",
  "Zeynep (Temizlik)":"Zeynep (Cleaning)","Can (Reyon)":"Can (Aisles)",
  "Kasa 2'yi aç — kuyruk oluştu":"Open Checkout 2 — queue forming",
  "Reyon 4 — tanınmayan kişi kontrol":"Aisle 4 — check unrecognized person",
  "Manav — yerde sıvı, dubayı koy":"Produce — spill, place wet-floor sign",
  "Reyon A 4-15 — CZ-Süt yenile (depoda 24 adet)":"Aisle A 4-15 — restock CZ-Milk (24 in stock)",
  "okundu":"read","iletildi":"delivered","gönderildi":"sent",
  // edge
  "Orin · Edge Ana":"Orin · Edge Main","OPi5 · CamMind Edge":"OPi5 · CamMind Edge",
  // system health
  "Çevrimiçi":"Online","Aktif":"Active","Açık":"Open","şimdi":"now",
  "Frankfurt · eu-central":"Frankfurt · eu-central","son: 1 dk önce":"last: 1 min ago",
  "okuma fonksiyonu":"read function","son 1 saat":"last 1 hour","satır izolasyonu":"row isolation",
  "son 24 saat":"last 24 hours","30 gün":"30 days","otomatik 15 sn":"auto 15 s",
  "Supabase DB":"Supabase DB","Olay hızı":"Event rate","Hata oranı":"Error rate","Son senkron":"Last sync",
  // kamera etiketleri
  "kişi":"person","kuyruk":"queue","tanınmayan":"unknown",
  "tanınan":"recognized","düşme":"fall","sıvı":"spill","kapı":"door","boş raf":"empty shelf",
  // log durum / başlıklar
  "OK":"OK","UYARI":"WARN","KRİTİK":"CRIT",
  // sabit cümleler
  "Reyonlar, kasalar ve girişte dağılım — haritada canlı.":"Distribution across aisles, checkouts and entrance — live on map.",
  "araç":"vehicle"
};
const ST_TR = {online:"çevrimiçi",field:"sahada",busy:"meşgul",brk:"molada"};
const ST_EN = {online:"online",field:"on floor",busy:"busy",brk:"on break"};
function tr(x){ if(x==null) return x; return LANG==="en" ? (DICT[x]!=null?DICT[x]:x) : x; }
function trAgo(a){
  let n; if(a==null) n=0; else if(typeof a==="number") n=a;
  else { const m=String(a).match(/(\d+)/); n=m?+m[1]:0; const z=String(a);
    if(/sa|saat/.test(z)) n*=60; else if((/\bg\b|gün/.test(z))&&!/dk/.test(z)) n*=1440; }
  if(n<1) return LANG==="en"?"now":"şimdi";
  if(n<60) return n+(LANG==="en"?" min":" dk");
  const h=Math.floor(n/60); if(h<24) return h+(LANG==="en"?" h":" sa");
  return Math.floor(h/24)+(LANG==="en"?" d":" g");
}
function inferKind(e){const t=(e.text||"").toLowerCase();
  if(/(düş|yere|fall)/.test(t)) return "fall";
  if(/(sıvı|dökül|spill|ıslak)/.test(t)) return "spill";
  if(/(raf|shelf|boş)/.test(t)) return "shelf";
  if(/(araç|plaka|vehicle|kamyon)/.test(t)) return "vehicle";
  if(/(kuyruk|queue|kasa)/.test(t)) return "queue";
  if(/(kapı|door|soğuk)/.test(t)) return "door";
  if(e.tier==="customer") return "face_match";
  if(e.tier==="security") return "face_unknown";
  return null;
}
function isFresh(ago){ if(!ago) return false; const s=String(ago).toLowerCase();
  if(/şimdi|now|sn\b|sec/.test(s)) return true;
  const m=s.match(/(\d+)\s*(dk|min)/); return m ? parseInt(m[1])<=30 : false; }
let IS_LIVE=false;
function renderFoot(){const el=document.getElementById("foot"); if(!el)return;
  if(LANG==="en") el.innerHTML = IS_LIVE
    ? "Operations panel · events live from <code>v_store_events_feed</code>; map / cameras / parking are synthetic for now (go live when SpaceMind & ParkMind connect)."
    : "Operations panel · synthetic visuals for now. Events are live (FaceMind); map / cameras / parking go live with SpaceMind & ParkMind.";
  else el.innerHTML = IS_LIVE
    ? "Operasyon paneli · olaylar <code>v_store_events_feed</code>'den canlı; harita / kamera / otopark şu an sentetik (SpaceMind & ParkMind bağlanınca canlıya döner)."
    : "Operasyon paneli · şu an sentetik görsel veri. Olaylar canlıya bağlı (FaceMind); harita / kamera / otopark SpaceMind & ParkMind ile canlıya dönecek.";
}
function setLang(l){
  LANG = l;
  document.documentElement.lang = l;
  document.querySelectorAll("#langtog button").forEach(b=>b.classList.toggle("on", b.dataset.l===l));
  applyStatic();
  renderVip(); renderEvents(); renderPark(); renderLogs(); renderStaff(); renderEdge(); renderHealth(); renderCams(); renderMap();
  const peopleWord = LANG==="en"?"people":"kişi", activeWord = LANG==="en"?"active":"aktif";
  const pn=document.getElementById("peopleNum"); if(pn) pn.innerHTML=PEOPLE+"<small>"+peopleWord+"</small>";
  const pm=document.getElementById("peopleMeta"); if(pm) pm.textContent=PEOPLE+" "+activeWord;
  const ps=document.getElementById("peopleSub"); if(ps) ps.textContent=tr("Reyonlar, kasalar ve girişte dağılım — haritada canlı.");
  const mc=document.getElementById("mapCount"); if(mc) mc.textContent=PEOPLE+" "+peopleWord;
  renderFoot();
}

function tierColor(t){return t==="security"?"#c8453a":t==="order"?"#e3a012":t==="customer"?"#2d6e8e":"#888";}
function brackets(c){return `<g stroke="${c}" stroke-width="2" fill="none"><path d="M3 10 V3 H10"/><path d="M30 3 H37 V10"/><path d="M37 30 V37 H30"/><path d="M10 37 H3 V30"/></g>`;}
function microThumb(kind,c){
  let b=`<rect width="40" height="40" fill="#20232b"/>`;
  if(kind==="face_unknown"||kind==="face_match"){
    b+=`<circle cx="20" cy="15" r="7" fill="#5a6170"/><path d="M9 40 Q9 26 20 26 Q31 26 31 40 Z" fill="#4a5160"/>`;
    if(kind==="face_match") b+=`<circle cx="31" cy="11" r="6" fill="#157F5B"/><path d="M28 11 l2 2 l4 -4" stroke="#fff" stroke-width="1.6" fill="none"/>`;
  } else if(kind==="shelf"){
    b+=`<g stroke="#39414f">${[12,20,28].map(y=>`<line x1="5" y1="${y}" x2="35" y2="${y}"/>`).join("")}</g><g fill="#4a5160">${[7,13,27,32].map(x=>`<rect x="${x}" y="14" width="4" height="4"/>`).join("")}</g><rect x="17" y="14" width="8" height="13" fill="none" stroke="#c8453a" stroke-width="1.4"/>`;
  } else if(kind==="spill"){
    b+=`<ellipse cx="20" cy="26" rx="13" ry="7" fill="#2d6e8e" opacity="0.55"/><ellipse cx="20" cy="26" rx="8" ry="4" fill="#3a86a8" opacity="0.7"/>`;
  } else if(kind==="fall"){
    b+=`<circle cx="12" cy="22" r="5" fill="#5a6170"/><rect x="14" y="24" width="20" height="7" rx="3" fill="#4a5160"/>`;
  } else if(kind==="vehicle"){
    b+=`<rect x="6" y="17" width="28" height="13" rx="4" fill="#4a5160"/><rect x="11" y="12" width="18" height="8" rx="3" fill="#3a4150"/><circle cx="13" cy="31" r="3" fill="#2a2f3a"/><circle cx="27" cy="31" r="3" fill="#2a2f3a"/>`;
  } else if(kind==="queue"){
    b+=`${[8,20,32].map(x=>`<circle cx="${x}" cy="16" r="4" fill="#5a6170"/><path d="M${x-5} 34 Q${x-5} 24 ${x} 24 Q${x+5} 24 ${x+5} 34 Z" fill="#4a5160"/>`).join("")}`;
  } else if(kind==="door"){
    b+=`<rect x="8" y="9" width="13" height="25" fill="#16252b" stroke="#2f5d68"/><rect x="23" y="9" width="11" height="25" fill="#1a2e35" stroke="#2f5d68"/>`;
  } else { b+=`<circle cx="20" cy="20" r="6" fill="#5a6170"/>`; }
  return `<svg viewBox="0 0 40 40">${b}${brackets(c)}</svg>`;
}
function evThumb(e){ return e.image_url?`<img src="${esc(e.image_url)}" alt="">`:microThumb(e.kind||"event",tierColor(e.tier)); }

// ── Harita ──
let DOTS=[];
function buildDots(){
  DOTS=[];
  for(const c of PPL_LANES){ for(let i=0;i<c.n;i++) DOTS.push({gx:c.gx+(Math.random()-0.5)*1.2, gy:c.gy+(Math.random()-0.5)*1.4}); }
  PEOPLE=DOTS.length;
}
function bilerp(T,u,v){const {At,Bt,Ct,Dt}=T;
  return [At[0]*(1-u)*(1-v)+Bt[0]*u*(1-v)+Dt[0]*(1-u)*v+Ct[0]*u*v,
          At[1]*(1-u)*(1-v)+Bt[1]*u*(1-v)+Dt[1]*(1-u)*v+Ct[1]*u*v];}
function midp(a,b,t){return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t];}
function pts(arr){return arr.map(q=>q[0].toFixed(1)+","+q[1].toFixed(1)).join(" ");}
function labelAt(gx,gy,txt,lift,color){const p=iso(gx,gy);
  return `<text x="${p[0].toFixed(1)}" y="${(p[1]-(lift||0)).toFixed(1)}" font-size="8.5" fill="${color||'#aeb4c2'}" text-anchor="middle" font-family="Inter" font-weight="500">${esc(tr(txt))}</text>`;}
function shade(hex,f){const n=parseInt(hex.slice(1),16);let r=(n>>16)&255,g=(n>>8)&255,b=n&255;
  r=Math.max(0,Math.min(255,Math.round(r*f)));g=Math.max(0,Math.min(255,Math.round(g*f)));b=Math.max(0,Math.min(255,Math.round(b*f)));
  return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}
const PROD_COLS=["#c46a4a","#d9a441","#4a7fb5","#5a9e6a","#b34a52","#7a6aa8","#cdb98a","#3f8e8e","#d08a3a","#6a86c4"];
function prod(cx,cy,fw,ph,base){const fh=fw*0.5;
  const A=[cx,cy-fh],B=[cx+fw,cy],C=[cx,cy+fh],D=[cx-fw,cy];
  const At=[A[0],A[1]-ph],Bt=[B[0],B[1]-ph],Ct=[C[0],C[1]-ph],Dt=[D[0],D[1]-ph];
  return `<polygon points="${pts([D,C,Ct,Dt])}" fill="${shade(base,0.74)}"/>`+
         `<polygon points="${pts([B,C,Ct,Bt])}" fill="${shade(base,0.56)}"/>`+
         `<polygon points="${pts([At,Bt,Ct,Dt])}" fill="${shade(base,1.12)}"/>`;}
function isoBox(z,cTop,cL,cR){
  const {gx,gy,w,d,h}=z;
  const A=iso(gx,gy),B=iso(gx+w,gy),C=iso(gx+w,gy+d),D=iso(gx,gy+d);
  const At=[A[0],A[1]-h],Bt=[B[0],B[1]-h],Ct=[C[0],C[1]-h],Dt=[D[0],D[1]-h];
  let s=`<polygon points="${pts([D,C,Ct,Dt])}" fill="${cL}"/>`;
  s+=`<polygon points="${pts([B,C,Ct,Bt])}" fill="${cR}"/>`;
  s+=`<polygon points="${pts([At,Bt,Ct,Dt])}" fill="${cTop}"/>`;
  return {s, top:{At,Bt,Ct,Dt}, A,B,C,D,At,Bt,Ct,Dt};
}
function shelfTiers(P,n,col){ // ön yüzlerde raf katı çizgileri
  let s="";
  for(let k=1;k<=n;k++){const t=k/(n+1);
    const lA=midp(P.D,P.Dt,t),lB=midp(P.C,P.Ct,t);
    s+=`<line x1="${lA[0].toFixed(1)}" y1="${lA[1].toFixed(1)}" x2="${lB[0].toFixed(1)}" y2="${lB[1].toFixed(1)}" stroke="${col}" stroke-width="0.8"/>`;
    const rA=midp(P.B,P.Bt,t),rB=midp(P.C,P.Ct,t);
    s+=`<line x1="${rA[0].toFixed(1)}" y1="${rA[1].toFixed(1)}" x2="${rB[0].toFixed(1)}" y2="${rB[1].toFixed(1)}" stroke="${col}" stroke-width="0.8"/>`;
  }
  return s;
}
function contactShadow(z){ // zeminde temas gölgesi
  const e=0.18;
  const A=iso(z.gx-e,z.gy-e),B=iso(z.gx+z.w+e,z.gy-e),C=iso(z.gx+z.w+e,z.gy+z.d+e),D=iso(z.gx-e,z.gy+z.d+e);
  return `<polygon points="${pts([A,B,C,D])}" fill="#000" opacity="0.28"/>`;
}
function drawZone(z){
  if(z.t==="door"){
    const A=iso(z.gx,z.gy),B=iso(z.gx+z.w,z.gy),C=iso(z.gx+z.w,z.gy+z.d),D=iso(z.gx,z.gy+z.d);
    const c=iso(z.gx+z.w/2,z.gy+z.d/2);
    return `<polygon points="${pts([A,B,C,D])}" fill="#10331f" stroke="#1c7a4d" stroke-dasharray="4 3"/>`+
      `<path d="M${(c[0]-12).toFixed(1)} ${(c[1]-6).toFixed(1)} L${c[0].toFixed(1)} ${(c[1]+4).toFixed(1)} L${(c[0]+12).toFixed(1)} ${(c[1]-6).toFixed(1)}" fill="none" stroke="#2fd99a" stroke-width="2"/>`+
      labelAt(z.gx+z.w/2,z.gy+z.d/2,z.n,0,"#bfe9d4");
  }
  let cTop,cL,cR;
  if(z.t==="aisle"){cTop="#39414e";cL="#262d38";cR="#1b212a";}
  else if(z.t==="cold"){cTop="#24454e";cL="#173640";cR="#102a32";}
  else if(z.t==="produce"){cTop="#46562c";cL="#33401f";cR="#252f16";}
  else if(z.t==="counter"){cTop="#333b48";cL="#222a34";cR="#181d25";}
  else if(z.t==="dock"){cTop="#2f3540";cL="#20242d";cR="#161a20";}
  else {cTop="#333a48";cL="#232a34";cR="#191e26";}
  let s=contactShadow(z);
  const box=isoBox(z,cTop,cL,cR); s+=box.s; const T=box.top;
  if(z.t==="aisle"){
    s+=shelfTiers(box,3,"#10141a");
    // üstte hacimli ürünler (iki sıra, derinlik boyunca), arkadan öne çiz
    const items=[];
    for(const u of [0.32,0.68]){
      for(let k=0;k<8;k++){const v=0.08+k*0.115;
        const p=bilerp(T,u,v); const hsh=((u*100+v*53)|0);
        items.push({y:p[1],x:p[0],base:PROD_COLS[hsh%PROD_COLS.length],fw:3.6+(hsh%3),ph:5+(hsh%6)});}
    }
    items.sort((a,b)=>a.y-b.y);
    for(const it of items) s+=prod(it.x,it.y,it.fw,it.ph,it.base);
  } else if(z.t==="produce"){
    const items=[];
    for(let k=0;k<3;k++){const p=bilerp(T,0.2+k*0.3,0.5);items.push({x:p[0],y:p[1],base:["#5a9e6a","#d9a441","#b34a52"][k]});}
    items.sort((a,b)=>a.y-b.y);
    for(const it of items) s+=`<ellipse cx="${it.x.toFixed(1)}" cy="${(it.y-3).toFixed(1)}" rx="10" ry="6" fill="${it.base}" opacity="0.85"/>`+prod(it.x,it.y,5,4,it.base);
  } else if(z.t==="cold"){
    s+=shelfTiers(box,3,"#0d2228");
    for(let u=0.22;u<0.85;u+=0.3){const a=bilerp(T,u,0.12),b=bilerp(T,u,0.88);s+=`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#4a8a98" opacity="0.55" stroke-width="1.2"/>`;}
  } else if(z.t==="dock"||z.t==="box"){
    s+=shelfTiers(box,2,"#101319");
  }
  if(z.flag==="low"){
    const rp=[midp(box.B,box.C,0.26),midp(box.B,box.C,0.74),midp(box.Bt,box.Ct,0.74),midp(box.Bt,box.Ct,0.26)];
    s+=`<polygon points="${pts(rp)}" fill="#c8453a" opacity="0.95"/>`;
    s+=`<polygon points="${pts(rp)}" fill="none" stroke="#ff9e92" stroke-width="0.6"/>`;
    s+=labelAt(z.gx+z.w/2,z.gy+z.d+0.5,"BOŞ RAF",0,"#ff9e92");
  }
  if(z.flag==="sec"){const tp=bilerp(T,0.5,0.5);s+=`<circle cx="${tp[0].toFixed(1)}" cy="${(tp[1]-2).toFixed(1)}" r="4" fill="#c8453a"/><circle cx="${tp[0].toFixed(1)}" cy="${(tp[1]-2).toFixed(1)}" r="7" fill="none" stroke="#c8453a" stroke-width="0.8" opacity="0.6"/>`;}
  if(z.t==="counter"&&z.flag==="busy") s+=labelAt(z.gx+z.w/2,z.gy-0.3,"kuyruk",z.h+6,"#e3a012");
  s+=labelAt(z.gx+z.w/2,z.gy-0.15,z.n,z.h+(z.t==="counter"&&z.flag==="busy"?16:7));
  return s;
}
function isoPerson(gx,gy,col){const [x,y]=iso(gx,gy);col=col||"#3ad6a0";
  return `<ellipse cx="${(x+2).toFixed(1)}" cy="${y.toFixed(1)}" rx="6.5" ry="3" fill="#000" opacity="0.32"/>`+
    `<path d="M${(x-2.8).toFixed(1)} ${(y-2).toFixed(1)} Q${(x-3.2).toFixed(1)} ${(y-13).toFixed(1)} ${x.toFixed(1)} ${(y-13).toFixed(1)} Q${(x+3.2).toFixed(1)} ${(y-13).toFixed(1)} ${(x+2.8).toFixed(1)} ${(y-2).toFixed(1)} Z" fill="${shade(col,0.85)}"/>`+
    `<rect x="${(x-2.8).toFixed(1)}" y="${(y-12).toFixed(1)}" width="5.6" height="6" fill="${col}" opacity="0.5"/>`+
    `<circle cx="${x.toFixed(1)}" cy="${(y-16).toFixed(1)}" r="3" fill="#e9d9c4"/>`+
    `<circle cx="${(x-0.8).toFixed(1)}" cy="${(y-16.6).toFixed(1)}" r="1.1" fill="#fff" opacity="0.5"/>`;}
function mapSVG(){
  const A=iso(0,0),B=iso(ISO.W,0),C=iso(ISO.W,ISO.D),D=iso(0,ISO.D);
  let defs=`<defs><radialGradient id="flg" cx="0.5" cy="0.42" r="0.7"><stop offset="0" stop-color="#1d2230"/><stop offset="1" stop-color="#0e1016"/></radialGradient></defs>`;
  let floor=`<polygon points="${pts([A,B,C,D])}" fill="url(#flg)"/>`;
  for(let x=0;x<=ISO.W;x++){const a=iso(x,0),b=iso(x,ISO.D);floor+=`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#1c212b" opacity="0.7"/>`;}
  for(let y=0;y<=ISO.D;y++){const a=iso(0,y),b=iso(ISO.W,y);floor+=`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#1c212b" opacity="0.7"/>`;}
  const zs=[...ISO_ZONES].sort((p,q)=>(p.gx+p.gy)-(q.gx+q.gy));
  const structs=zs.map(drawZone).join("");
  const ppl=[...DOTS].sort((p,q)=>(p.gx+p.gy)-(q.gx+q.gy)).map(p=>isoPerson(p.gx,p.gy)).join("");
  return `<svg viewBox="0 0 700 392">${defs}<rect width="700" height="392" rx="8" fill="#0e1016"/>${floor}${structs}${ppl}</svg>`;
}
function dbox(x,y,w,h,col,lab){
  const L=8;
  let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${col}" stroke-width="1.6" rx="2" opacity="0.9"/>`;
  s+=`<path d="M${x} ${y+L} V${y} H${x+L} M${x+w-L} ${y} H${x+w} V${y+L} M${x+w} ${y+h-L} V${y+h} H${x+w-L} M${x+L} ${y+h} H${x} V${y+h-L}" stroke="${col}" stroke-width="2.4" fill="none"/>`;
  if(lab){const lw=lab.length*5.6+10;s+=`<rect x="${x}" y="${y-13}" width="${lw}" height="13" fill="${col}"/><text x="${x+5}" y="${y-3}" font-size="8.5" fill="#0a0c10" font-family="monospace">${esc(lab)}</text>`;}
  return s;
}
function pSil(cx,baseY,hgt,col){const w=hgt*0.44;
  return `<ellipse cx="${cx}" cy="${baseY+2}" rx="${(w*0.7).toFixed(1)}" ry="3" fill="#000" opacity="0.3"/>`+
    `<circle cx="${cx}" cy="${(baseY-hgt+w*0.4).toFixed(1)}" r="${(w*0.32).toFixed(1)}" fill="${col}"/>`+
    `<path d="M${(cx-w*0.5).toFixed(1)} ${baseY} Q${(cx-w*0.5).toFixed(1)} ${(baseY-hgt*0.72).toFixed(1)} ${cx} ${(baseY-hgt*0.72).toFixed(1)} Q${(cx+w*0.5).toFixed(1)} ${(baseY-hgt*0.72).toFixed(1)} ${(cx+w*0.5).toFixed(1)} ${baseY} Z" fill="${col}"/>`;
}
const EV_LBL={face_unknown:"tanınmayan",face_match:"tanınan",fall:"düşme",spill:"sıvı",vehicle:"araç",queue:"kuyruk",door:"kapı"};
function evScene(ev,idx){
  const ts=new Date().toLocaleTimeString(LANG==="en"?"en-GB":"tr-TR",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
  const cam="CAM "+String(11+idx).padStart(2,"0");
  const col=ev.tier==="security"?"#ff5a4d":ev.tier==="customer"?"#46c8ff":"#ffc24d";
  let s=`<defs>
     <linearGradient id="ef${idx}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2f3a"/><stop offset="1" stop-color="#0c0e12"/></linearGradient>
     <radialGradient id="el${idx}" cx="0.5" cy="0.3" r="0.85"><stop offset="0" stop-color="#3a4150" stop-opacity="0.4"/><stop offset="1" stop-color="#0c0e12" stop-opacity="0"/></radialGradient>
   </defs>
   <rect width="320" height="200" fill="#0c0e12"/>
   <polygon points="60,66 260,66 320,200 0,200" fill="url(#ef${idx})"/>
   <g stroke="#1b2028" opacity="0.6"><line x1="0" y1="200" x2="118" y2="66"/><line x1="320" y1="200" x2="202" y2="66"/><line x1="22" y1="156" x2="298" y2="156"/><line x1="46" y1="116" x2="274" y2="116"/></g>`;
  const k=ev.kind;
  if(k==="face_unknown"||k==="face_match"){
    s+=`<polygon points="0,66 44,66 74,200 0,200" fill="#181d26"/><polygon points="276,66 320,66 320,200 246,200" fill="#181d26"/>`;
    s+=pSil(160,168,86,"#3a4150");
    s+=dbox(132,84,56,90,col,tr(EV_LBL[k]));
  } else if(k==="fall"){
    s+=`<ellipse cx="170" cy="160" rx="48" ry="14" fill="#000" opacity="0.25"/>`;
    s+=`<circle cx="120" cy="150" r="11" fill="#3a4150"/><rect x="128" y="145" width="58" height="16" rx="8" fill="#3a4150"/>`;
    s+=dbox(104,132,96,40,col,tr(EV_LBL[k]));
  } else if(k==="spill"){
    s+=`<ellipse cx="168" cy="156" rx="46" ry="20" fill="#2d6e8e" opacity="0.55"/><ellipse cx="168" cy="156" rx="28" ry="12" fill="#3a86a8" opacity="0.7"/>`;
    s+=dbox(116,132,108,46,col,tr(EV_LBL[k]));
  } else if(k==="shelf"){
    s+=`<rect x="46" y="80" width="228" height="104" rx="3" fill="#1b2029"/>`;
    for(let yy=98;yy<180;yy+=26) s+=`<line x1="50" y1="${yy}" x2="270" y2="${yy}" stroke="#2a3140"/>`;
    const cols=["#c46a4a","#d9a441","#4a7fb5","#5a9e6a"];
    for(let yy=86;yy<176;yy+=26)for(let xx=54;xx<262;xx+=22){ if(!(yy>108&&yy<142&&xx>150&&xx<210)) s+=`<rect x="${xx}" y="${yy}" width="16" height="18" rx="1" fill="${cols[(xx+yy)%4]}" opacity="0.7"/>`; }
    s+=`<rect x="150" y="110" width="60" height="32" fill="#0c0e12"/>`;
    s+=dbox(150,110,60,32,col,esc(ev.product||tr("boş raf")));
  } else if(k==="vehicle"){
    s+=`<rect x="40" y="44" width="240" height="120" rx="3" fill="#13171d" stroke="#262c34"/><line x1="40" y1="78" x2="280" y2="78" stroke="#20262e"/>`;
    s+=`<rect x="96" y="118" width="128" height="44" rx="8" fill="#3a4150"/><rect x="118" y="100" width="80" height="26" rx="6" fill="#2c333d"/>`;
    s+=dbox(90,94,140,72,col,"34 BFR 217");
  } else if(k==="queue"){
    s+=`<rect x="36" y="150" width="248" height="20" rx="2" fill="#262b35"/>`;
    s+=pSil(110,148,64,"#3a4150")+pSil(150,150,60,"#3a4150")+pSil(190,152,58,"#3a4150");
    s+=dbox(86,96,134,62,col,tr(EV_LBL[k]));
  } else if(k==="door"){
    s+=`<rect x="70" y="56" width="180" height="120" rx="3" fill="#14262c" stroke="#2a5560"/>`;
    s+=`<rect x="70" y="56" width="86" height="120" fill="#0c0e12" stroke="#2a5560"/><path d="M156 56 L120 70 L120 162 L156 176" fill="#10333b" stroke="#2a5560"/>`;
    s+=dbox(74,60,150,116,col,tr(EV_LBL[k]));
  } else {
    s+=pSil(160,168,80,"#3a4150"); s+=dbox(136,96,48,78,col,"event");
  }
  s+=`<rect width="320" height="200" fill="url(#el${idx})"/>`;
  s+=`<g opacity="0.05">`+Array.from({length:25},(_,i)=>`<line x1="0" y1="${i*8}" x2="320" y2="${i*8}" stroke="#fff"/>`).join("")+`</g>`;
  s+=`<circle cx="14" cy="14" r="4" fill="#ff4d4d"/><text x="24" y="18" font-size="10" fill="#e6e7ea" font-family="monospace">REC ${cam}</text>`;
  s+=`<text x="312" y="18" font-size="10" fill="#9aa0ad" font-family="monospace" text-anchor="end">${ts}</text>`;
  return `<svg viewBox="0 0 320 200">${s}</svg>`;
}
function renderCams(){
  document.getElementById("cams").innerHTML = EVENTS.slice(0,6).map((e,i)=>{
    const dot=e.tier==="security"?"#c8453a":e.tier==="customer"?"#2d6e8e":"#e3a012";
    const zoneTxt=tr(e.zone)+(e.addr?" · "+tr(e.addr):"");
    return `<div class="cam">${evScene(e,i)}<div class="cam-ft"><span class="zn"><span class="td" style="background:${dot}"></span>${esc(zoneTxt)}</span><span class="ag">${esc(trAgo(e.ago))} ${LANG==="en"?"ago":"önce"}</span></div></div>`;
  }).join("");
}
function renderMap(){ buildDots(); document.getElementById("map").innerHTML=mapSVG();
  const pw=LANG==="en"?"people":"kişi", aw=LANG==="en"?"active":"aktif";
  document.getElementById("mapCount").textContent=PEOPLE+" "+pw;
  document.getElementById("peopleNum").innerHTML=PEOPLE+'<small>'+pw+'</small>';
  document.getElementById("peopleMeta").textContent=PEOPLE+" "+aw;
  document.getElementById("peopleSub").textContent=tr("Reyonlar, kasalar ve girişte dağılım — haritada canlı."); }
function renderVip(){
  document.getElementById("vipMeta").textContent=VIP.length+" misafir";
  document.getElementById("vipList").innerHTML = VIP.length? VIP.map(v=>`
    <div class="person"><div class="ava">${v.image_url?`<img src="${esc(v.image_url)}" alt="">`:microThumb('face_match','#157F5B')}</div><div><div class="nm">${esc(v.name)}</div>
    <div class="sb">${esc(v.cam)} · ${esc(trAgo(v.ago))} ${LANG==="en"?"ago":"önce"}</div></div></div>`).join("") : `<div class="empty">${LANG==="en"?"No recognized customer.":"Tanınan müşteri yok."}</div>`; }
function renderEvents(){
  document.getElementById("evList").innerHTML = EVENTS.length? EVENTS.slice(0,8).map(e=>`
    <div class="ev ${e.tier}"><div class="evthumb">${evThumb(e)}</div>
      <div class="et"><div>${esc(tr(e.text))}</div>
        <div class="ez">${esc(tr(e.zone))}${e.addr?` · <span class="ad">${esc(tr(e.addr))}</span>`:""}${e.product?` · <span class="ad">${esc(e.product)}</span>`:""}</div></div>
      <span class="eg">${esc(trAgo(e.ago))}</span></div>`).join("") : `<div class="empty">${LANG==="en"?"No events.":"Olay yok."}</div>`; }
const PK={TW:28,TH:14,OX:185,OY:34,W:10,D:6};
function pIso(gx,gy){return [PK.OX+(gx-gy)*PK.TW, PK.OY+(gx+gy)*PK.TH];}
const PARK_POS=[
  {gx:0.6,gy:0.2,col:"#c0463c"},   // 34 BFR 217 — rampada (izinsiz)
  {gx:0.6,gy:2.5,col:"#596275"},   // bekliyor
  {gx:2.9,gy:2.5,col:"#6a6f7d"},   // bekliyor
  {gx:5.2,gy:2.5,col:"#2f8f63"},   // otoparkta (in)
  {gx:0.6,gy:4.1,col:"#585f70"}    // bekliyor
];
const EMPTY_SLOTS=[{gx:2.9,gy:4.1},{gx:5.2,gy:4.1},{gx:7.5,gy:2.5},{gx:7.5,gy:4.1}];
function slotRect(gx,gy,alert){const w=1.7,d=0.9;
  const A=pIso(gx,gy),B=pIso(gx+w,gy),C=pIso(gx+w,gy+d),D=pIso(gx,gy+d);
  return `<polygon points="${pts([A,B,C,D])}" fill="${alert?'#1f1413':'#13161d'}" stroke="${alert?'#7a2f2a':'#2a313b'}" stroke-width="1.1" ${alert?'stroke-dasharray="4 3"':''}/>`;}
function isoCar(gx,gy,col,plate,flag){
  const w=1.5,d=0.82,h=6,ch=5;
  const A=pIso(gx,gy),B=pIso(gx+w,gy),C=pIso(gx+w,gy+d),D=pIso(gx,gy+d);
  const At=[A[0],A[1]-h],Bt=[B[0],B[1]-h],Ct=[C[0],C[1]-h],Dt=[D[0],D[1]-h];
  const ctr=pIso(gx+w/2,gy+d/2);
  let s=`<ellipse cx="${ctr[0].toFixed(1)}" cy="${(ctr[1]+2).toFixed(1)}" rx="23" ry="9" fill="#000" opacity="0.28"/>`;
  s+=`<polygon points="${pts([D,C,Ct,Dt])}" fill="${shade(col,0.7)}"/>`;
  s+=`<polygon points="${pts([B,C,Ct,Bt])}" fill="${shade(col,0.52)}"/>`;
  s+=`<polygon points="${pts([At,Bt,Ct,Dt])}" fill="${shade(col,1.0)}"/>`;
  const cg=0.3, ph=h+ch;
  const a2=pIso(gx+cg,gy+0.14),b2=pIso(gx+w-0.32,gy+0.14),c2=pIso(gx+w-0.32,gy+d-0.14),d2=pIso(gx+cg,gy+d-0.14);
  const lift=p=>[p[0],p[1]-ph], drop=p=>[p[0],p[1]-h];
  const a2t=lift(a2),b2t=lift(b2),c2t=lift(c2),d2t=lift(d2);
  const a2b=drop(a2),b2b=drop(b2),c2b=drop(c2),d2b=drop(d2);
  s+=`<polygon points="${pts([d2b,c2b,c2t,d2t])}" fill="${shade(col,0.58)}"/>`;
  s+=`<polygon points="${pts([b2b,c2b,c2t,b2t])}" fill="${shade(col,0.46)}"/>`;
  s+=`<polygon points="${pts([d2b,c2b,c2t,d2t])}" fill="#9fc6e0" opacity="0.2"/>`;
  s+=`<polygon points="${pts([a2t,b2t,c2t,d2t])}" fill="${shade(col,0.9)}"/>`;
  s+=`<rect x="${(ctr[0]-26).toFixed(1)}" y="${(ctr[1]-ph-15).toFixed(1)}" width="52" height="13" rx="2" fill="#0d0f14" stroke="${flag==='alert'?'#ff6a5c':'#3a4250'}"/>`;
  s+=`<text x="${ctr[0].toFixed(1)}" y="${(ctr[1]-ph-5).toFixed(1)}" font-size="8.5" fill="#e6e7ea" text-anchor="middle" font-family="JetBrains Mono">${esc(plate)}</text>`;
  if(flag==='alert') s+=`<text x="${ctr[0].toFixed(1)}" y="${(ctr[1]-ph-18).toFixed(1)}" font-size="8" fill="#ff6a5c" text-anchor="middle">⚠ ${esc(tr("izinsiz"))}</text>`;
  return {s, depth:gx+gy+w};
}
function parkSVG(){
  const A=pIso(0,0),B=pIso(PK.W,0),C=pIso(PK.W,PK.D),D=pIso(0,PK.D);
  let s=`<rect width="600" height="250" fill="#0e1016"/>`;
  s+=`<polygon points="${pts([A,B,C,D])}" fill="#141821"/>`;
  // yükleme rampası şeridi (arka)
  const rA=pIso(0,0),rB=pIso(4.6,0),rC=pIso(4.6,1.3),rD=pIso(0,1.3);
  s+=`<polygon points="${pts([rA,rB,rC,rD])}" fill="#1a1f29" stroke="#2a313b"/>`;
  const rl=pIso(2.3,0.65); s+=`<text x="${rl[0].toFixed(1)}" y="${rl[1].toFixed(1)}" font-size="8" fill="#7a8294" text-anchor="middle">${esc(tr("YÜKLEME RAMPASI"))}</text>`;
  // boş park yerleri
  for(const e of EMPTY_SLOTS) s+=slotRect(e.gx,e.gy,false);
  for(let i=1;i<PARK_POS.length;i++){const p=PARK_POS[i];s+=slotRect(p.gx,p.gy,false);}
  s+=slotRect(PARK_POS[0].gx,PARK_POS[0].gy,true);
  // araçlar (arkadan öne)
  const cars=PARK.map((p,i)=>{const pos=PARK_POS[i]||{gx:0,gy:0,col:"#5a6275"};return isoCar(pos.gx,pos.gy,pos.col,p.plate,p.status);});
  cars.sort((a,b)=>a.depth-b.depth);
  s+=cars.map(c=>c.s).join("");
  return `<svg viewBox="0 0 600 250">${s}</svg>`;
}
function renderPark(){ document.getElementById("parkList").innerHTML =
  `<div class="parkmap">${parkSVG()}</div>` + PARK.map(p=>`
  <div class="park"><div><div class="pl">${esc(p.plate)}</div><div class="pg">${esc(tr(p.ago))}</div></div>
    <span class="st ${p.status}">${esc(tr(p.label))}</span></div>`).join(""); }

const LOGS=[
  {t:"17:02:31",src:"FaceMind",kind:"face.match",zone:"Giriş",st:"ok"},
  {t:"17:02:08",src:"CamMind",kind:"queue",zone:"Kasa 2",st:"warn"},
  {t:"17:01:54",src:"SpaceMind",kind:"fall",zone:"Reyon 2",st:"crit"},
  {t:"17:01:30",src:"CamMind",kind:"spill",zone:"Manav",st:"warn"},
  {t:"17:00:58",src:"FaceMind",kind:"face.unknown",zone:"Reyon 4",st:"crit"},
  {t:"17:00:41",src:"CamMind",kind:"shelf.empty",zone:"Reyon A 4-15",st:"warn"},
  {t:"17:00:12",src:"ParkMind",kind:"vehicle",zone:"Yükleme",st:"crit"},
  {t:"16:59:47",src:"CamMind",kind:"door.open",zone:"Soğuk Oda",st:"warn"},
  {t:"16:59:20",src:"SpaceMind",kind:"occupancy",zone:"Koridor",st:"ok"},
  {t:"16:58:55",src:"FaceMind",kind:"face.match",zone:"Giriş",st:"ok"},
  {t:"16:58:31",src:"PlateMind",kind:"barcode",zone:"Kasa 1",st:"ok"},
  {t:"16:58:02",src:"CamMind",kind:"shelf.empty",zone:"Reyon C 2-08",st:"warn"}
];
const STAFF=[
  {n:"Ayşe Y.",role:"Kasa",st:"online"},{n:"Mehmet K.",role:"Güvenlik",st:"field"},
  {n:"Can D.",role:"Reyon",st:"busy"},{n:"Zeynep A.",role:"Temizlik",st:"brk"},{n:"Ali R.",role:"Yükleme",st:"online"}
];
const DISPATCH=[
  {to:"Ayşe (Kasa)",text:"Kasa 2'yi aç — kuyruk oluştu",st:"okundu",ago:"2 dk"},
  {to:"Mehmet (Güvenlik)",text:"Reyon 4 — tanınmayan kişi kontrol",st:"iletildi",ago:"2 dk"},
  {to:"Zeynep (Temizlik)",text:"Manav — yerde sıvı, dubayı koy",st:"gönderildi",ago:"4 dk"},
  {to:"Can (Reyon)",text:"Reyon A 4-15 — CZ-Süt yenile (depoda 24 adet)",st:"okundu",ago:"6 dk"}
];
const EDGE_NODES=[
  {name:"Orin · Edge Ana",status:"online",cpu:38,mem:61,temp:52},
  {name:"OPi5 · CamMind Edge",status:"online",cpu:54,mem:47,temp:58}
];
const SERVICES=[
  {n:"CamMind",ms:12},{n:"FaceMind",ms:31},{n:"SpaceMind",ms:18},{n:"ParkMind",ms:22},
  {n:"PlateMind",ms:276},{n:"TalkMind",ms:40},{n:"Kong GW",ms:5},{n:"Supabase",ms:44}
];
const SYS_TILES=[
  {l:"Supabase DB",v:"Çevrimiçi",sub:"Frankfurt · eu-central"},
  {l:"ingest-facemind",v:"Aktif",sub:"son: 1 dk önce"},
  {l:"dashboard-data",v:"Aktif",sub:"okuma fonksiyonu"},
  {l:"Olay hızı",v:"~14/dk",sub:"son 1 saat"},
  {l:"RLS",v:"Açık",sub:"satır izolasyonu"},
  {l:"Hata oranı",v:"%0.0",sub:"son 24 saat"},
  {l:"Uptime",v:"%99.9",sub:"30 gün"},
  {l:"Son senkron",v:"şimdi",sub:"otomatik 15 sn"}
];
const STMAP={online:"çevrimiçi",field:"sahada",busy:"meşgul",brk:"molada"};

function renderLogs(){ document.getElementById("logList").innerHTML=LOGS.map(l=>`
  <div class="logrow"><span class="lt">${l.t}</span><span class="lsrc">${l.src}</span>
    <span class="lk">${l.kind} <span style="color:#9498a2">· ${esc(tr(l.zone))}</span></span>
    <span class="ls ${l.st}">${l.st==="ok"?"OK":l.st==="warn"?(LANG==="en"?"WARN":"UYARI"):(LANG==="en"?"CRIT":"KRİTİK")}</span></div>`).join(""); }
function renderStaff(){
  document.getElementById("staffList").innerHTML=STAFF.map(s=>`
    <div class="staffrow"><span class="sdot ${s.st}"></span><span class="snm">${s.n}</span>
      <span class="sro">${esc(tr(s.role))}</span><span class="sst">${(LANG==="en"?ST_EN:ST_TR)[s.st]}</span></div>`).join("");
  document.getElementById("dispList").innerHTML=DISPATCH.map(d=>`
    <div class="disp"><div class="di">➤</div><div class="dt"><div class="dto">${esc(tr(d.to))}</div>
      <div class="dx">${esc(tr(d.text))}</div><div class="dm">TalkMind · ${esc(trAgo(d.ago))} ${LANG==="en"?"ago":"önce"}</div></div>
      <span class="dst ${d.st==='okundu'?'read':''}">${esc(tr(d.st))}</span></div>`).join("");
}
function gauge(l,v,unit){const u=unit||"%";const col=v>80?"var(--loss)":v>65?"var(--tag)":"var(--profit)";
  return `<div class="gauge"><span class="gl">${l}</span><span class="gb"><span style="width:${Math.min(100,v)}%;background:${col}"></span></span><span class="gv">${v}${u}</span></div>`;}
function renderEdge(){
  document.getElementById("nodeList").innerHTML=EDGE_NODES.map(n=>`
    <div class="node"><div class="nh">${esc(tr(n.name))}<span class="stp">${LANG==="en"?"online":"çevrimiçi"}</span></div>
      ${gauge("CPU",n.cpu)}${gauge("RAM",n.mem)}${gauge(LANG==="en"?"Temp":"Isı",n.temp,"°C")}</div>`).join("");
  document.getElementById("svcList").innerHTML=SERVICES.map(s=>`
    <div class="svc"><span class="sd"></span><span class="sn">${s.n}</span><span class="sm">${s.ms}ms</span></div>`).join("");
}
function renderHealth(){ document.getElementById("healthList").innerHTML=SYS_TILES.map(h=>`
  <div class="htile"><div class="hl">${esc(tr(h.l))}</div><div class="hv">${esc(tr(h.v))}</div><div class="hs">${esc(tr(h.sub))}</div></div>`).join(""); }

document.querySelectorAll(".roleview button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".roleview button").forEach(x=>x.classList.remove("on")); b.classList.add("on");
});

function tick(){const n=new Date();
  document.getElementById("clk").textContent=n.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
  document.getElementById("day").textContent=n.toLocaleDateString("tr-TR",{day:"numeric",month:"long",weekday:"long"});}

// ── Canlı olayları (FaceMind vb.) Son Olaylar'a üstten ekle ──
async function pullLive(){
  try{
    const r=await (await fetch(FN_URL,{headers:{accept:"application/json"}})).json();
    if(r&&r.ok&&Array.isArray(r.events)&&r.events.length){
      const live=r.events.map(e=>({tier:e.tier,zone:e.zone||"—",text:e.text,ago:e.ago||"şimdi",
        kind:inferKind(e), addr:e.addr, product:e.product, image_url:e.image_url, live:true}))
        .filter(e=>e.kind && isFresh(e.ago));
      // taze + sınıflandırılmış canlı olaylar başa, zengin sentetikle 6+'ya tamamla, tekrarı ele
      const seen=new Set(); EVENTS.length=0;
      for(const e of [...live, ...SYN_EVENTS]){ const key=(e.kind||"")+"|"+(e.zone||"")+"|"+(e.text||"");
        if(!seen.has(key)){ seen.add(key); EVENTS.push(e); } }
      // tanınan müşteri canlıdan (yalnız taze)
      const vip=r.events.filter(e=>e.tier==="customer"&&e.person_id&&isFresh(e.ago));
      if(vip.length){VIP.length=0; vip.slice(0,3).forEach(v=>VIP.push({name:v.text||"Tanınan müşteri",cam:(v.zone||"cam"),ago:v.ago||"şimdi",image_url:v.image_url}));}
      renderEvents(); renderVip(); renderCams();
      IS_LIVE=true; renderFoot();
    }
  }catch(e){ /* sentetik kalır */ }
}

// boot
tick(); setIntervalT(tick,1000);
renderCams(); renderMap(); renderVip(); renderEvents(); renderPark(); renderLogs(); renderStaff(); renderEdge(); renderHealth();
document.getElementById("site").textContent=SITE;
IS_LIVE=false; renderFoot();
setIntervalT(()=>{ renderMap(); renderCams(); }, 3000);   // canlı his: nokta + kamera saati tazelensin
pullLive(); setIntervalT(pullLive, 15000);

document.querySelectorAll("#langtog button").forEach(b=>b.onclick=()=>setLang(b.dataset.l));
setLang("tr");

// nav scroll-spy (aktif bölümü vurgula)
if(typeof IntersectionObserver!=="undefined"){
  const links=[...document.querySelectorAll(".navlink")];
  const map={}; links.forEach(a=>map[a.getAttribute("href").slice(1)]=a);
  const obs=new IntersectionObserver(ents=>{
    ents.forEach(e=>{ if(e.isIntersecting){ links.forEach(l=>l.classList.remove("on")); const a=map[e.target.id]; if(a)a.classList.add("on"); } });
  },{rootMargin:"-35% 0px -60% 0px",threshold:0});
  Object.keys(map).forEach(id=>{const el=document.getElementById(id); if(el)obs.observe(el);});
}

    return () => { __ids.forEach((id) => clearInterval(id)); };
  }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
    </>
  );
}
