'use client'

import { type Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { useAuthOperations } from '@/hooks/useAuthOperations'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [referralSource, setReferralSource] = useState('')
  const { signUp, signInWithGoogle, error, loading } = useAuthOperations()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signUp(email, password)
  }

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{' '}
        to your account.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          label="First name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last name"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          className="col-span-full"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="col-span-full"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SelectField
          className="col-span-full"
          label="How did you hear about us?"
          name="referral_source"
          value={referralSource}
          onChange={(e) => setReferralSource(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="search">Search engine</option>
          <option value="social">Social media</option>
          <option value="friend">Friend referral</option>
          <option value="other">Other</option>
        </SelectField>
        {error && (
          <div className="col-span-full text-sm text-red-600">{error}</div>
        )}
        <div className="col-span-full">
          <Button
            type="submit"
            variant="solid"
            color="blue"
            className="w-full"
            disabled={loading}
          >
            <span>
              {loading ? 'Creating account...' : 'Sign up'}{' '}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
        <div className="relative col-span-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div className="col-span-full">
          <Button
            type="button"
            variant="outline"
            color="slate"
            className="w-full"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <span>Sign up with Google</span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
