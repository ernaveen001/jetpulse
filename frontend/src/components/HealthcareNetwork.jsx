import React, { useState } from 'react';
import { Building2, Stethoscope, TestTube, Pill, MapPin, Search, Star, Map, List, ExternalLink, ChevronRight, ShieldCheck } from 'lucide-react';

const NETWORK_PROVIDERS = [
  {
    id: 1,
    name: "Apollo Hospitals Multi-Specialty",
    category: "Hospitals",
    distance: "1.4 km",
    address: "Koramangala, Bangalore",
    rating: 4.8,
    reviews: 840,
    services: "Emergency • TPA Cashless Escort • Multi-OPD",
    status: "Open 24/7",
    isSponsored: false
  },
  {
    id: 2,
    name: "Max Healthcare & Diagnostic Clinic",
    category: "Clinics",
    distance: "2.1 km",
    address: "Indiranagar 100ft Rd, Bangalore",
    rating: 4.9,
    reviews: 620,
    services: "General Physician • Orthopedics • Fast-track OPD",
    status: "Open until 9:00 PM",
    isSponsored: true // SPONSORED distinction
  },
  {
    id: 3,
    name: "Metropolis Radiology & MRI Scan Center",
    category: "Labs",
    distance: "0.8 km",
    address: "Koramangala 80ft Rd, Bangalore",
    rating: 4.7,
    reviews: 310,
    services: "Blood Test • MRI / CT Scan • Ultrasound",
    status: "Home collection available",
    isSponsored: false
  },
  {
    id: 4,
    name: "Apollo Pharmacy & Healthcare Supplies",
    category: "Pharmacies",
    distance: "0.5 km",
    address: "SG Palya, Bangalore",
    rating: 4.6,
    reviews: 190,
    services: "Prescription Medicines • Home Delivery",
    status: "Open 24 Hours",
    isSponsored: false
  }
];

export default function HealthcareNetwork({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list");

  const filteredProviders = NETWORK_PROVIDERS.filter(p => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="network" style={{
      padding: '80px 0',
      backgroundColor: 'var(--white)',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="jp-container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="jp-badge jp-badge-navy" style={{ marginBottom: '12px' }}>
            Verified Healthcare Partners
          </span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>
            Healthcare options around you.
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Discover trusted hospitals, clinics, diagnostic centers, and pharmacies near your area.
          </p>
        </div>

        {/* CONTROLS STRIP */}
        <div style={{
          backgroundColor: 'var(--bg-page)',
          borderRadius: '16px',
          padding: '16px 20px',
          border: '1px solid var(--border-color)',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {["All", "Hospitals", "Clinics", "Labs", "Pharmacies"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: selectedCategory === cat ? '2px solid var(--teal-primary)' : '1px solid var(--border-color)',
                  backgroundColor: selectedCategory === cat ? 'var(--mint-soft)' : 'var(--white)',
                  color: selectedCategory === cat ? 'var(--teal-dark)' : 'var(--navy)',
                  fontWeight: selectedCategory === cat ? '700' : '500',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar & View Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '240px' }}>
              <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search provider or area..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '13px'
                }}
              />
            </div>

            <div style={{ display: 'flex', backgroundColor: 'var(--white)', border: '1px solid var(--border-color)', padding: '2px', borderRadius: '8px' }}>
              <button
                onClick={() => setViewMode("list")}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'list' ? 'var(--mint-soft)' : 'transparent',
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
                onClick={() => setViewMode("map")}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'map' ? 'var(--mint-soft)' : 'transparent',
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
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* PROVIDER RESULTS */}
        {viewMode === 'list' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }} className="network-grid">
            {filteredProviders.map((item) => (
              <div key={item.id} className="jp-card jp-card-interactive" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="jp-badge jp-badge-mint">
                      {item.category}
                    </span>
                    {item.isSponsored ? (
                      <span className="jp-badge jp-badge-sponsored">
                        SPONSORED
                      </span>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--teal-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ShieldCheck size={14} /> Verified Partner
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--navy)', marginBottom: '6px' }}>
                    {item.name}
                  </h3>

                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>📍 {item.distance}</span>
                    <span>•</span>
                    <span>{item.address}</span>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--navy)', fontWeight: '500', marginBottom: '16px', backgroundColor: 'var(--bg-page)', padding: '8px 12px', borderRadius: '8px' }}>
                    {item.services}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#D97706', fontWeight: '700' }}>⭐ {item.rating}</span> ({item.reviews} reviews)
                  </div>

                  <button 
                    onClick={onOpenBooking}
                    className="jp-btn jp-btn-primary jp-btn-sm"
                  >
                    <span>Get Assistance Here</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* MAP VIEW SIMULATION */
          <div style={{
            height: '380px',
            borderRadius: '20px',
            backgroundColor: '#EBF4F4',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <span style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: '700', backgroundColor: 'var(--white)', padding: '12px 24px', borderRadius: '30px', boxShadow: 'var(--shadow-md)' }}>
              Interactive Network Map Container • 4 Partner Providers Listed
            </span>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 900px) {
          .network-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
