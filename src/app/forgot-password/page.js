'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import '../../styles/auth.css'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (authError) setAuthError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setAuthError('')
    setSuccessMessage('')

    try {
      const validatedData = forgotPasswordSchema.parse(formData)

      const { error } = await supabase.auth.resetPasswordForEmail(
        validatedData.email,
        {
          redirectTo: `${window.location.origin}/reset-password`
        }
      )

      if (error) {
        throw error
      }

      setIsSubmitted(true)
      setSuccessMessage(
        `We've sent a password reset link to ${validatedData.email}. Please check your email and follow the instructions to reset your password.`
      )

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {}
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      } else {
        let errorMessage = 'An error occurred while sending the reset email'
        
        if (error.message.includes('Email not found')) {
          errorMessage = 'No account found with this email address. Please check your email or create a new account.'
        } else if (error.message.includes('Email rate limit exceeded')) {
          errorMessage = 'Too many reset attempts. Please wait a few minutes before trying again.'
        } else {
          errorMessage = error.message || errorMessage
        }
        
        setAuthError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    if (!formData.email) {
      setAuthError('Please enter your email address first')
      return
    }

    setLoading(true)
    setAuthError('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: `${window.location.origin}/reset-password`
        }
      )

      if (error) {
        throw error
      }

      setSuccessMessage(
        `Password reset email sent again to ${formData.email}. Please check your email.`
      )

    } catch (error) {
      setAuthError(error.message || 'Failed to resend email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <circle cx="12" cy="16" r="1"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">
            {isSubmitted 
              ? "Check your email for reset instructions"
              : "Enter your email to receive a password reset link"
            }
          </p>
        </div>

        {authError && (
          <div className="auth-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {authError}
          </div>
        )}

        {successMessage && (
          <div className="auth-success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            {successMessage}
          </div>
        )}

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                disabled={loading}
                autoComplete="email"
                autoFocus
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
              <div className="field-help">
                <small>We'll send a password reset link to this email address</small>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="auth-button"
            >
              {loading ? (
                <span className="loading-spinner">
                  <span className="spinner"></span>
                  Sending Reset Link...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        ) : (
          <div className="reset-success-actions">
            <div className="success-info">
              <h3>Email Sent Successfully!</h3>
              <p>
                If an account with that email exists, you'll receive a password reset link shortly.
                The link will expire in 1 hour for security reasons.
              </p>
            </div>

            <div className="reset-actions">
              <button
                onClick={handleResendEmail}
                disabled={loading}
                className="auth-button secondary"
              >
                {loading ? (
                  <span className="loading-spinner">
                    <span className="spinner"></span>
                    Resending...
                  </span>
                ) : (
                  'Resend Email'
                )}
              </button>

              <Link href="/login" className="auth-button">
                Back to Sign In
              </Link>
            </div>

            <div className="email-tips">
              <h4>Didn't receive the email?</h4>
              <ul>
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>Wait a few minutes - emails can sometimes be delayed</li>
                <li>Try adding our domain to your email whitelist</li>
              </ul>
            </div>
          </div>
        )}

        <div className="auth-footer">
          <div className="footer-links">
            <Link href="/login" className="auth-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5"/>
                <path d="M12 19l-7-7 7-7"/>
              </svg>
              Back to Sign In
            </Link>
            
            <Link href="/signup" className="auth-link">
              Create New Account
            </Link>
          </div>
          
          <div className="footer-links">
            <Link href="/help" className="auth-link">Help Center</Link>
            <Link href="/contact" className="auth-link">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  )
}