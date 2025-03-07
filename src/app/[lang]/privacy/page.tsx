'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { useI18n } from '@/hooks/useI18n'

// Metadata is exported from a separate file since this is a client component
// src/app/privacy/metadata.ts would be the ideal place for this

export default function Privacy() {
  const { t } = useI18n()

  return (
    <>
      <Header />
      <main>
        <Container className="py-16 md:py-20">
          <FadeIn>
            <div className="prose prose-slate mx-auto max-w-4xl">
              <h1 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
                {t('common.privacy.title')}
              </h1>
              <p className="text-sm text-slate-600">
                {t('common.privacy.lastUpdated')}
              </p>

              <div className="mt-8">
                <p className="text-lg text-slate-700">
                  {t('common.privacy.intro.text')}
                </p>
              </div>

              {/* No Personal Data */}
              <div>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.privacy.sections.noPersonalData.title')}
                </h2>
                <ul className="list-disc pl-6 text-slate-700">
                  <li>
                    <strong>
                      {t(
                        'common.privacy.sections.noPersonalData.items.1.title',
                      )}
                    </strong>
                    : {t('common.privacy.sections.noPersonalData.items.1.text')}
                  </li>
                  <li>
                    <strong>
                      {t(
                        'common.privacy.sections.noPersonalData.items.2.title',
                      )}
                    </strong>
                    : {t('common.privacy.sections.noPersonalData.items.2.text')}
                  </li>
                </ul>
              </div>

              {/* Data Controller */}
              <div>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.privacy.sections.dataController.title')}
                </h2>
                <ul className="list-disc pl-6 text-slate-700">
                  <li>
                    <strong>
                      {t(
                        'common.privacy.sections.dataController.items.1.title',
                      )}
                    </strong>
                    : {t('common.privacy.sections.dataController.items.1.text')}
                  </li>
                  <li>
                    <strong>
                      {t(
                        'common.privacy.sections.dataController.items.2.title',
                      )}
                    </strong>
                    : {t('common.privacy.sections.dataController.items.2.text')}
                  </li>
                </ul>
              </div>

              {/* User Representations */}
              <div>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.privacy.sections.userRepresentations.title')}
                </h2>
                <p className="text-slate-700">
                  {t('common.privacy.sections.userRepresentations.intro')}
                </p>
                <ul className="list-decimal pl-6 text-slate-700">
                  <li>
                    <strong>
                      {t(
                        'common.privacy.sections.userRepresentations.items.1.title',
                      )}
                    </strong>
                    :{' '}
                    {t(
                      'common.privacy.sections.userRepresentations.items.1.text',
                    )}
                  </li>
                  <li>
                    <strong>
                      {t(
                        'common.privacy.sections.userRepresentations.items.2.title',
                      )}
                    </strong>
                    :{' '}
                    {t(
                      'common.privacy.sections.userRepresentations.items.2.text',
                    )}
                  </li>
                  <li>
                    <strong>
                      {t(
                        'common.privacy.sections.userRepresentations.items.3.title',
                      )}
                    </strong>
                    :{' '}
                    {t(
                      'common.privacy.sections.userRepresentations.items.3.text',
                    )}
                  </li>
                </ul>
              </div>

              {/* Limited Role */}
              <div>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.privacy.sections.limitedRole.title')}
                </h2>
                <ul className="list-disc pl-6 text-slate-700">
                  <li>
                    <strong>
                      {t('common.privacy.sections.limitedRole.items.1.title')}
                    </strong>
                    : {t('common.privacy.sections.limitedRole.items.1.text')}
                  </li>
                  <li>
                    <strong>
                      {t('common.privacy.sections.limitedRole.items.2.title')}
                    </strong>
                    : {t('common.privacy.sections.limitedRole.items.2.text')}
                  </li>
                  <li>
                    <strong>
                      {t('common.privacy.sections.limitedRole.items.3.title')}
                    </strong>
                    : {t('common.privacy.sections.limitedRole.items.3.text')}
                  </li>
                </ul>
              </div>

              {/* Breach */}
              <div>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.privacy.sections.breach.title')}
                </h2>
                <ul className="list-disc pl-6 text-slate-700">
                  <li>
                    <strong>
                      {t('common.privacy.sections.breach.items.1.title')}
                    </strong>
                    : {t('common.privacy.sections.breach.items.1.text')}
                  </li>
                  <li>
                    <strong>
                      {t('common.privacy.sections.breach.items.2.title')}
                    </strong>
                    : {t('common.privacy.sections.breach.items.2.text')}
                  </li>
                </ul>
              </div>

              {/* No Warranty */}
              <div>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.privacy.sections.noWarranty.title')}
                </h2>
                <ul className="list-disc pl-6 text-slate-700">
                  <li>
                    {t('common.privacy.sections.noWarranty.items.1.text')}
                  </li>
                  <li>
                    {t('common.privacy.sections.noWarranty.items.2.text')}
                  </li>
                </ul>
              </div>

              {/* Complaints */}
              <div>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.privacy.sections.complaints.title')}
                </h2>
                <ul className="list-disc pl-6 text-slate-700">
                  <li className="mt-2">
                    <strong>
                      {t('common.privacy.sections.complaints.items.1.title')}
                    </strong>
                    : {t('common.privacy.sections.complaints.items.1.text')}
                    <ul className="mt-2 list-none pl-6">
                      <li>
                        {t(
                          'common.privacy.sections.complaints.items.1.contact.email',
                        )}
                      </li>
                      <li>
                        {t(
                          'common.privacy.sections.complaints.items.1.contact.address',
                        )}
                      </li>
                    </ul>
                  </li>
                  <li>
                    {t('common.privacy.sections.complaints.items.2.text')}
                  </li>
                </ul>
              </div>

              {/* Changes */}
              <div>
                <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                  {t('common.privacy.sections.changes.title')}
                </h2>
                <ul className="list-disc pl-6 text-slate-700">
                  <li>{t('common.privacy.sections.changes.items.1.text')}</li>
                  <li>{t('common.privacy.sections.changes.items.2.text')}</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  )
}
