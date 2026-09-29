import React, { useState } from 'react';
import { LayoutDashboard, Plus, Home, Calendar, UserCheck, Compass, Users, Activity, FileText, MessageSquare, Settings, Bell, Search, ArrowRight, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import JetPulseLogo from './JetPulseLogo';

export default function SaaSAppDashboard({ onOpenBooking, onNavigateNavigator, onSwitchToLanding }) {
  const [activeMenu, setActiveMenu] = useState('home');

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-page)',
      color: 'var(--text-primary)'
    }} className="saas-app-shell">

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside style={{
        backgroundColor: 'var(--navy)',
        color: 'var(--white)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid rgba(255,255,255,0.08)'
      }} className="saas-sidebar">
        <div>
          {/* Logo Header */}
          <div 
            onClick={onSwitchToLanding}
            style={{ marginBottom: '24px', padding: '0 8px', cursor: 'pointer' }}
          >
            <JetPulseLogo size={36} lightMode={true} />
          </div>

          {/* + New Care Journey */}
          <button 
            onClick={onOpenBooking}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: 'var(--teal-primary)',
              color: 'var(--white)',
              fontWeight: '700',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
              boxShadow: '0 4px 12px rgba(15,159,150,0.3)'
            }}
          >
            <Plus size={18} />
            <span>+ New Care Journey</span>
          </button>

          {/* Menu Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'home', label: 'Home Dashboard', icon: Home },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'companion', label: 'Companion Bookings', icon: UserCheck },
              { id: 'navigator', label: 'Care Navigator AI', icon: Compass },
              { id: 'family', label: 'Family Ecosystem', icon: Users },
              { id: 'journeys', label: 'Health Journeys', icon: Activity },
              { id: 'documents', label: 'Documents & Vault', icon: FileText },
              { id: 'messages', label: 'Messages & Updates', icon: MessageSquare },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((menu) => {
              const Icon = menu.icon;
              const isActive = activeMenu === menu.id;
              return (
                <button
                  key={menu.id}
                  onClick={() => {
                    setActiveMenu(menu.id);
                    if (menu.id === 'companion') onOpenBooking();
                    if (menu.id === 'navigator') onNavigateNavigator();
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? 'rgba(15, 159, 150, 0.25)' : 'transparent',
                    color: isActive ? 'var(--white)' : '#A0B2C6',
                    fontWeight: isActive ? '700' : '500',
                    fontSize: '13px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={16} color={isActive ? 'var(--teal-bright)' : '#A0B2C6'} />
                  <span>{menu.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* User Account Capsule */}
        <div style={{
          padding: '12px 14px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'var(--teal-primary)',
            color: 'var(--white)',
            fontWeight: '800',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            AS
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--white)', whiteSpace: 'nowrap' }}>
              Arjun Sharma
            </div>
            <div style={{ fontSize: '11px', color: '#A0B2C6' }}>
              Bangalore • Pro Family Plan
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN DASHBOARD CONTENT */}
      <main style={{ padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* TOP DASHBOARD HEADER */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--navy)' }}>
              Good morning, Arjun
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={onSwitchToLanding}
              className="jp-btn jp-btn-outline jp-btn-sm"
            >
              <span>Back to Brand Website</span>
            </button>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--white)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--navy)',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--teal-primary)' }} />
            </div>
          </div>
        </div>

        {/* QUICK HELP LAUNCHPAD */}
        <div style={{
          backgroundColor: 'var(--white)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--navy)', marginBottom: '16px' }}>
            What would you like help with today?
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }} className="dashboard-quick-actions">
            
            <button
              onClick={onOpenBooking}
              style={{
                padding: '16px 20px',
                borderRadius: '14px',
                backgroundColor: 'var(--mint-soft)',
                border: '1.5px solid rgba(15,159,150,0.3)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-dark)', fontWeight: '800', fontSize: '15px', marginBottom: '4px' }}>
                <UserCheck size={18} />
                <span>Get a Companion</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Instant or scheduled clinic & OPD escort for you or family in another city.
              </p>
            </button>

            <button
              onClick={onNavigateNavigator}
              style={{
                padding: '16px 20px',
                borderRadius: '14px',
                backgroundColor: 'rgba(8, 43, 76, 0.04)',
                border: '1.5px solid var(--border-color)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy)', fontWeight: '800', fontSize: '15px', marginBottom: '4px' }}>
                <Compass size={18} />
                <span>Find Care (AI)</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Tell us symptoms or upload reports to discover verified local providers.
              </p>
            </button>

            <button
              onClick={onOpenBooking}
              style={{
                padding: '16px 20px',
                borderRadius: '14px',
                backgroundColor: 'var(--white)',
                border: '1.5px solid var(--border-color)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy)', fontWeight: '800', fontSize: '15px', marginBottom: '4px' }}>
                <Users size={18} />
                <span>Add Family Member</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Connect parents in Varanasi or Jaipur for remote updates.
              </p>
            </button>

          </div>
        </div>

        {/* 2-COLUMN DASHBOARD GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '24px'
        }} className="dashboard-grid">

          {/* LEFT: UPCOMING APPOINTMENTS & ACTIVE JOURNEYS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Active Companion Journey Card */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--teal-primary)' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy)' }}>
                    Active Companion Journey
                  </h3>
                </div>
                <span className="jp-badge jp-badge-mint">LIVE DISPATCH</span>
              </div>

              <div style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-page)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '14px'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--navy)', marginBottom: '4px' }}>
                  Sunita Sharma (Mom) • Varanasi
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  Apollo Spectra Cardiology OPD Escort (Car)
                </div>
                <div style={{ fontSize: '12px', color: 'var(--teal-dark)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} />
                  <span>Companion Rajesh Kumar at OPD Token Desk #42</span>
                </div>
              </div>

              <button 
                onClick={onOpenBooking}
                className="jp-btn jp-btn-outline jp-btn-sm"
                style={{ width: '100%' }}
              >
                <span>Track Live Progress & GPS</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Upcoming Appointments */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '20px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy)', marginBottom: '16px' }}>
                Upcoming Family Appointments
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-page)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                      Physiotherapy Session #2
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      Sunita Sharma (Mom) • 31 Aug 10:00 AM • CareMax Physio
                    </div>
                  </div>
                  <span className="jp-badge jp-badge-navy">Companion Booked</span>
                </div>

                <div style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-page)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                      Aarav (Son) School Dental Screening
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      Aarav Sharma • 02 Sept 04:00 PM • Bangalore
                    </div>
                  </div>
                  <button onClick={onOpenBooking} style={{ fontSize: '11px', color: 'var(--teal-primary)', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer' }}>
                    + Add Companion
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: RECENT REPORTS & FAMILY UPDATES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Family Live Feed */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '20px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy)', marginBottom: '16px' }}>
                Recent Family Updates
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--teal-primary)', marginTop: '6px' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                      Prescription Uploaded by Companion
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      Rajesh K. uploaded Cardiology_Rx_Aug29.pdf for Sunita (Mom).
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--navy)', marginTop: '6px' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                      Lab MRI Report Digitized
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      Metropolis Diagnostics released Bilateral Knee MRI summary.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      <style>{`
        @media (max-width: 1024px) {
          .saas-app-shell {
            grid-template-columns: 1fr !important;
          }
          .saas-sidebar {
            display: none !important;
          }
          .dashboard-quick-actions, .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
