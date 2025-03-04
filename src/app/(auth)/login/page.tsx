import { type Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account to access our watermark remover tool. Remove watermarks from your photos and images with our easy-to-use online service.',
}

export default function Login() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h1 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h1>
      <p className="mt-2 text-sm text-gray-700">
        Don't have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>{' '}
        for a free trial.
      </p>
      
      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <h2 className="text-sm font-medium text-blue-800">Welcome back!</h2>
        <p className="mt-2 text-sm text-blue-700">
          Sign in to access your personal dashboard and continue removing watermarks from your images. 
          Our AI-powered tool helps you clean up photos by removing unwanted text, logos, and watermarks from Getty Images, 
          Shutterstock, and other sources.
        </p>
      </div>
      
      <form action="#" className="mt-8 grid grid-cols-1 gap-y-8">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <div>
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Sign in <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-sm font-medium text-gray-900">Account benefits</h2>
        <ul className="mt-2 text-sm text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Access to premium watermark removal features</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Process higher resolution images with better quality results</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Save your editing history and download processed images anytime</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Priority processing during peak usage times</span>
          </li>
        </ul>
      </div>
    </SlimLayout>
  )
}
