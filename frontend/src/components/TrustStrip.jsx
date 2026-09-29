import React from 'react';
import { UserCheck, Shield, DollarSign, Bell, Clock } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: UserCheck, title: "Verified Companions", desc: "Background-checked & trained" },
  { icon: Shield, title: "Secure & Private", desc: "Strict medical privacy standard" },
  { icon: DollarSign, title: "Transparent Pricing", desc: "No hidden surge fees" },
  { icon: Bell, title: "Family Updates", desc: "Live status & visit notes" },
  { icon: Clock, title: "24/7 Support", desc: "Always available assistance" }
];

export default function TrustStrip() {
  return (
    <section style={{
      backgroundColor: 'var(--white)',
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
      padding: '24px 0'
    }}>
      <div className="jp-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          alignItems: 'center'
        }} className="trust-strip-grid">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                borderRadius: '12px',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--mint-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--teal-primary)',
                  flexShrink: 0
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'var(--navy)',
                    lineHeight: 1.2
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    marginTop: '2px'
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .trust-strip-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .trust-strip-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
