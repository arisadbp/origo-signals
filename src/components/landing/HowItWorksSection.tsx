import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "วิเคราะห์ธุรกิจ",
    description: "ทำแบบทดสอบ 3 นาที ระบบจะวิเคราะห์ผลิตภัณฑ์ ความพร้อม และเป้าหมายของคุณ",
    gradient: "from-[#FFB347] to-[#FFA500]",
  },
  {
    id: 2,
    icon: Target,
    title: "ค้นหาตลาด",
    description: "AI วิเคราะห์ 137 ประเทศ หาตลาดที่เหมาะสมที่สุด พร้อมข้อมูล demand และคู่แข่ง",
    gradient: "from-[#FFA500] to-[#FFD700]",
  },
  {
    id: 3,
    icon: Rocket,
    title: "รับกลยุทธ์",
    description: "ได้แผนเข้าสู่ตลาดแบบ step-by-step พร้อมช่องทางหาลูกค้าและพันธมิตร",
    gradient: "from-[#FFD700] to-[#FFA500]",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "เติบโตอย่างยั่งยืน",
    description: "ติดตามผลและปรับกลยุทธ์ตามข้อมูลจริง เพิ่ม ROI อย่างต่อเนื่อง",
    gradient: "from-[#FFA500] to-[#FFB347]",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-[#050505] py-20 md:py-32 relative overflow-hidden dot-pattern">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#FFB347] rounded-full opacity-5 blur-[150px] -translate-x-1/2 -translate-y-1/2" />

      {/* Geometric Shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 border border-[#FFB347]/10 rotate-45 rounded-lg animate-float-slow" />
      <div className="absolute bottom-20 left-10 w-48 h-48 border-2 border-[#FFA500]/10 rounded-full animate-float" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            เริ่มต้นขยายตลาด<span className="gradient-text-premium"> 4 ขั้นตอน</span>
          </h2>
          <p className="text-white/70 font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            จากการวิเคราะห์สู่การเติบโตจริง ภายใน 3 นาที
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connection Line - Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#FFB347]/50 to-transparent -z-10"></div>
              )}

              {/* Card */}
              <div className="glass-card p-8 rounded-2xl transition-smooth hover:scale-105 card-tilt h-full">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full glass-strong flex items-center justify-center border border-[#FFB347]/30">
                    <span className="font-mono font-bold gradient-text-premium text-xl data-counter">
                      {step.id}
                    </span>
                  </div>

                  {/* Animated Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} p-0.5 transition-smooth group-hover:scale-110 group-hover:rotate-6`}>
                    <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-[#FFB347]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-[#FFB347] transition-smooth">
                  {step.title}
                </h3>
                <p className="text-white/60 font-body text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFB347]/0 to-[#FFA500]/0 group-hover:from-[#FFB347]/5 group-hover:to-[#FFA500]/5 transition-smooth pointer-events-none"></div>
              </div>

              {/* Connection Arrow - Mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-4">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-[#FFB347]/50 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/50 font-mono text-sm mb-4">
            เริ่มต้นได้ทันที • ไม่มีค่าใช้จ่าย • ไม่ต้องลงทะเบียน
          </p>
        </div>
      </div>

      {/* Bottom Scan Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
    </section>
  );
}
