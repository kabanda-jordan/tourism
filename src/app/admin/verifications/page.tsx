"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Clock, Eye, Building, Car, User, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const verifications = [
  { id: "1", type: "company", name: "Safari Express Ltd", email: "info@safariexpress.rw", submitted: "2 hours ago", documents: ["Business License", "Insurance Certificate", "Tax Clearance"], status: "pending" },
  { id: "2", type: "vehicle", name: "Toyota Land Cruiser 2024", company: "Rwanda Car Rentals", submitted: "5 hours ago", documents: ["Registration", "Inspection Report", "Photos"], status: "pending" },
  { id: "3", type: "driver", name: "Emmanuel Habimana", email: "emmanuel@example.com", submitted: "1 day ago", documents: ["Driver License", "National ID", "Criminal Record Check"], status: "pending" },
  { id: "4", type: "company", name: "Kigali Premium Cars", email: "info@kigalicars.com", submitted: "3 days ago", documents: ["Business License", "Insurance"], status: "approved" },
];

const typeIcons: Record<string, typeof Building> = { company: Building, vehicle: Car, driver: User };
const typeColors: Record<string, string> = { company: "bg-secondary/10 text-secondary", vehicle: "bg-primary/10 text-primary", driver: "bg-success/10 text-success" };

export default function AdminVerificationsPage() {
  const [tab, setTab] = useState<"pending" | "approved" | "rejected">("pending");
  const filtered = verifications.filter((v) => v.status === tab);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Verifications" }]} />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Verifications</h1>
          <span className="text-sm text-warning font-medium">{verifications.filter((v) => v.status === "pending").length} pending</span>
        </div>

        <div className="mt-4 flex gap-2">
          {(["pending", "approved", "rejected"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn("px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors", tab === t ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
              {t} {t === "pending" && `(${verifications.filter((v) => v.status === "pending").length})`}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {filtered.map((v) => {
            const Icon = typeIcons[v.type];
            return (
              <div key={v.id} className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", typeColors[v.type])}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-heading">{v.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${typeColors[v.type]}`}>{v.type}</span>
                    </div>
                    <p className="text-sm text-muted">{v.email} · Submitted {v.submitted}</p>
                    <div className="mt-3">
                      <p className="text-xs text-muted mb-1">Documents submitted:</p>
                      <div className="flex flex-wrap gap-2">
                        {v.documents.map((d) => (
                          <span key={d} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {v.status === "pending" && (
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                  {v.status === "approved" && (
                    <span className="text-xs px-3 py-1 rounded-full bg-success/10 text-success font-medium">Approved</span>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="mt-2 text-sm text-muted">No {tab} verifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
