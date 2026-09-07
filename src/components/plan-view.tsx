import { ArrowRight, CheckCircle2, Compass, Link2, MapPin } from "lucide-react";
import { AgentMatrix } from "@/components/agent-matrix";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JourneyTabs } from "@/components/journey-tabs";
import {
  alternatives,
  collabLayers,
  contest,
  decisionReasons,
  events,
  knowledgePacks,
  platformMap,
  scoring,
  sprint,
  submitItems,
  themeCompare,
} from "@/data/plan";

export function PlanView() {
  return (
    <div id="top" className="min-h-full">
      <SiteHeader />
      <Hero />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24">
        <ContestStrip />
        <TopicDecision />
        <AgentSection />
        <CollabSection />
        <JourneySection />
        <KnowledgeSection />
        <ScoringSection />
        <SprintSection />
        <SubmitSection />
        <AltSection />
      </main>
      <footer className="border-t border-border bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>途见锦官 · 2026全球智能体大赛赛道A策划方案</p>
          <p>平台：智小途 workbrain.cn · 总决赛 10月10日</p>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  kicker,
  title,
  desc,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-14">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          {kicker}
        </p>
        <h2 className="mt-2 font-heading text-3xl tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">{desc}</p>
      </div>
      {children}
    </section>
  );
}

function Hero() {
  return (
    <div className="paper-grid border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
        <div>
          <Badge variant="secondary" className="mb-4">
            {contest.track} · {contest.theme}方向
          </Badge>
          <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-6xl">
            途见锦官
          </h1>
          <p className="mt-3 text-xl text-primary/90 sm:text-2xl">
            十二个智能体，一块行程白板，把成都的文、商、旅跑成闭环。
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            赛道A要求一个空间里至少 10 个有效智能体。本方案不把它们做成十个互不相认的聊天窗口，而是一支能交接、能改签、能把游客需求递给商户的地接团队。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#agents"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
            >
              看十二岗怎么关联
              <ArrowRight className="size-4" />
            </a>
            <a
              href={contest.platform}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm"
            >
              打开智小途
            </a>
          </div>
        </div>
        <div className="grid gap-3 self-end">
          {[
            ["空间规模", "12 个有效智能体 / 1 个空间"],
            ["关联方式", "共享白板 + 事件总线 + 职责边界"],
            ["用户双边", "游客 C 端 · 商户 B 端"],
            ["提交截止", contest.deadline],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-xl border border-border bg-card/80 px-4 py-3">
              <span className="text-xs tracking-wide text-muted-foreground">{k}</span>
              <span className="text-sm font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContestStrip() {
  return (
    <Section
      id="contest"
      kicker="01 赛事对标"
      title="先把规则钉死，再谈创意。"
      desc="云端读不到你本机的《智能体大赛PDF预览.html》。下列口径来自官方报名页与智小途平台，作为本策划的硬约束。"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>赛道A硬指标</CardTitle>
            <CardDescription>高校组 · 1–5 人</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-7">
            <p>提交 1 个智能体空间，内含至少 10 个有效智能体。</p>
            <p>选题四选一：文商旅 / 教育 / 企业服务 / 社区医疗。</p>
            <p>评审侧重：空间完整性、场景价值、创新体验、答辩呈现。</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>时间轴</CardTitle>
            <CardDescription>今天已进入创作窗口</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-7">
            <p>报名 9/1–9/20 24:00，逾期不补交。</p>
            <p>创作提交 9/7–9/20。</p>
            <p>公众投票 9/21–9/27；专家评审与答辩 9/28–9/30；颁奖 10/10。</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>平台怎么用</CardTitle>
            <CardDescription>智小途，不是另起炉灶</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-7">
            {platformMap.map((row) => (
              <p key={row.feature}>
                <span className="font-medium">{row.feature}：</span>
                {row.use}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        报名：
        <a className="ml-1 underline" href={contest.signup} target="_blank" rel="noreferrer">
          {contest.signup}
        </a>
        {" · "}体验：
        <a className="ml-1 underline" href={contest.platform} target="_blank" rel="noreferrer">
          {contest.platform}
        </a>
      </p>
    </Section>
  );
}

function TopicDecision() {
  return (
    <Section
      id="decision"
      kicker="02 选题决策"
      title="主推文商旅，样本就用成都。"
      desc="作品名《途见锦官》。锦官是成都的旧称，途是智小途。评委在成都现场，一听就知道你在做本地、可演示、可复制的城市场景。"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {decisionReasons.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="size-4 text-primary" />
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              {item.body}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-muted/70">
            <tr>
              <th className="px-4 py-3 font-medium">方向</th>
              <th className="px-4 py-3 font-medium">定位</th>
              <th className="px-4 py-3 font-medium">为什么</th>
              <th className="px-4 py-3 font-medium">风险</th>
            </tr>
          </thead>
          <tbody>
            {themeCompare.map((row) => (
              <tr key={row.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">
                  {row.name}
                  {row.pick === "主推" ? (
                    <Badge className="ml-2" variant="default">
                      {row.pick}
                    </Badge>
                  ) : (
                    <span className="ml-2 text-xs text-muted-foreground">{row.pick}</span>
                  )}
                </td>
                <td className="px-4 py-3">{row.score}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.why}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function AgentSection() {
  return (
    <Section
      id="agents"
      kicker="03 智能体矩阵"
      title="十二岗，一个都不能互相替代。"
      desc="点选左侧任意智能体，右侧看它听什么、交什么、会叫谁。高亮的卡片就是当前这一岗的直接协作对象——关联写在调度关系里，不写在口号里。"
    >
      <AgentMatrix />
    </Section>
  );
}

function CollabSection() {
  return (
    <Section
      id="collab"
      kicker="04 协同架构"
      title="关联的最小闭环：白板、事件、边界。"
      desc="评委拆穿「换皮聊天机器人」的方式很简单：问下雨了怎么办。答得动，就证明十二个智能体在同一张状态上工作。"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {collabLayers.map((layer) => (
          <Card key={layer.name}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="size-4 text-primary" />
                {layer.title}
              </CardTitle>
              <CardDescription>{layer.name}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              {layer.body}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-border bg-card p-4 sm:p-6">
        <h3 className="font-heading text-xl">事件总线</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          有事件才调度。演示时点名 1–2 个事件，比口播「我们做了多智能体」更硬。
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-muted-foreground">
                <th className="py-2 pr-4 font-medium">事件</th>
                <th className="py-2 pr-4 font-medium">发出</th>
                <th className="py-2 pr-4 font-medium">接收</th>
                <th className="py-2 font-medium">结果</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.code} className="border-t border-border">
                  <td className="py-2 pr-4 font-mono text-xs">{ev.code}</td>
                  <td className="py-2 pr-4">{ev.from}</td>
                  <td className="py-2 pr-4">{ev.to}</td>
                  <td className="py-2">{ev.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 rounded-xl bg-primary px-5 py-6 text-primary-foreground sm:px-8">
        <p className="text-xs tracking-[0.16em] uppercase opacity-80">一句话架构</p>
        <p className="mt-2 font-heading text-2xl leading-snug sm:text-3xl">
          用户只对小途说话。小途拆任务。专家读写同一块白板。出事安途接管。结束回响出证。
        </p>
      </div>
    </Section>
  );
}

function JourneySection() {
  return (
    <Section
      id="journeys"
      kicker="05 演示剧本"
      title="三分钟只演三条线，不演功能表。"
      desc="视频和答辩都按这条走：主路径证明完整，暴雨证明关联，商户证明文商旅的「商」不是空字。"
    >
      <JourneyTabs />
    </Section>
  );
}

function KnowledgeSection() {
  return (
    <Section
      id="knowledge"
      kicker="06 知识库"
      title="有效智能体 = 人设 + 边界 + 可溯源资料。"
      desc="智小途吃私有知识库。资料宁少而准。每条景点讲解、每家模拟商户都要写得出处或虚构声明，避免评委随口一问就穿帮。"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {knowledgePacks.map((pack) => (
          <Card key={pack.agent}>
            <CardHeader>
              <CardTitle>{pack.agent}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {pack.files.map((file) => (
                <Badge key={file} variant="outline" className="font-mono font-normal">
                  {file}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5 text-sm leading-7">
        <p className="font-medium">灌库纪律</p>
        <p className="mt-2 text-muted-foreground">
          共享一份《行程白板字段.md》给所有智能体，避免各岗对「预算」「槽位」理解不一致。
          安途的知识库必须写清：只做分诊和路径，不诊断、不开药、不替代 120。
          市井的 20 家商户全部标记「演示样本」，正式路演时口头说明。
        </p>
      </div>
    </Section>
  );
}

function ScoringSection() {
  return (
    <Section
      id="scoring"
      kicker="07 评分作战"
      title="按评委口径写作品，而不是按自己喜欢的技术写。"
      desc="赛道A公开侧重四件事。每一项都要在空间里找得到对应物，答辩才能指着屏幕说。"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {scoring.map((s) => (
          <Card key={s.axis}>
            <CardHeader>
              <CardTitle>{s.axis}</CardTitle>
              <CardDescription>{s.weight}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              {s.tactic}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function SprintSection() {
  return (
    <Section
      id="sprint"
      kicker="08 十三天排期"
      title="9月20日是墙，不是弹性日期。"
      desc="今天是创作窗口第一天。先把十二个壳建起来，再灌库，再打协同，最后才拍视频。顺序反了会来不及。"
    >
      <div className="relative space-y-4 border-l-2 border-primary/30 pl-6">
        {sprint.map((block) => (
          <div key={block.when} className="relative">
            <MapPin className="absolute -left-[33px] top-1 size-4 text-primary" />
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-xs tracking-wide text-primary">{block.when}</div>
              <h3 className="mt-1 font-heading text-xl">{block.title}</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {block.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SubmitSection() {
  return (
    <Section
      id="submit"
      kicker="09 提交清单"
      title="材料齐，空间才算参赛。"
      desc="官方必交项按赛道A整理。缺链接或空壳智能体会在有效性校验上直接失分。"
    >
      <div className="space-y-3">
        {submitItems.map((item) => (
          <div
            key={item.name}
            className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">{item.note}</div>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-8" />
      <p className="text-sm leading-7 text-muted-foreground">
        作品一句话简介建议直接用：
        <span className="text-foreground">
          「途见锦官：十二个智能体共用一块行程白板，服务来成都的游客，也服务接得住需求的商户。」
        </span>
      </p>
    </Section>
  );
}

function AltSection() {
  return (
    <Section
      id="alts"
      kicker="10 备选"
      title="如果必须换赛题，关联结构可以原样迁移。"
      desc="白板换成学生画像或项目看板，十二岗换皮即可。不要推翻协同模型。"
    >
      <div className="space-y-3">
        {alternatives.map((alt) => (
          <details
            key={alt.name}
            className="rounded-xl border border-border bg-card px-4 py-2 open:pb-4"
          >
            <summary className="cursor-pointer py-2 font-heading text-lg">
              {alt.name}
            </summary>
            <div className="space-y-2 pt-1 text-sm leading-7 text-muted-foreground">
              <p>{alt.summary}</p>
              <p>
                <span className="text-foreground">十二岗：</span>
                {alt.agents}
              </p>
              <p>
                <span className="text-foreground">何时切换：</span>
                {alt.when}
              </p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
