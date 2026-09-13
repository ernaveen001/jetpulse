import React from 'react';

export default function JetPulseLogo({ size = 38, showText = true, textColor = 'var(--navy)', lightMode = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      {/* Official JetPulse Logo Icon */}
      <div 
        className="logo-shine-box"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#041B32',
          border: '1px solid rgba(24, 184, 173, 0.4)',
          flexShrink: 0
        }}
      >
        <img 
          src="/logo.png" 
          alt="JetPulse Logo" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }} 
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: `${size * 0.58}px`,
            fontWeight: '800',
            color: lightMode ? 'var(--white)' : textColor,
            letterSpacing: '-0.03em',
            display: 'block',
            lineHeight: 1
          }}>
            Jet<span className="shine-text">Pulse</span>
          </span>
          <span style={{
            fontSize: `${Math.max(9, size * 0.26)}px`,
            fontWeight: '700',
            color: lightMode ? '#A0B2C6' : 'var(--text-secondary)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: '2px'
          }}>
            Healthcare, Handled.
          </span>
        </div>
      )}
    </div>
  );
}
