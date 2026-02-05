import {
  Globe,
  Brain,
  Users,
  BarChart3,
  Shield,
  Zap,
  Database,
  HeartHandshake,
  FileText,
} from "lucide-react";
import { CountUp, ScrollReveal } from "@/components/ui/animated";

const features = [
  {
    id: 1,
    icon: Globe,
    title: "137 ประเทศทั่วโลก",
    description: "วิเคราะห์โอกาสการส่งออกครอบคลุมทุกตลาดหลัก พร้อมข้อมูล real-time",
    color: "from-[#FFB347] to-[#FFA500]",
  },
  {
    id: 2,
    icon: Brain,
    title: "AI-Powered Analytics",
    description: "ระบบ AI วิเคราะห์ข้อมูลนับล้าน data points หาตลาดที่เหมาะกับคุณที่สุด",
    color: "from-[#FFA500] to-[#FFD700]",
  },
  {
    id: 3,
    icon: Users,
    title: "เครือข่าย 70K+ พาร์ตเนอร์",
    description: "เชื่อมต่อกับผู้นำเข้า distributors และพันธมิตรทางธุรกิจทั่วโลก",
    color: "from-[#FFD700] to-[#FFA500]",
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Market Intelligence",
    description: "รายงานตลาด competitor analysis และ demand forecasting แบบ real-time",
    color: "from-[#FFA500] to-[#FFB347]",
  },
  {
    id: 5,
    icon: Shield,
    title: "Risk Assessment",
    description: "ประเมินความเสี่ยงทางการเงิน การเมือง และกฎระเบียบของแต่ละตลาด",
    color: "from-[#FFB347] to-[#FFD700]",
  },
  {
    id: 6,
    icon: Zap,
    title: "ผลลัพธ์ภายใน 3 นาที",
    description: "ได้คำแนะนำทันที ไม่ต้องรอหลายวัน พร้อม actionable insights",
    color: "from-[#FFD700] to-[#FFB347]",
  },
  {
    id: 7,
    icon: Database,
    title: "18 ปีข้อมูลการค้า",
    description: "ฐานข้อมูลการค้าระหว่างประเทศที่ใหญ่ที่สุดในไทย อัพเดทอย่างต่อเนื่อง",
    color: "from-[#FFB347] to-[#FFA500]",
  },
  {
    id: 8,
    icon: HeartHandshake,
    title: "Export Matching",
    description: "จับคู่ธุรกิจอัจฉริยะ เชื่อมต่อคุณกับผู้ซื้อที่ตรงกับความต้องการ",
    color: "from-[#FFA500] to-[#FFD700]",
  },
  {
    id: 9,
    icon: FileText,
    title: "Custom Reports",
    description: "รายงานเชิงลึกสำหรับอุตสาหกรรมและตลาดเฉพาะ ปรับให้เหมาะกับธุรกิจคุณ",
    color: "from-[#FFD700] to-[#FFA500]",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-[#0F0F0F] py-20 md:py-32 relative overflow-hidden grid-pattern-dense">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FFB347] rounded-full opacity-5 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FFA500] rounded-full opacity-5 blur-[150px]" />

      {/* Geometric Decorations */}
      <div className="absolute top-40 right-20 w-32 h-32 border-2 border-[#FFB347]/10 rotate-12 rounded-lg animate-float-slow" />
      <div className="absolute bottom-40 left-20 w-40 h-40 border border-[#FFA500]/10 rounded-full animate-float" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              Platform Features
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            เครื่องมือครบครัน<span className="gradient-text-premium">สำหรับการส่งออก</span>
          </h2>
          <p className="text-white/70 font-body text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            ทุกสิ่งที่คุณต้องการเพื่อขยายธุรกิจสู่ตลาดโลก ในที่เดียว
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="glass-card p-8 rounded-2xl transition-smooth hover:scale-105 card-tilt shadow-glow group animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Icon Container */}
              <div className="mb-6 relative">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 transition-smooth group-hover:scale-110 group-hover:rotate-6`}>
                  <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-[#FFB347] transition-smooth group-hover:scale-110" />
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-smooth`}></div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:gradient-text transition-smooth">
                {feature.title}
              </h3>
              <p className="text-white/60 font-body text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.color} group-hover:w-full transition-all duration-500`}></div>

              {/* Scan Line Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB347]/5 to-transparent scan-line"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Countries", value: 137, suffix: "+" },
            { label: "Partners", value: 70, suffix: "K+" },
            { label: "Data Points", value: 10, suffix: "M+" },
            { label: "Success Rate", value: 94, suffix: "%" },
          ].map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              direction="up"
              delay={0.5 + index * 0.1}
            >
              <div className="text-center glass-card p-6 rounded-xl transition-smooth hover:scale-105">
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text-premium neon-glow mb-2 data-counter">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2000} separator />
                </div>
                <div className="text-white/60 font-body text-sm">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
