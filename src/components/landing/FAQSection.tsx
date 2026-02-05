"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "ORIGO คืออะไร และช่วยธุรกิจของผมได้อย่างไร?",
    answer: "ORIGO คือระบบตัดสินใจการค้าระหว่างประเทศที่ใช้ AI และ Market Intelligence ช่วยวิเคราะห์ตลาดที่เหมาะสมกับธุรกิจคุณมากที่สุด จาก 137 ประเทศทั่วโลก พร้อมให้กลยุทธ์การเข้าสู่ตลาดแบบ step-by-step เพื่อเพิ่มโอกาสความสำเร็จและลดความเสี่ยง",
  },
  {
    id: 2,
    question: "ใช้เวลานานแค่ไหนในการได้รับผลการวิเคราะห์?",
    answer: "ใช้เวลาเพียง 3 นาทีในการทำแบบทดสอบ และคุณจะได้รับผลการวิเคราะห์พร้อมคำแนะนำทันที โดยระบบจะวิเคราะห์ผลิตภัณฑ์ ความพร้อม และเป้าหมายของคุณ แล้วจับคู่กับข้อมูลตลาดนับล้าน data points เพื่อหาโอกาสที่ดีที่สุด",
  },
  {
    id: 3,
    question: "ต้องมีประสบการณ์ส่งออกก่อนหรือไม่?",
    answer: "ไม่จำเป็นครับ! ORIGO ออกแบบมาสำหรับทั้งผู้เริ่มต้นและผู้ประกอบการที่มีประสบการณ์ ระบบจะปรับคำแนะนำให้เหมาะกับระดับความพร้อมของคุณ พร้อมแนะนำขั้นตอนที่ชัดเจน ตั้งแต่การเตรียมสินค้า หาพันธมิตร ไปจนถึงการทำการตลาด",
  },
  {
    id: 4,
    question: "ข้อมูลที่ใช้วิเคราะห์มาจากไหน แม่นยำแค่ไหน?",
    answer: "เราใช้ข้อมูลจากแหล่งที่เชื่อถือได้หลายแหล่ง รวมถึง UN Comtrade, World Bank, กรมส่งเสริมการค้าระหว่างประเทศ และข้อมูลการค้าจริงจากพันธมิตรของเราใน 137 ประเทศ ข้อมูลทั้งหมดได้รับการอัพเดทอย่างต่อเนื่องและผ่านการตรวจสอบความถูกต้องจากทีมผู้เชี่ยวชาญ",
  },
  {
    id: 5,
    question: "มีค่าใช้จ่ายอย่างไร?",
    answer: "การทำแบบทดสอบและรับคำแนะนำเบื้องต้นฟรี 100% ไม่ต้องใช้บัตรเครดิต หากต้องการบริการเพิ่มเติม เช่น รายงานเชิงลึก การจับคู่ธุรกิจ หรือการให้คำปรึกษา เราจะมีแพ็คเกจที่เหมาะกับแต่ละระดับธุรกิจ สามารถปรึกษาทีมงานได้ตลอด",
  },
  {
    id: 6,
    question: "ORIGO แตกต่างจากที่ปรึกษาทั่วไปอย่างไร?",
    answer: "ORIGO ใช้ AI และ Big Data ในการวิเคราะห์ ทำให้ได้ผลเร็วกว่า ครอบคลุมมากกว่า และแม่นยำกว่าการวิเคราะห์แบบดั้งเดิม นอกจากนี้ คุณยังสามารถเข้าถึงข้อมูลได้ทุกเมื่อ ไม่ต้องรอนัดหมาย พร้อมอัพเดทข้อมูลแบบ real-time และมีเครือข่ายพันธมิตรใน 137 ประเทศรองรับ",
  },
  {
    id: 7,
    question: "ถ้าไม่พอใจกับตลาดที่แนะนำ จะทำอย่างไร?",
    answer: "คุณสามารถทำแบบทดสอบใหม่ได้ตลอดเวลา หรือปรับเงื่อนไขการค้นหา เช่น เปลี่ยนเป้าหมายมูลค่าการส่งออก หรือระบุภูมิภาคที่สนใจเฉพาะเจาะจง ระบบจะวิเคราะห์ใหม่และแนะนำทางเลือกอื่นๆ ที่เหมาะสม นอกจากนี้ ทีมงานของเรายินดีให้คำปรึกษาเพิ่มเติมฟรี",
  },
  {
    id: 8,
    question: "มีการสนับสนุนหลังการขายหรือไม่?",
    answer: "มีครับ! เรามีทีมผู้เชี่ยวชาญคอยให้คำปรึกษา ช่วยเหลือตลอดกระบวนการ ตั้งแต่การเตรียมเอกสาร หาพันธมิตร ไปจนถึงการทำการตลาดและการขาย คุณสามารถติดต่อเราผ่านทาง email, LINE, หรือโทรศัพท์ นอกจากนี้ยังมี Knowledge Base และ Webinar ฟรีเพื่อพัฒนาทักษะการส่งออก",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#050505] py-10 md:py-14 lg:py-20 relative overflow-hidden grid-pattern-dense">
      {/* Geometric Shapes */}
      <div className="absolute top-10 left-10 w-48 h-48 border border-[#FFB347]/10 rotate-12 rounded-lg animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-64 h-64 border-2 border-[#FFA500]/10 rounded-full animate-float" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            คำถาม<span className="gradient-text-premium">ที่พบบ่อย</span>
          </h2>
          <p className="text-white/70 font-body text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            คำตอบสำหรับคำถามที่ผู้ประกอบการมักถามเกี่ยวกับ ORIGO
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="glass-card rounded-xl overflow-hidden transition-smooth animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 md:px-8 py-6 flex items-start justify-between gap-4 text-left transition-smooth hover:bg-white/5 group"
              >
                <span className="text-white font-heading font-semibold text-lg md:text-xl leading-relaxed group-hover:text-[#FFB347] transition-smooth">
                  {faq.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-lg glass-strong flex items-center justify-center transition-all duration-300 ${openId === faq.id ? 'rotate-180 bg-[#FFB347]/20' : ''}`}>
                  {openId === faq.id ? (
                    <Minus className="w-5 h-5 text-[#FFB347]" />
                  ) : (
                    <Plus className="w-5 h-5 text-[#FFB347]" />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-6 pt-2">
                  <div className="border-t border-[#FFB347]/10 pt-4">
                    <p className="text-white/70 font-body leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Indicator */}
              {openId === faq.id && (
                <div className="h-1 w-full bg-gradient-to-r from-[#FFB347] via-[#FFA500] to-[#FFD700]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions? */}
        <div className="mt-8 md:mt-10 text-center glass-card p-5 md:p-7 rounded-2xl">
          <h3 className="text-2xl font-heading font-bold text-white mb-3">
            ยังมีคำถามอื่นๆ อีกไหม
          </h3>
          <p className="text-white/60 font-body mb-6">
            ทีมงานของเรายินดีตอบทุกคำถาม ติดต่อเราได้ตลอด 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@origo.com"
              className="px-6 py-3 rounded-full glass-strong border border-[#FFB347]/30 text-white font-heading font-semibold transition-smooth hover:scale-105 hover:border-[#FFB347]/50"
            >
              ส่งอีเมลหาเรา
            </a>
            <a
              href="/contact"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FFB347] to-[#FFA500] text-black font-heading font-bold transition-smooth hover:scale-105"
            >
              ติดต่อทีมขาย
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
