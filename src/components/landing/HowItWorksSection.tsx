import { BarChart3, Brain, Bot, Signal, LayoutDashboard, Lightbulb, BookOpen, Compass, Cpu, Workflow, Crosshair } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface ServiceItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  keyValues: { icon: LucideIcon; text: string }[];
  gradient: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    icon: BarChart3,
    title: "Market Intelligence Platform",
    description: "Access real-time market intelligence and operational insights in one place.",
    detail: "Origo replaces fragmented spreadsheets and delayed reports with a unified platform designed for international suppliers and manufacturers.",
    keyValues: [
      { icon: Signal, text: "Real-time market signals" },
      { icon: LayoutDashboard, text: "Operational dashboards" },
      { icon: Lightbulb, text: "Clear business insights" },
    ],
    gradient: "from-[#FFB347] to-[#FFA500]",
  },
  {
    id: 2,
    icon: Brain,
    title: "Business Intelligence Structuring",
    description: "Every company holds its own internal intelligence — shaped by experience, culture, and resources.",
    detail: "Origo helps structure this knowledge into a system that supports better decision-making.",
    keyValues: [
      { icon: BookOpen, text: "Organize internal business knowledge" },
      { icon: Compass, text: "Turn experience into structured insights" },
      { icon: Lightbulb, text: "Build a clearer strategic perspective" },
    ],
    gradient: "from-[#FFA500] to-[#FFD700]",
  },
  {
    id: 3,
    icon: Bot,
    title: "AI Decision Support",
    description: "Origo uses AI and automation to handle operational complexity.",
    detail: "Allowing leaders to focus on relationships, trust, and long-term strategic decisions.",
    keyValues: [
      { icon: Cpu, text: "AI-assisted analysis" },
      { icon: Workflow, text: "Process automation" },
      { icon: Crosshair, text: "Strategic decision support" },
    ],
    gradient: "from-[#FFD700] to-[#FFB347]",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-[#050505] py-20 md:py-32 relative overflow-hidden dot-pattern">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#FFB347] rounded-full opacity-5 blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-20 right-10 w-64 h-64 border border-[#FFB347]/10 rotate-45 rounded-lg animate-float-slow" />
      <div className="absolute bottom-20 left-10 w-48 h-48 border-2 border-[#FFA500]/10 rounded-full animate-float" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            How It <span className="gradient-text-premium">Works</span>
          </h2>
          <p className="text-white/70 font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Three integrated layers designed to give you clarity, structure, and strategic advantage.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="relative animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="glass-card rounded-2xl p-8 md:p-9 h-full flex flex-col transition-smooth hover:scale-[1.02] relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFB347]/0 to-[#FFA500]/0 group-hover:from-[#FFB347]/[0.04] group-hover:to-[#FFA500]/[0.04] transition-smooth pointer-events-none" />

                {/* Step number + Icon */}
                <div className="flex items-center justify-between mb-7 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-white/25 tracking-wider">0{service.id}</span>
                    <div className="h-px w-8 bg-white/10" />
                  </div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-px transition-smooth group-hover:scale-110 group-hover:rotate-3`}>
                    <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-[#FFB347]" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-[#FFB347] transition-smooth relative z-10">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 font-body text-sm leading-relaxed mb-2 relative z-10">
                  {service.description}
                </p>
                <p className="text-white/45 font-body text-sm leading-relaxed mb-7 relative z-10">
                  {service.detail}
                </p>

                {/* Key Values */}
                <div className="mt-auto space-y-3 relative z-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFB347]/70">
                    Key Value
                  </span>
                  {service.keyValues.map((kv, i) => (
                    <div key={i} className="flex items-center gap-3 group/item">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover/item:border-[#FFB347]/20 transition-smooth">
                        <kv.icon className="w-4 h-4 text-[#FFB347]/70" />
                      </div>
                      <span className="text-sm text-white/60 group-hover/item:text-white/80 transition-smooth">
                        {kv.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/50 font-mono text-sm">
            เริ่มต้นได้ทันที • ไม่มีค่าใช้จ่าย • ไม่ต้องลงทะเบียน
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent" />
    </section>
  );
}
