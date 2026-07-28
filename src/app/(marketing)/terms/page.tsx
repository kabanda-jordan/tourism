import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service | Trekly",
  description: "Terms and conditions for using the Trekly vehicle hiring platform in Rwanda.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using the Trekly platform (the \"Service\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. These terms apply to all users of the Service, including browsers, customers, merchants, and contributors of content.",
  },
  {
    title: "2. Eligibility",
    content: "You must be at least 18 years of age to use the Service. By using the Service, you represent and warrant that you have the legal capacity to enter into a binding agreement. Drivers must possess a valid driver's license recognized in Rwanda.",
  },
  {
    title: "3. Account Registration",
    content: "To book a vehicle, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "4. Booking and Rentals",
    content: "All bookings are subject to vehicle availability. A booking is confirmed only upon successful payment. Rental periods begin and end at the times specified in your confirmation. Early returns do not qualify for refunds. Late returns may incur additional charges at the daily rate.",
  },
  {
    title: "5. Pricing and Payment",
    content: "All prices are displayed in Rwandan Francs (RWF) and include applicable taxes unless stated otherwise. Payment is processed through our secure payment partners (Flutterwave). We accept credit/debit cards and mobile money. Prices may change without notice but confirmed bookings are honored at the booked rate.",
  },
  {
    title: "6. Cancellation Policy",
    content: "Free cancellation is available up to 24 hours before the scheduled pickup time. Cancellations within 24 hours may incur a fee of up to 50% of the rental cost. No-shows are charged the full rental amount. Trekly reserves the right to cancel bookings due to unforeseen circumstances, with a full refund provided.",
  },
  {
    title: "7. Insurance and Liability",
    content: "Basic insurance coverage is included with every rental. Comprehensive insurance is available as an upgrade. You are liable for any damage not covered by insurance, including tire damage, interior damage, and damage from off-road use. A security deposit may be required at pickup.",
  },
  {
    title: "8. Driver Responsibilities",
    content: "You must operate the vehicle in accordance with Rwandan traffic laws. The vehicle must not be used for illegal activities, racing, towing, or off-road driving unless explicitly permitted. Smoking in vehicles is prohibited. All drivers must be registered and licensed.",
  },
  {
    title: "9. Vehicle Condition",
    content: "All vehicles are inspected before and after each rental. Pre-existing damage is documented. You are responsible for returning the vehicle in the same condition, subject to normal wear and tear. Cleaning fees may apply for excessively dirty returns.",
  },
  {
    title: "10. User Content",
    content: "Reviews, ratings, and other content you submit must be truthful and not defamatory. Trekly reserves the right to remove content that violates these terms or is otherwise objectionable. By submitting content, you grant Trekly a non-exclusive license to use, display, and distribute it.",
  },
  {
    title: "11. Limitation of Liability",
    content: "Trekly acts as an intermediary between customers and vehicle providers. We are not liable for any indirect, incidental, or consequential damages arising from the use of our Service or the rented vehicles. Our total liability shall not exceed the amount paid for the booking.",
  },
  {
    title: "12. Modifications to Terms",
    content: "Trekly reserves the right to modify these terms at any time. Changes take effect upon posting to the Service. Your continued use of the Service after changes constitutes acceptance of the modified terms.",
  },
  {
    title: "13. Contact",
    content: "For questions about these Terms of Service, please contact us at support@trekly.rw or through our contact page.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-heading">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted">Last updated: July 2026</p>
        </div>

        <div className="mt-8 bg-card rounded-[16px] border border-gray-100 shadow-sm px-6 py-8 sm:px-8">
          <p className="text-sm text-body leading-relaxed mb-6">
            Welcome to Trekly. These Terms of Service govern your use of our vehicle hiring
            and reservation platform. Please read them carefully before using our services.
          </p>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-base font-semibold text-heading mb-2">{section.title}</h2>
                <p className="text-sm text-body leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
