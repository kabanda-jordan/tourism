"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useToast } from "@/components/ui/toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast("success", "Message sent! We'll get back to you within 24 hours.");
    reset();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div>
            <h1 className="text-3xl font-bold text-heading">Get in Touch</h1>
            <p className="mt-3 text-body">
              Have a question? We&apos;d love to hear from you.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-heading">Phone</p>
                  <p className="text-sm text-muted">+250 788 123 456</p>
                  <p className="text-sm text-muted">+250 722 987 654</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-heading">Email</p>
                  <p className="text-sm text-muted">info@trekly.com</p>
                  <p className="text-sm text-muted">support@trekly.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-heading">Office</p>
                  <p className="text-sm text-muted">KG 7 Ave, Kigali Heights</p>
                  <p className="text-sm text-muted">Kigali, Rwanda</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-heading">Hours</p>
                  <p className="text-sm text-muted">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-sm text-muted">Sat: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Name" placeholder="Your name" error={errors.name?.message as string} {...register("name", { required: "Name is required" })} />
                <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message as string} {...register("email", { required: "Email is required" })} />
              </div>
              <Input label="Subject" placeholder="How can we help?" error={errors.subject?.message as string} {...register("subject", { required: "Subject is required" })} />
              <Textarea label="Message" placeholder="Tell us more..." error={errors.message?.message as string} {...register("message", { required: "Message is required" })} />
              <Button type="submit" loading={loading} size="lg">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
