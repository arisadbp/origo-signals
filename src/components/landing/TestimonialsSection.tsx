import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "ก่อนทำงานกับ Origo เราใช้เวลาส่วนใหญ่ไปกับการลองผิดลองถูกมาหลายปี ทีมช่วยวางภาพการขายให้ชัดขึ้นมาก",
    author: "CEO - Manufacturing Company",
    industry: "Manufacturing"
  },
  {
    id: 2,
    quote: "ทำให้เราเห็นชัดเลยว่า ควรโฟกัสตลาดไหน และลูกค้าแบบไหน จากเดิมที่คิดว่าต้องทำทุกอย่าง",
    author: "Founder - Tech Startup",
    industry: "Technology"
  },
  {
    id: 3,
    quote: "เราเลิกเสียเวลากับตลาดเดิมๆ และเริ่มเห็นผลลัพธ์จากลูกค้าที่ 'ทำให้เราโต' จริงๆ",
    author: "Marketing Director - E-commerce",
    industry: "Retail"
  },
  {
    id: 4,
    quote: "จากเดิมที่ต้องลุยทุกตลาด ตอนนี้เราโฟกัสแค่ 3 ประเทศที่ให้ผลตอบแทนสูงสุด รายได้เพิ่ม 2 เท่าในปีแรก",
    author: "Export Manager - FMCG",
    industry: "Consumer Goods"
  },
  {
    id: 5,
    quote: "การวิเคราะห์ Market Signal ช่วยให้เราตัดสินใจเข้าตลาดใหม่ได้อย่างมั่นใจ ลดความเสี่ยงลงไปเยอะ",
    author: "Business Development Lead",
    industry: "B2B Services"
  },
  {
    id: 6,
    quote: "สต็อกที่เคยค้างเป็นปัญหา ตอนนี้เราวางแผนการผลิตตามดีมานด์จริง ต้นทุนลดลง 30%",
    author: "COO - Trading Company",
    industry: "International Trade"
  }
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#050505] py-10 md:py-14 lg:py-20 relative overflow-hidden dot-pattern">
      {/* Subtle glow effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FFB347] rounded-full opacity-5 blur-[120px]" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#FFA500] rounded-full opacity-5 blur-[120px]" />

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-[#FFB347]/10 rounded-full animate-float-slow" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Headline */}
        <div className="text-center mb-4 md:mb-6 lg:mb-8 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            ผลลัพธ์จาก<span className="gradient-text-premium">ลูกค้า</span>
          </h2>
          <p className="text-white/50 font-body text-sm">
            (อ้างอิงจากกรณีจริง ขอสงวนสิทธิไม่เปิดเผยชื่อ)
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mt-6 md:mt-8 lg:mt-10">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="glass-card p-6 rounded-xl relative transition-smooth hover:scale-105 shadow-glow group card-tilt animate-fade-in-up h-full flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20 transition-smooth group-hover:opacity-40 group-hover:scale-110">
                <Quote className="w-10 h-10 text-[#FFB347]" />
              </div>

              {/* Quote Text */}
              <p className="text-white/90 font-body text-base md:text-lg leading-relaxed relative z-10 flex-1 mb-4">
                "{testimonial.quote}"
              </p>

              {/* Author & Industry */}
              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-white/70 font-body text-sm font-semibold">
                  {testimonial.author}
                </p>
                <p className="text-[#FFB347]/70 font-body text-xs mt-1">
                  {testimonial.industry}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
