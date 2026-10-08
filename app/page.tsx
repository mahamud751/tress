"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type CSSProperties,
} from "react";

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    chevron: <path d="m7 10 5 5 5-5" />,
    leaf: (
      <>
        <path d="M20 3C9 2 4 8 5 15c6 5 14 0 15-12ZM4 22 15 8" />
      </>
    ),
    sprout: (
      <>
        <path d="M12 22V10M12 16C5 17 3 12 3 9c6 0 9 3 9 7ZM12 19c7 0 9-5 9-8-6 0-9 4-9 8ZM12 11C6 7 10 3 12 1c4 4 5 7 0 10Z" />
      </>
    ),
    grinder: (
      <>
        <rect x="2" y="16" width="20" height="6" rx="3" />
        <path d="M5 16V9h7l5 7M11 9l4-6 5 3-4 6M18 2l3 5M6 19h.01M12 19h.01M18 19h.01" />
      </>
    ),
    gate: (
      <>
        <path d="M2 22V5l3 2c4-9 10-9 14 0l3-2v17M2 20h20M6 5v15M10 2v18M14 2v18M18 5v15" />
      </>
    ),
    camera: (
      <>
        <path d="M8 6 9.5 3h5L16 6h4a2 2 0 0 1 2 2v11H2V8a2 2 0 0 1 2-2Z" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    quote: (
      <>
        <path d="M6 3h9l5 5v13H6Z" />
        <path d="M14 3v6h6M9.5 13h7M9.5 17h5" />
      </>
    ),
    check: <path d="m4 12.5 5 5L20 6.5" />,
    phone: <path d="m5 2 4 5-2 3c2 4 4 6 7 7l3-2 5 4-2 3C10 23 1 14 2 4Z" />,
    telephone: (
      <>
        <path d="M3 7c2-5 16-5 18 0v4h-5V8H8v3H3ZM8 11l-4 7v4h16v-4l-4-7" />
        <circle cx="12" cy="17" r="3" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m5 5 14 14M19 5 5 19" />,
  };
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}

// The supplied reference is retained as an image atlas, preserving its original
// logo and photography without recreating those brand assets. The hero photo is
// high resolution, so crops of it are preferred wherever they fit.
const ATLAS = {
  href: "/images/design-reference.jpeg",
  width: 898,
  height: 1752,
};
const HERO = {
  href: "/images/stump-removal-hero.png",
  width: 1817,
  height: 866,
};

function Photo({
  box,
  className = "",
  label,
  source = ATLAS,
}: {
  box: string;
  className?: string;
  label: string;
  source?: typeof ATLAS;
}) {
  return (
    <svg
      viewBox={box}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
    >
      <image href={source.href} width={source.width} height={source.height} />
    </svg>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#home"
      aria-label="Mad About Trees home"
    >
      <Photo box="45 5 91 91" className="brand-logo" label="Mad About Trees logo" />
      <span>Mad About Trees</span>
    </a>
  );
}

function QuoteButton({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`button ${compact ? "button-header" : ""}`} href="#contact">
      Get a Free Quote
      <span className="button-icon">
        <Icon name="arrow" />
      </span>
    </a>
  );
}

const tickerItems = [
  "Stump grinding",
  "Tight-access gardens",
  "Compact machinery",
  "Clean, level finish",
  "Ready to replant",
  "Free quotes",
];

const steps = [
  {
    icon: "camera",
    title: "Snap your stump",
    text: "Send a quick photo with your postcode. Phone or email, whatever suits you.",
  },
  {
    icon: "quote",
    title: "Get a free quote",
    text: "We’ll look at size and access, then come back with a clear, no-obligation price.",
  },
  {
    icon: "grinder",
    title: "We grind it away",
    text: "Our compact grinders fit through most garden gates and leave level ground behind.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [comparison, setComparison] = useState(50);
  const [photoName, setPhotoName] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [quoteReady, setQuoteReady] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal sections as they scroll into view. Content stays visible without JS.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const contact = document.getElementById("contact");
    const contactObserver = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (contact) contactObserver.observe(contact);

    return () => {
      observer.disconnect();
      contactObserver.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);

  useEffect(() => {
    if (!quoteReady) return;
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [quoteReady]);

  function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPhotoError("");
    setPhotoName("");
    if (!file) return;
    if (
      !/\.(jpe?g|png|heic)$/i.test(file.name) ||
      file.size > 10 * 1024 * 1024
    ) {
      setPhotoError("Choose a JPG, PNG or HEIC photo under 10MB.");
      event.target.value = "";
      return;
    }
    setPhotoName(file.name);
  }

  function prepareQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (photoError) return;
    const data = new FormData(event.currentTarget);
    setQuoteText(
      `Hi Mad About Trees, I'd like a free stump removal quote.\nName: ${data.get("name")}\nPhone or email: ${data.get("contact")}\nPostcode: ${data.get("postcode")}`,
    );
    setCopied(false);
    setQuoteReady(true);
  }

  return (
    <>
      <header
        className={`site-header ${scrolled || menuOpen ? "is-solid" : ""}`}
        id="home"
      >
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <details className="services-menu">
              <summary>
                Services <Icon name="chevron" />
              </summary>
              <div className="services-dropdown">
                <a href="#services">
                  <Icon name="grinder" />
                  Stump removal & grinding
                </a>
                <a href="#access">
                  <Icon name="gate" />
                  Tight-access gardens
                </a>
              </div>
            </details>
            <a href="#process">How it works</a>
            <a href="#our-work">Our Work</a>
            <a href="#contact">Contact</a>
          </nav>
          <QuoteButton compact />
          <button
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {[
              ["Services", "services"],
              ["How it works", "process"],
              ["Our Work", "our-work"],
              ["Contact", "contact"],
            ].map(([label, target]) => (
              <a
                key={target}
                href={`#${target}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
                <Icon name="arrow" />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content content-width">
            <p className="hero-pill">
              <span className="pulse" />
              Stump removal & grinding
            </p>
            <h1 id="hero-heading">
              <span className="line">Make space</span>
              <br />
              <span className="line">for something</span>
              <br />
              <span className="line">
                <em>better.</em>
              </span>
            </h1>
            <p className="hero-description">
              Professional stump removal.
              <br />A fresh start for your garden.
            </p>
            <div className="hero-actions">
              <QuoteButton />
              <a href="#our-work" className="work-link">
                <span className="play-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m9 5 11 7-11 7Z" fill="currentColor" />
                  </svg>
                </span>
                Explore our work
              </a>
            </div>
          </div>
          <div className="benefits">
            <div className="content-width benefits-inner">
              <div>
                <Icon name="grinder" />
                <span>Compact equipment</span>
              </div>
              <div>
                <Icon name="leaf" />
                <span>Less garden disruption</span>
              </div>
              <div>
                <Icon name="sprout" />
                <span>Space to replant</span>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-group" key={copy}>
                {tickerItems.map((item) => (
                  <span key={item}>
                    {item}
                    <Icon name="sprout" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section
          id="services"
          className="services-section content-width"
          aria-labelledby="services-heading"
        >
          <div className="section-intro reveal">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 id="services-heading">
                Big stumps.
                <br />
                Small spaces.
                <br />
                <span className="accent">Sorted.</span>
              </h2>
            </div>
            <p className="intro-text">
              Our compact stump grinders fit through most garden gates, helping
              clear unwanted stumps for your next garden project.
            </p>
          </div>
          <div className="bento">
            <div className="bento-photo reveal">
              <Photo
                source={HERO}
                box="560 330 1257 536"
                label="Compact stump grinder removing a tree stump in a garden"
              />
              <span className="photo-tag">
                <Icon name="grinder" />
                Stump grinding
              </span>
              <div className="bento-photo-caption">
                <strong>Ground below the surface.</strong>
                <span>Roots and stump turned to chippings, not dug out.</span>
              </div>
            </div>
            <a id="access" href="#contact" className="access-card reveal">
              <Icon name="gate" />
              <h3>
                Tight access?
                <br />
                We can help.
              </h3>
              <p>Narrow side passages and garden gates are no problem.</p>
              <span className="circle-arrow">
                <Icon name="arrow" />
              </span>
            </a>
            <a href="#our-work" className="garden-card reveal">
              <Photo
                source={HERO}
                box="0 0 760 700"
                label="Lush green garden foliage"
              />
              <div className="garden-card-text">
                <h3>
                  Your garden.
                  <br />
                  Your next chapter.
                </h3>
                <span className="yellow-rule" />
              </div>
              <span className="circle-arrow">
                <Icon name="arrow" />
              </span>
            </a>
          </div>
        </section>

        <section
          id="process"
          className="process-section"
          aria-labelledby="process-heading"
        >
          <div className="content-width">
            <div className="section-intro reveal">
              <div>
                <p className="eyebrow">How it works</p>
                <h2 id="process-heading">
                  Three steps to
                  <br />
                  <span className="accent">a clear garden.</span>
                </h2>
              </div>
              <p className="intro-text">
                No fuss, no mess left behind. Tell us about your stump and
                we’ll handle the rest.
              </p>
            </div>
            <ol className="steps">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="step reveal"
                  style={{ "--delay": `${index * 110}ms` } as CSSProperties}
                >
                  <span className="step-number">0{index + 1}</span>
                  <span className="step-icon">
                    <Icon name={step.icon} />
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="work-section content-width"
          id="our-work"
          aria-labelledby="work-heading"
        >
          <div className="section-intro reveal">
            <div>
              <p className="eyebrow">Our work</p>
              <h2 id="work-heading">
                From stump to <span className="accent">fresh start.</span>
              </h2>
            </div>
            <p className="intro-text">
              See how we transform unwanted stumps into clean, level space ready
              for your next project.
            </p>
          </div>
          <div
            className="comparison reveal"
            style={{ "--split": `${comparison}%` } as CSSProperties}
          >
            <div className="comparison-panel after-panel">
              <Photo
                box="449 1166 407 184"
                label="After: tree stump removed, with clear soil ready to replant"
              />
              <span className="comparison-tag after-tag">After</span>
            </div>
            <div className="comparison-panel before-panel">
              <Photo
                box="42 1166 406 184"
                label="Before: a large tree stump in the garden"
              />
              <span className="comparison-tag">Before</span>
            </div>
            <div className="comparison-divider">
              <span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="m9 7-5 5 5 5m6-10 5 5-5 5" />
                </svg>
              </span>
            </div>
            <span className="drag-hint" aria-hidden="true">
              Drag to compare
            </span>
            <input
              type="range"
              min="5"
              max="95"
              value={comparison}
              onChange={(event) => setComparison(Number(event.target.value))}
              aria-label="Adjust before and after garden comparison"
              aria-valuetext={`${comparison}% before, ${100 - comparison}% after`}
            />
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="contact-glow" aria-hidden="true" />
          <div className="content-width contact-inner">
            <div className="contact-copy reveal">
              <p className="eyebrow">Free, no-obligation quote</p>
              <h2 id="contact-heading">
                Got a stump?
                <br />
                <span>Let’s sort it.</span>
              </h2>
              <p className="contact-lead">
                Fill in the form or give us a call. A photo of your stump helps
                us price it quickly.
              </p>
              <div className="contact-numbers">
                <a href="tel:07970390235">
                  <span className="contact-icon">
                    <Icon name="phone" />
                  </span>
                  <span>
                    <small>Stephen</small>
                    <strong>07970 390235</strong>
                  </span>
                </a>
                <a href="tel:01613436912">
                  <span className="contact-icon">
                    <Icon name="telephone" />
                  </span>
                  <span>
                    <small>Office</small>
                    <strong>0161 343 6912</strong>
                  </span>
                </a>
              </div>
            </div>
            <form className="quote-form reveal" onSubmit={prepareQuote}>
              <h3>Request a free quote</h3>
              <p className="form-sub">Takes less than a minute.</p>
              <div className="form-fields">
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="e.g. Joe Bloggs"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="field">
                  <label htmlFor="contact-details">Phone or email</label>
                  <input
                    id="contact-details"
                    name="contact"
                    autoComplete="email"
                    placeholder="07970 390235 or you@example.com"
                    required
                    maxLength={150}
                  />
                </div>
                <div className="field">
                  <label htmlFor="postcode">Postcode</label>
                  <input
                    id="postcode"
                    name="postcode"
                    autoComplete="postal-code"
                    placeholder="e.g. M20 4AB"
                    required
                    maxLength={12}
                  />
                </div>
              </div>
              <label
                className={`photo-upload ${photoName ? "has-photo" : ""}`}
                htmlFor="stump-photo"
              >
                <span className="upload-icon">
                  <Icon name={photoName ? "check" : "camera"} />
                </span>
                <span className="upload-text">
                  <span>{photoName || "Add a photo of your stump"}</span>
                  <small>
                    {photoName
                      ? "Click to change photo"
                      : "Optional · JPG, PNG or HEIC (max 10MB)"}
                  </small>
                </span>
                <input
                  id="stump-photo"
                  type="file"
                  accept=".jpg,.jpeg,.png,.heic"
                  onChange={selectPhoto}
                />
              </label>
              {photoError && (
                <p className="form-error" role="alert">
                  {photoError}
                </p>
              )}
              <button className="button quote-submit" type="submit">
                Request a Free Quote <Icon name="arrow" />
              </button>
            </form>
          </div>
          <footer className="site-footer">
            <div className="footer-inner content-width">
              <Brand footer />
              <nav aria-label="Footer navigation">
                <a href="#services">Services</a>
                <a href="#process">How it works</a>
                <a href="#our-work">Our Work</a>
                <a href="#contact">Contact</a>
              </nav>
              <div className="footer-phones">
                <a href="tel:07970390235">
                  <Icon name="phone" />
                  07970 390235
                </a>
                <a href="tel:01613436912">
                  <Icon name="telephone" />
                  0161 343 6912
                </a>
              </div>
            </div>
            <p className="footer-legal content-width">
              © {new Date().getFullYear()} Mad About Trees. Stump removal &
              grinding.
            </p>
          </footer>
        </section>
      </main>

      <div
        className={`mobile-cta ${scrolled && !contactVisible && !menuOpen ? "is-shown" : ""}`}
      >
        <a href="tel:07970390235" className="mobile-cta-call">
          <Icon name="phone" />
          Call Stephen
        </a>
        <a href="#contact" className="mobile-cta-quote">
          Free quote <Icon name="arrow" />
        </a>
      </div>

      {quoteReady && (
        <div
          className="modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setQuoteReady(false);
          }}
        >
          <dialog
            ref={dialogRef}
            className="quote-dialog"
            aria-labelledby="quote-dialog-title"
            onCancel={() => setQuoteReady(false)}
          >
            <button
              autoFocus
              className="dialog-close"
              aria-label="Close quote details"
              onClick={() => setQuoteReady(false)}
            >
              <Icon name="close" />
            </button>
            <span className="dialog-badge">
              <Icon name="check" />
            </span>
            <p className="eyebrow">Let’s sort your stump</p>
            <h2 id="quote-dialog-title">Your details are ready.</h2>
            <p>
              Send your request by text to Stephen, or call us for a free quote.
              Your request hasn’t been sent yet.
            </p>
            <pre>{quoteText}</pre>
            {photoName && (
              <p className="photo-note">
                Attach <strong>{photoName}</strong> in your messaging app before
                sending.
              </p>
            )}
            <a
              className="button"
              href={`sms:+447970390235?body=${encodeURIComponent(quoteText)}`}
            >
              Open text message <Icon name="arrow" />
            </a>
            <button
              className="copy-button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(quoteText);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Details copied" : "Copy quote details"}
            </button>
            <a className="dialog-phone" href="tel:07970390235">
              Or call 07970 390235
            </a>
          </dialog>
        </div>
      )}
    </>
  );
}
