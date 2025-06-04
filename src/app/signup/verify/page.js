'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import '../../../styles/auth.css'

export default function VerifyEmail() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)
  const [email, setEmail] = useState('')
  
  const inputRefs = useRef([])
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    } else {
      router.push('/signup')
    }
  }, [searchParams, router])

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return // Prevent multiple characters
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerify(newCode.join(''))
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    
    if (pastedData.length === 6) {
      const newCode = pastedData.split('')
      setCode(newCode)
      setError('')
      handleVerify(pastedData)
    }
  }

  const handleVerify = async (verificationCode = code.join('')) => {
    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: verificationCode,
        type: 'signup'
      })

      if (error) {
        throw error
      }

      if (data.user) {
        setSuccess('Email verified successfully! Redirecting...')
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }
    } catch (error) {
      setError(error.message || 'Invalid verification code. Please try again.')
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendCountdown > 0) return

    setResendLoading(true)
    setError('')
    setSuccess('')

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      })

      if (error) {
        throw error
      }

      setSuccess('Verification code sent! Check your email.')
      setResendCountdown(60)
    } catch (error) {
      setError(error.message || 'Failed to resend verification code')
    } finally {
      setResendLoading(false)
    }
  }

  const changeEmail = () => {
    router.push('/signup')
  }

  return (
    <div className="auth-container">
      <div className="auth-card verification-card">
        <div className="verification-container">
          <div className={`verification-icon ${success ? 'verification-success' : ''}`}>
            {success ? (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            ) : (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            )}
          </div>
          
          <h1 className="verification-title">
            {success ? 'Email Verified!' : 'Check Your Email'}
          </h1>
          
          <p className="verification-subtitle">
            {success ? (
              'Your account has been successfully verified. Redirecting to your dashboard...'
            ) : (
              <>
                We've sent a 6-digit verification code to{' '}
                <span className="email-highlight">{email}</span>
              </>
            )}
          </p>

          {error && (
            <div className="auth-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              {error}
            </div>
          )}
          
          {success && (
            <div className="auth-success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
              {success}
            </div>
          )}

          {!success && (
            <>
              <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className="verification-form">
                <div className="code-input-container">
                  <label className="code-label">Enter verification code</label>
                  <div className="code-inputs">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className={`code-input ${error ? 'error' : ''} ${success ? 'success' : ''}`}
                        disabled={loading || success}
                        autoComplete="one-time-code"
                        aria-label={`Digit ${index + 1}`}
                      />
                    ))}
                  </div>
                  <p className="code-hint">
                    💡 Tip: You can paste the entire code from your email
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || code.some(digit => digit === '') || success}
                  className="auth-button verify-button"
                >
                  {loading ? (
                    <span className="loading-spinner">
                      <span className="spinner"></span>
                      Verifying...
                    </span>
                  ) : (
                    'Verify Email'
                  )}
                </button>
              </form>

              <div className="verification-actions">
                <div className="resend-section">
                  <p className="resend-text">Didn't receive the code?</p>
                  <button
                    onClick={handleResendCode}
                    disabled={resendLoading || resendCountdown > 0}
                    className="resend-button"
                  >
                    {resendLoading ? (
                      <span className="loading-spinner">
                        <span className="spinner"></span>
                        Sending...
                      </span>
                    ) : resendCountdown > 0 ? (
                      `Resend in ${resendCountdown}s`
                    ) : (
                      'Resend Code'
                    )}
                  </button>
                </div>

                <div className="email-actions">
                  <button onClick={changeEmail} className="change-email-button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Change Email Address
                  </button>
                </div>
              </div>

              <div className="help-section">
                <div className="help-card">
                  <h3 className="help-title">Having trouble?</h3>
                  <ul className="help-list">
                    <li>Check your spam/junk folder</li>
                    <li>Make sure you entered the correct email</li>
                    <li>The code expires in 10 minutes</li>
                    <li>Contact support if you continue having issues</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="auth-footer">
          <div className="footer-links">
            <Link href="/help" className="auth-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <point cx="12" cy="17"/>
              </svg>
              Help Center
            </Link>
            <Link href="/contact" className="auth-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Support
            </Link>
          </div>
          
          <p className="back-link">
            <Link href="/login" className="auth-link">
              ← Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
