import React from 'react';
import { UserCheck, Compass, ArrowRight, Clock, MapPin, Calendar, Car, Shield, AlertCircle, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function CoreEnginesSection({ onOpenBooking, onNavigateNavigator }) {
  return (
    <section id="services" style={{
      padding: '80px 0',
      backgroundColor: 'var(--bg-page)'
    }}>
      <div className="jp-container">
        
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="jp-badge jp-badge-mint" style={{ marginBottom: '12px' }}>
            Our Core Engines
          </span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Two ways JetPulse helps.
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Whether you need someone beside you or help finding where to go, 
            JetPulse is built around the way healthcare actually happens.
          </p>
        </div>

        {/* TWO LARGE DISTINCT PRODUCT CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px'
        }} className="core-engines-grid">

          {/* ENGINE 1: JETPULSE COMPANION */}
          <div className="jp-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1.5px solid var(--border-color)',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FDFD 100%)'
          }}>
            {/* Top Accent bar */}
            <div style={{ height: '4px', background: 'var(--teal-primary)', position: 'absolute', top: 0, left: 0, right: 0 }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--teal-primary)'
                }}>
                  ENGINE 01
                </span>
                <span className="jp-badge" style={{ backgroundColor: 'var(--mint-soft)', color: 'var(--teal-dark)' }}>
                  Human Escort & Assistance
                </span>
              </div>

              <h3 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--navy)', marginBottom: '12px' }}>
                JetPulse Companion
              </h3>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--teal-dark)', marginBottom: '16px' }}>
                Need someone by your side?
              </h4>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                Book a trained and verified companion to help you navigate the practical, physical, and administrative side of healthcare.
              </p>

              {/* Service list items */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px 16px',
                marginBottom: '28px'
              }}>
                {[
                  "Doctor & clinic visits",
                  "Diagnostic test support",
                  "Hospital registration help",
                  "Wheelchair & navigation",
                  "Pickup & doorstep drop",
                  "Appointment coordination",
                  "Remote family updates",
                  "Instant or scheduled"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--navy)', fontWeight: '500' }}>
                    <CheckCircle2 size={16} color="var(--teal-primary)" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Simplified Uber/Ola-style Preview Widget */}
              <div style={{
                backgroundColor: 'var(--white)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '28px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Quick Booking Preview
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <MapPin size={16} color="var(--teal-primary)" />
                    <span style={{ fontSize: '13px', color: 'var(--navy)', fontWeight: '600' }}>Pickup: Current Location / Home</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <MapPin size={16} color="var(--navy)" />
                    <span style={{ fontSize: '13px', color: 'var(--navy)', fontWeight: '600' }}>Destination: Apollo Hospital / Max Lab</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Est. 3 hrs • Car escort</span>
                    <span style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '15px' }}>₹1,247 <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '400' }}>est.</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div>
              <button 
                onClick={onOpenBooking}
                className="jp-btn jp-btn-primary jp-btn-lg"
                style={{ width: '100%' }}
              >
                <span>Get a Companion</span>
                <ArrowRight size={18} />
              </button>
              <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
                Instant dispatch available • Book for yourself or family far away
              </div>
            </div>

          </div>


          {/* ENGINE 2: JETPULSE CARE NAVIGATOR */}
          <div className="jp-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1.5px solid var(--border-color)',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F5FAFB 100%)'
          }}>
            {/* Top Accent bar */}
            <div style={{ height: '4px', background: 'var(--navy)', position: 'absolute', top: 0, left: 0, right: 0 }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--navy)'
                }}>
                  ENGINE 02
                </span>
                <span className="jp-badge" style={{ backgroundColor: 'rgba(8, 43, 76, 0.08)', color: 'var(--navy)' }}>
                  Advisory AI Navigation
                </span>
              </div>

              <h3 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--navy)', marginBottom: '12px' }}>
                JetPulse Care Navigator
              </h3>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--navy)', marginBottom: '16px' }}>
                Not sure where to go?
              </h4>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                Tell us what's happening, upload relevant reports or prescriptions, and explore appropriate healthcare options near you.
              </p>

              {/* Navigator features */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px 16px',
                marginBottom: '24px'
              }}>
                {[
                  "Symptom description prompt",
                  "Upload lab report & PDF",
                  "Prescription scanner",
                  "Specialist guidance",
                  "Hospital & lab search",
                  "Map & list location view",
                  "Verified provider filter",
                  "Non-clinical advisory AI"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--navy)', fontWeight: '500' }}>
                    <CheckCircle2 size={16} color="var(--navy)" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Chat Interface Preview */}
              <div style={{
                backgroundColor: 'var(--white)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Compass size={16} color="var(--teal-primary)" />
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>Navigator Prompt Sample</span>
                </div>
                <div style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--mint-soft)',
                  color: 'var(--navy)',
                  fontSize: '13px',
                  fontStyle: 'italic',
                  marginBottom: '12px'
                }}>
                  "I've had fever for three days and need to find where I should get checked in Koramangala."
                </div>
                <div style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-page)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)'
                }}>
                  <strong style={{ color: 'var(--navy)' }}>Care Pathway:</strong> General Physician evaluation → Recommended OPD within 2.4km.
                </div>
              </div>

              {/* Disclaimer Notice */}
              <div style={{
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: '#FFF8EC',
                border: '1px solid #FFE6C5',
                display: 'flex',
                gap: '10px',
                marginBottom: '28px'
              }}>
                <AlertCircle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '11px', color: '#92400E', lineHeight: 1.4 }}>
                  <strong>Informational & Navigation Support Only:</strong> JetPulse Care Navigator does not diagnose medical conditions or replace professional medical advice.
                </p>
              </div>

            </div>

            {/* Bottom Action */}
            <div>
              <button 
                onClick={onNavigateNavigator}
                className="jp-btn jp-btn-navy jp-btn-lg"
                style={{ width: '100%' }}
              >
                <span>Explore Care Navigator</span>
                <ChevronRight size={18} />
              </button>
              <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
                Instant AI response • Free provider discovery
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .core-engines-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
