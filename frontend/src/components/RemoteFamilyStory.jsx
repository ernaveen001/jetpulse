import React from 'react';
import { Smartphone, User, MapPin, Calendar, Clock, Building2, UserCheck, Bell, ShieldCheck, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

const STORY_STEPS = [
  { step: 1, title: "Person in Bangalore", location: "Bangalore", desc: "Arjun, a 28-year-old software engineer working in Bangalore." },
  { step: 2, title: "Opens JetPulse App", location: "Bangalore", desc: "Needs to arrange OPD assistance for his mother's cardiology visit." },
  { step: 3, title: "Selects Mom", location: "Varanasi", desc: "Selects Sunita (68y) residing in Varanasi for remote booking." },
  { step: 4, title: "Books Companion", location: "Varanasi", desc: "Selects Companion + Car pickup for 10:00 AM at Varanasi home." },
  { step: 5, title: "Companion Arrives", location: "Varanasi", desc: "Verified companion Rajesh arrives at doorstep and verifies identity." },
  { step: 6, title: "Reaches Hospital", location: "Apollo Spectra", desc: "Escort assists with wheelchair, OPD token, and clinic queue." }
];

export default function RemoteFamilyStory({ onOpenBooking }) {
  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: 'var(--mint-soft)',
      borderTop: '1px solid rgba(15, 159, 150, 0.15)',
      borderBottom: '1px solid rgba(15, 159, 150, 0.15)'
    }}>
      <div className="jp-container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="jp-badge jp-badge-mint" style={{ backgroundColor: 'var(--white)', color: 'var(--teal-dark)', marginBottom: '12px' }}>
            Remote Healthcare Assistance
          </span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            "Be there, even when you can't be there."
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            See how a son sitting in Bangalore can arrange seamless, verified healthcare assistance 
            for his mother sitting 1,500 km away in Varanasi.
          </p>
        </div>

        {/* HIGH TRUST FEATURED PHOTO BANNER */}
        <div style={{
          backgroundColor: 'var(--white)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          marginBottom: '48px',
          boxShadow: 'var(--shadow-lg)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr'
        }} className="remote-banner-grid">
          
          <div style={{ position: 'relative', minHeight: '340px' }}>
            <img 
              src="/scenarios/scenario5.jpg" 
              alt="Remote family booking assistance" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: 'rgba(8, 43, 76, 0.85)',
              backdropFilter: 'blur(8px)',
              color: 'var(--white)',
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldCheck size={14} color="var(--teal-bright)" />
              <span>Real Verified JetPulse Companion</span>
            </div>
          </div>

          <div style={{
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'var(--white)'
          }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--teal-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
              SCENARIO 5 OF 6: REMOTE FAMILY CARE
            </span>

            <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--navy)', marginBottom: '12px' }}>
              Bangalore → Varanasi Remote Escort
            </h3>

            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              When Arjun's mother Sunita needed a cardiology consultation at Apollo Spectra Hospital in Varanasi, 
              Arjun booked a trained companion directly from his phone in Bangalore.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--navy)', fontWeight: '600' }}>
                <CheckCircle2 size={16} color="var(--teal-primary)" />
                <span>Doorstep pickup & companion identity verification</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--navy)', fontWeight: '600' }}>
                <CheckCircle2 size={16} color="var(--teal-primary)" />
                <span>OPD token queue management & wheelchair support</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--navy)', fontWeight: '600' }}>
                <CheckCircle2 size={16} color="var(--teal-primary)" />
                <span>Live SMS & app push updates sent to Bangalore family</span>
              </div>
            </div>

            <button 
              onClick={onOpenBooking}
              className="jp-btn jp-btn-primary"
            >
              <span>Book Remote Assistance Now</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* VISUAL STEP STORY GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '40px'
        }} className="story-grid">
          {STORY_STEPS.map((item) => (
            <div key={item.step} style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--navy)',
                  color: 'var(--white)',
                  fontSize: '12px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.step}
                </span>
                <span className="jp-badge jp-badge-navy" style={{ fontSize: '11px' }}>
                  📍 {item.location}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy)', marginBottom: '6px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM HIGHLIGHT CARD */}
        <div style={{
          backgroundColor: 'var(--navy)',
          color: 'var(--white)',
          borderRadius: '20px',
          padding: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--teal-primary)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Heart size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--white)', marginBottom: '4px' }}>
                Peace of mind for remote families
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--mint-soft)' }}>
                Real-time notifications • Prescription upload • Doorstep completion verified
              </p>
            </div>
          </div>

          <button 
            onClick={onOpenBooking}
            className="jp-btn jp-btn-primary"
          >
            <span>Book Remote Family Assistance</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .story-grid, .remote-banner-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
