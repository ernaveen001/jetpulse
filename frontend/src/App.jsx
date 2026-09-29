import React, { useState } from 'react';

import { Twitter, Linkedin, Mail, CheckCircle, Clock, Instagram } from 'lucide-react';

const WhatsAppIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      // IMPORTANT: Replace 'YOUR_FORM_ID' with the endpoint ID you get from Formspree.io
      const response = await fetch('https://formspree.io/f/xdekygoq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      // We show the success UI if Formspree accepts it
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Oops! There was a problem submitting your form. Make sure you set up your Formspree ID.");
      }
    } catch (error) {
      alert("Oops! There was a network error submitting your form.");
    }
  };

  return (
    <div className="app-container">
      {/* Professional Navigation */}
      <nav className="nav-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="logo-wrapper">
            <img src="/logo.png" alt="JetPulse Logo" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#123B5D', letterSpacing: '-0.01em' }}>
            JetPulse
          </span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="registration-card">
          <h1 className="card-heading">
            Day 101 Building
          </h1>

          <p style={{
            fontSize: '1rem',
            fontWeight: '400',
            color: '#64748b',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
          }}>
            We are planning to launch a revolutionary startup in healthcare. Stay tuned for updates as we build the future. Join our professional network to secure priority access upon launch.
          </p>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', width: '100%', marginBottom: '1.5rem' }}></div>

          {/* Registration Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ textAlign: 'left', width: '100%' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#123B5D', marginBottom: '0.5rem' }}>
                Corporate or Personal Email
              </label>
              <div className="form-container">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                  aria-label="Email Address"
                />
                <button type="submit" className="submit-btn">
                  Request Access
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.4 }}>
                <CheckCircle size={14} color="#0F766E" style={{ flexShrink: 0, marginTop: '2px' }} /> 
                <span>Early registration guarantees an invitation to the closed beta.</span>
              </p>
            </form>
          ) : (
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#DDF5EF',
              border: '1px solid #14B8A6',
              borderRadius: '8px',
              color: '#0F766E',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: '500'
            }}>
              <CheckCircle size={20} />
              Registration received. We will contact you shortly.
            </div>
          )}

        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918851589819?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20JetPulse."
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={32} />
      </a>

      {/* Professional Footer */}
      <footer className="footer-section">
        <h3 style={{ fontSize: '1.1rem', color: '#123B5D', marginBottom: '1.25rem', fontWeight: '700' }}>
          Follow our Journey & Stay Tuned
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {[
            { icon: Linkedin, link: 'https://www.linkedin.com/company/jetpulsein/', label: 'LinkedIn' },
            { icon: Instagram, link: 'https://www.instagram.com/jetpulsecare/', label: 'Instagram' },
            { icon: Mail, link: 'mailto:jetpulsein@gmail.com', label: 'Email' },
            { icon: WhatsAppIcon, link: 'https://wa.me/918851589819?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20JetPulse.', label: 'WhatsApp' }
          ].map((social, idx) => (
            <a key={idx} href={social.link} target="_blank" rel="noreferrer" className="social-icon" aria-label={social.label}>
              <social.icon size={22} />
            </a>
          ))}
        </div>

        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} JetPulse Healthcare. All rights reserved.
        </p>
      </footer>

      <style>
        {`
          * { box-sizing: border-box; }
          body {
            margin: 0; padding: 0;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #fbfcfd;
            color: #1e293b;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow-x: hidden;
          }
          .nav-header {
            width: 100%;
            height: 72px;
            background-color: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            padding: 0 5%;
            position: sticky;
            top: 0;
            z-index: 50;
          }
          .logo-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            padding: 4px;
            flex-shrink: 0;
          }
          .logo-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem 1.25rem;
            width: 100%;
          }
          .registration-card {
            background-color: #ffffff;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
            max-width: 560px;
            width: 100%;
            border: 1px solid #e2e8f0;
            text-align: center;
          }
          .card-heading {
            font-size: clamp(2rem, 6vw, 2.5rem);
            font-weight: 800;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #0F766E, #14B8A6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
            letter-spacing: -0.02em;
          }
          .form-container {
            display: flex;
            gap: 0.75rem;
            width: 100%;
            align-items: stretch;
          }
          .email-input {
            flex: 1;
            width: 100%;
            padding: 0.875rem 1rem;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
            font-size: 0.95rem;
            outline: none;
            transition: all 0.2s;
            background-color: #f8fafc;
            color: #1e293b;
          }
          .email-input:focus {
            border-color: #0F766E;
            background-color: #ffffff;
            box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
          }
          .submit-btn {
            padding: 0.875rem 1.5rem;
            border-radius: 8px;
            border: none;
            background: linear-gradient(to right, #0F766E, #14B8A6);
            color: white;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(20, 184, 166, 0.25);
            white-space: nowrap;
          }
          .submit-btn:hover { opacity: 0.95; transform: translateY(-1px); }
          .submit-btn:active { transform: translateY(1px); }
          .footer-section {
            background-color: #DDF5EF;
            border-top: 1px solid #e2e8f0;
            padding: 2rem 5%;
            text-align: center;
            margin-top: auto;
            width: 100%;
          }
          .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 50%;
            color: #0F766E;
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .social-icon:hover {
            background-color: #0F766E;
            color: #ffffff;
            border-color: #0F766E;
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(15, 118, 110, 0.2);
          }
          .whatsapp-float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #25D366;
            color: #FFF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 6px 16px rgba(37, 211, 102, 0.4);
            z-index: 100;
            transition: all 0.3s ease;
          }
          .whatsapp-float:hover {
            transform: scale(1.1) translateY(-4px);
            box-shadow: 0px 10px 24px rgba(37, 211, 102, 0.5);
          }
          
          /* Mobile Responsiveness */
          @media (max-width: 600px) {
            .whatsapp-float {
              width: 55px;
              height: 55px;
              bottom: 25px;
              right: 25px;
            }
            .registration-card {
              padding: 1.75rem 1.25rem;
            }
            .form-container {
              flex-direction: column;
            }
            .submit-btn {
              width: 100%;
            }
            .nav-header {
              padding: 0 1rem;
            }
          }
        `}
      </style>
    </div>
  );
}
