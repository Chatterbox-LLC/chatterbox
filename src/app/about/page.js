'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import '../../styles/main.css'

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "/team/sarah.jpg",
      bio: "Former VP of Product at Meta, Sarah has 15+ years of experience building communication platforms that connect billions of people worldwide.",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      image: "/team/michael.jpg",
      bio: "Ex-Google engineer with expertise in distributed systems and real-time communication. Led the development of several messaging protocols.",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Emily Johnson",
      role: "Head of Design",
      image: "/team/emily.jpg",
      bio: "Award-winning UX designer who previously worked at Apple and Airbnb. Passionate about creating intuitive and accessible user experiences.",
      social: {
        twitter: "#",
        linkedin: "#",
        dribbble: "#"
      }
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      image: "/team/david.jpg",
      bio: "Former Principal Engineer at Amazon, specializing in scalable infrastructure and security. Built systems handling millions of concurrent users.",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Lisa Thompson",
      role: "Head of Security",
      image: "/team/lisa.jpg",
      bio: "Cybersecurity expert with 12+ years at NSA and private sector. Leads our end-to-end encryption and privacy initiatives.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Alex Patel",
      role: "VP of Product",
      image: "/team/alex.jpg",
      bio: "Product strategist who helped scale WhatsApp to 2B users. Focuses on user growth and feature development at Chatterbox.",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    }
  ]

  const milestones = [
    {
      year: "2019",
      title: "The Beginning",
      description: "Founded by Sarah Chen and Michael Rodriguez with a vision to create the most secure and user-friendly messaging platform."
    },
    {
      year: "2020",
      title: "First Million Users",
      description: "Reached 1 million active users within our first year, focusing on privacy and seamless user experience."
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Launched in 50+ countries with multi-language support and local data centers for improved performance."
    },
    {
      year: "2022",
      title: "Enterprise Launch",
      description: "Introduced Chatterbox for Business, bringing secure communication to thousands of organizations worldwide."
    },
    {
      year: "2023",
      title: "50 Million Users",
      description: "Celebrated reaching 50 million active users and launched advanced AI features for smart messaging."
    },
    {
      year: "2024",
      title: "Innovation Continues",
      description: "Introducing next-generation features including real-time translation and enhanced group collaboration tools."
    }
  ]

  const values = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: "Privacy First",
      description: "We believe privacy is a fundamental human right. Every message is encrypted end-to-end, and we never store or access your personal conversations."
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
      title: "User-Centric",
      description: "Every feature we build starts with understanding our users' needs. We listen to feedback and continuously improve based on real user experiences."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12l2 2 4-4"/>
        </svg>
      ),
      title: "Reliability",
      description: "We maintain 99.9% uptime because we understand how important it is for you to stay connected with the people who matter most."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: "Innovation",
      description: "We're constantly pushing the boundaries of what's possible in communication technology while maintaining simplicity and ease of use."
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
              <li><Link href="/" className="nav-link">Home</Link></li>
              <li><Link href="/features" className="nav-link">Features</Link></li>
              <li><Link href="/download" className="nav-link">Download</Link></li>
              <li><Link href="/support" className="nav-link">Support</Link></li>
              <li><Link href="/about" className="nav-link active">About</Link></li>
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
                                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-hero-title fade-in-up">
              Connecting the World,
              <br />
              <span className="gradient-text">One Conversation at a Time</span>
            </h1>
            <p className="about-hero-subtitle fade-in-up">
              We're on a mission to make communication more human, secure, and accessible. 
              Founded in 2019, Chatterbox has grown from a simple idea to a platform trusted 
              by millions worldwide.
            </p>
            <div className="about-stats fade-in-up">
              <div className="stat">
                <span className="stat-number">50M+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">180+</span>
                <span className="stat-label">Countries</span>
              </div>
              <div className="stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
              <div className="stat">
                <span className="stat-number">1B+</span>
                <span className="stat-label">Messages Daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section-large">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-text">
                At Chatterbox, we believe that meaningful connections should be effortless, 
                secure, and accessible to everyone. Our mission is to break down communication 
                barriers and bring people closer together, regardless of distance, language, 
                or technology.
              </p>
              <p className="mission-text">
                We're committed to building a platform that respects your privacy, protects 
                your data, and empowers you to communicate in the way that feels most natural 
                to you. Every feature we develop is guided by our core principle: putting 
                users first, always.
              </p>
              <div className="mission-highlights">
                <div className="highlight">
                  <div className="highlight-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </div>
                  <span>Privacy by Design</span>
                </div>
                <div className="highlight">
                  <div className="highlight-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12l2 2 4-4"/>
                    </svg>
                  </div>
                  <span>User-First Approach</span>
                </div>
                <div className="highlight">
                  <div className="highlight-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  </div>
                  <span>Continuous Innovation</span>
                </div>
              </div>
            </div>
            <div className="mission-visual">
              <div className="mission-image">
                <div className="floating-elements">
                  <div className="floating-chat">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div className="floating-heart">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  <div className="floating-globe">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="values-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section section-large">
        <div className="container">
          <div className="timeline-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              From a small startup to a global platform trusted by millions.
            </p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="timeline-marker">
                  <span className="timeline-year">{milestone.year}</span>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="team-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind Chatterbox, working to connect the world.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="team-image">
                  <div className="team-avatar"></div>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-social">
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="social-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="social-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="social-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.dribbble && (
                      <a href={member.social.dribbble} className="social-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                  <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.273 5.698-.653-.126-7.512-1.415-7.825-1.484-.675-1.405-1.425-2.65-1.425-2.65s1.5-.7 6.977 1.436zM12 2.302c2.573 0 4.906.974 6.676 2.568-1.323-.924-4.31-2.982-6.676-2.982V2.302zm-1.765 3.026c1.765 0 4.765 1.765 6.765 2.765-.765 1.765-2.765 4.765-6.765 4.765s-6-3-6.765-4.765c2-1 5-2.765 6.765-2.765z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="culture-section section-large">
        <div className="container">
          <div className="culture-grid">
            <div className="culture-content">
              <h2 className="section-title">Our Culture</h2>
              <p className="culture-text">
                At Chatterbox, we've built a culture that celebrates diversity, encourages 
                innovation, and prioritizes work-life balance. We believe that happy, 
                fulfilled team members create better products.
              </p>
              <div className="culture-features">
                <div className="culture-feature">
                  <div className="culture-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Remote-First</h4>
                    <p>Work from anywhere in the world with flexible hours and unlimited PTO.</p>
                  </div>
                </div>
                <div className="culture-feature">
                  <div className="culture-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Diverse & Inclusive</h4>
                    <p>We celebrate different perspectives and backgrounds from our global team.</p>
                  </div>
                </div>
                <div className="culture-feature">
                  <div className="culture-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Growth Focused</h4>
                    <p>Continuous learning opportunities with education budgets and mentorship programs.</p>
                  </div>
                </div>
              </div>
              <Link href="/careers" className="btn btn-primary">
                Join Our Team
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className="culture-visual">
              <div className="culture-stats">
                <div className="culture-stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Team Members</span>
                </div>
                <div className="culture-stat">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Countries</span>
                </div>
                <div className="culture-stat">
                  <span className="stat-number">4.9/5</span>
                  <span className="stat-label">Employee Rating</span>
                </div>
                <div className="culture-stat">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Retention Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Join Our Mission?</h2>
            <p className="cta-subtitle">
              Whether you're looking to connect with others or join our team, 
              we'd love to have you be part of the Chatterbox community.
            </p>
            <div className="cta-buttons">
              <Link href="/signup" className="btn btn-primary btn-large">
                Start Chatting Today
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/careers" className="btn btn-outline-white btn-large">
                View Open Positions
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

