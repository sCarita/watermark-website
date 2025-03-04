import { type Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create an account to use our premium watermark remover features. Sign up to remove watermarks from photos, erase logos from pictures, and clean unwanted text from your images with our AI-powered tool.',
}

export default function Register() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h1 className="mt-20 text-lg font-semibold text-gray-900">
        Get started for free
      </h1>
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
      
      <div className="mt-6 rounded-lg bg-green-50 p-4">
        <h2 className="text-sm font-medium text-green-800">Why create an account?</h2>
        <p className="mt-2 text-sm text-green-700">
          Join thousands of users who trust our AI-powered technology to remove watermarks from their images. 
          Our advanced algorithms can detect and erase watermarks, logos, and text overlays from photos while 
          preserving the original image quality. Perfect for cleaning up stock photos from Getty Images, Shutterstock, 
          and other sources.
        </p>
      </div>
      
      <form
        action="#"
        className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          label="First name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="Last name"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          className="col-span-full"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        <SelectField
          className="col-span-full"
          label="How did you hear about us?"
          name="referral_source"
        >
          <option>AltaVista search</option>
          <option>Super Bowl commercial</option>
          <option>Our route 34 city bus ad</option>
          <option>The "Never Use This" podcast</option>
        </SelectField>
        <div className="col-span-full">
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Sign up <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-sm font-medium text-gray-900">Free account features</h2>
        <ul className="mt-2 text-sm text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Remove watermarks from up to 5 images per day</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Support for multiple image formats including JPG, PNG, and WEBP</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Basic watermark and logo removal tools</span>
          </li>
        </ul>
        
        <h2 className="mt-6 text-sm font-medium text-gray-900">Premium upgrade benefits</h2>
        <ul className="mt-2 text-sm text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Unlimited image processing with no daily limits</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Advanced AI algorithms for complex watermark removal</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Batch processing to handle multiple images at once</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Priority customer support and faster processing times</span>
          </li>
        </ul>
      </div>
    </SlimLayout>
  )
}
