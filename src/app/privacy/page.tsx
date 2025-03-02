'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { useI18n } from '@/hooks/useI18n'

export default function Privacy() {
  return (
    <>
      <Header />
      <main>
        <Container className="py-16 md:py-20">
          <FadeIn>
            <div className="prose prose-slate mx-auto max-w-4xl">
              <h1 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
                Personal Data Disclaimer
              </h1>
              <p className="text-sm text-slate-600">Last Updated: 01/03/2025</p>

              <div className="mt-8">
                <p className="text-lg text-slate-700">
                  This <strong>Personal Data Disclaimer</strong> governs your
                  use of the watermark removal tool (the "<strong>Tool</strong>
                  ") operated by <strong>Gravura Poderosa LDA</strong> ("
                  <strong>we,</strong>" "<strong>us,</strong>" "
                  <strong>our</strong>"), Fiscal Number (NIF):{' '}
                  <strong>517517787</strong>, located at{' '}
                  <a href="/" className="text-blue-600 hover:text-blue-800">
                    clear.photo
                  </a>
                  . It supplements our{' '}
                  <a
                    href="/terms"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Terms of Service
                  </a>{' '}
                  and clarifies our{' '}
                  <strong>strict no-personal-data policy</strong> regarding
                  uploads.
                </p>
              </div>

              <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                1. No Personal Data Allowed
              </h2>
              <ul className="list-disc pl-6 text-slate-700">
                <li>
                  <strong>Non-Personal Content Only</strong>: Our Tool is
                  intended <strong>exclusively</strong> for images{' '}
                  <strong>without</strong> any personal data.
                </li>
                <li>
                  <strong>Prohibited Uploads</strong>: Do <strong>not</strong>{' '}
                  upload images containing faces, names, identification numbers,
                  or any sensitive information (e.g., medical, financial, or
                  location data).
                </li>
              </ul>

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                2. You Are the Data Controller (If You Upload Personal Data)
              </h2>
              <ul className="list-disc pl-6 text-slate-700">
                <li>
                  <strong>Your Responsibility</strong>: If, in violation of this
                  Disclaimer, you upload personal data, you become the "
                  <strong>data controller</strong>" under GDPR or other
                  applicable data protection laws.
                </li>
                <li>
                  <strong>No Guarantees from Us</strong>: We provide{' '}
                  <strong>no</strong> support, assurance, or legal compliance
                  for personal data processing. You must satisfy all privacy,
                  consent, and transparency obligations.
                </li>
              </ul>

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                3. User Representations & Warranties
              </h2>
              <p className="text-slate-700">
                By using our Tool, you <strong>represent and warrant</strong>{' '}
                that:
              </p>
              <ol className="list-decimal pl-6 text-slate-700">
                <li>
                  <strong>Filtering/Anonymization</strong>: You have{' '}
                  <strong>verified</strong> or anonymized your images so they do
                  not contain personal data.
                </li>
                <li>
                  <strong>No Automated Unsupervised Uploads</strong>: You will
                  not use bots or scripts to upload <strong>unverified</strong>{' '}
                  images en masse.
                </li>
                <li>
                  <strong>Lawful Use</strong>: You will comply with all laws,
                  including GDPR and copyright regulations, and accept full
                  liability if your uploads violate these rules.
                </li>
              </ol>

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                4. Our Limited Role
              </h2>
              <ol className="list-decimal pl-6 text-slate-700">
                <li>
                  <strong>Technical Process Only</strong>: We only provide an
                  automated function to remove watermarks. We have{' '}
                  <strong>no</strong> means to identify, filter, or handle
                  personal data.
                </li>
                <li>
                  <strong>No Detection or Reporting Mechanisms</strong>: We do{' '}
                  <strong>not</strong> maintain any automated systems to detect
                  or signal personal data, nor do we produce logs or reports
                  that might facilitate a data controller's GDPR-related due
                  diligence. We also do <strong>not</strong> implement specific
                  safety features designed to protect personal data.
                </li>
                <li>
                  <strong>No Liability for Personal Data</strong>: If personal
                  data appears in uploaded images, we are neither a GDPR
                  "controller" nor able to offer any compliance guarantees.{' '}
                  <strong>You</strong> are solely responsible for all
                  regulatory, legal, or privacy obligations if you choose to
                  upload personal data despite these warnings.
                </li>
              </ol>

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                5. Breach & Possible Action
              </h2>
              <ul className="list-disc pl-6 text-slate-700">
                <li>
                  <strong>Policy Violation</strong>: Uploading personal data
                  violates this Disclaimer and possibly our Terms of Service.
                </li>
                <li>
                  <strong>Investigation & Consequences</strong>: If we learn of
                  personal data uploads, we may investigate and, if needed,{' '}
                  <strong>block</strong> or <strong>terminate</strong> your
                  access to the Tool.
                </li>
              </ul>

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                6. No Warranty & No Liability
              </h2>
              <ul className="list-disc pl-6 text-slate-700">
                <li>
                  We disclaim <strong>all warranties</strong> related to
                  personal data usage, including any implied fitness for GDPR or
                  privacy law compliance.
                </li>
                <li>
                  We are <strong>not liable</strong> for any legal, regulatory,
                  or reputational consequences arising from your uploads of
                  personal data.
                </li>
              </ul>

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                7. Making Complaints or Reporting Unauthorized Use
              </h2>
              <ul className="list-disc pl-6 text-slate-700">
                <li>
                  <strong>Suspected Unauthorized Processing</strong>: If you
                  believe your image was processed through our Tool without your
                  authorization, or if you suspect that personal data has been
                  uploaded or processed in violation of this Disclaimer, please
                  contact us at:
                  <ul className="mt-2 list-none pl-6">
                    <li>
                      <strong>Email</strong>:{' '}
                      <a
                        href="mailto:support@clear.photo"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        support@clear.photo
                      </a>
                    </li>
                    <li>
                      <strong>Address</strong>: Gravura Poderosa LDA, Portugal
                    </li>
                  </ul>
                </li>
                <li className="mt-2">
                  We will investigate any complaints or reports promptly and, if
                  necessary, take appropriate measures (e.g., removing the
                  content, blocking the user, or involving legal authorities).
                </li>
              </ul>

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                8. Changes to This Disclaimer
              </h2>
              <ul className="list-disc pl-6 text-slate-700">
                <li>
                  We may update this Disclaimer at any time. If changes are
                  significant, we will notify you (e.g., via our homepage or
                  email).
                </li>
                <li>
                  Continued use of the Tool after any updates constitutes your
                  acceptance of the revised Disclaimer.
                </li>
              </ul>
            </div>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  )
}
