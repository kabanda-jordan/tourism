import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Trekly",
  description: "How Trekly collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect information you provide directly: name, email address, phone number, payment details, driver's license information, and travel preferences. We also automatically collect device information, IP address, browser type, and usage data when you use our platform.",
  },
  {
    title: "2. How We Use Your Information",
    content: "We use your information to process bookings, communicate about reservations, provide customer support, improve our services, send promotional communications (with your consent), detect and prevent fraud, and comply with legal obligations.",
  },
  {
    title: "3. Information Sharing",
    content: "We share your information with vehicle rental companies to fulfill bookings, payment processors (Flutterwave) to handle transactions, and service providers who assist in platform operations. We do not sell your personal information to third parties.",
  },
  {
    title: "4. Data Security",
    content: "We implement industry-standard security measures including SSL encryption, secure database storage, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security of your data.",
  },
  {
    title: "5. Cookies and Tracking",
    content: "We use cookies and similar technologies to maintain your session, remember your preferences, and analyze platform usage. You can control cookie settings through your browser preferences. Essential cookies required for platform functionality cannot be disabled.",
  },
  {
    title: "6. Data Retention",
    content: "We retain your personal information for as long as your account is active or as needed to provide services. Booking records are retained for 7 years for legal and accounting purposes. You may request deletion of your account and personal data.",
  },
  {
    title: "7. Your Rights",
    content: "You have the right to access, correct, or delete your personal data. You can request a copy of your data, opt out of marketing communications, and update your account information at any time through your profile settings or by contacting us.",
  },
  {
    title: "8. Children's Privacy",
    content: "Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly.",
  },
  {
    title: "9. International Transfers",
    content: "Your data may be processed in countries outside Rwanda where our service providers operate. We ensure appropriate safeguards are in place to protect your information during international transfers.",
  },
  {
    title: "10. Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our platform or sending you an email. Your continued use of the Service after changes are posted constitutes acceptance.",
  },
  {
    title: "11. Contact Us",
    content: "For questions about this Privacy Policy or to exercise your data rights, contact our Data Protection Officer at privacy@trekly.rw or through our contact page.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-heading">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted">Last updated: July 2026</p>
        </div>

        <div className="mt-8 bg-card rounded-[16px] border border-gray-100 shadow-sm px-6 py-8 sm:px-8">
          <p className="text-sm text-body leading-relaxed mb-6">
            At Trekly, we are committed to protecting your privacy and personal information.
            This Privacy Policy explains how we collect, use, share, and safeguard your data
            when you use our vehicle hiring platform.
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
