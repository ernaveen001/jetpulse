import React from 'react';
import { MessageSquare, UserCheck, Search, HeartHandshake, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: "STEP 1",
    icon: MessageSquare,
    title: "Tell us what you need.",
    desc: "Describe your appointment, diagnostic test, or hospital trip—for yourself or a family member far away."
  },
  {
    num: "STEP 2",
    icon: UserCheck,
    title: "Choose how JetPulse can help.",
    desc: "Book a verified human companion or use Care Navigator AI to explore nearby healthcare options."
  },
  {
    num: "STEP 3",
    icon: Search,
    title: "Get matched / explore care.",
    desc: "Get paired with a trained companion or fast-track OPD and lab visits with clear pricing."
  },
  {
    num: "STEP 4",
    icon: HeartHandshake,
    title: "Stay connected in real-time.",
    desc: "Receive live GPS updates, prescription uploads, and visit summaries in your family health timeline."
  }
];

export default function HowItWorks({ onOpenBooking }) {
  return (
    <section id="how-it-works" style={{
      padding: '80px 0',
      backgroundColor: 'var(--white)',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="jp-container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="jp-badge jp-badge-navy" style={{ marginBottom: '12px' }}>
            Simple & Transparent
          </span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            How JetPulse Works
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Four simple steps to getting reliable, verified healthcare assistance whenever you need it.
          </p>
        </div>

        {/* 4 STEPS GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }} className="how-it-works-grid">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="jp-card" style={{
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-page)',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--teal-primary)' }}>
                    {step.num}
                  </span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--mint-soft)',
                    color: 'var(--teal-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={18} />
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--navy)', marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* FINAL CTA STRIP IN SECTION 21 & 22 */}
        <div style={{
          marginTop: '64px',
          backgroundColor: 'var(--navy)',
          borderRadius: '24px',
          padding: '48px 32px',
          textAlign: 'center',
          color: 'var(--white)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--white)', marginBottom: '12px' }}>
            Don't handle healthcare alone.
          </h2>
          <p style={{ fontSize: '16px', color: '#A0B2C6', maxWidth: '580px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
            Whether it's for you, your student child, or someone you love sitting far away, JetPulse is here to help.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={onOpenBooking}
              className="jp-btn jp-btn-primary jp-btn-lg"
            >
              <span>Get Assistance</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .how-it-works-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
