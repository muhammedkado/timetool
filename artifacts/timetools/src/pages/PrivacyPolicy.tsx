import { useSeo } from "@/hooks/useSeo";
import { PageLayout } from "@/components/Layout";
import { useLang } from "@/contexts/LangContext";

export default function PrivacyPolicy() {
  const { lang } = useLang();
  useSeo({
    title: "Privacy Policy | TimeZone.tools",
    description: "Privacy Policy for TimeZone.tools — learn how we handle your data and use of advertising cookies.",
    canonical: `https://timezone.tools/${lang}/privacy-policy`,
  });

  const updated = "May 2, 2026";

  return (
    <PageLayout title="Privacy Policy" description={`Last updated: ${updated}`}>
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-foreground">

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">1. Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            TimeZone.tools ("we", "our", or "us") operates the website available at{" "}
            <strong>timezone.tools</strong> (the "Service"). This page informs you of our policies
            regarding the collection, use, and disclosure of information when you use our Service.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We are committed to protecting your privacy. All tools on this site run entirely in your
            browser — no data you enter (dates, times, event names) is ever sent to our servers or
            stored anywhere.
          </p>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">2. Information We Do Not Collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do <strong>not</strong> collect:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Personal identification information (name, email, phone, address)</li>
            <li>Any data entered into our tools (dates, times, event names, timezones)</li>
            <li>Account or login data — no registration is required</li>
            <li>Payment information</li>
          </ul>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">3. Cookies and Local Storage</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use <strong>browser localStorage</strong> to remember your language and theme preferences
            only. This data never leaves your device and is not sent to any server.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Countdown timer share links encode data in the URL only — no cookies are set for this
            feature.
          </p>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">4. Google AdSense & Advertising</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use <strong>Google AdSense</strong> to display advertisements on this website. Google
            AdSense uses cookies to serve ads based on your prior visits to this website and other
            sites on the internet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Google's use of advertising cookies enables it and its partners to serve ads based on
            your visit to our site and/or other sites on the Internet. You may opt out of
            personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Ads Settings
            </a>
            .
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For more information on how Google uses data from partner sites, visit:{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              How Google uses information from sites that use our services
            </a>
            .
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior
            visits to our website. The DoubleClick cookie enables Google and its partners to serve
            ads based on your visit here and other sites on the Internet.
          </p>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">5. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our website uses the following third-party services, each with their own privacy policies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Google AdSense</strong> —{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong>Google Fonts</strong> — fonts served from Google's CDN. Google may log requests per their{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                privacy policy
              </a>
            </li>
          </ul>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">6. Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our Service does not address anyone under the age of 13. We do not knowingly collect
            personally identifiable information from children under 13.
          </p>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">7. Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page. Changes are effective immediately upon
            posting.
          </p>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">8. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:contact@timezone.tools" className="text-primary hover:underline">
              contact@timezone.tools
            </a>
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
