'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { useTranslations } from 'next-intl'

// Metadata is exported from a separate file since this is a client component
// See src/app/terms/metadata.ts

export default function Terms() {
  const t = useTranslations()

  return (
    <>
      <Header />
      <main>
        <Container className="py-16 md:py-20">
          <FadeIn>
            <div className="prose prose-slate mx-auto max-w-4xl">
              <h1 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
                {t('common.terms.title')}
              </h1>
              <p className="text-sm text-slate-600">
                {t('common.terms.lastUpdated')}
              </p>

              <div className="mt-8">
                <p className="text-lg text-slate-700">
                  {t('common.terms.intro.welcome')}
                </p>
                <p className="mt-4 text-lg text-slate-700">
                  {t('common.terms.intro.agreement')}
                </p>
              </div>

              <hr className="my-8" />

              {/* Acceptance of Terms */}
              <div>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.acceptance.title')}
                </h2>
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.acceptance.contractual.title')}
                </h3>
                <p className="text-slate-700">
                  {t('common.terms.sections.acceptance.contractual.text')}
                </p>

                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.acceptance.eligibility.title')}
                </h3>
                <p className="text-slate-700">
                  {t('common.terms.sections.acceptance.eligibility.text')}
                </p>
              </div>

              <hr className="my-8" />

              {/* Modifications to Terms */}
              <div>
                <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.modifications.title')}
                </h2>
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.modifications.updates.title')}
                </h3>
                <p className="text-slate-700">
                  {t('common.terms.sections.modifications.updates.text')}
                </p>

                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.modifications.notification.title')}
                </h3>
                <p className="text-slate-700">
                  {t('common.terms.sections.modifications.notification.text')}
                </p>
              </div>

              <hr className="my-8" />

              {/* Description and Scope */}
              <div>
                <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.description.title')}
                </h2>
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.description.responsibleUse.title')}
                </h3>
                <p className="text-slate-700">
                  {t('common.terms.sections.description.responsibleUse.text')}
                </p>
                <ul className="list-disc pl-6 text-slate-700">
                  {t
                    .raw(
                      'common.terms.sections.description.responsibleUse.items',
                    )
                    .map(
                      (
                        item: { title: string; text: string },
                        index: number,
                      ) => (
                        <li key={index}>
                          <strong>{item.title}</strong>: {item.text}
                        </li>
                      ),
                    )}
                </ul>

                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.description.scientificUse.title')}
                </h3>
                <p className="text-slate-700">
                  {t('common.terms.sections.description.scientificUse.text')}
                </p>
                <ol className="list-decimal pl-6 text-slate-700">
                  {t
                    .raw(
                      'common.terms.sections.description.scientificUse.items',
                    )
                    .map(
                      (
                        item: { title: string; text: string },
                        index: number,
                      ) => (
                        <li key={index}>
                          <strong>{item.title}</strong>: {item.text}
                        </li>
                      ),
                    )}
                </ol>
                <p className="mt-4 text-slate-700">
                  {t('common.terms.sections.description.scientificUse.note')}
                </p>
              </div>

              <hr className="my-8" />

              {/* User Responsibilities */}
              <div>
                <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.userResponsibilities.title')}
                </h2>
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t(
                    'common.terms.sections.userResponsibilities.lawfulUse.title',
                  )}
                </h3>
                <p className="text-slate-700">
                  {t(
                    'common.terms.sections.userResponsibilities.lawfulUse.text',
                  )}
                </p>

                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t(
                    'common.terms.sections.userResponsibilities.prohibitedContent.title',
                  )}
                </h3>
                <p className="text-slate-700">
                  {t(
                    'common.terms.sections.userResponsibilities.prohibitedContent.text',
                  )}
                </p>
                <ul className="list-disc pl-6 text-slate-700">
                  {t
                    .raw(
                      'common.terms.sections.userResponsibilities.prohibitedContent.items',
                    )
                    .map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>

                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t(
                    'common.terms.sections.userResponsibilities.accuracy.title',
                  )}
                </h3>
                <p className="text-slate-700">
                  {t(
                    'common.terms.sections.userResponsibilities.accuracy.text',
                  )}
                </p>
              </div>

              <hr className="my-8" />

              {/* Data Retention */}
              <div>
                <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.dataRetention.title')}
                </h2>
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.dataRetention.storage.title')}
                </h3>
                <p className="text-slate-700">
                  {t('common.terms.sections.dataRetention.storage.text')}
                </p>

                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.dataRetention.deletion.title')}
                </h3>
                <p className="text-slate-700">
                  {t('common.terms.sections.dataRetention.deletion.text')}
                </p>

                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                  {t('common.terms.sections.dataRetention.noRecovery.title')}
                </h3>
                <p className="text-slate-700">
                  {t('common.terms.sections.dataRetention.noRecovery.text')}
                </p>
              </div>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                6. Intellectual Property Rights
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                6.1 Ownership of Content
              </h3>
              <p className="text-slate-700">
                All images you upload remain your property or the property of
                the respective rights-holder. By uploading images, you grant us
                a temporary license to store, process, and host the images for
                the purpose of providing the watermark removal functionality.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                6.2 Tool IP
              </h3>
              <p className="text-slate-700">
                We (and our licensors) retain all rights, title, and interest in
                and to our Tool, including any related software, algorithms, or
                other technology. These Terms do not grant you any rights to our
                intellectual property beyond the limited license necessary to
                use the Tool.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                7. Privacy and Data Usage
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                7.1 Personal Data
              </h3>
              <p className="text-slate-700">
                Your use of the Tool may involve the provision of personal data.
                Any personal data collected, used, or shared by us is subject to
                our{' '}
                <a
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Privacy Policy
                </a>
                , which complies with the General Data Protection Regulation
                (GDPR) and other applicable data protection laws in Portugal.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                7.2 Anonymous or Aggregate Data
              </h3>
              <p className="text-slate-700">
                We may use anonymized or aggregated data derived from your usage
                of the Tool for analytics, product improvement, or other lawful
                purposes.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                8. Disclaimer of Warranties
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                8.1 As-Is Basis
              </h3>
              <p className="text-slate-700">
                We provide the Tool on an "as-is" and "as-available" basis. To
                the maximum extent permitted by law, we disclaim all warranties,
                whether express or implied, including implied warranties of
                merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                8.2 No Guarantee
              </h3>
              <p className="text-slate-700">
                We do not guarantee the accuracy, reliability, or availability
                of the Tool. We do not guarantee that the Tool will be
                uninterrupted, error-free, or that any defects will be
                corrected.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                8.3 No Representation
              </h3>
              <p className="text-slate-700">
                We make <strong>no representation</strong> that the Tool or any
                results obtained from its use will meet your specific research
                goals, operational requirements, or expectations. All risk
                arising from the use of the Tool remains with you.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                9. Limitation of Liability
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                9.1 Indirect Damages
              </h3>
              <p className="text-slate-700">
                To the maximum extent permitted by law, under no circumstances
                will Gravura Poderosa LDA be liable for any indirect,
                incidental, special, consequential, or punitive damages arising
                from your use of the Tool.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                9.2 Total Liability
              </h3>
              <p className="text-slate-700">
                In no event shall Gravura Poderosa LDA's total liability to you
                for any damages arising under these Terms exceed the total
                amount paid by you for using the Tool during the twelve (12)
                months preceding the event giving rise to the liability.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                9.3 Jurisdictional Limits
              </h3>
              <p className="text-slate-700">
                Some jurisdictions do not allow the exclusion of certain
                warranties or the limitation of liability for certain types of
                damages. In these jurisdictions, our liability is limited to the
                fullest extent permitted by law.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                10. Indemnification
              </h2>
              <p className="text-slate-700">
                You agree to defend, indemnify, and hold harmless Gravura
                Poderosa LDA, its officers, directors, shareholders, employees,
                and agents from and against any and all claims, damages,
                obligations, losses, liabilities, costs, or debts arising from:
              </p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>Your breach of these Terms.</li>
                <li>Your violation of any law or regulation.</li>
                <li>
                  Your infringement or violation of any third-party right,
                  including intellectual property or privacy rights.
                </li>
                <li>Any unauthorized use of the Tool.</li>
              </ul>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                11. Governing Law & Jurisdiction
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                11.1 Governing Law
              </h3>
              <p className="text-slate-700">
                These Terms and any dispute or claim (including non-contractual
                disputes or claims) arising out of or in connection with their
                subject matter shall be governed by and construed in accordance
                with the laws of Portugal.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                11.2 Jurisdiction
              </h3>
              <p className="text-slate-700">
                The courts of <strong>Lisbon, Portugal</strong> shall have
                exclusive jurisdiction to settle any dispute or claim arising
                out of or in connection with these Terms or their subject
                matter.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                12. Termination
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                12.1 Termination by User
              </h3>
              <p className="text-slate-700">
                You may discontinue use of the Tool at any time by ceasing to
                access it. If you have a registered account, you may request
                account deletion in accordance with our account management
                procedures.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                12.2 Termination by Us
              </h3>
              <p className="text-slate-700">
                We may suspend or terminate your access to the Tool without
                prior notice if we reasonably believe you are in violation of
                these Terms or engaged in unlawful activities.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                12.3 Effects of Termination
              </h3>
              <p className="text-slate-700">
                Upon termination, your right to access or use the Tool will
                cease immediately. Sections of these Terms that by their nature
                should survive termination (e.g., indemnification, limitation of
                liability) shall survive.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                13. Contact Information
              </h2>
              <p className="text-slate-700">
                If you have any questions or concerns regarding these Terms or
                the Tool, please contact us at:
              </p>
              <p className="mt-4 text-slate-700">
                <strong>Gravura Poderosa LDA</strong>
                <br />
                Fiscal Number (NIF): <strong>517517787</strong>
                <br />
                Email:{' '}
                <a
                  href="mailto:support@clear.photo"
                  className="text-blue-600 hover:text-blue-800"
                >
                  support@clear.photo
                </a>
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                14. Miscellaneous
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                14.1 Entire Agreement
              </h3>
              <p className="text-slate-700">
                These Terms, together with the Privacy Policy and any other
                legal notices published by us, constitute the entire agreement
                between you and Gravura Poderosa LDA regarding the Tool.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                14.2 Severability
              </h3>
              <p className="text-slate-700">
                If any provision of these Terms is held to be invalid or
                unenforceable, the remaining provisions will remain in full
                force and effect.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                14.3 No Waiver
              </h3>
              <p className="text-slate-700">
                Our failure to enforce any right or provision of these Terms
                will not be deemed a waiver of such right or provision.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                14.4 Assignment
              </h3>
              <p className="text-slate-700">
                You may not assign or transfer your rights or obligations under
                these Terms without our prior written consent. We may freely
                assign or transfer these Terms without restriction.
              </p>

              <hr className="my-8" />

              <p className="mt-8 text-slate-700">
                By using our Tool, you acknowledge that you have read,
                understood, and agree to these Terms of Service.
              </p>
            </div>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  )
}
