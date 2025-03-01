'use client'

import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'
import { useI18n } from '@/hooks/useI18n'

export function Faqs() {
  const { t } = useI18n()
  
  const faqs = [
    [
      {
        question: t('faqs.questions.0.question'),
        answer: t('faqs.questions.0.answer'),
      },
      {
        question: t('faqs.questions.1.question'),
        answer: t('faqs.questions.1.answer'),
      },
      {
        question: t('faqs.questions.2.question'),
        answer: t('faqs.questions.2.answer'),
      },
    ],
    [
      {
        question: t('faqs.questions.3.question'),
        answer: t('faqs.questions.3.answer'),
      },
      {
        question: t('faqs.questions.4.question'),
        answer: t('faqs.questions.4.answer'),
      },
      {
        question: t('faqs.questions.5.question'),
        answer: t('faqs.questions.5.answer'),
      },
    ],
    [
      {
        question: t('faqs.questions.6.question'),
        answer: t('faqs.questions.6.answer'),
      },
      {
        question: t('faqs.questions.7.question'),
        answer: t('faqs.questions.7.answer'),
      },
      {
        question: t('faqs.questions.8.question'),
        answer: t('faqs.questions.8.answer'),
      },
    ],
  ]
  
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            {t('faqs.title')}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            {t('faqs.subtitle')}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
