import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agents } from "@/data/plan";

const layerColor: Record<string, string> = {
  调度层: "bg-primary/10 text-primary",
  文: "bg-sky-100 text-sky-900",
  商: "bg-amber-100 text-amber-900",
  旅: "bg-emerald-100 text-emerald-900",
  保障层: "bg-stone-200 text-stone-800",
  进化层: "bg-violet-100 text-violet-900",
};

export function AgentMatrix() {
  return (
    <div className="agent-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="mb-3 text-sm text-muted-foreground">
          点选岗位查看人设、输入输出和呼叫关系。
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {agents.map((agent, index) => (
            <label
              key={agent.id}
              htmlFor={`pick-${agent.id}`}
              className="min-h-[5.5rem] cursor-pointer rounded-xl border border-border bg-card/70 p-3 text-left has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:shadow-md"
            >
              <input
                type="radio"
                name="agent-matrix"
                id={`pick-${agent.id}`}
                defaultChecked={index === 0}
                className="sr-only"
              />
              <div className="text-[11px] opacity-70">{agent.no}</div>
              <div className="font-heading text-base">{agent.name}</div>
              <div className="mt-1 text-xs opacity-80">{agent.role}</div>
            </label>
          ))}
        </div>
      </div>

      <div>
        {agents.map((agent) => {
          const callers = agents.filter(
            (a) => a.calls.includes(agent.id) && a.id !== agent.id
          );
          const callees = agents.filter((a) => agent.calls.includes(a.id));
          return (
            <Card
              key={agent.id}
              id={`panel-${agent.id}`}
              className="agent-panel bg-card"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="font-heading text-2xl">
                    {agent.no} {agent.name}
                  </CardTitle>
                  <Badge className={layerColor[agent.layer]} variant="secondary">
                    {agent.layer}
                  </Badge>
                </div>
                <CardDescription>
                  {agent.role} · {agent.persona}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7">
                <p className="rounded-lg bg-muted px-3 py-2 text-foreground/90">
                  「{agent.greeting}」
                </p>
                <Block title="听什么" items={agent.inputs} />
                <Block title="交出什么" items={agent.outputs} />
                <Block title="知识库" items={agent.knowledge} />
                <div>
                  <div className="mb-1 text-xs font-medium tracking-wide text-muted-foreground">
                    协同关系
                  </div>
                  <p>会呼叫：{callees.map((a) => a.name).join("、") || "—"}</p>
                  <p>
                    会被谁叫：
                    {callers.map((a) => a.name).join("、") || "完成后回传总调度"}
                  </p>
                </div>
                <p className="border-l-2 border-primary pl-3 text-foreground">
                  必做：{agent.mustHave}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-1 text-xs font-medium tracking-wide text-muted-foreground">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge key={item} variant="outline" className="font-normal">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
