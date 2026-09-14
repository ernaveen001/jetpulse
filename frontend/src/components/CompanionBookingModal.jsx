import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Clock, User, UserCheck, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, ChevronRight, Phone, RefreshCw, Heart, Bell } from 'lucide-react';

export default function CompanionBookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Escape key closes modal; body scroll is locked while open
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Booking Flow Steps: 'details' | 'estimate' | 'active_tracking'
  const [step, setStep] = useState('details');

  // Booking Parameters State
  const [bookingFor, setBookingFor] = useState('someone_else'); // 'myself' | 'someone_else'
  const [patientName, setPatientName] = useState('Sunita Sharma (Mom)');
  const [patientAge, setPatientAge] = useState('68');
  const [patientCity, setPatientCity] = useState('Varanasi');
  const [userCity, setUserCity] = useState('Bangalore');

  const [bookingMode, setBookingMode] = useState('instant'); // 'instant' | 'scheduled'
  const [scheduledDate, setScheduledDate] = useState('2026-08-30');
  const [scheduledTime, setScheduledTime] = useState('10:00 AM');

  const [pickupLoc, setPickupLoc] = useState('B-12, Lanka Road, Varanasi');
  const [destination, setDestination] = useState('Apollo Spectra Hospital, Ravindrapuri');
  const [durationHours, setDurationHours] = useState(3);
  const [assistanceType, setAssistanceType] = useState('car'); // 'companion_only', 'bike', 'car', 'hospital_lab'

  // Tracking Simulator State
  const [trackingStepIndex, setTrackingStepIndex] = useState(1);

  const TRACKING_STEPS = [
    { title: "Booking Confirmed", desc: "Dispatch request broadcasted to nearest companions", time: "Just now" },
    { title: "Companion Assigned", desc: "Rajesh Kumar (4.9★ • CPR Trained & Verified)", time: "+ 2 mins" },
    { title: "Companion On the Way", desc: "Heading to B-12 Lanka Road, Varanasi", time: "+ 5 mins" },
    { title: "Arrived at Pickup Location", desc: "Met Sunita Sharma (Mom) & verified identity", time: "+ 12 mins" },
    { title: "En Route to Destination", desc: "Travelling safely in cab towards Apollo Spectra", time: "+ 20 mins" },
    { title: "At Hospital / OPD Desk", desc: "Completed OPD Token #42 at Cardiology Desk", time: "+ 45 mins" },
    { title: "Doctor Consultation Done", desc: "Prescription & blood test requisition captured", time: "+ 1.5 hrs" },
    { title: "Accompanying Home", desc: "Escorting back home with prescribed medications", time: "+ 2.5 hrs" },
    { title: "Journey Completed Safely", desc: "Sunita Sharma safely at home. Full family report sent.", time: "+ 3.0 hrs" }
  ];

  // Rates calculation
  const baseRates = {
    companion_only: { name: 'Companion Only', rate: 299, desc: 'Escort on foot / local transit' },
    bike: { name: 'Companion + Bike Escort', rate: 399, desc: 'Quick local transit assistance' },
    car: { name: 'Companion + AC Car', rate: 599, desc: 'Comfortable pickup & doorstep drop' },
    hospital_lab: { name: 'Dedicated Hospital/Lab Escort', rate: 449, desc: 'Specialized hospital navigation' }
  };

  const selectedRateObj = baseRates[assistanceType];
  const companionFee = selectedRateObj.rate * durationHours;
  const transportFee = assistanceType === 'car' ? 350 : assistanceType === 'bike' ? 150 : 0;
  const estDistanceKm = 12.4;
  const grandTotal = companionFee + transportFee;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-container animate-fade-in">

        {/* MODAL HEADER */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'var(--mint-soft)',
              color: 'var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserCheck size={22} />
            </div>
            <div>
              <h3 id="booking-modal-title" style={{ fontSize: '18px', fontWeight: '800', color: 'var(--navy)' }}>
                {step === 'active_tracking' ? 'Live Companion Status' : 'Book a JetPulse Companion'}
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {step === 'active_tracking' ? 'Real-time updates for family & patient' : 'Transparent pricing • Verified healthcare assistance'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close booking modal"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {/* STEP 1 & 2: DETAILS & ESTIMATE FORM */}
        {step !== 'active_tracking' && (
          <div style={{ padding: '28px' }}>
            
            {/* WHO NEEDS ASSISTANCE TOGGLE */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)', display: 'block', marginBottom: '8px' }}>
                WHO NEEDS ASSISTANCE?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setBookingFor('myself')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: bookingFor === 'myself' ? '2px solid var(--teal-primary)' : '1px solid var(--border-color)',
                    backgroundColor: bookingFor === 'myself' ? 'var(--mint-soft)' : 'var(--white)',
                    color: 'var(--navy)',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <User size={18} color={bookingFor === 'myself' ? 'var(--teal-primary)' : 'var(--text-secondary)'} />
                  <span>Myself</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingFor('someone_else')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: bookingFor === 'someone_else' ? '2px solid var(--teal-primary)' : '1px solid var(--border-color)',
                    backgroundColor: bookingFor === 'someone_else' ? 'var(--mint-soft)' : 'var(--white)',
                    color: 'var(--navy)',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Heart size={18} color={bookingFor === 'someone_else' ? 'var(--teal-primary)' : 'var(--text-secondary)'} />
                  <span>Someone Else (Family Remote)</span>
                </button>
              </div>
            </div>

            {/* IF REMOTE / SOMEONE ELSE: FAMILY DETAILS */}
            {bookingFor === 'someone_else' && (
              <div style={{
                padding: '16px',
                borderRadius: '14px',
                backgroundColor: 'var(--mint-soft)',
                border: '1px dashed var(--teal-primary)',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <ShieldCheck size={18} color="var(--teal-primary)" />
                  <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--teal-dark)' }}>
                    Remote Booking Active (e.g., You in {userCity} → Patient in {patientCity})
                  </span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--navy)' }}>PATIENT NAME</label>
                    <input 
                      type="text" 
                      value={patientName} 
                      onChange={(e) => setPatientName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '13px',
                        marginTop: '4px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--navy)' }}>AGE</label>
                    <input 
                      type="number" 
                      value={patientAge} 
                      onChange={(e) => setPatientAge(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '13px',
                        marginTop: '4px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--navy)' }}>PATIENT CITY</label>
                    <input 
                      type="text" 
                      value={patientCity} 
                      onChange={(e) => setPatientCity(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '13px',
                        marginTop: '4px'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* INSTANT VS SCHEDULED TOGGLE */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                  WHEN IS ASSISTANCE NEEDED?
                </label>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setBookingMode('instant')}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: bookingMode === 'instant' ? '2px solid var(--teal-primary)' : '1px solid var(--border-color)',
                    backgroundColor: bookingMode === 'instant' ? 'var(--mint-soft)' : 'var(--white)',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: 'var(--navy)',
                    cursor: 'pointer'
                  }}
                >
                  ⚡ Instant (Within 30 mins)
                </button>
                <button
                  type="button"
                  onClick={() => setBookingMode('scheduled')}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: bookingMode === 'scheduled' ? '2px solid var(--teal-primary)' : '1px solid var(--border-color)',
                    backgroundColor: bookingMode === 'scheduled' ? 'var(--mint-soft)' : 'var(--white)',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: 'var(--navy)',
                    cursor: 'pointer'
                  }}
                >
                  📅 Schedule For Later
                </button>
              </div>

              {bookingMode === 'scheduled' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                  <input 
                    type="date" 
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
                  />
                  <input 
                    type="text" 
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    placeholder="e.g. 10:30 AM"
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
                  />
                </div>
              )}
            </div>

            {/* LOCATION SELECTOR */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
                  PICKUP LOCATION / HOME
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} color="var(--teal-primary)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input 
                    type="text"
                    value={pickupLoc}
                    onChange={(e) => setPickupLoc(e.target.value)}
                    placeholder="Enter pickup home address"
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy)', display: 'block', marginBottom: '6px' }}>
                  DESTINATION (HOSPITAL / LAB / CLINIC)
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} color="var(--navy)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input 
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Search hospital or lab name"
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* DURATION & ASSISTANCE TYPES */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                  ESTIMATED DURATION
                </label>
                <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--teal-primary)' }}>
                  {durationHours} Hours
                </span>
              </div>
              <input 
                type="range"
                min="1"
                max="8"
                value={durationHours}
                onChange={(e) => setDurationHours(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <span>1 hr (Quick OPD)</span>
                <span>4 hrs (Diagnostic & Consult)</span>
                <span>8 hrs (Full Day Hospitalization)</span>
              </div>
            </div>

            {/* ASSISTANCE PACKAGES */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)', display: 'block', marginBottom: '10px' }}>
                SELECT ASSISTANCE & TRANSPORT TYPE
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {Object.entries(baseRates).map(([key, val]) => (
                  <div 
                    key={key}
                    onClick={() => setAssistanceType(key)}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      border: assistanceType === key ? '2px solid var(--teal-primary)' : '1px solid var(--border-color)',
                      backgroundColor: assistanceType === key ? 'var(--mint-soft)' : 'var(--white)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>{val.name}</span>
                      <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--teal-dark)' }}>₹{val.rate}/hr</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TRANSPARENT PRICING BREAKDOWN */}
            <div style={{
              backgroundColor: 'var(--bg-page)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid var(--border-color)',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--navy)', marginBottom: '12px' }}>
                TRANSPARENT COST ESTIMATION
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Companion Fee ({durationHours} hrs @ ₹{selectedRateObj.rate}/hr)</span>
                  <span style={{ fontWeight: '600', color: 'var(--navy)' }}>₹{companionFee}</span>
                </div>
                {transportFee > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Transport ({selectedRateObj.name} • {estDistanceKm} km)</span>
                    <span style={{ fontWeight: '600', color: 'var(--navy)' }}>₹{transportFee}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-color)', fontSize: '16px', fontWeight: '800', color: 'var(--navy)' }}>
                  <span>Estimated Total</span>
                  <span style={{ color: 'var(--teal-primary)' }}>₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* CONFIRM BOOKING BUTTON */}
            <button
              onClick={() => setStep('active_tracking')}
              className="jp-btn jp-btn-primary jp-btn-lg"
              style={{ width: '100%' }}
            >
              <span>Confirm & Dispatch Companion</span>
              <ArrowRight size={18} />
            </button>
            <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px' }}>
              Cancel free anytime up to 15 mins before dispatch. Live GPS & updates provided.
            </p>

          </div>
        )}

        {/* STEP 3: LIVE ACTIVE TRACKING SIMULATOR */}
        {step === 'active_tracking' && (
          <div style={{ padding: '28px' }}>
            
            {/* Companion Driver Info Header Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'var(--navy)',
              color: 'var(--white)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--teal-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '20px',
                  color: 'var(--white)'
                }}>
                  RK
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700' }}>Rajesh Kumar</div>
                  <div style={{ fontSize: '12px', color: 'var(--mint-hover)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Verified Healthcare Escort</span>
                    <span>•</span>
                    <span>⭐ 4.9 (140+ visits)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: 'var(--white)',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Phone size={14} />
                  <span>Call Companion</span>
                </button>
              </div>
            </div>

            {/* Remote family notification banner */}
            <div style={{
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: 'var(--mint-soft)',
              border: '1px solid var(--teal-bright)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bell size={18} color="var(--teal-primary)" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                  Family Notification Active: Bangalore → {patientName} ({patientCity})
                </span>
              </div>
              <span className="jp-badge jp-badge-success">LIVE GPS</span>
            </div>

            {/* TRACKING TIMELINE STEPS */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--navy)', marginBottom: '16px' }}>
                CARE JOURNEY STATUS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {TRACKING_STEPS.map((tStep, idx) => {
                  const isDone = idx <= trackingStepIndex;
                  const isCurrent = idx === trackingStepIndex;

                  return (
                    <div key={idx} style={{
                      display: 'flex',
                      gap: '16px',
                      opacity: isDone ? 1 : 0.45
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: isCurrent ? 'var(--teal-primary)' : isDone ? 'var(--navy)' : 'var(--border-color)',
                          color: 'var(--white)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: '800',
                          boxShadow: isCurrent ? '0 0 0 4px var(--mint-soft)' : 'none'
                        }}>
                          {isDone ? '✓' : idx + 1}
                        </div>
                        {idx < TRACKING_STEPS.length - 1 && (
                          <div style={{
                            width: '2px',
                            height: '32px',
                            backgroundColor: isDone ? 'var(--navy)' : 'var(--border-color)',
                            margin: '4px 0'
                          }} />
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '14px', fontWeight: isCurrent ? '800' : '700', color: isCurrent ? 'var(--teal-primary)' : 'var(--navy)' }}>
                            {tStep.title} {isCurrent && <span style={{ fontSize: '10px', backgroundColor: 'var(--mint-soft)', padding: '2px 8px', borderRadius: '4px', marginLeft: '6px' }}>IN PROGRESS</span>}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{tStep.time}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {tStep.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SIMULATOR STEP CONTROLLER BUTTON */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <button
                onClick={() => setTrackingStepIndex((prev) => Math.min(prev + 1, TRACKING_STEPS.length - 1))}
                className="jp-btn jp-btn-secondary jp-btn-sm"
              >
                <RefreshCw size={14} />
                <span>Simulate Next Update Step</span>
              </button>

              <button
                onClick={() => setStep('details')}
                className="jp-btn jp-btn-outline jp-btn-sm"
              >
                <span>Edit Booking</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
