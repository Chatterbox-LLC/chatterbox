'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import '../styles/main.css'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const messages = [
    "Hey! How's your day going? 😊",
    "Want to grab coffee later? ☕",
    "Just saw the funniest meme! 😂",
    "Working on something exciting! 🚀"
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex]
    let index = 0
    
    const typeInterval = setInterval(() => {
      if (index <= currentMessage.length) {
        setTypedText(currentMessage.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [currentMessageIndex])

  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: "Real-time Messaging",
      description: "Instant message delivery with read receipts, typing indicators, and seamless synchronization across all devices."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "Group Chats",
      description: "Create unlimited group conversations with up to 500 members. Perfect for teams, families, and communities."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: "End-to-End Encryption",
      description: "Your conversations are protected with military-grade encryption. Only you and your contacts can read your messages."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: "Cross-Platform",
      description: "Available on iOS, Android, Web, Windows, and Mac. Start a conversation on one device and continue on another."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
      title: "Smart Features",
      description: "AI-powered message suggestions, smart replies, language translation, and advanced search capabilities."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.828 14.828a4 4 0 0 1-5.656 0"/>
          <path d="M9 9h.01"/>
          <path d="M15 9h.01"/>
          <path d="M16 5c0 2-2 3-4 3s-4-1-4-3a4 4 0 0 1 8 0z"/>
          <path d="M12 1v4"/>
        </svg>
      ),
      title: "Rich Media Sharing",
      description: "Share photos, videos, documents, voice messages, and location. Express yourself with stickers and GIFs."
    }
  ]

  return (
    <>
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav className="nav">
            <Link href="/" className="logo">
              <div className="logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              Chatterbox
            </Link>

            <ul className="nav-links">
              <li><Link href="/" className="nav-link active">Home</Link></li>
              <li><Link href="/features" className="nav-link">Features</Link></li>
              <li><Link href="/download" className="nav-link">Download</Link></li>
              <li><Link href="/support" className="nav-link">Support</Link></li>
              <li><Link href="/about" className="nav-link">About</Link></li>
            </ul>

            <div className="nav-buttons">
              <Link href="/signin" className="btn btn-secondary">Sign In</Link>
              <Link href="/signup" className="btn btn-primary">Get Started</Link>
            </div>

            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content fade-in-up">
              <h1 className="hero-title">
                Connect, Chat, and
                <br />
                <span className="gradient-text">Share Moments</span>
              </h1>
              <p className="hero-subtitle">
                The most intuitive messaging app that brings people together. 
                Send messages, make calls, and share memories with friends and family worldwide.
              </p>
              <div className="hero-buttons">
                <Link href="/signup" className="btn btn-primary btn-large">
                  Start Chatting
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"/>
                    <path d="M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link href="/download" className="btn btn-outline btn-large">
                  Download App
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">50M+</span>
                  <span className="stat-label">Active Users</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1B+</span>
                  <span className="stat-label">Messages Sent</span>
                </div>
                <div className="stat">
                  <span className="stat-number">180+</span>
                  <span className="stat-label">Countries</span>
                </div>
              </div>
            </div>
            
            <div className="hero-visual fade-in-right">
              <div className="chat-mockup">
                <div className="chat-header">
                  <div className="chat-avatar">
                    <div className="avatar-img"></div>
                  </div>
                  <div className="chat-info">
                    <h4>Sarah Johnson</h4>
                    <span className="status online">Online</span>
                  </div>
                  <div className="chat-actions">
                    <button className="action-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </button>
                    <button className="action-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="chat-messages">
                  <div className="message received">
                    <div className="message-content">
                      <p>Hey! How's your day going? 😊</p>
                      <span className="message-time">2:30 PM</span>
                    </div>
                  </div>
                  <div className="message sent">
                    <div className="message-content">
                      <p>Great! Just finished the presentation 🎉</p>
                      <span className="message-time">2:32 PM</span>
                    </div>
                  </div>
                  <div className="message received">
                    <div className="message-content">
                      <p>Awesome! Want to celebrate? 🎊</p>
                      <span className="message-time">2:33 PM</span>
                    </div>
                  </div>
                  <div className="typing-indicator">
                    <div className="typing-content">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <p className="typing-text">{typedText}</p>
                    </div>
                  </div>
                </div>
                <div className="chat-input">
                  <input type="text" placeholder="Type a message..." />
                                    <button className="send-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section-large">
        <div className="container">
          <div className="features-header">
            <h2 className="section-title">Why Choose Chatterbox?</h2>
            <p className="section-subtitle">
              Experience the next generation of messaging with features designed to keep you connected, 
              secure, and engaged with the people who matter most.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download-section">
        <div className="container">
          <div className="download-content">
            <div className="download-text">
              <h2 className="download-title">Get Chatterbox on All Your Devices</h2>
              <p className="download-subtitle">
                Download our app and start connecting with friends and family across all platforms. 
                Seamless synchronization keeps your conversations up-to-date everywhere.
              </p>
              <div className="download-buttons">
                <a href="#" className="download-btn">
                  <div className="download-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  </div>
                  <div className="download-text-content">
                    <span className="download-label">Download on the</span>
                    <span className="download-store">App Store</span>
                  </div>
                </a>
                <a href="#" className="download-btn">
                  <div className="download-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.699 12l1.999-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                    </svg>
                  </div>
                  <div className="download-text-content">
                    <span className="download-label">Get it on</span>
                    <span className="download-store">Google Play</span>
                  </div>
                </a>
              </div>
              <div className="platform-links">
                <Link href="/download/windows" className="platform-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.851"/>
                  </svg>
                  Windows
                </Link>
                <Link href="/download/mac" className="platform-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C6.396 0 1.807 4.582 1.807 10.204 1.807 15.826 6.396 20.408 12.017 20.408 17.637 20.408 22.226 15.826 22.226 10.204 22.226 4.582 17.637 0 12.017 0z"/>
                  </svg>
                  macOS
                </Link>
                <Link href="/web" className="platform-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Web App
                </Link>
              </div>
            </div>
            <div className="download-visual">
              <div className="devices-mockup">
                <div className="device phone">
                  <div className="device-screen">
                    <div className="app-interface">
                      <div className="chat-list">
                        <div className="chat-item active">
                          <div className="chat-avatar small"></div>
                          <div className="chat-preview">
                            <h5>Sarah Johnson</h5>
                            <p>Hey! How's your day going? 😊</p>
                          </div>
                          <span className="chat-time">2:30</span>
                        </div>
                        <div className="chat-item">
                          <div className="chat-avatar small"></div>
                          <div className="chat-preview">
                            <h5>Team Project</h5>
                            <p>Great work everyone! 🎉</p>
                          </div>
                          <span className="chat-time">1:45</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="device tablet">
                  <div className="device-screen">
                    <div className="app-interface tablet-layout">
                      <div className="sidebar">
                        <div className="chat-item">
                          <div className="chat-avatar small"></div>
                          <span>Sarah</span>
                        </div>
                        <div className="chat-item">
                          <div className="chat-avatar small"></div>
                          <span>Team</span>
                        </div>
                      </div>
                      <div className="main-chat">
                        <div className="message-bubble">Hello!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Loved by Millions Worldwide</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Chatterbox has completely changed how I stay in touch with my family. The video calls are crystal clear and the group chats keep everyone connected."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Emily Chen</h4>
                  <span>Marketing Manager</span>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The security features give me peace of mind. Knowing my conversations are encrypted and private is incredibly important for our business communications."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Michael Rodriguez</h4>
                  <span>CEO, TechStart</span>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"I love how seamless it is to switch between my phone and computer. I can start a conversation on mobile and continue on desktop without missing a beat."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Sarah Williams</h4>
                  <span>Freelance Designer</span>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Chatting?</h2>
            <p className="cta-subtitle">
              Join millions of people who trust Chatterbox to stay connected with friends, 
              family, and colleagues. Start your conversation today.
            </p>
            <div className="cta-buttons">
              <Link href="/signup" className="btn btn-primary btn-large">
                Create Free Account
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/download" className="btn btn-outline-white btn-large">
                Download App
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <span>Chatterbox</span>
              </div>
              <p>Connect with the world through secure, fast, and reliable messaging. Your conversations, your way.</p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                       <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C6.396 0 1.807 4.582 1.807 10.204s4.589 10.204 10.21 10.204c5.621 0 10.208-4.582 10.208-10.204S17.638.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h3>Product</h3>
              <ul className="footer-links">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/download">Download</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/security">Security</Link></li>
                <li><Link href="/business">For Business</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Support</h3>
              <ul className="footer-links">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/community">Community</Link></li>
                <li><Link href="/status">System Status</Link></li>
                <li><Link href="/feedback">Feedback</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/press">Press</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/investors">Investors</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-legal">
              <p>&copy; 2024 Chatterbox. All rights reserved.</p>
              <div className="legal-links">
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
                <Link href="/cookies">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

