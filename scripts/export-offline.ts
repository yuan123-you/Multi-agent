import { mkdirSync, writeFileSync } from "node:fs";
import { agents, alternatives, collabLayers, contest, events, journeys, knowledgePacks, scoring, sprint, submitItems } from "../src/data/plan";

const agentCards = agents
  .map(
    (a) => `<article class="card">
  <h3>${a.no} ${a.name} · ${a.role}</h3>
  <p class="muted">${a.layer} · ${a.persona}</p>
  <p>「${a.greeting}」</p>
  <p><strong>听：</strong>${a.inputs.join("、")}</p>
  <p><strong>交：</strong>${a.outputs.join("、")}</p>
  <p><strong>必做：</strong>${a.mustHave}</p>
</article>`
  )
  .join("\n");

const journeyCards = journeys
  .map(
    (j) => `<article class="card">
  <h3>${j.title}</h3>
  <p class="muted">${j.duration} · ${j.goal}</p>
  <ol>${j.beats.map((b) => `<li>${b}</li>`).join("")}</ol>
</article>`
  )
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>途见锦官 · 智能体大赛策划方案</title>
  <style>
    :root { --ink:#3b2416; --paper:#f7f1e8; --red:#b54a3c; --line:#e6d7c4; }
    * { box-sizing: border-box; }
    body { margin:0; font:16px/1.7 "PingFang SC","Noto Sans SC",sans-serif; background:var(--paper); color:var(--ink); }
    header, main, footer { max-width: 920px; margin: 0 auto; padding: 24px 20px; }
    header { padding-top: 40px; }
    h1 { font-family: "Songti SC","Noto Serif SC",serif; font-size: 42px; margin: 8px 0; }
    h2 { font-family: "Songti SC","Noto Serif SC",serif; margin-top: 48px; }
    .tag { display:inline-block; background:#f0d9d0; color:var(--red); padding:2px 10px; border-radius:999px; font-size:12px; }
    .muted { color:#7a6556; }
    .card { background:#fffaf4; border:1px solid var(--line); border-radius:14px; padding:16px 18px; margin:12px 0; }
    table { width:100%; border-collapse: collapse; background:#fffaf4; }
    th, td { border:1px solid var(--line); padding:8px 10px; text-align:left; vertical-align:top; font-size:14px; }
    a { color:var(--red); }
    ol { padding-left: 1.2em; }
  </style>
</head>
<body>
  <header>
    <span class="tag">${contest.track} · ${contest.theme}</span>
    <h1>途见锦官</h1>
    <p>十二个智能体，一块行程白板，把成都的文、商、旅跑成闭环。</p>
    <p class="muted">${contest.name} · 提交截止 ${contest.deadline} · 总决赛 ${contest.finals}</p>
  </header>
  <main>
    <h2>一句话</h2>
    <p>游客完成「来—玩—吃—住—买—走」，商户接到可核销的需求包，暴雨等事件能改签而不是各说各的。</p>
    <p>平台：<a href="${contest.platform}">${contest.platform}</a> · 报名：<a href="${contest.signup}">官方报名页</a></p>

    <h2>为什么选文商旅</h2>
    <div class="card">智小途首页就有数字导游、文旅宣传、IP打造、智能客服。总决赛在成都，本地样本评委听得懂。文商旅天然能拆成十个以上岗位，又必须共用行程白板。</div>

    <h2>十二岗</h2>
    ${agentCards}

    <h2>协同怎么做</h2>
    ${collabLayers.map((l) => `<div class="card"><h3>${l.title}</h3><p>${l.body}</p></div>`).join("")}
    <table>
      <tr><th>事件</th><th>发出</th><th>接收</th><th>结果</th></tr>
      ${events.map((e) => `<tr><td>${e.code}</td><td>${e.from}</td><td>${e.to}</td><td>${e.effect}</td></tr>`).join("")}
    </table>

    <h2>三条演示线</h2>
    ${journeyCards}

    <h2>知识库</h2>
    ${knowledgePacks.map((k) => `<div class="card"><strong>${k.agent}</strong><p>${k.files.join("、")}</p></div>`).join("")}

    <h2>评分作战</h2>
    ${scoring.map((s) => `<div class="card"><h3>${s.axis}</h3><p class="muted">${s.weight}</p><p>${s.tactic}</p></div>`).join("")}

    <h2>十三天排期</h2>
    ${sprint.map((s) => `<div class="card"><h3>${s.when} ${s.title}</h3><ul>${s.items.map((i) => `<li>${i}</li>`).join("")}</ul></div>`).join("")}

    <h2>提交清单</h2>
    ${submitItems.map((s) => `<div class="card"><strong>${s.name}</strong><p>${s.note}</p></div>`).join("")}

    <h2>备选赛题</h2>
    ${alternatives.map((a) => `<details class="card"><summary>${a.name}</summary><p>${a.summary}</p><p>${a.agents}</p><p>${a.when}</p></details>`).join("")}
  </main>
  <footer class="muted">离线副本 · 途见锦官策划方案 · 用浏览器直接打开本文件即可</footer>
</body>
</html>
`;

mkdirSync("public", { recursive: true });
mkdirSync("downloads", { recursive: true });
writeFileSync("public/tujian-jinguan.html", html);
writeFileSync("downloads/途见锦官策划方案.html", html);
console.log("wrote offline html");
