import React, { useState } from 'react';
import { Users, Heart, Calendar, FileText, Share2, Plus, Clock, CheckCircle2, ChevronRight, UserCheck, ShieldCheck, ArrowRight, Activity, MapPin } from 'lucide-react';

const FAMILY_MEMBERS = [
  { id: 'mom', name: 'Sunita Sharma (Mom)', role: 'Parent', age: '68 yrs', location: 'Varanasi', activeJourney: 'Knee Osteoarthritis Physiotherapy' },
  { id: 'dad', name: 'Rajendra Sharma (Dad)', role: 'Parent', age: '72 yrs', location: 'Jaipur', activeJourney: 'Routine Hypertension Checkup' },
  { id: 'child', name: 'Aarav Sharma (Son)', role: 'Child', age: '14 yrs', location: 'Bangalore', activeJourney: 'Sports Physical & Dental' },
  { id: 'spouse', name: 'Priya Sharma (Spouse)', role: 'Spouse', age: '34 yrs', location: 'Bangalore', activeJourney: 'Annual Preventive Screening' }
];

const MOM_KNEE_THREAD = [
  {
    date: '20 AUG 2026',
    title: 'Initial Orthopedic Consultation',
    provider: 'Apollo Spectra Hospital, Varanasi',
    tag: 'Doctor Visit',
    details: 'Dr. V. K. Gupta examined knee inflammation. X-Ray & MRI requested.',
    documentUploaded: 'Prescription_Aug20.pdf',
    companionAssisted: true,
    companionName: 'Rajesh Kumar (JetPulse Companion)'
  },
  {
    date: '22 AUG 2026',
    title: 'Bilateral Knee MRI & Blood Panel',
    provider: 'Metropolis Diagnostics, Varanasi',
    tag: 'Diagnostic Test',
    details: 'MRI completed. Grade 2 cartilage wear identified.',
    documentUploaded: 'MRI_Report_Knee_Aug22.pdf',
    companionAssisted: true,
    companionName: 'Rajesh Kumar (JetPulse Companion)'
  },
  {
    date: '25 AUG 2026',
    title: 'Orthopedic Follow-Up & Therapy Plan',
    provider: 'Apollo Spectra Hospital',
    tag: 'Treatment Plan',
    details: 'Doctor recommended 10 sessions of guided quadriceps physiotherapy. Surgery postponed.',
    documentUploaded: 'Physio_Protocol_Aug25.pdf',
    companionAssisted: false
  },
  {
    date: '28 AUG 2026',
    title: 'Physiotherapy Session #1 (Accompanied)',
    provider: 'CareMax Physio Clinic, Varanasi',
    tag: 'JetPulse Companion',
    details: 'Accompanied Sunita Sharma to session. Doctor instructions recorded with explicit patient consent.',
    documentUploaded: 'Physio_Notes_Session1.pdf',
    companionAssisted: true,
    companionName: 'Anjali S. (JetPulse Companion)'
  }
];

export default function FamilyHealthEcosystem({ onOpenBooking }) {
  const [selectedMember, setSelectedMember] = useState('mom');
  const [activeTab, setActiveTab] = useState('journey'); // 'journey' | 'reports' | 'appointments'
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  const currentMemberObj = FAMILY_MEMBERS.find(m => m.id === selectedMember);

  return (
    <section id="family-health" style={{
      padding: '80px 0',
      backgroundColor: 'var(--white)',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="jp-container">
        
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="jp-badge jp-badge-mint" style={{ marginBottom: '12px' }}>
            ENGINE 03
          </span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Your family's healthcare, connected.
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Keep your family's appointments, reports, health journeys, and companion updates 
            in one synchronized, private timeline.
          </p>
        </div>

        {/* FAMILY ECOSYSTEM DASHBOARD CONTAINER */}
        <div style={{
          backgroundColor: 'var(--bg-page)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          padding: '32px'
        }}>

          {/* FAMILY MEMBER SELECTION TABS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
              {FAMILY_MEMBERS.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '12px',
                    border: selectedMember === member.id ? '2px solid var(--teal-primary)' : '1px solid var(--border-color)',
                    backgroundColor: selectedMember === member.id ? 'var(--white)' : 'rgba(255,255,255,0.6)',
                    color: 'var(--navy)',
                    fontWeight: selectedMember === member.id ? '700' : '500',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: selectedMember === member.id ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Users size={16} color={selectedMember === member.id ? 'var(--teal-primary)' : 'var(--text-secondary)'} />
                  <span>{member.name}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={onOpenBooking}
              className="jp-btn jp-btn-primary jp-btn-sm"
            >
              <Plus size={16} />
              <span>Book Companion for {currentMemberObj.role}</span>
            </button>
          </div>

          {/* SELECTED MEMBER HEADER BANNER */}
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px solid var(--border-color)',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--navy)' }}>
                  {currentMemberObj.name}
                </h3>
                <span className="jp-badge jp-badge-navy">
                  📍 {currentMemberObj.location}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {currentMemberObj.age}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--teal-dark)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={14} />
                <span>Active Journey: {currentMemberObj.activeJourney}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => {
                  setShowShareSuccess(true);
                  setTimeout(() => setShowShareSuccess(false), 3000);
                }}
                className="jp-btn jp-btn-secondary jp-btn-sm"
              >
                <Share2 size={14} />
                <span>Share Timeline with Family</span>
              </button>
            </div>
          </div>

          {showShareSuccess && (
            <div className="animate-fade-in" style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: '#E8F7F2',
              color: 'var(--success)',
              fontWeight: '600',
              fontSize: '13px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} />
              <span>Timeline link copied! Family members in Bangalore & Varanasi updated.</span>
            </div>
          )}

          {/* TIMELINE / THREAD SECTION */}
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '28px'
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                CHRONOLOGICAL HEALTH JOURNEY THREAD
              </h4>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                4 entries recorded
              </span>
            </div>

            {/* THREAD ITEMS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
              {MOM_KNEE_THREAD.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '20px',
                  position: 'relative'
                }}>
                  
                  {/* Date Pillar */}
                  <div style={{ width: '100px', flexShrink: 0, textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--teal-primary)' }}>
                      {item.date}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {item.provider.split(',')[0]}
                    </div>
                  </div>

                  {/* Vertical Line Connector */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: item.companionAssisted ? 'var(--teal-primary)' : 'var(--navy)',
                      marginTop: '4px'
                    }} />
                    {idx < MOM_KNEE_THREAD.length - 1 && (
                      <div style={{
                        width: '2px',
                        flex: 1,
                        backgroundColor: 'var(--border-color)',
                        margin: '4px 0'
                      }} />
                    )}
                  </div>

                  {/* Content Card */}
                  <div style={{
                    flex: 1,
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '4px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--navy)' }}>
                        {item.title}
                      </span>
                      <span className="jp-badge jp-badge-mint" style={{ fontSize: '11px' }}>
                        {item.tag}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>
                      {item.details}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                      {item.documentUploaded && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--white)',
                          border: '1px solid var(--border-color)',
                          fontSize: '12px',
                          color: 'var(--navy)',
                          fontWeight: '500'
                        }}>
                          <FileText size={14} color="var(--teal-primary)" />
                          <span>{item.documentUploaded}</span>
                        </div>
                      )}

                      {item.companionAssisted && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          color: 'var(--teal-dark)',
                          fontWeight: '600'
                        }}>
                          <UserCheck size={14} />
                          <span>{item.companionName}</span>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* COMPANION TO FAMILY ECOSYSTEM CAPTURE BOX */}
            <div style={{
              marginTop: '32px',
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: 'var(--mint-soft)',
              border: '1px dashed var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="var(--teal-primary)" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--navy)' }}>
                    Companion Visit Capture Protocol
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    With explicit patient consent, companions upload prescriptions and record doctor instructions directly into this thread.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={onOpenBooking}
                  className="jp-btn jp-btn-primary jp-btn-sm"
                >
                  <span>Book Next Visit</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
