"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { categories } from "@/lib/products";

export const whatsappLink = (text = "") =>
  `https://wa.me/${company.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;


const inputClass =
  "h-[46px] w-full rounded-[10px] border border-[#d7e2f0] bg-white px-4 text-[13px] font-medium text-[#17294b] outline-none transition-all placeholder:text-[#9aa6b8] focus:border-[#6da4f5] focus:ring-4 focus:ring-[#0866f5]/[0.08]";
const labelClass = "mb-1.5 block text-[11px] font-bold text-[#34435d]";

const interests = categories.filter((c) => c.id !== "all").map((c) => c.label);


export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    interest: interests[0],
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(values.phone.trim()))
      next.phone = "Enter a valid phone number.";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (values.message.trim().length < 10)
      next.message = "Tell us a little more (at least 10 characters).";
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const text = [
      "New enquiry from the website",
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      values.email.trim() && `Email: ${values.email.trim()}`,
      `Interested in: ${values.interest}`,
      `Message: ${values.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const error = (field) =>
    errors[field] && (
      <p
        id={`${field}-error`}
        className="mt-1 text-[11px] font-semibold text-[#d33a3a]"
      >
        {errors[field]}
      </p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[18px] border border-[#dce6f2] bg-white p-6 shadow-[0_5px_20px_rgba(20,55,100,0.035)] sm:p-8"
    >
      <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[#102044]">
        Send us an enquiry
      </h2>
      <p className="mt-1 text-[12px] text-[#687792]">
        Share your requirement and our team will get back to you with the right
        machine and a quote.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name *
          </label>
          <input
            id="name"
            value={values.name}
            onChange={update("name")}
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
          {error("name")}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number *
          </label>
          <input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={update("phone")}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass}
          />
          {error("phone")}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email (optional)
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={update("email")}
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          {error("email")}
        </div>
        <div>
          <label htmlFor="interest" className={labelClass}>
            I&apos;m interested in
          </label>
          <select
            id="interest"
            value={values.interest}
            onChange={update("interest")}
            className={`${inputClass} appearance-none`}
          >
            {interests.map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Your requirement *
          </label>
          <textarea
            id="message"
            rows={5}
            value={values.message}
            onChange={update("message")}
            placeholder="Material, thickness, daily output, budget..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputClass} h-auto resize-y py-3`}
          />
          {error("message")}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] bg-[#0866f5] px-6 text-[13px] font-bold text-white transition-colors hover:bg-[#0754d2]"
        >
          <Send size={15} /> Send Enquiry
        </button>
        <p className="text-[11px] text-[#8793a7]">
          Your enquiry opens in WhatsApp, ready to send.
        </p>
      </div>

      {sent && (
        <p
          role="status"
          className="mt-4 flex items-start gap-2 rounded-[10px] bg-[#eaf2ff] px-4 py-3 text-[12px] font-semibold text-[#075bd5]"
        >
          <MessageCircle size={16} className="mt-px shrink-0" />
          WhatsApp should have opened with your enquiry. Press send there to
          reach our team.
        </p>
      )}
    </form>
  );
}