"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
} from "react";

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path d="M4 12h15M13 5l7 7-7 7" />,
    back: <path d="M20 12H5M11 5l-7 7 7 7" />,
    chevron: <path d="m7 10 5 5 5-5" />,
    leaf: <path d="M20 3C9 2 4 8 5 15c6 5 14 0 15-12ZM4 22 15 8" />,
    pine: <path d="M12 2 6.5 9.5h3L5 15.5h5V22h4v-6.5h5l-4.5-6h3Z" />,
    grinder: (
      <>
        <rect x="2" y="16" width="20" height="6" rx="3" />
        <path d="M5 16V9h7l5 7M11 9l4-6 5 3-4 6M18 2l3 5M6 19h.01M12 19h.01M18 19h.01" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-9 9" />
      </>
    ),
    play: <path d="m9 5 11 7-11 7Z" />,
    check: <path d="m4 12.5 5 5L20 6.5" />,
    phone: <path d="m5 2 4 5-2 3c2 4 4 6 7 7l3-2 5 4-2 3C10 23 1 14 2 4Z" />,
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

// Photography and logo are cropped from the supplied design reference
// (public/images/design-reference.jpeg). Swap in full-resolution originals
// at the same paths when they are available.
const IMG = "/images/site";

// Set to a video link (e.g. YouTube or Facebook) to show "Watch Us at Work".
const WORK_VIDEO_URL = "";

const STEPHEN = { label: "07970 390235", tel: "07970390235" };
const OFFICE = { label: "0161 343 6912", tel: "01613436912" };

const services = [
  {
    id: "tree-felling",
    title: "Tree Felling & Removal",
    image: "service-felling.jpg",
    alt: "Arborist felling a large tree with a chainsaw",
    text: "Need a tree removed? We consider its size, position, surrounding buildings and site access to plan the work. Contact us to discuss your tree and arrange an assessment.",
  },
  {
    id: "tree-pruning",
    title: "Tree Pruning",
    image: "service-pruning.jpg",
    alt: "Climber pruning branches high in a tree",
    text: "Give your trees the attention they need. Pruning can help manage growth, remove selected branches and improve the shape of a tree. We’ll discuss what you want to achieve and the work suitable for your tree.",
  },
  {
    id: "crown-reduction",
    title: "Crown Reduction",
    image: "service-crown.jpg",
    alt: "Climber reducing the crown of a tree",
    text: "Looking to manage the height or spread of a tree? Crown reduction involves reducing selected branches to create a smaller canopy. Speak to us about whether it is the right option for your tree.",
  },
  {
    id: "hedge-cutting",
    title: "Hedge Cutting",
    image: "service-hedge.jpg",
    alt: "Trimming a tall hedge with a pole hedge cutter",
    text: "Keep your hedges neat and manageable. From routine trimming to reshaping overgrown hedges, tell us about the size of your hedge and the finish you would like.",
  },
  {
    id: "stump-grinding",
    title: "Stump Grinding",
    image: "service-stump.jpg",
    alt: "Stump grinder reducing a tree stump",
    text: "Left with a stump after a tree has been removed? Stump grinding reduces the remaining stump below ground level, helping you prepare the area for your next garden project.",
  },
  {
    id: "site-clearance",
    title: "Site Clearance",
    image: "service-clearance.jpg",
    alt: "Excavator clearing felled trees and vegetation",
    text: "Preparing an outdoor space for its next use? Contact us about clearing unwanted trees, shrubs and vegetation. We’ll assess the site and agree what needs to be removed.",
  },
];

const work = [
  {
    image: "work-height.jpg",
    title: "Tree work at height",
    alt: "Access platform raised high into a tree canopy",
  },
  {
    image: "work-canopy.jpg",
    title: "Working among the canopy",
    alt: "Platform basket working among the branches of a tall tree",
  },
  {
    image: "work-platform.jpg",
    title: "Access platform in action",
    alt: "Mad About Trees truck-mounted access platform extended on a residential street",
  },
];

const steps = [
  {
    title: "Tell us what you need",
    text: "Call us or send an enquiry with your postcode, a short description and photographs if you have them.",
  },
  {
    title: "Arrange an assessment",
    text: "We’ll discuss the job and arrange a site visit where needed, so we can understand the tree, access and surrounding space.",
  },
  {
    title: "Receive your quote",
    text: "We’ll explain the proposed work and provide a free, no-obligation quote. Once you’re happy to proceed, we’ll agree a suitable date.",
  },
];

const navLinks = [
  ["Services", "services"],
  ["Our Work", "our-work"],
  ["About", "about"],
  ["Contact", "contact"],
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#home"
      aria-label="Mad About Trees home"
    >
      <img className="brand-logo" src={`${IMG}/logo.jpg`} alt="" />
      <span>Mad About Trees</span>
    </a>
  );
}

function QuoteButton({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`button ${compact ? "button-compact" : ""}`} href="#contact">
      Get a Free Quote
      <Icon name="arrow" />
    </a>
  );
}

function SectionIntro({
  eyebrow,
  id,
  title,
  children,
}: {
  eyebrow: string;
  id: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-intro reveal">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {children && <div className="intro-text">{children}</div>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [service, setService] = useState("");
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [quoteReady, setQuoteReady] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const [copied, setCopied] = useState(false);
  const [viewing, setViewing] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewerRef = useRef<HTMLDialogElement>(null);
  const modalOpen = quoteReady || viewing !== null;

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
    if (quoteReady) dialogRef.current?.showModal();
  }, [quoteReady]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewing !== null && viewer && !viewer.open) viewer.showModal();
  }, [viewing]);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modalOpen]);

  function showWork(step: number) {
    setViewing((current) =>
      current === null ? 0 : (current + step + work.length) % work.length,
    );
  }

  function selectPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setPhotoError("");
    setPhotoNames([]);
    if (!files.length) return;
    const invalid = files.some(
      (file) =>
        !/\.(jpe?g|png|heic)$/i.test(file.name) || file.size > 10 * 1024 * 1024,
    );
    if (invalid || files.length > 10) {
      setPhotoError(
        "Choose up to 10 JPG, PNG or HEIC photos, each under 10MB.",
      );
      event.target.value = "";
      return;
    }
    setPhotoNames(files.map((file) => file.name));
  }

  function prepareQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (photoError) return;
    const data = new FormData(event.currentTarget);
    const lines = [
      "Hi Stephen, I'd like a free quote from Mad About Trees.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      data.get("email") && `Email: ${data.get("email")}`,
      `Postcode: ${data.get("postcode")}`,
      `Service: ${data.get("service")}`,
      data.get("details") && `About the work: ${data.get("details")}`,
    ];
    setQuoteText(lines.filter(Boolean).join("\n"));
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
                {services.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) =>
                      event.currentTarget
                        .closest("details")
                        ?.removeAttribute("open")
                    }
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </details>
            {navLinks.slice(1).map(([label, target]) => (
              <a key={target} href={`#${target}`}>
                {label}
              </a>
            ))}
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
            {navLinks.map(([label, target]) => (
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
          <div className="hero-media" aria-hidden="true">
            <img src={`${IMG}/hero.jpg`} alt="" fetchPriority="high" />
          </div>
          <div className="hero-content content-width">
            <p className="eyebrow">Mad About Trees</p>
            <h1 id="hero-heading">
              Professional
              <br />
              Tree Care &amp;
              <br />
              Felling Specialists
            </h1>
            <p className="hero-description">
              From caring for established trees to removing unwanted trees and
              grinding away stumps, Mad About Trees can help you take the next
              step with your outdoor space.
            </p>
            <p className="hero-description">
              Speak to Stephen about the work you need and arrange a free,
              no-obligation quote.
            </p>
            <div className="hero-actions">
              <QuoteButton />
              <a href={`tel:${STEPHEN.tel}`} className="button button-outline">
                <Icon name="phone" />
                Call Stephen
              </a>
            </div>
          </div>
          <div className="hero-strip">
            <ul className="content-width">
              <li>
                <Icon name="leaf" />
                Tree care
              </li>
              <li>
                <Icon name="pine" />
                Tree felling
              </li>
              <li>
                <Icon name="grinder" />
                Stump grinding
              </li>
            </ul>
          </div>
        </section>

        <section
          id="services"
          className="services-section"
          aria-labelledby="services-heading"
        >
          <div className="content-width">
            <SectionIntro
              eyebrow="Our services"
              id="services-heading"
              title="Complete care. From canopy to ground."
            >
              Every tree and every site is different. Whether you need regular
              tree care or help with a larger removal, tell us what you have in
              mind and we’ll discuss a suitable approach.
            </SectionIntro>
            <p className="photo-note-small">Service illustrations</p>
            <div className="service-grid">
              {services.map((item, index) => (
                <a
                  key={item.id}
                  id={item.id}
                  href="#contact"
                  className="service-card reveal"
                  style={
                    { "--delay": `${(index % 3) * 90}ms` } as CSSProperties
                  }
                  onClick={() => setService(item.title)}
                  aria-label={`${item.title}: request a quote`}
                >
                  <span className="card-photo">
                    <img src={`${IMG}/${item.image}`} alt={item.alt} />
                  </span>
                  <span className="card-body">
                    <span className="card-title">
                      <h3>{item.title}</h3>
                      <span className="circle-arrow">
                        <Icon name="arrow" />
                      </span>
                    </span>
                    <p>{item.text}</p>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="our-work"
          className="work-section"
          aria-labelledby="work-heading"
        >
          <div className="content-width">
            <SectionIntro
              eyebrow="Our work"
              id="work-heading"
              title="See our work on site."
            >
              Take a closer look at selected projects, showing our team at work
              and the equipment used to reach and work on larger trees.
            </SectionIntro>
            <p className="photo-note-small">Selected project photographs</p>
            <div className="work-grid">
              {work.map((item, index) => (
                <button
                  key={item.image}
                  type="button"
                  className="work-card reveal"
                  style={{ "--delay": `${index * 90}ms` } as CSSProperties}
                  onClick={() => setViewing(index)}
                  aria-label={`View photo: ${item.title}`}
                >
                  <span className="card-photo">
                    <img src={`${IMG}/${item.image}`} alt={item.alt} />
                  </span>
                  <span className="card-title">
                    <strong>{item.title}</strong>
                    <span className="circle-arrow">
                      <Icon name="arrow" />
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="work-cta reveal">
              <p>
                Have a similar job in mind? Send us a photograph and tell us
                what you need.
              </p>
              <div className="work-cta-actions">
                <button
                  type="button"
                  className="button"
                  onClick={() => setViewing(0)}
                >
                  View Our Work <Icon name="arrow" />
                </button>
                {WORK_VIDEO_URL ? (
                  <a
                    className="button button-outline-dark"
                    href={WORK_VIDEO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="play" />
                    Watch Us at Work
                  </a>
                ) : (
                  <button
                    type="button"
                    className="button button-outline-dark"
                    onClick={() => setViewing(0)}
                  >
                    <Icon name="play" />
                    Watch Us at Work
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-heading"
        >
          <div className="content-width about-inner">
            <div className="about-copy reveal">
              <p className="eyebrow">About Mad About Trees</p>
              <h2 id="about-heading">Speak directly to Stephen.</h2>
              <p className="about-lead">
                Mad About Trees specialises in professional tree care, tree
                felling and stump grinding.
              </p>
              <p>
                We know that arranging tree work can raise questions. You may
                want to manage an overgrown tree, remove one close to a building
                or clear a stump from your garden. Start with a conversation
                with Stephen about your priorities and the options available.
              </p>
            </div>
            <aside className="about-card reveal" aria-label="Call Stephen">
              <img src={`${IMG}/logo.jpg`} alt="" className="about-logo" />
              <p className="about-card-label">Talk it through with Stephen</p>
              <a href={`tel:${STEPHEN.tel}`} className="about-phone">
                {STEPHEN.label}
              </a>
              <ul>
                <li>
                  <Icon name="check" />
                  Free, no-obligation quotes
                </li>
                <li>
                  <Icon name="check" />
                  Tree care, felling &amp; stump grinding
                </li>
                <li>
                  <Icon name="check" />
                  Send photos to get started
                </li>
              </ul>
              <a href={`tel:${STEPHEN.tel}`} className="button">
                <Icon name="phone" />
                Call Stephen
              </a>
            </aside>
          </div>
        </section>

        <section
          id="process"
          className="process-section"
          aria-labelledby="process-heading"
        >
          <div className="content-width">
            <SectionIntro
              eyebrow="How it works"
              id="process-heading"
              title="Let’s get your tree work started."
            />
            <ol className="steps">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="step reveal"
                  style={{ "--delay": `${index * 110}ms` } as CSSProperties}
                >
                  <span className="step-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="content-width contact-inner">
            <div className="contact-copy reveal">
              <p className="eyebrow">Get in touch</p>
              <h2 id="contact-heading">Tell us what your trees need.</h2>
              <p className="contact-lead">
                Whether you need tree care, tree felling or stump grinding, get
                in touch to discuss your job.
              </p>
              <div className="contact-numbers">
                <a href={`tel:${STEPHEN.tel}`}>
                  <span className="contact-icon">
                    <Icon name="phone" />
                  </span>
                  Stephen: <strong>{STEPHEN.label}</strong>
                </a>
                <a href={`tel:${OFFICE.tel}`}>
                  <span className="contact-icon">
                    <Icon name="phone" />
                  </span>
                  Office: <strong>{OFFICE.label}</strong>
                </a>
              </div>
            </div>
            <form className="quote-form reveal" onSubmit={prepareQuote}>
              <div className="form-fields">
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="e.g. John Smith"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="e.g. 07970 390235"
                    required
                    maxLength={20}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">
                    Email address <span className="optional">optional</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="e.g. you@example.com"
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
                <div className="field field-wide">
                  <label htmlFor="service">Service required</label>
                  <span className="select-wrap">
                    <select
                      id="service"
                      name="service"
                      required
                      value={service}
                      onChange={(event) => setService(event.target.value)}
                    >
                      <option value="" disabled>
                        Please select
                      </option>
                      {services.map((item) => (
                        <option key={item.id}>{item.title}</option>
                      ))}
                      <option>Not sure</option>
                    </select>
                    <Icon name="chevron" />
                  </span>
                </div>
                <div className="field field-wide">
                  <label htmlFor="details">Tell us about the work</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={3}
                    placeholder="e.g. A large sycamore close to the house that needs reducing"
                    maxLength={1000}
                  />
                </div>
              </div>
              <label
                className={`photo-upload ${photoNames.length ? "has-photo" : ""}`}
                htmlFor="tree-photos"
              >
                <span className="upload-title">
                  Upload photographs <span className="optional">optional</span>
                </span>
                <span className="upload-box">
                  <span className="upload-main">
                    <Icon name={photoNames.length ? "check" : "image"} />
                    {photoNames.length ? (
                      `${photoNames.length} photo${photoNames.length > 1 ? "s" : ""} selected`
                    ) : (
                      <span>
                        <strong>Choose photos</strong> or drag and drop
                      </span>
                    )}
                  </span>
                  <small>
                    {photoNames.length
                      ? photoNames.join(", ")
                      : "You can upload multiple photos (JPG, PNG, HEIC)"}
                  </small>
                </span>
                <input
                  id="tree-photos"
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.heic"
                  onChange={selectPhotos}
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
              <p className="form-note">
                Not sure which service you need? Describe the issue and we’ll
                discuss it with you.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner content-width">
          <div className="footer-brand">
            <Brand footer />
            <p>Professional tree care, tree felling and stump grinding.</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#services">Services</a>
            <a href="#our-work">Our Work</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </nav>
          <QuoteButton compact />
        </div>
        <p className="footer-legal content-width">
          © {new Date().getFullYear()} Mad About Trees. All rights reserved.
        </p>
      </footer>

      <div
        className={`mobile-cta ${scrolled && !contactVisible && !menuOpen ? "is-shown" : ""}`}
      >
        <a href={`tel:${STEPHEN.tel}`} className="mobile-cta-call">
          <Icon name="phone" />
          Call Stephen
        </a>
        <a href="#contact" className="mobile-cta-quote">
          Free quote <Icon name="arrow" />
        </a>
      </div>

      {viewing !== null && (
        <div
          className="modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setViewing(null);
          }}
        >
          <dialog
            ref={viewerRef}
            className="work-viewer"
            aria-label={work[viewing].title}
            onCancel={() => setViewing(null)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") showWork(1);
              if (event.key === "ArrowLeft") showWork(-1);
            }}
          >
            <img
              src={`${IMG}/${work[viewing].image}`}
              alt={work[viewing].alt}
            />
            <div className="viewer-bar">
              <button aria-label="Previous photo" onClick={() => showWork(-1)}>
                <Icon name="back" />
              </button>
              <p>
                {work[viewing].title}
                <small>
                  {viewing + 1} / {work.length}
                </small>
              </p>
              <button aria-label="Next photo" onClick={() => showWork(1)}>
                <Icon name="arrow" />
              </button>
            </div>
            <button
              autoFocus
              className="dialog-close"
              aria-label="Close photo"
              onClick={() => setViewing(null)}
            >
              <Icon name="close" />
            </button>
          </dialog>
        </div>
      )}

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
            <p className="eyebrow">Free, no-obligation quote</p>
            <h2 id="quote-dialog-title">Your details are ready.</h2>
            <p>
              Send your request by text to Stephen, or call us for a free quote.
              Your request hasn’t been sent yet.
            </p>
            <pre>{quoteText}</pre>
            {photoNames.length > 0 && (
              <p className="photo-note">
                Attach your {photoNames.length > 1 ? "photos" : "photo"} (
                <strong>{photoNames.join(", ")}</strong>) in your messaging app
                before sending.
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
            <a className="dialog-phone" href={`tel:${STEPHEN.tel}`}>
              Or call {STEPHEN.label}
            </a>
          </dialog>
        </div>
      )}
    </>
  );
}
