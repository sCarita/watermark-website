'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-features.jpg'
import screenshotManualBrush from '@/images/screenshots/manual-brush.png'
import screenshotManualObject from '@/images/screenshots/manual-object.png'
import Demo0 from '@/images/screenshots/demo_0.png'
import screenshotApiIntegration from '@/images/screenshots/api-integration.jpeg'
import { useI18n } from '@/hooks/useI18n'

export function PrimaryFeatures() {
  const { t } = useI18n()
  let [tabOrientation, setTabOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  )

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  // Get features from translations
  const features = [
    {
      title: t('primaryFeatures.features.0.title'),
      description: t('primaryFeatures.features.0.description'),
      image: Demo0,
    },
    {
      title: t('primaryFeatures.features.1.title'),
      description: t('primaryFeatures.features.1.description'),
      image: screenshotManualBrush,
    },
    {
      title: t('primaryFeatures.features.2.title'),
      description: t('primaryFeatures.features.2.description'),
      image: screenshotManualObject,
    },
    {
      title: t('primaryFeatures.features.3.title'),
      description: t('primaryFeatures.features.3.description'),
      image: screenshotApiIntegration,
    },
  ]

  return (
    <section
      id="features"
      aria-label={t('accessibility.featuresForRunningYourBooks')}
      className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%] opacity-20"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            {t('primaryFeatures.title')}
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            {t('primaryFeatures.subtitle')}
          </p>
        </div>
        <TabGroup
          className="mt-16 grid grid-cols-1 items-center gap-x-4 gap-y-2 pt-10 sm:gap-x-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <TabList className="relative z-10 flex gap-x-4 px-4 whitespace-nowrap sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-white/10 lg:ring-inset'
                          : 'hover:bg-white/10 lg:hover:bg-white/5',
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg data-selected:not-data-focus:outline-hidden',
                            selectedIndex === featureIndex
                              ? 'text-blue-600 lg:text-white'
                              : 'text-blue-100 hover:text-white lg:text-white',
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : 'text-blue-100 group-hover:text-white',
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </TabList>
              </div>
              <TabPanels className="lg:col-span-7">
                {features.map((feature) => (
                  <TabPanel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] ring-white/10 ring-inset sm:inset-x-0 sm:rounded-t-xl md:ring-1" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-full overflow-hidden rounded-xl bg-transparent">
                      <div className="relative flex h-full w-full flex-col items-center justify-center">
                        {feature.title !==
                        t('primaryFeatures.features.3.title') ? (
                          <Image
                            className="object-contain"
                            src={feature.image}
                            alt={feature.title}
                            priority
                            width={800}
                            height={600}
                            style={{
                              width: '100%',
                              maxWidth: '100%',
                              maxHeight: '600px',
                              height: 'auto',
                            }}
                          />
                        ) : (
                          <div className="max-w-full p-6 text-white">
                            <pre className="mb-6 overflow-x-auto rounded-lg bg-blue-900 p-4">
                              <code className="text-sm">
                                {`const response = await fetch('https://api.clear.photo/remove', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    image_url: 'https://example.com/image.jpg',
    remove_type: 'watermark'
  })
});

const result = await response.json();
const cleanImage = result.processed_url;`}
                              </code>
                            </pre>
                            <div className="space-y-4">
                              <p>✓ Simple REST API endpoints</p>
                              <p>✓ Bulk processing support</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </>
          )}
        </TabGroup>
      </Container>
    </section>
  )
}
