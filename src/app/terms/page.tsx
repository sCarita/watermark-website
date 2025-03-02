'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { useI18n } from '@/hooks/useI18n'

export default function Terms() {
  return (
    <>
      <Header />
      <main>
        <Container className="py-16 md:py-20">
          <FadeIn>
            <div className="prose prose-slate mx-auto max-w-4xl">
              <h1 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
                Terms of Service
              </h1>
              <p className="text-sm text-slate-600">Last Updated: 01/03/2025</p>

              <div className="mt-8">
                <p className="text-lg text-slate-700">
                  Welcome to Gravura Poderosa LDA ("<strong>we</strong>," "
                  <strong>us</strong>," or "<strong>our</strong>"), a company
                  incorporated in Portugal with the fiscal number{' '}
                  <strong>517517787</strong>. These Terms of Service ("
                  <strong>Terms</strong>") govern your use of our image
                  watermark removal tool (the "<strong>Tool</strong>"), located
                  at{' '}
                  <a href="/" className="text-blue-600 hover:text-blue-800">
                    clear.photo
                  </a>
                  .
                </p>
                <p className="mt-4 text-lg text-slate-700">
                  By accessing or using the Tool, you agree to be bound by these
                  Terms. If you do not agree to all the Terms, do not use the
                  Tool.
                </p>
              </div>

              <hr className="my-8" />

              <h2 className="mt-12 font-display text-2xl font-medium tracking-tight text-slate-900">
                1. Acceptance of Terms
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                1.1 Contractual Relationship
              </h3>
              <p className="text-slate-700">
                By accessing or using the Tool, you acknowledge that you have
                read, understood, and agree to be bound by these Terms, as well
                as our{' '}
                <a
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Privacy Policy
                </a>
                , which is incorporated by reference.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                1.2 Eligibility
              </h3>
              <p className="text-slate-700">
                You may not use the Tool if you are not legally eligible to form
                a binding contract under applicable laws, or if your use of the
                Tool is prohibited by any applicable laws or regulations.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                2. Modifications to Terms
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                2.1 Updates
              </h3>
              <p className="text-slate-700">
                We reserve the right to modify these Terms at any time. Changes
                will be effective immediately upon posting to our website unless
                otherwise indicated.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                2.2 Notification
              </h3>
              <p className="text-slate-700">
                We will provide notice of any material changes (e.g., via a
                prominent statement on our homepage or by email). Your continued
                use of the Tool after the effective date of any updated Terms
                constitutes your acceptance of the changes.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                3. Description, Responsible Use, and Scope of the Tool
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                3.1 Responsible Use: Fostering AI Advancements
              </h3>
              <p className="text-slate-700">
                Our Tool is designed to facilitate the removal of watermarks
                from images in ways that support{' '}
                <strong>scientific research</strong>,{' '}
                <strong>educational pursuits</strong>, and the{' '}
                <strong>development of new technologies</strong>. We encourage
                users to harness this Tool as a resource for advancing{' '}
                <strong>artificial intelligence (AI)</strong>—particularly in
                image processing, machine learning, and computer vision. Through
                responsible and ethical usage:
              </p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>
                  <strong>Research & Collaboration</strong>: You may use the
                  Tool to prototype innovative approaches in AI, explore
                  open-source libraries, and collaborate on academic or
                  community-driven projects.
                </li>
                <li>
                  <strong>AI Evolution</strong>: We believe imagery systems have
                  the potential to drive the{' '}
                  <strong>artificialization of intelligence</strong> in a
                  similar transformative manner as language technologies have
                  shaped human-computer interactions. By combining visual and
                  linguistic capabilities, we can extend the boundaries of AI to
                  mirror the analytical and creative aspects of human intellect.
                </li>
                <li>
                  <strong>Ethical Considerations</strong>: You are encouraged to
                  abide by ethical principles in AI research, including respect
                  for data privacy, avoidance of biases, and transparency about
                  your usage of this Tool.
                </li>
              </ul>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                3.2 Exclusive for Scientific and Development Purposes
              </h3>
              <p className="text-slate-700">
                The Tool is offered <strong>exclusively</strong> for{' '}
                <strong>
                  non-commercial, scientific, experimental, and developmental
                </strong>{' '}
                uses. By using this Tool, you agree to:
              </p>
              <ol className="list-decimal pl-6 text-slate-700">
                <li>
                  <strong>Avoid Commercial Exploitation</strong>: You shall not
                  use or modify any output or processed images derived from the
                  Tool for direct or indirect commercial gain.
                </li>
                <li>
                  <strong>Open Source Engagement</strong>: Where applicable, we
                  encourage contributions to or usage of open-source projects
                  that foster the improvement of AI-related technologies.
                </li>
                <li>
                  <strong>Prohibit Unauthorized Use</strong>: You must not use
                  the Tool to infringe on intellectual property rights or to
                  engage in any activity that violates local or international
                  law.
                </li>
              </ol>
              <p className="mt-4 text-slate-700">
                Any use of the Tool outside the scope of scientific,
                educational, or developmental purposes is strictly prohibited.
                If you have questions about permissible uses or wish to request
                permission for commercial usage, please contact us in advance.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                4. User Responsibilities
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                4.1 Lawful Use
              </h3>
              <p className="text-slate-700">
                You represent and warrant that you own or have the necessary
                rights and permissions to the content you upload for watermark
                removal. You agree not to upload any images whose watermark
                removal would infringe on any party's rights or violate any
                laws.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                4.2 Prohibited Content
              </h3>
              <p className="text-slate-700">
                You agree not to upload or distribute any content that:
              </p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>
                  Violates applicable laws or regulations, including but not
                  limited to copyright, trademark, or defamation laws.
                </li>
                <li>
                  Contains or promotes hate speech, violence, or illegal
                  activities.
                </li>
                <li>
                  Infringes any intellectual property or proprietary rights of a
                  third party.
                </li>
              </ul>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                4.3 Accuracy of Information
              </h3>
              <p className="text-slate-700">
                When creating an account or otherwise providing information to
                us, you agree to provide accurate and up-to-date information.
              </p>

              <hr className="my-8" />

              <h2 className="mt-10 font-display text-2xl font-medium tracking-tight text-slate-900">
                5. Data Retention Policy
              </h2>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                5.1 24-Hour Storage
              </h3>
              <p className="text-slate-700">
                To manage operational costs and protect user privacy, we store
                your processed images on our servers for a maximum period of{' '}
                <strong>24 hours</strong> after the watermark removal process is
                completed.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                5.2 Automatic Deletion
              </h3>
              <p className="text-slate-700">
                After 24 hours, the processed images (and any user-uploaded
                images) are automatically and irreversibly deleted from our
                servers.
              </p>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-slate-900">
                5.3 No Recovery
              </h3>
              <p className="text-slate-700">
                Once deleted, these images cannot be recovered. We are not
                liable for any loss you may incur if you fail to download your
                processed images within the 24-hour window.
              </p>

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
