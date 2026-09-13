import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Compass, ShieldCheck, CheckCircle2, Play, Pause, ChevronRight, Activity } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: "Feeling unwell and alone?",
    subtitle: "Sick at home with fever or acute illness? Get a verified companion to pick you up from your doorstep, bring meds, and escort you safely to care.",
    tag: "Young Professionals & Students",
    badgeColor: "#EAF8F6",
    tagColor: "#0F9F96",
    image: "/scenarios/scenario1.jpg",
  },
  {
    id: 2,
    title: "Need someone by your side?",
    subtitle: "Navigating complex doctor appointments, OPD tokens, or multi-department clinics with an attentive healthcare partner.",
    tag: "Individual Outpatients",
    badgeColor: "#EAF8F6",
    tagColor: "#0F9F96",
    image: "/scenarios/scenario2.jpg",
  },
  {
    id: 3,
    title: "Need help getting your tests done?",
    subtitle: "Fast-track diagnostics at blood banks, MRI labs, scan centers, and radiology clinics with a file-organized companion.",
    tag: "Diagnostic Assistance",
    badgeColor: "#EAF8F6",
    tagColor: "#0F9F96",
    image: "/scenarios/scenario3.jpg",
  },
  {
    id: 4,
    title: "Hospital visit or admission?",
    subtitle: "From TPA insurance authorization and admission desk paperwork to finding rooms and wheeling to wards.",
    tag: "Hospital Navigation",
    badgeColor: "#EAF8F6",
    tagColor: "#0F9F96",
    image: "/scenarios/scenario4.jpg",
  },
  {
    id: 5,
    title: "Need help for someone far away?",
    subtitle: "Living in Bangalore or abroad? Arrange a trusted local companion for your loved one in Varanasi, Jaipur, or Delhi with live updates.",
    tag: "Remote Family Booking",
    badgeColor: "#EAF8F6",
    tagColor: "#0F9F96",
    image: "/scenarios/scenario5.jpg",
  },
  {
    id: 6,
    title: "Support after hospital discharge",
    subtitle: "Getting home post-surgery or post-illness requires safe doorstep transport, prescription collection, and setup support.",
    tag: "Post-Discharge Care",
    badgeColor: "#EAF8F6",
    tagColor: "#0F9F96",
    image: "/scenarios/scenario6.jpg",
  }
];

export default function Hero({ onOpenBooking, onNavigateNavigator }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imgKey, setImgKey] = useState(0); // force re-mount to trigger CSS animation

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setImgKey((k) => k + 1); // triggers heroFadeIn animation
  }, []);

  // Auto-rotate slides every 4.5 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % HERO_SLIDES.length;
        setImgKey((k) => k + 1);
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="hero-section">
      <div className="jp-container">
        <div className="hero-grid">

          {/* ── LEFT CONTENT ───────────────────────────── */}
          <div className="animate-fade-in">

            {/* Position Statement Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '99px',
              backgroundColor: 'var(--white)',
              border: '1px solid var(--border-color)',
              marginBottom: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--teal-primary)'
              }} />
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy)' }}>
                For students, professionals, families & recovery care
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title" style={{ marginBottom: '16px' }}>
              Healthcare is hard to handle alone. <br />
              <span className="shine-text">We're here to help.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '560px'
            }}>
              From doctor visits and diagnostic tests to hospital assistance and healthcare navigation,{' '}
              <strong>JetPulse</strong> helps you handle the parts of healthcare you shouldn't have to manage alone.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '36px'
            }}>
              <button
                onClick={onOpenBooking}
                className="jp-btn jp-btn-primary jp-btn-lg shine-button"
                id="hero-get-assistance-btn"
              >
                <span>Get Assistance</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>

              <button
                onClick={onNavigateNavigator}
                className="jp-btn jp-btn-secondary jp-btn-lg"
                id="hero-navigator-btn"
              >
                <Compass size={18} aria-hidden="true" />
                <span>Explore Care Navigator</span>
              </button>
            </div>

            {/* Trust Statement */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--text-secondary)',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="var(--teal-primary)" aria-hidden="true" />
                <span>Verified companions</span>
              </div>
              <span style={{ color: 'var(--border-color)' }} aria-hidden="true">•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--teal-primary)" aria-hidden="true" />
                <span>Transparent pricing</span>
              </div>
              <span style={{ color: 'var(--border-color)' }} aria-hidden="true">•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={16} color="var(--teal-primary)" aria-hidden="true" />
                <span>Family visibility</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT VISUAL SLIDESHOW ──────────────────── */}
          <div>
            <div className="hero-panel">

              {/* SLIDE TOP BAR */}
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(248, 250, 250, 0.95)'
              }}>
                <span className="jp-badge" style={{
                  backgroundColor: slide.badgeColor,
                  color: slide.tagColor,
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  {slide.tag}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    Scenario {currentSlide + 1} of {HERO_SLIDES.length}
                  </span>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--navy)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px',
                      borderRadius: '6px'
                    }}
                    aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                  >
                    {isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
                  </button>
                </div>
              </div>

              {/* SLIDE IMAGE with crossfade */}
              <div
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
                style={{
                  height: '280px',
                  position: 'relative',
                  backgroundColor: '#041B32',
                  overflow: 'hidden'
                }}
              >
                <img
                  key={imgKey}
                  src={slide.image}
                  alt={`${slide.tag}: ${slide.title}`}
                  loading="lazy"
                  className="hero-slide-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Gradient overlay for text legibility */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(4, 27, 50, 0.5) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }} />

                {/* Trust Badge overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(8, 43, 76, 0.85)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  color: 'var(--white)',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <ShieldCheck size={14} color="var(--teal-bright)" aria-hidden="true" />
                  <span>Verified JetPulse Escort</span>
                </div>
              </div>

              {/* SLIDE CAPTION */}
              <div style={{
                padding: '24px',
                backgroundColor: 'var(--white)',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <h3 style={{
                  fontSize: '19px',
                  fontWeight: '700',
                  color: 'var(--navy)',
                  marginBottom: '8px'
                }}>
                  "{slide.title}"
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '20px'
                }}>
                  {slide.subtitle}
                </p>

                {/* SLIDE INDICATORS & CONTROLS */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div
                    role="tablist"
                    aria-label="Scenario slides"
                    style={{ display: 'flex', gap: '6px' }}
                  >
                    {HERO_SLIDES.map((_, index) => (
                      <button
                        key={index}
                        role="tab"
                        aria-selected={index === currentSlide}
                        aria-label={`Go to scenario ${index + 1}`}
                        onClick={() => {
                          goToSlide(index);
                          setIsPlaying(false);
                        }}
                        style={{
                          height: '6px',
                          width: index === currentSlide ? '28px' : '8px',
                          borderRadius: '3px',
                          backgroundColor: index === currentSlide ? 'var(--teal-primary)' : 'var(--border-color)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          padding: 0
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={onOpenBooking}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: 'var(--teal-primary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px 0'
                    }}
                  >
                    <span>Book for this scenario</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>

            </div>
          </div>
          {/* ──────────────────────────────────────────────── */}

        </div>
      </div>
    </section>
  );
}
