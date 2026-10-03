/**
 * Centralized Image & Product Configuration for Light in Motion Store & Homepage.
 * 
 * PRODUCT MEDIA UPLOAD FOLDER:
 * `public/products/<product-slug>/`
 * Drop images (main.png / main.jpg) and videos (videos/main.mp4) inside:
 * - `public/products/monitor-backlight/` & `public/products/monitor-backlight/videos/`
 * - `public/products/bar-lights/` & `public/products/bar-lights/videos/`
 * - `public/products/lamp-lights/` & `public/products/lamp-lights/videos/`
 * - `public/products/tv-backlight/` & `public/products/tv-backlight/videos/`
 * - `public/products/custom-strip-light/` & `public/products/custom-strip-light/videos/`
 * - `public/products/cloudlights/` & `public/products/cloudlights/videos/`
 * 
 * GALLERY IMAGES FOLDER:
 * `public/gallery/`
 */

export interface ProductShowcaseItem {
  id: string;
  slug: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  video: string;
  fallbackImage: string;
  specs: {
    latency: string;
    syncEngine: string;
    refresh: string;
    gamut: string;
  };
  features: string[];
}

export const PRODUCTS_SHOWCASE: ProductShowcaseItem[] = [
  {
    id: "monitor-backlight",
    slug: "monitor-backlight",
    code: "01",
    name: "MONITOR BACKLIGHT SYSTEM",
    tagline: "REACTIVE AMBIENT ILLUMINATION DESIGNED AROUND YOUR DISPLAY.",
    description:
      "Reactive ambient illumination synchronized directly at the optical layer. Zero-latency optical processing and high-gamut color reproduction engineered for high-refresh competitive displays and PC battle stations.",
    image: "/products/monitor-backlight/main.png",
    video: "/products/monitor-backlight/videos/main.mp4",
    fallbackImage: "/images/monitor-backlight/main.png",
    specs: {
      latency: "0.5MS OPTICAL",
      syncEngine: "HDMI 2.1 48GBPS",
      refresh: "UP TO 240HZ",
      gamut: "100% DCI-P3",
    },
    features: [
      "Zero-latency optical sync processor",
      "Dynamic multi-zone screen color sampling",
      "Compatible with curved ultrawide & gaming monitors",
    ],
  },
  {
    id: "bar-lights",
    slug: "bar-lights",
    code: "02",
    name: "DUAL AMBIENT LIGHT BARS",
    tagline: "PERIPHERAL ATMOSPHERIC TOWERS FOR DESK ARCHITECTURE.",
    description:
      "Precision twin light bar towers engineered to cast smooth, continuous ambient light across your desktop workspace and surrounding back wall, deepening peripheral field immersion.",
    image: "/products/bar-lights/main.png",
    video: "/products/bar-lights/videos/main.mp4",
    fallbackImage: "/images/bar-lights/main.png",
    specs: {
      latency: "0.8MS OPTICAL",
      syncEngine: "DUAL-LINK HARMONY",
      refresh: "UP TO 165HZ",
      gamut: "98% DCI-P3",
    },
    features: [
      "Vertical dual-tower optical diffusion",
      "Weighted aluminum architectural base",
      "Seamless desktop aura integration",
    ],
  },
  {
    id: "lamp-lights",
    slug: "lamp-lights",
    code: "03",
    name: "AMBIENT LAMP LIGHTING",
    tagline: "BIAS ILLUMINATION FOR EXTENDED CREATIVE SESSIONS.",
    description:
      "Softened architectural bias lighting created for extended working and gaming hours. Reduces visual eye strain while creating a calm, deliberate ambient environment.",
    image: "/products/lamp-lights/main.png",
    video: "/products/lamp-lights/videos/main.mp4",
    fallbackImage: "/images/lamp-lights/main.png",
    specs: {
      latency: "1.0MS OPTICAL",
      syncEngine: "AMBIENT CADENCE",
      refresh: "UP TO 144HZ",
      gamut: "95% DCI-P3",
    },
    features: [
      "Glare-free optical diffusion lens",
      "Tactile touch-sensitive brightness dial",
      "Natural warm-to-cool white temperature tuning",
    ],
  },
  {
    id: "tv-backlight",
    slug: "tv-backlight",
    code: "04",
    name: "CINEMA TV BACKLIGHT SYNC",
    tagline: "WALL-SCALE ATMOSPHERIC CINEMA EXPERIENCE AT ROOM SCALE.",
    description:
      "Transform your living room into a true home theater. High-output RGB LED arrays project screen action past display bezels into full room architecture.",
    image: "/products/tv-backlight/main.png",
    video: "/products/tv-backlight/videos/main.mp4",
    fallbackImage: "/images/tv-backlight/main.png",
    specs: {
      latency: "0.5MS OPTICAL",
      syncEngine: "CINEMA PASS-THROUGH",
      refresh: "UP TO 120HZ 4K",
      gamut: "100% DCI-P3",
    },
    features: [
      "Supports TVs up to 85 inches",
      "HDMI 2.1 4K 120Hz zero-loss pass-through",
      "Automated room boundary brightness adaptation",
    ],
  },
  {
    id: "custom-strip-light",
    slug: "custom-strip-light",
    code: "05",
    name: "CUSTOM STRIP LIGHTING",
    tagline: "MODULAR NEON RGB LIGHTING FOR CUSTOM BATTLESTATIONS.",
    description:
      "Flexible, high-density neon RGB strips designed for custom desk contours, under-glow accents, and personalized room geometry with pixel-addressable control.",
    image: "/products/custom-strip-light/main.png",
    video: "/products/custom-strip-light/videos/main.mp4",
    fallbackImage: "/images/custom-strip-light/main.png",
    specs: {
      latency: "0.5MS OPTICAL",
      syncEngine: "PIXEL ADDRESSABLE",
      refresh: "DYNAMIC",
      gamut: "99% DCI-P3",
    },
    features: [
      "Flexible silicone diffusion casing",
      "Cut-to-size modular connectors",
      "Per-LED addressable color zones",
    ],
  },
  {
    id: "cloudlights",
    slug: "cloudlights",
    code: "06",
    name: "CLOUD LIGHTING STATION",
    tagline: "CEILING-SCALE ATMOSPHERIC CLOUD LIGHT ARRAY.",
    description:
      "Immersive ceiling ambient cloud light array featuring deep reactive lightning and ambient color storm dynamics for room-scale aesthetic lighting setups.",
    image: "/products/cloudlights/main.jpg",
    video: "/products/cloudlights/videos/main.mp4",
    fallbackImage: "/images/cloudlights/main.jpg",
    specs: {
      latency: "1.2MS OPTICAL",
      syncEngine: "CLOUD WAVE ENGINE",
      refresh: "AMBIENT",
      gamut: "96% DCI-P3",
    },
    features: [
      "High-density organic cloud diffusion matrix",
      "Wireless app & sound-reactive music sync",
      "Atmospheric storm & cloud lighting modes",
    ],
  },
];

export const SITE_IMAGES = {
  heroBackground: "/images/hero/main.png",
  heroFallback: "/products/monitor-backlight/main.png",
  gallery: PRODUCTS_SHOWCASE.map((p) => ({
    id: p.code,
    code: `# ${p.code}`,
    title: p.name,
    alt: p.description,
    src: p.image,
    fallback: p.fallbackImage,
  })),
};
