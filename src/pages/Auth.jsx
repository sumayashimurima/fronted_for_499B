import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const navigate = useNavigate()

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-variant p-10">

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight mb-2">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h1>
              <p className="text-on-surface-variant text-sm">
                {mode === 'login'
                  ? 'Sign in to continue your IELTS practice'
                  : 'Start your free IELTS preparation today'}
              </p>
            </div>

            {/* Toggle */}
            <div className="flex bg-surface-container rounded-xl p-1 mb-8">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'login'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'signup'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-surface-container px-4 py-3 rounded-xl text-on-surface placeholder:text-on-surface-variant text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-surface-container px-4 py-3 rounded-xl text-on-surface placeholder:text-on-surface-variant text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-surface-container px-4 py-3 rounded-xl text-on-surface placeholder:text-on-surface-variant text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all mt-2"
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-surface-variant" />
              <span className="text-xs text-on-surface-variant">or</span>
              <div className="flex-1 h-px bg-surface-variant" />
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-xl border border-surface-variant text-on-surface-variant text-sm font-semibold hover:bg-surface-container transition-colors"
            >
              Continue without account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
