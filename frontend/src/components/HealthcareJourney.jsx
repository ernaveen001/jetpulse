import React from 'react';
import { Calendar, Compass, MapPin, Stethoscope, TestTube, Home, HeartHandshake, ArrowRight } from 'lucide-react';

const JOURNEY_STEPS = [
  { step: "01", icon: Calendar, title: "Book", desc: "Select instant or scheduled assistance for yourself or a loved one." },
  { step: "02", icon: Compass, title: "Plan", desc: "Companion confirms appointment details and transport arrangements." },
  { step: "03", icon: MapPin, title: "Arrive", desc: "Doorstep pickup and comfortable arrival at the medical center." },
  { step: "04", icon: Stethoscope, title: "Consult", desc: "Help with OPD registration, token queues, and room navigation." },
  { step: "05", icon: TestTube, title: "Test", desc: "Escort to diagnostic labs, MRI, blood collection, or radiology." },
  { step: "06", icon: Home, title: "Discharge", desc: "Assistance with TPA insurance paperwork and pharmacy pickup." },
  { step: "07", icon: HeartHandshake, title: "Follow-up", desc: "Safe drop back home with full visit notes sent to family." }
];

export default function HealthcareJourney({ onOpenBooking }) {
  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: 'var(--navy)',
      color: 'var(--white)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15, 159, 150, 0.15) 0%, rgba(8, 43, 76, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="jp-container">
        
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="jp-badge" style={{ backgroundColor: 'rgba(248, 250, 250, 0.1)', color: 'var(--teal-bright)', border: '1px solid rgba(248, 250, 250, 0.2)', marginBottom: '12px' }}>
            Seamless Care Progression
          </span>
          <h2 style={{ fontSize: '38px', fontWeight: '800', color: 'var(--white)', marginBottom: '16px' }}>
            From appointment to home, we're with you.
          </h2>
          <p style={{ fontSize: '16px', color: '#A0B2C6', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            JetPulse companions support you across every stage of the healthcare journey, 
            eliminating stress, waiting confusion, and lonely hospital visits.
          </p>
        </div>

        {/* HORIZONTAL JOURNEY STEP CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '12px',
          position: 'relative'
        }} className="journey-grid">
          {JOURNEY_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '20px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                position: 'relative'
              }} className="journey-step-card">
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px'
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--teal-bright)' }}>
                      STEP {item.step}
                    </span>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(15, 159, 150, 0.2)',
                      color: 'var(--teal-bright)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={16} />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--white)', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#A0B2C6', lineHeight: 1.4 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA BOTTOM */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button 
            onClick={onOpenBooking}
            className="jp-btn jp-btn-primary jp-btn-lg"
          >
            <span>Book Your Companion Journey</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .journey-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .journey-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
