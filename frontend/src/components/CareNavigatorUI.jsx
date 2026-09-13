import React, { useState } from 'react';
import { Compass, Plus, FileText, Image, Mic, Send, AlertTriangle, MapPin, Search, Star, Map, List, ExternalLink, ArrowRight, ShieldAlert, CheckCircle2, ChevronRight, X } from 'lucide-react';

const SAMPLE_PROMPTS = [
  "I've had fever for three days and need to find where I should get checked.",
  "Looking for an orthopedic specialist for knee pain near Koramangala.",
  "Need to get a complete lipid panel blood test done fast this weekend.",
  "Post-discharge care guidance for abdominal surgery recovery."
];

const NEARBY_PROVIDERS = [
  {
    id: 1,
    name: "Apollo Spectra Specialty Hospital",
    type: "Hospital",
    distance: "1.8 km away",
    status: "Open 24/7",
    address: "Koramangala 5th Block, Bangalore",
    rating: 4.8,
    reviews: 320,
    services: ["Emergency OPD", "Internal Medicine", "Diagnostics", "TPA Cashless"],
    isSponsored: false,
    jetpulseAvailable: true
  },
  {
    id: 2,
    name: "Max Super Specialty Clinic",
    type: "Clinic & OPD",
    distance: "2.4 km away",
    status: "Open until 8:00 PM",
    address: "Indiranagar 100ft Road, Bangalore",
    rating: 4.9,
    reviews: 512,
    services: ["General Physician", "Orthopedics", "Pediatrics"],
    isSponsored: true, // SPONSORED distinction
    jetpulseAvailable: true
  },
  {
    id: 3,
    name: "Metropolis Healthcare & MRI Lab",
    type: "Diagnostic Center",
    distance: "1.2 km away",
    status: "Open • Home sample pickup",
    address: "Koramangala 80ft Road, Bangalore",
    rating: 4.7,
    reviews: 210,
    services: ["Blood Panel", "MRI / CT Scan", "Radiology"],
    isSponsored: false,
    jetpulseAvailable: true
  }
];

export default function CareNavigatorUI({ onOpenBooking }) {
  const [inputText, setInputText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'map'
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSearch = (queryText) => {
    const textToSearch = queryText || inputText;
    if (!textToSearch.trim()) return;
    setInputText(textToSearch);
    setHasSearched(true);
  };

  const handleFileUpload = (fileName, type) => {
    setUploadedFiles(prev => [...prev, { name: fileName, type, date: 'Just now' }]);
    setShowUploadModal(false);
  };

  return (
    <section id="navigator" style={{
      padding: '80px 0',
      backgroundColor: 'var(--bg-page)'
    }}>
      <div className="jp-container">
        
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="jp-badge jp-badge-navy" style={{ marginBottom: '12px' }}>
            Advisory AI Healthcare Assistant
          </span>
          <h2 className="section-title" style={{ marginBottom: '12px' }}>
            JetPulse Care Navigator
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Tell us what's happening, upload reports or prescriptions, and explore appropriate healthcare options near you.
          </p>
        </div>

        {/* CHATGPT-LIKE INTERFACE CONTAINER */}
        <div style={{
          backgroundColor: 'var(--white)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          minHeight: '620px'
        }} className="navigator-app-shell">

          {/* LEFT SIDEBAR (ChatGPT Style) */}
          <div style={{
            backgroundColor: 'var(--navy)',
            color: 'var(--white)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255,255,255,0.1)'
          }} className="navigator-sidebar">
            <div>
              {/* Brand Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', padding: '0 8px' }}>
                <Compass size={22} color="var(--teal-bright)" />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800' }}>
                  Care Navigator
                </span>
              </div>

              {/* New Care Journey Button */}
              <button 
                onClick={() => {
                  setHasSearched(false);
                  setInputText("");
                  setUploadedFiles([]);
                }}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'var(--white)',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '24px'
                }}
              >
                <Plus size={16} />
                <span>New Care Journey</span>
              </button>

              {/* Sidebar Menu Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {["Home Navigator", "My Care History", "Uploaded Reports", "Family Profiles", "Saved Providers"].map((item, idx) => (
                  <div key={idx} style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: idx === 0 ? 'var(--white)' : '#A0B2C6',
                    backgroundColor: idx === 0 ? 'rgba(15, 159, 150, 0.25)' : 'transparent',
                    fontWeight: idx === 0 ? '700' : '500',
                    cursor: 'pointer'
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer in Sidebar Footer */}
            <div style={{
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              fontSize: '11px',
              color: '#A0B2C6',
              lineHeight: 1.4
            }}>
              <div style={{ color: 'var(--teal-bright)', fontWeight: '700', marginBottom: '4px' }}>
                ⚠️ Advisory Support Only
              </div>
              Does not replace professional medical diagnosis or clinical advice.
            </div>
          </div>

          {/* MAIN CHAT & RESULTS AREA */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '32px',
            backgroundColor: '#FAFDFD'
          }}>
            
            {!hasSearched ? (
              /* INITIAL STATE: PROMPT LANDING */
              <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--mint-soft)',
                    color: 'var(--teal-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <Compass size={28} />
                  </div>
                  <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--navy)', marginBottom: '8px' }}>
                    How can we help you navigate healthcare?
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Describe your symptoms, questions, or upload a prescription to find verified care providers nearby.
                  </p>
                </div>

                {/* SUGGESTED PROMPTS */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase' }}>
                    Try these sample prompts
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {SAMPLE_PROMPTS.map((prompt, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleSearch(prompt)}
                        style={{
                          padding: '14px',
                          borderRadius: '12px',
                          backgroundColor: 'var(--white)',
                          border: '1px solid var(--border-color)',
                          fontSize: '13px',
                          color: 'var(--navy)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          lineHeight: 1.4
                        }}
                        className="jp-card-interactive"
                      >
                        "{prompt}"
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* ACTIVE SEARCH STATE: AI RESPONSE & PROVIDER LISTINGS */
              <div style={{ overflowY: 'auto', paddingRight: '8px', marginBottom: '20px' }}>
                
                {/* User Prompt Message */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    backgroundColor: 'var(--navy)',
                    color: 'var(--white)',
                    padding: '14px 20px',
                    borderRadius: '16px 16px 4px 16px',
                    maxWidth: '80%',
                    fontSize: '14px'
                  }}>
                    {inputText}
                    {uploadedFiles.length > 0 && (
                      <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '11px', color: 'var(--mint-hover)' }}>
                        📎 Attached: {uploadedFiles.map(f => f.name).join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Guidance Box */}
                <div style={{
                  backgroundColor: 'var(--white)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  padding: '24px',
                  marginBottom: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--mint-soft)',
                      color: 'var(--teal-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Compass size={16} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--navy)' }}>
                      JetPulse Advisory Navigation Pathway
                    </span>
                  </div>

                  <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '16px' }}>
                    Based on your query regarding <strong>"{inputText}"</strong>, the recommended medical care pathway is an 
                    <span style={{ color: 'var(--teal-primary)', fontWeight: '700' }}> Internal Medicine / General Physician Evaluation</span>. 
                    If symptoms include acute breathlessness or severe chest pressure, seek emergency care immediately.
                  </p>

                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#FFF8EC',
                    border: '1px solid #FFE6C5',
                    fontSize: '12px',
                    color: '#92400E',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <ShieldAlert size={16} color="#D97706" />
                    <span><strong>Disclaimer:</strong> This guidance is advisory and informational. It is not a clinical diagnosis.</span>
                  </div>
                </div>

                {/* NEARBY PROVIDERS SECTION */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--navy)' }}>
                      Healthcare options near Koramangala
                    </h4>

                    {/* MAP / LIST TOGGLE */}
                    <div style={{
                      display: 'flex',
                      backgroundColor: 'var(--border-subtle)',
                      padding: '3px',
                      borderRadius: '8px'
                    }}>
                      <button
                        onClick={() => setViewMode('list')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: viewMode === 'list' ? 'var(--white)' : 'transparent',
                          color: 'var(--navy)',
                          fontWeight: '700',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <List size={14} />
                        <span>List</span>
                      </button>
                      <button
                        onClick={() => setViewMode('map')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: viewMode === 'map' ? 'var(--white)' : 'transparent',
                          color: 'var(--navy)',
                          fontWeight: '700',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Map size={14} />
                        <span>Map View</span>
                      </button>
                    </div>
                  </div>

                  {viewMode === 'list' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {NEARBY_PROVIDERS.map((provider) => (
                        <div key={provider.id} style={{
                          backgroundColor: 'var(--white)',
                          borderRadius: '16px',
                          border: '1px solid var(--border-color)',
                          padding: '20px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          position: 'relative'
                        }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                              <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy)' }}>
                                {provider.name}
                              </span>
                              {provider.isSponsored && (
                                <span className="jp-badge jp-badge-sponsored">
                                  SPONSORED
                                </span>
                              )}
                              <span className="jp-badge jp-badge-mint">
                                {provider.type}
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                              <span>📍 {provider.distance}</span>
                              <span>•</span>
                              <span>{provider.status}</span>
                              <span>•</span>
                              <span style={{ color: '#D97706', fontWeight: '700' }}>⭐ {provider.rating} ({provider.reviews})</span>
                            </div>

                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {provider.services.map((s, idx) => (
                                <span key={idx} style={{
                                  fontSize: '11px',
                                  padding: '2px 8px',
                                  borderRadius: '6px',
                                  backgroundColor: 'var(--bg-page)',
                                  color: 'var(--navy)',
                                  border: '1px solid var(--border-color)'
                                }}>
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                              onClick={onOpenBooking}
                              className="jp-btn jp-btn-primary jp-btn-sm"
                            >
                              <span>Get Assistance</span>
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* SIMULATED MAP CONTAINER */
                    <div style={{
                      height: '300px',
                      borderRadius: '16px',
                      backgroundColor: '#E5F3F0',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Decorative map dots */}
                      <div style={{ position: 'absolute', top: '30%', left: '25%', padding: '6px 12px', borderRadius: '20px', backgroundColor: 'var(--navy)', color: 'var(--white)', fontSize: '11px', fontWeight: '700' }}>
                        📍 Apollo Spectra (1.8km)
                      </div>
                      <div style={{ position: 'absolute', top: '55%', left: '60%', padding: '6px 12px', borderRadius: '20px', backgroundColor: '#B76E00', color: 'var(--white)', fontSize: '11px', fontWeight: '700' }}>
                        📍 Max Clinic [Sponsored]
                      </div>
                      <div style={{ position: 'absolute', top: '70%', left: '35%', padding: '6px 12px', borderRadius: '20px', backgroundColor: 'var(--teal-primary)', color: 'var(--white)', fontSize: '11px', fontWeight: '700' }}>
                        📍 Metropolis Lab (1.2km)
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', backgroundColor: 'rgba(255,255,255,0.9)', padding: '6px 16px', borderRadius: '20px', zIndex: 5 }}>
                        Interactive Location Map View • JetPulse Verified
                      </span>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* BOTTOM INPUT BAR */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              border: '1.5px solid var(--border-color)',
              padding: '12px 16px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              
              {/* UPLOADED ATTACHMENTS STRIP */}
              {uploadedFiles.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  {uploadedFiles.map((file, idx) => (
                    <span key={idx} style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--mint-soft)',
                      color: 'var(--teal-dark)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: '1px solid rgba(15,159,150,0.3)'
                    }}>
                      <FileText size={12} />
                      <span>{file.name}</span>
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Tell us what's happening or what specialist you need..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: 'var(--navy)',
                    backgroundColor: 'transparent'
                  }}
                />

                {/* ATTACHMENT / INPUT TYPE BUTTONS */}
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
                  title="Upload Report PDF or Prescription"
                >
                  <FileText size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
                  title="Add Photo of medicine / rash"
                >
                  <Image size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsRecordingVoice(!isRecordingVoice)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: isRecordingVoice ? 'var(--danger)' : 'var(--text-secondary)', 
                    cursor: 'pointer', 
                    padding: '4px' 
                  }}
                  title="Voice Input Mockup"
                >
                  <Mic size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => handleSearch()}
                  className="jp-btn jp-btn-primary jp-btn-sm"
                  style={{ borderRadius: '8px', padding: '8px 14px' }}
                >
                  <span>Find Care</span>
                  <Send size={14} />
                </button>
              </div>

              {isRecordingVoice && (
                <div style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '6px', fontWeight: '600' }}>
                  🔴 Listening to voice input... (Speak now)
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* UPLOAD SIMULATION MODAL */}
      {showUploadModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1100,
          backgroundColor: 'rgba(8, 43, 76, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: '20px',
            padding: '24px',
            maxWidth: '440px',
            width: '100%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--navy)' }}>Upload Document / Photo</h4>
              <button onClick={() => setShowUploadModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => handleFileUpload('Blood_Report_CBC_Aug2026.pdf', 'pdf')}
                className="jp-btn jp-btn-outline"
                style={{ justifyContent: 'flex-start' }}
              >
                <FileText size={16} color="var(--teal-primary)" />
                <span>Simulate: Blood_Report_CBC_Aug2026.pdf</span>
              </button>

              <button 
                onClick={() => handleFileUpload('Doctor_Prescription_Opd.jpg', 'image')}
                className="jp-btn jp-btn-outline"
                style={{ justifyContent: 'flex-start' }}
              >
                <Image size={16} color="var(--navy)" />
                <span>Simulate: Doctor_Prescription_Opd.jpg</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM TABS — visible below 900px as sidebar replacement */}
      <div className="navigator-mobile-tabs" style={{ padding: '0' }}>
        {[
          { label: 'Navigator', emoji: '🧭' },
          { label: 'History',   emoji: '📋' },
          { label: 'Reports',   emoji: '📄' },
          { label: 'Family',    emoji: '👨‍👩‍👧' },
          { label: 'Saved',     emoji: '⭐' },
        ].map((tab) => (
          <button key={tab.label} className="mobile-tab-btn">
            <span style={{ fontSize: '18px' }}>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

    </section>
  );
}
