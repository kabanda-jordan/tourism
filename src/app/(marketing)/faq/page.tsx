"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { cn } from "@/lib/utils";

const faqData = [
  { question: "How do I book a vehicle?", answer: "Browse our vehicles, select your dates, choose optional extras like insurance or a driver, and complete payment. You'll receive a confirmation email with your booking details." },
  { question: "What documents do I need?", answer: "You need a valid driver's license (international license recommended), a passport or national ID, and a credit/debit card for payment." },
  { question: "Can I cancel my booking?", answer: "Yes! Free cancellation up to 24 hours before your pickup time. Cancellations within 24 hours may incur a fee." },
  { question: "Is insurance included?", answer: "Basic insurance is included in all rentals. You can upgrade to comprehensive coverage for additional protection during checkout." },
  { question: "Do you offer driver services?", answer: "Yes, you can add a professional driver to any booking. Our drivers are licensed, experienced, and knowledgeable about Rwanda's roads and attractions." },
  { question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, mobile money (MTN MoMo, Airtel Money), and bank transfers." },
  { question: "Can I pick up the vehicle at the airport?", answer: "Yes! We offer airport pickup and drop-off at Kigali International Airport. Select this option during booking." },
  { question: "What happens if the vehicle breaks down?", answer: "All our vehicles are regularly maintained. If a breakdown occurs, we provide 24/7 roadside assistance and a replacement vehicle within 24 hours." },
  { question: "Can I drive to national parks?", answer: "Absolutely! Many of our vehicles are specifically equipped for park terrain. We recommend an SUV for parks like Volcanoes and Nyungwe." },
  { question: "Do I need a 4x4 for Rwanda?", answer: "While main roads are well-maintained, a 4x4 is recommended for national parks and rural areas. Most of our SUVs have 4WD capability." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="text-base font-medium text-heading pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-40 pb-4" : "max-h-0"
        )}
      >
        <p className="text-sm text-body leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold text-heading">Frequently Asked Questions</h1>
          <p className="mt-2 text-body">Everything you need to know about renting with Trekly</p>
        </div>
        <div className="mt-10 bg-card rounded-[16px] border border-gray-100 shadow-sm px-6">
          {faqData.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
}
