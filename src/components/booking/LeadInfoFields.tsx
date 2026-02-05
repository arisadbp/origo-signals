"use client";

import { useState } from "react";
import { COPY } from "@/lib/copy";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = {
  name: string;
  company: string;
  position: string;
  employeeCount: string;
  industry: string;
  phone: string;
  email: string;
};

type LeadInfoFieldsProps = {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors?: Partial<Record<keyof FormData, string>>;
  onErrorClear?: (field: keyof FormData) => void;
};

export function LeadInfoFields({
  formData,
  onChange,
  errors = {},
  onErrorClear,
}: LeadInfoFieldsProps) {
  const step3 = COPY.quiz.steps[3];
  const step4 = COPY.quiz.steps[4];
  const step5 = COPY.quiz.steps[5];

  const handleChange = (field: keyof FormData, value: string) => {
    onChange(field, value);
    if (errors[field] && onErrorClear) {
      onErrorClear(field);
    }
  };

  return (
    <FieldGroup className="gap-5">
      {/* Full Name */}
      <Field>
        <FieldLabel htmlFor="fullname" className="text-white/70 text-sm">
          ชื่อ-นามสกุล <span className="text-[#FFB347]">*</span>
        </FieldLabel>
        <input
          id="fullname"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FFB347]/60 focus:outline-none focus:ring-2 focus:ring-[#FFB347]/20 transition-smooth"
          placeholder="เช่น กฤติน ทิพย์"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          maxLength={120}
        />
        {errors.name && <FieldError>{errors.name}</FieldError>}
      </Field>

      {/* Company Name */}
      <Field>
        <FieldLabel htmlFor="company" className="text-white/70 text-sm">
          ชื่อบริษัท <span className="text-[#FFB347]">*</span>
        </FieldLabel>
        <input
          id="company"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FFB347]/60 focus:outline-none focus:ring-2 focus:ring-[#FFB347]/20 transition-smooth"
          placeholder="เช่น Origo Co., Ltd."
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          maxLength={160}
        />
        {errors.company && <FieldError>{errors.company}</FieldError>}
      </Field>

      {/* Position */}
      <Field>
        <FieldLabel htmlFor="position" className="text-white/70 text-sm">
          ตำแหน่ง <span className="text-[#FFB347]">*</span>
        </FieldLabel>
        {"options" in step3 && (
          <Select
            value={formData.position}
            onValueChange={(value) => handleChange("position", value)}
            required
          >
            <SelectTrigger
              id="position"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-base text-white outline-none ring-[#FFB347] focus:ring-2"
            >
              <SelectValue placeholder="เลือกตำแหน่ง" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/15 text-white">
              {step3.options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="hover:bg-white/10 focus:bg-white/10"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.position && <FieldError>{errors.position}</FieldError>}
      </Field>

      {/* Employee Count */}
      <Field>
        <FieldLabel htmlFor="employee-count" className="text-white/70 text-sm">
          จำนวนพนักงาน <span className="text-[#FFB347]">*</span>
        </FieldLabel>
        {"options" in step4 && (
          <Select
            value={formData.employeeCount}
            onValueChange={(value) => handleChange("employeeCount", value)}
            required
          >
            <SelectTrigger
              id="employee-count"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-base text-white outline-none ring-[#FFB347] focus:ring-2"
            >
              <SelectValue placeholder="เลือกจำนวนพนักงาน" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/15 text-white">
              {step4.options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="hover:bg-white/10 focus:bg-white/10"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.employeeCount && (
          <FieldError>{errors.employeeCount}</FieldError>
        )}
      </Field>

      {/* Industry */}
      <Field>
        <FieldLabel htmlFor="industry" className="text-white/70 text-sm">
          อุตสาหกรรม <span className="text-[#FFB347]">*</span>
        </FieldLabel>
        {"options" in step5 && (
          <Select
            value={formData.industry}
            onValueChange={(value) => handleChange("industry", value)}
            required
          >
            <SelectTrigger
              id="industry"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-base text-white outline-none ring-[#FFB347] focus:ring-2"
            >
              <SelectValue placeholder="เลือกอุตสาหกรรม" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/15 text-white max-h-[300px]">
              {step5.options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="hover:bg-white/10 focus:bg-white/10"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.industry && <FieldError>{errors.industry}</FieldError>}
      </Field>

      {/* Phone (Optional) */}
      <Field>
        <FieldLabel htmlFor="phone" className="text-white/70 text-sm">
          เบอร์ติดต่อ <span className="text-white/50 text-sm">(ไม่บังคับ)</span>
        </FieldLabel>
        <input
          id="phone"
          type="tel"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FFB347]/60 focus:outline-none focus:ring-2 focus:ring-[#FFB347]/20 transition-smooth"
          placeholder="08X-XXX-XXXX"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          maxLength={20}
          pattern="[0-9+()\\-\\s]{6,20}"
        />
        {errors.phone && <FieldError>{errors.phone}</FieldError>}
      </Field>

      {/* Email */}
      <Field>
        <FieldLabel htmlFor="email" className="text-white/70 text-sm">
          อีเมล <span className="text-[#FFB347]">*</span>
        </FieldLabel>
        <input
          id="email"
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FFB347]/60 focus:outline-none focus:ring-2 focus:ring-[#FFB347]/20 transition-smooth"
          placeholder="name@company.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          maxLength={160}
        />
        {errors.email && <FieldError>{errors.email}</FieldError>}
      </Field>
    </FieldGroup>
  );
}
