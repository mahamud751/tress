import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Mad About Trees",
  description: "How Mad About Trees handles the details you share with us.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <header className="site-header is-solid">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="Mad About Trees home">
            <img className="brand-logo" src="/images/site/logo.jpg" alt="" />
            <span>Mad About Trees</span>
          </a>
          <a className="button button-compact privacy-back" href="/#contact">
            Get a Free Quote
          </a>
        </div>
      </header>
      <main className="privacy-page content-width">
        <p className="eyebrow">Mad About Trees</p>
        <h1>Privacy Policy</h1>

        <h2>Who we are</h2>
        <p>
          Mad About Trees provides tree care, tree felling and stump grinding.
          You can contact us on 07970 390235 (Stephen) or 0161 343 6912
          (office).
        </p>

        <h2>Your enquiry</h2>
        <p>
          The enquiry form on this website does not send your details to us or
          store them on a server. When you request a quote, your device prepares
          a text message containing the details you entered. Nothing is shared
          until you choose to send that message. Any photographs you select stay
          on your device until you attach them yourself.
        </p>

        <h2>How we use your details</h2>
        <p>
          We use the details you send us, such as your name, phone number,
          email address, postcode, description of the work and photographs, to
          respond to your enquiry, arrange an assessment and provide a quote. We
          do not sell your details.
        </p>

        <h2>Cookies</h2>
        <p>This website does not use cookies or analytics tracking.</p>

        <h2>Your rights</h2>
        <p>
          You can ask us what information we hold about you, or ask us to
          correct or delete it, by calling us on the numbers above.
        </p>

        <p className="privacy-back-link">
          <a href="/">← Back to the home page</a>
        </p>
      </main>
    </>
  );
}
