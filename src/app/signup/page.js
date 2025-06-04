'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import '../../styles/auth.css'

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine((date) => {
    const birthDate = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 13
    }
    return age >= 13
  }, 'You must be at least 13 years old to create an account'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
})

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState({ google: false, github: false })
  const [authError, setAuthError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' })
  const router = useRouter()

  const calculatePasswordStrength = (password) => {
    let score = 0
    let feedback = ''

    if (password.length === 0) {
      return { score: 0, feedback: '' }
    }

    if (password.length >= 8) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/\d/.test(password)) score += 1
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
    if (password.length >= 12) score += 1

    switch (score) {
      case 0:
      case 1:
        feedback = 'Very weak'
        break
      case 2:
        feedback = 'Weak'
        break
      case 3:
        feedback = 'Fair'
        break
      case 4:
        feedback = 'Good'
        break
      case 5:
      case 6:
        feedback = 'Strong'
        break
      default:
        feedback = 'Very weak'
    }

    return { score, feedback }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (authError) setAuthError('')
  }

  const createUserProfile = async (user) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            full_name: formData.fullName,
            email: user.email,
            date_of_birth: formData.dateOfBirth,
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('Error creating profile:', error)
        throw error
      }
    } catch (error) {
      console.error('Failed to create user profile:', error)
      throw new Error('Failed to create user profile')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setAuthError('')

    try {
      const validatedData = signupSchema.parse(formData)

      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: {
            full_name: validatedData.fullName,
            date_of_birth: validatedData.dateOfBirth,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        throw error
      }

      if (data.user) {
        await createUserProfile(data.user)

        if (!data.user.email_confirmed_at) {
          router.push(`/signup/verify?email=${encodeURIComponent(validatedData.email)}`)
        } else {
          router.push('/dashboard')
        }
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {}
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      } else {
        setAuthError(error.message || 'An error occurred during signup')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setOauthLoading(prev => ({ ...prev, google: true }))
    setAuthError('')

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
    } catch (error) {
      setAuthError(error.message || 'Failed to sign up with Google')
      setOauthLoading(prev => ({ ...prev, google: false }))
    }
  }

  const handleGitHubSignUp = async () => {
    setOauthLoading(prev => ({ ...prev, github: true }))
    setAuthError('')

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
    } catch (error) {
      setAuthError(error.message || 'Failed to sign up with GitHub')
      setOauthLoading(prev => ({ ...prev, github: false }))
    }
  }

  const getPasswordStrengthColor = (score) => {
    if (score <= 1) return '#ef4444'
    if (score <= 2) return '#f59e0b'
    if (score <= 3) return '#eab308'
    if (score <= 4) return '#22c55e'
    return '#16a34a'
  }

  const getMaxDate = () => {
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())
    return maxDate.toISOString().split('T')[0]
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join Chatterbox and start connecting</p>
        </div>

        {authError && <div className="auth-error">{authError}</div>}

        <div className="oauth-section">
          <button
            onClick={handleGoogleSignUp}
            disabled={loading || oauthLoading.google || oauthLoading.github}
            className="oauth-button google-button"
          >
            {oauthLoading.google ? (
              <span className="loading-spinner">
                <span className="spinner"></span>
                Connecting...
              </span>
            ) : (
              <>
                <svg className="oauth-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <button
            onClick={handleGitHubSignUp}
            disabled={loading || oauthLoading.google || oauthLoading.github}
            className="oauth-button github-button"
          >
            {oauthLoading.github ? (
              <span className="loading-spinner">
                <span className="spinner"></span>
                Connecting...
              </span>
            ) : (
              <>
                <svg className="oauth-icon" viewBox="0 0 24 24" fill="#24292e">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </>
            )}
          </button>
        </div>

        <div className="divider">
          <span className="divider-text">or</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              placeholder="Enter your full name"
              disabled={loading}
              autoComplete="name"
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

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
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
              disabled={loading}
              max={getMaxDate()}
              autoComplete="bday"
            />
            {errors.dateOfBirth && <span className="field-error">{errors.dateOfBirth}</span>}
            <div className="field-help">
              <small>You must be at least 13 years old to create an account</small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-input-container">
              <input
                                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Create a strong password"
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                disabled={loading}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2z"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                )}
              </button>
            </div>
            
            {formData.password && (
              <div className="password-strength">
                <div className="password-strength-bar">
                  <div 
                    className="password-strength-fill"
                    style={{
                      width: `${(passwordStrength.score / 6) * 100}%`,
                      backgroundColor: getPasswordStrengthColor(passwordStrength.score)
                    }}
                  />
                </div>
                <div className="password-strength-text">
                  <span 
                    className="strength-label"
                    style={{ color: getPasswordStrengthColor(passwordStrength.score) }}
                  >
                    {passwordStrength.feedback}
                  </span>
                </div>
              </div>
            )}
            
            {errors.password && <span className="field-error">{errors.password}</span>}
            
            <div className="password-requirements">
              <small>
                Password must contain at least 8 characters with uppercase, lowercase, and numbers
              </small>
            </div>
          </div>

          <div className="terms-section">
            <p className="terms-text">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="terms-link">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="terms-link">Privacy Policy</Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || Object.keys(errors).length > 0}
            className="auth-button"
          >
            {loading ? (
              <span className="loading-spinner">
                <span className="spinner"></span>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-link-text">Already have an account?</p>
          <Link href="/login" className="auth-link">
            Sign in to your account
          </Link>
          
          <div className="footer-links">
            <Link href="/help" className="auth-link">Help Center</Link>
            <Link href="/contact" className="auth-link">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
