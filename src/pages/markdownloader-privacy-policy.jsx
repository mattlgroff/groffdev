import Head from 'next/head';
import { Card } from 'src/components/Card';
import { Section } from 'src/components/Section';
import { SimpleLayout } from 'src/components/SimpleLayout';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Markdownloader</title>
        <meta name="description" content="Privacy Policy for the Markdownloader Chrome Extension" />
      </Head>
      <SimpleLayout
        title="Privacy Policy"
        intro="Understand how Markdownloader protects your privacy."
      >
        <Section>
          <Card>
            <p className="text-gray-500">
              At Markdownloader, we respect your privacy and are committed to protecting it through our compliance with this policy.
            </p>
            <p className="text-gray-500">
              <strong>Data Collection and Usage:</strong> Our Chrome extension, Markdownloader, does not collect, store, or share any personal data. 
              All operations, including the fetching of HTML from your active browser tab and the conversion of this HTML to Markdown, occur locally within your browser using the Turndown JS package. No data is transferred across the Internet.
            </p>
            <p className="text-gray-500">
              <strong>No External Data Transfer:</strong> The extension operates entirely offline, without any internet connection, ensuring your data remains private and secure on your device.
            </p>
            <p className="text-gray-500">
              We are committed to protecting your privacy and ensuring that your experience with Markdownloader is secure and beneficial. Should you have any questions about our privacy practices, please feel free to contact us.
            </p>
          </Card>
        </Section>
      </SimpleLayout>
    </>
  );
}
