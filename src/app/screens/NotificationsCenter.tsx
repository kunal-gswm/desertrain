import { useState } from "react";
import {
  Package, AlertTriangle, Truck, Tag, Info, AlertCircle, X, Settings, Bell,
} from "lucide-react";
import type { Screen } from "../../types";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Btn } from "../components/shared/Btn";

export function NotificationsCenter({ onNav }: { onNav: (s: Screen) => void }) {
  const [filter, setFilter] = useState("all");
  const [settingsView, setSettingsView] = useState(false);

  const notifs = [
    { id: 1, type: "order", icon: Package, title: "Order ORD-10042 has shipped", time: "2 hours ago", read: false, body: "Your order of 3 items is on its way via DHL Ground. Tracking: 1Z2345ABCD6789000" },
    { id: 2, type: "stock", icon: AlertTriangle, title: "Low stock alert: LSP Bag Valve Mask", time: "5 hours ago", read: false, body: "SKU LSP-BVM-ADULT is out of stock. 0 units remaining. Create a purchase order." },
    { id: 3, type: "shipping", icon: Truck, title: "Delivery confirmed: ORD-10038", time: "Yesterday", read: true, body: "Your order was delivered Jun 18, 2025 at 2:34 PM. Signed by: J. SMITH" },
    { id: 4, type: "promo", icon: Tag, title: "Volume pricing: N95 respirators", time: "2 days ago", read: true, body: "Order 100+ units of 3M N95 8210 and receive volume pricing. Contact sales for a quote." },
    { id: 5, type: "system", icon: Info, title: "Scheduled system maintenance", time: "3 days ago", read: true, body: "Maintenance window: Sun Jun 29, 2:00–4:00 AM EST. Brief outages expected." },
    { id: 6, type: "stock", icon: AlertCircle, title: "Reorder point reached: MCR-FA-200", time: "4 days ago", read: true, body: "First Aid Kit 200pc (MCR-FA-200) is at 7 units — below reorder point of 25." },
  ];

  const filtered = filter === "all" ? notifs : notifs.filter((n) => n.type === filter);

  const notifSettings = [
    { cat: "Order Updates", desc: "Confirmation, status changes, and delivery" },
    { cat: "Shipping Alerts", desc: "Tracking updates and delivery confirmations" },
    { cat: "Stock Alerts", desc: "Low stock and reorder point notifications" },
    { cat: "Promotions", desc: "Volume pricing deals and limited-time offers" },
    { cat: "System", desc: "Maintenance windows and platform updates" },
    { cat: "Account Security", desc: "Login alerts and password changes" },
  ];

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <SiteHeader onNav={onNav} />
      <div className="max-w-[900px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[24px] font-semibold text-[#1B2332] mb-0.5">Notifications</h1>
            <p className="text-[14px] text-[#94A3B8]"><strong className="text-[#1B2332]">2 unread</strong> notifications</p>
          </div>
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" onClick={() => setSettingsView(!settingsView)}>
              <Settings className="w-3.5 h-3.5" /> {settingsView ? "View Notifications" : "Settings"}
            </Btn>
            {!settingsView && <Btn variant="secondary" size="sm">Mark All Read</Btn>}
          </div>
        </div>

        {!settingsView ? (
          <>
            <div className="flex gap-0 border-b border-[#E5E7EB] mb-4">
              {[
                { id: "all", label: "All", count: notifs.length },
                { id: "order", label: "Orders" },
                { id: "shipping", label: "Shipping" },
                { id: "stock", label: "Stock" },
                { id: "promo", label: "Promos" },
                { id: "system", label: "System" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2.5 text-[14px] font-medium border-b-2 -mb-px transition-colors ${
                    filter === tab.id ? "border-[#1B2332] text-[#1B2332]" : "border-transparent text-[#94A3B8] hover:text-[#475569]"
                  }`}
                  onClick={() => setFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filtered.map((n) => (
                <div
                  key={n.id}
                  className={`bg-white border rounded-[6px] p-4 flex items-start gap-3 transition-colors ${
                    !n.read ? "border-[#1B2332]/15 bg-[#FAFBFC]" : "border-[#E5E7EB] hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className="w-9 h-9 bg-[#F1F3F5] rounded-[6px] flex items-center justify-center shrink-0 text-[#475569]">
                    <n.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className={`text-[14px] font-medium ${!n.read ? "text-[#1B2332]" : "text-[#475569]"}`}>{n.title}</div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[12px] text-[#94A3B8]">{n.time}</span>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-[#1B2332]" />}
                      </div>
                    </div>
                    <p className="text-[13px] text-[#94A3B8] mt-1 leading-relaxed">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E5E7EB]">
              <div className="text-[14px] font-semibold text-[#1B2332]">Notification Preferences</div>
              <div className="text-[13px] text-[#94A3B8] mt-0.5">Choose how you receive notifications for each category</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                    <th className="text-left px-5 py-3 font-medium text-[#475569] w-64">Category</th>
                    {["Email", "SMS", "In-App"].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium text-[#475569] text-center">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notifSettings.map((s, i) => (
                    <tr key={s.cat} className={`border-b border-[#E5E7EB] last:border-0 ${i % 2 !== 0 ? "bg-[#FAFBFC]" : ""}`}>
                      <td className="px-5 py-3">
                        <div className="font-medium text-[#1B2332]">{s.cat}</div>
                        <div className="text-[#94A3B8] mt-0.5">{s.desc}</div>
                      </td>
                      {[true, i % 2 === 0, true].map((on, j) => (
                        <td key={j} className="px-4 py-3 text-center">
                          <div className={`w-9 h-5 rounded-full relative mx-auto cursor-pointer transition-colors ${on ? "bg-[#1B2332]" : "bg-[#E5E7EB]"}`}>
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "right-0.5" : "left-0.5"}`} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-[#E5E7EB] flex justify-end gap-2">
              <Btn variant="secondary" size="sm">Reset to Defaults</Btn>
              <Btn size="sm">Save Preferences</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
