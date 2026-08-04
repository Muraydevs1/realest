import { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReveal } from '../utils/motion';
import { usePageMeta, useJsonLd, breadcrumbJsonLd } from '../utils/seo';
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Phone, FileText, BedDouble, Bath, Ruler, Home } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { projectsData } from '../assets/assets';
import {
  statusLabel,
  statusBadgeClasses,
  categoryLabel,
  displayPrice,
  specItems,
  publicPlans,
  isCommercialListing,
  enquiryMessage,
  whatsappUrl,
  CONTACT,
} from '../utils/listings';

const SPEC_ICONS = {
  bedrooms: BedDouble,
  bathrooms: Bath,
  size: Ruler,
  propertyType: Home,
};

function ProjectDetails() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === Number(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStart = useRef(null);
  const pageRef = useRef(null);
  useReveal(pageRef);

  // Hooks run unconditionally (before the not-found return). Descriptions are
  // built only from verified project fields — never invented specifics.
  usePageMeta(
    project
      ? {
        title: `${project.title}, ${project.location} | Murray Investments Co. Ltd.`,
        description: `${project.description} A ${statusLabel(project.status).toLowerCase()} project by Murray Investments Co. Ltd. in ${project.location}, Ghana.`,
        path: `/properties/${project.id}`,
        image: project.coverImage,
      }
      : {
        title: 'Project Not Found | Murray Investments Co. Ltd.',
        description: 'This project does not exist or is no longer available.',
        path: '/properties',
        robots: 'noindex, follow',
      }
  );
  // BreadcrumbList only. No RealEstateListing/Residence schema: these are
  // portfolio entries with no verified price, size or room data, and inventing
  // those values would be structured-data spam.
  useJsonLd('breadcrumb', project ? breadcrumbJsonLd(project) : null);

  if (!project) {
    return (
      <main id="main-content" className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-20">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Project not found</h1>
        <p className="text-gray-500 mb-8">This project does not exist or is no longer available.</p>
        <Link to="/properties" className="bg-brand-500 text-white hover:bg-brand-600 px-8 py-3 rounded-full uppercase transition duration-300">
          View all Properties
        </Link>
      </main>
    );
  }

  const images = project.images;
  const imageCount = images.length;
  const status = statusLabel(project.status);
  const category = categoryLabel(project.category);
  const price = displayPrice(project);
  const specs = specItems(project);
  const plans = publicPlans(project);
  const listing = isCommercialListing(project);
  const whatsappHref = whatsappUrl(enquiryMessage(project));

  const showNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageCount);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  // Scoped to the gallery region so arrow keys work while its controls are
  // focused, without hijacking keyboard input elsewhere on the page.
  const handleGalleryKeyDown = (e) => {
    if (e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      showNextImage();
    }
  };

  // Lightweight swipe navigation: horizontal-dominant swipes past a small
  // threshold change the image; vertical page scrolling is left untouched.
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) showNextImage();
    else showPrevImage();
  };

  return (
    <main id="main-content" ref={pageRef} data-reveal-group className="mx-auto max-w-5xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      <Link
        to="/properties"
        data-reveal-item
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-brand-500"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Properties
      </Link>

      {/* Header */}
      <div data-reveal-item className="flex flex-wrap items-center gap-2">
        {category && (
          <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">{category}</span>
        )}
        {status && (
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClasses(project.status)}`}>
            {status}
          </span>
        )}
      </div>
      <h1 data-reveal-item className="mt-3 text-3xl sm:text-4xl font-bold text-gray-800">{project.title}</h1>
      <p data-reveal-item className="mt-2 flex items-center gap-1.5 text-gray-500">
        <MapPin className="size-5 text-brand-500" aria-hidden="true" />
        {project.location}
      </p>

      {price && (
        <p className="mt-3 text-2xl font-semibold text-brand-500">{price}</p>
      )}

      {specs.length > 0 && (
        <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
          {specs.map((spec) => {
            const Icon = SPEC_ICONS[spec.key];
            return (
              <li key={spec.key} className="flex items-center gap-2">
                {Icon && <Icon className="size-5 text-gray-400" aria-hidden="true" />}
                {spec.label}
              </li>
            );
          })}
        </ul>
      )}

      <p data-reveal-item className="mt-4 max-w-3xl leading-relaxed text-gray-600">{project.description}</p>

      {/* Gallery — reveals as one block after the info group; thumbnails are not animated */}
      <section aria-label="Photo gallery" data-reveal className="mt-8" onKeyDown={handleGalleryKeyDown}>
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentImageIndex]}
            alt={`${project.title}, ${project.location} — photo ${currentImageIndex + 1} of ${imageCount}`}
            decoding="async"
            className="h-full w-full object-contain"
          />
          {imageCount > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevImage}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-700 shadow-md transition hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-700 shadow-md transition hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
              <span
                className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white"
                aria-hidden="true"
              >
                {currentImageIndex + 1} / {imageCount}
              </span>
            </>
          )}
        </div>
        <p className="sr-only" aria-live="polite">
          Photo {currentImageIndex + 1} of {imageCount}
        </p>

        {imageCount > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View photo ${index + 1} of ${imageCount}`}
                aria-current={index === currentImageIndex}
                className={`h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition focus-visible:ring-2 focus-visible:ring-brand-500 sm:h-20 sm:w-28 ${
                  index === currentImageIndex
                    ? 'border-brand-500'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Plans — only entries explicitly marked public are ever rendered */}
      {plans.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-800">Plans</h2>
          <ul className="space-y-2">
            {plans.map((plan) => (
              <li key={plan.title}>
                <a
                  href={plan.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-600 hover:underline"
                >
                  <FileText className="size-5" aria-hidden="true" />
                  {plan.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Video */}
      {project.video && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-800">
            {listing ? 'Video Tour' : 'Project Video'}
          </h2>
          {/* preload="none" + poster: nothing of the ~2MB file downloads until play */}
          <video
            controls
            preload="none"
            playsInline
            poster={project.videoPoster ?? undefined}
            className="mx-auto max-h-[75vh] w-full rounded-xl bg-black"
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
      )}

      {/* Enquiry CTA */}
      <section data-reveal className="mt-10 rounded-xl bg-brand-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-800">
          {listing ? 'Enquire About This Property' : 'Enquire About This Project'}
        </h2>
        <p className="mt-1 text-gray-600">
          Reach us on WhatsApp or give us a call — we are happy to help.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            <FaWhatsapp className="text-xl" aria-hidden="true" />
            WhatsApp Us
          </a>
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-500 px-6 py-3 font-medium text-brand-600 transition hover:bg-brand-500 hover:text-white"
          >
            <Phone className="size-5" aria-hidden="true" />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetails;
