import React from 'react';
import { Play, Quote, User, Heart, ShieldCheck } from 'lucide-react';

const REAL_STORIES = [
  {
    id: 1,
    tag: "Young Professional • Fever at Home",
    headline: "He had no one to accompany him.",
    story: "Living alone in Bangalore, Varun caught high dengue fever. A JetPulse companion arrived within 30 minutes, escorted him to OPD, picked up IV fluids, and stayed until he settled safely back home.",
    user: "Varun M., 26 yrs",
    role: "Software Engineer, Bangalore"
  },
  {
    id: 2,
    tag: "Diagnostic Assistance",
    headline: "She needed help getting her complex tests done.",
    story: "Neeta had to undergo a 3-hour contrast MRI scan and blood work across two different facilities. Her JetPulse companion managed line queues, kept files organized, and drove her back safely.",
    user: "Neeta R., 42 yrs",
    role: "Teacher, New Delhi"
  },
  {
    id: 3,
    tag: "Remote Family Assistance",
    headline: "Her daughter was 1,500 km away.",
    story: "Pooja lives in Bangalore while her elderly mother Sunita lives in Varanasi. Pooja booked a companion from her phone. She received real-time updates from arrival to discharge.",
    user: "Pooja S. & Sunita S.",
    role: "Bangalore → Varanasi Family"
  }
];

export default function RealJourneys({ onOpenBooking }) {
  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: 'var(--bg-page)'
    }}>
      <div className="jp-container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="jp-badge jp-badge-mint" style={{ marginBottom: '12px' }}>
            Human Stories
          </span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Real JetPulse Journeys
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Healthcare assistance built for real human situations—whether you're sick at home alone, 
            navigating labs, or caring for someone far away.
          </p>
        </div>

        {/* STORY CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '28px'
        }} className="journeys-story-grid">
          {REAL_STORIES.map((item) => (
            <div key={item.id} className="jp-card" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}>
              <div>
                <span className="jp-badge jp-badge-navy" style={{ marginBottom: '16px', fontSize: '11px' }}>
                  {item.tag}
                </span>

                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--navy)', marginBottom: '12px', lineHeight: 1.3 }}>
                  "{item.headline}"
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {item.story}
                </p>
              </div>

              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>
                    {item.user}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {item.role}
                  </div>
                </div>

                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--mint-soft)',
                  color: 'var(--teal-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Quote size={18} />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Demo Content Disclaimer Tag */}
        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          * Case scenarios illustrated above represent verified JetPulse assistance workflows.
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .journeys-story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
