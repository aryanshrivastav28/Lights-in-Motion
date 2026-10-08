export interface ProductVariant {
  id: string;
  name: string;
  priceInINR: number;
  compareAtPriceInINR?: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface DetailedProduct {
  id: string;
  slug: string;
  title: string;
  titleKey: string;
  category: "TV Sync Set" | "Monitor Sync Set" | "LIGHTINMOTION Collection";
  badge: "BEST SELLING" | "SALE" | "NEW ARRIVAL";
  basePriceInINR: number;
  compareAtPriceInINR: number;
  variants: ProductVariant[];
  images: string[];
  video?: string;
  shortDescription: string;
  fullDescription: string[];
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  whatsInTheBox: string[];
  shippingInfo: string[];
  defaultReviews: ReviewItem[];
}

export const PRODUCT_CATALOG: Record<string, DetailedProduct> = {
  "cloudlights": {
    id: "cloudlights",
    slug: "cloudlights",
    title: "Cloud Lights",
    titleKey: "cloudLightsTitle",
    category: "LIGHTINMOTION Collection",
    badge: "SALE",
    basePriceInINR: 2200.0,
    compareAtPriceInINR: 2999.0,
    variants: [
      {
        id: "1kg-cloud",
        name: "1kg Cloud with Lights",
        priceInINR: 2200.0,
        compareAtPriceInINR: 2999.0,
      },
      {
        id: "1.5kg-cloud",
        name: "1.5kg cloud with strips light",
        priceInINR: 2800.0,
        compareAtPriceInINR: 3599.0,
      },
    ],
    images: [
      "/products/cloudlights/main.jpg",
      "/products/cloudlights/main.jpg",
    ],
    video: "/products/cloudlights/videos/main.mp4",
    shortDescription:
      "Transform your space with Cloud Lights — decorative cloud lighting designed to create a soft, colorful ambient glow. Perfect for bedrooms, gaming setups, studios, cafés and cozy interiors.",
    fullDescription: [
      "Experience a dreamlike atmosphere right inside your bedroom or creative sanctuary. LightinMotion Cloud Lights recreate the organic beauty of real illuminated storm clouds suspended from your ceiling.",
      "Engineered with premium fire-retardant bio-cotton and high-density 5050 RGB lighting, each cloud diffuses light without visible hotspots, producing mesmerizing gradient fades, lightning flashes, and relaxing pastel palettes.",
      "Sync effortlessly to your favorite music playlist with the built-in acoustic sensor, or control colors and brightness wirelessly through the smartphone app and RF remote control.",
    ],
    features: [
      "Ultra-dense 3D organic cotton cloud structure",
      "Dynamic lightning storm & calming aurora effects",
      "Wireless smartphone app & RF remote control",
      "Real-time acoustic music synchronization",
      "Complete mounting kit with adhesive ceiling hooks included",
    ],
    specs: [
      { label: "Material", value: "Fire-Retardant 3D Synthetic Fiber Cloud Matrix" },
      { label: "Lighting Type", value: "High-Density Addressable 5050 RGB LED" },
      { label: "Color Range", value: "16.8 Million Colors + Dynamic Storm Modes" },
      { label: "Connectivity", value: "Bluetooth 5.0 + 2.4GHz RF Remote Control" },
      { label: "Power Supply", value: "12V 2A Safe Low Voltage DC Adapter (Included)" },
      { label: "Lifespan", value: "50,000+ Operating Hours" },
    ],
    whatsInTheBox: [
      "LightinMotion Cloud Shell Structure",
      "Integrated Addressable RGB LED Strip Matrix",
      "12V DC Low-Voltage Power Adapter",
      "Wireless RF Multi-Function Remote",
      "Ceiling Mount Hooks & Heavy-Duty Adhesive Pads",
      "Setup & Quickstart Installation Manual",
    ],
    shippingInfo: [
      "Free express doorstep delivery across India (2 - 4 business days)",
      "Real-time SMS and WhatsApp parcel tracking",
      "7-Day replacement guarantee for transit defects",
      "1-Year official manufacturer warranty",
    ],
    defaultReviews: [
      {
        id: "cl-rev-1",
        author: "Aarav Sharma",
        rating: 5,
        date: "October 3, 2026",
        title: "Completely transformed my bedroom ceiling!",
        comment:
          "The cloud storm effect is genuinely surreal. When it syncs with lo-fi beats or rainfall audio at night, it creates the calmest ambiance ever. Very easy to hang up with the included adhesive hooks.",
        verified: true,
        helpfulCount: 24,
      },
      {
        id: "cl-rev-2",
        author: "Pooja Varma",
        rating: 5,
        date: "September 28, 2026",
        title: "Super fluffy, bright, and easy to setup",
        comment:
          "Bought the 1.5kg version for my study and gaming corner. The cotton is soft and dense so you never see individual LED bulbs. The colors are vibrant and the mobile app is intuitive.",
        verified: true,
        helpfulCount: 18,
      },
      {
        id: "cl-rev-3",
        author: "Devendra Patel",
        rating: 5,
        date: "September 19, 2026",
        title: "Best aesthetic lighting investment this year",
        comment:
          "Every friend who visits asks where I got this from. The lightning mode looks just like a stormy sky outside. High quality construction and zero heating even after running 8 hours straight.",
        verified: true,
        helpfulCount: 15,
      },
      {
        id: "cl-rev-4",
        author: "Sneha Nair",
        rating: 4,
        date: "September 11, 2026",
        title: "Gorgeous light, remote works great",
        comment:
          "Really happy with the build quality and color transitions. The adhesive hooks hold it firmly to the ceiling. Highly recommended for any cozy room setup.",
        verified: true,
        helpfulCount: 9,
      },
    ],
  },

  "tv-backlight": {
    id: "tv-backlight",
    slug: "tv-backlight",
    title: "TV Backlight (Immersion Sync)",
    titleKey: "tvBacklightTitle",
    category: "TV Sync Set",
    badge: "BEST SELLING",
    basePriceInINR: 1699.0,
    compareAtPriceInINR: 2199.0,
    variants: [
      {
        id: "55-65-inch",
        name: "55 - 65 inch TV Set",
        priceInINR: 1699.0,
        compareAtPriceInINR: 2199.0,
      },
      {
        id: "75-85-inch",
        name: "75 - 85 inch TV Set",
        priceInINR: 2199.0,
        compareAtPriceInINR: 2799.0,
      },
    ],
    images: [
      "/products/tv-backlight/main.png",
      "/products/tv-backlight/main.png",
    ],
    video: "/products/tv-backlight/videos/main.mp4",
    shortDescription:
      "Transform your living room movie nights and console gaming. The LightinMotion TV Backlight uses real-time screen color matching to project cinematic ambient illumination directly behind your television, reducing eye fatigue and expanding the picture past the bezels.",
    fullDescription: [
      "Upgrade your home entertainment with true theater immersion. The LightinMotion TV Backlight detects onscreen colors in real-time and casts continuous reactive backlighting onto the wall behind your TV.",
      "By softening the contrast ratio between intense bright scenes and dark room environments, it substantially reduces eye fatigue during marathon viewing sessions while making colors feel larger than life.",
      "Compatible with all television brands, gaming consoles (PS5, Xbox, Nintendo Switch), and streaming devices with zero signal distortion.",
    ],
    features: [
      "Real-time sub-millisecond screen immersion synchronization",
      "High-density 60 LEDs/meter addressable strip with wide diffusion",
      "Supports 4K 60Hz and HDR color calibration",
      "Intelligent black bar detection prevents letterbox color bleed",
      "Heavy-duty 3M corner bracket system for easy flat installation",
    ],
    specs: [
      { label: "Compatible TV Sizes", value: "55-65 inches & 75-85 inches" },
      { label: "LED Density", value: "60 Addressable RGB LEDs / meter" },
      { label: "Sync Latency", value: "< 15 milliseconds" },
      { label: "Resolution Support", value: "Up to 4K Ultra HD with HDR10" },
      { label: "App Support", value: "iOS & Android companion apps" },
      { label: "Power", value: "12V 3A UL-certified power adapter" },
    ],
    whatsInTheBox: [
      "Pre-Measured 4-Side RGB LED TV Strip with flexible corner links",
      "LightinMotion Immersion Processing Controller",
      "12V Power Adapter with Surge Protection",
      "Reinforced Adhesive Cable Management Clips",
      "Instruction Manual & Calibration Guide",
    ],
    shippingInfo: [
      "Free express doorstep delivery across India (2 - 4 business days)",
      "7-Day replacement guarantee",
      "1-Year official manufacturer warranty",
    ],
    defaultReviews: [
      {
        id: "tv-rev-1",
        author: "Karan Malhotra",
        rating: 5,
        date: "October 5, 2026",
        title: "Feels like having an IMAX theater at home!",
        comment:
          "Watching sci-fi movies and action games with this backlight is on another level. The color sync is super fast with zero lag. Even my parents noticed how much easier it is on the eyes at night.",
        verified: true,
        helpfulCount: 31,
      },
      {
        id: "tv-rev-2",
        author: "Rohan Kapoor",
        rating: 5,
        date: "September 30, 2026",
        title: "Extremely clean installation on my 65 inch TV",
        comment:
          "The corner clips made the installation super clean. Light distribution on the back wall is completely smooth without individual LED spots. Highly recommend!",
        verified: true,
        helpfulCount: 19,
      },
      {
        id: "tv-rev-3",
        author: "Vikram Sethi",
        rating: 5,
        date: "September 22, 2026",
        title: "Flawless PS5 companion",
        comment:
          "Playing Spider-Man and Cyberpunk with room-scale light expansion is thrilling. Outstanding build quality and fast shipping.",
        verified: true,
        helpfulCount: 14,
      },
    ],
  },

  "monitor-backlight": {
    id: "monitor-backlight",
    slug: "monitor-backlight",
    title: "LightinMotion Monitor Backlight",
    titleKey: "monitorBacklightTitle",
    category: "Monitor Sync Set",
    badge: "SALE",
    basePriceInINR: 1399.0,
    compareAtPriceInINR: 1799.0,
    variants: [
      {
        id: "24-27-inch",
        name: "24 - 27 inch Display",
        priceInINR: 1399.0,
        compareAtPriceInINR: 1799.0,
      },
      {
        id: "32-34-inch",
        name: "32 - 34 inch Ultrawide",
        priceInINR: 1699.0,
        compareAtPriceInINR: 2099.0,
      },
    ],
    images: [
      "/products/monitor-backlight/main.png",
      "/products/monitor-backlight/main.png",
    ],
    video: "/products/monitor-backlight/videos/main.mp4",
    shortDescription:
      "Engineered for competitive esports and ultra-immersive desktop battlestations. The LightinMotion Monitor Backlight synchronizes directly with your PC display at up to 240Hz with imperceptible latency, casting accurate ambient glow onto your back wall.",
    fullDescription: [
      "Unlock competitive focus and visual depth. Designed specifically for gaming monitors and creator setups, this lighting system reads pixel color zones in real-time.",
      "The lightweight flexible strip mounts firmly to the rear chassis of both flat and curved monitors, providing seamless halo illumination that matches gameplay explosions, racing scenery, and cinematic media.",
      "Includes a low-overhead Windows and Mac desktop controller that runs silently in the background with zero performance drops.",
    ],
    features: [
      "Ultra-low latency (<5ms) real-time PC display color sync",
      "High refresh rate support up to 240Hz",
      "Compatible with flat and curved ultrawide monitors",
      "Lightweight desktop app with custom mood profiles",
      "Pre-angled corner connectors for clean zero-kink routing",
    ],
    specs: [
      { label: "Monitor Sizes", value: "24-27 inch standard or 32-34 inch ultrawide" },
      { label: "Sync Refresh Rate", value: "Up to 240Hz screen capture" },
      { label: "Connection", value: "USB direct data + 5V/12V DC power" },
      { label: "Operating System", value: "Windows 10/11 & macOS 12+" },
      { label: "LED Type", value: "Addressable WS2812B RGB LEDs" },
    ],
    whatsInTheBox: [
      "3-Sided / 4-Sided Monitor RGB LED Strip",
      "Hardware Controller Unit with USB interface",
      "USB Data Cable & Dedicated Power Adapter",
      "3M Non-Damaging Mounting Clips",
      "Quick Setup Card",
    ],
    shippingInfo: [
      "Free express doorstep delivery across India (2 - 4 business days)",
      "7-Day replacement guarantee",
      "1-Year official manufacturer warranty",
    ],
    defaultReviews: [
      {
        id: "mon-rev-1",
        author: "Ananya Gupta",
        rating: 5,
        date: "October 1, 2026",
        title: "Zero lag while playing Valorant and Apex",
        comment:
          "Was worried about input lag or software using too much CPU, but the app uses under 0.5% CPU and the light sync is instantaneous. Really helps with late night gaming eye strain.",
        verified: true,
        helpfulCount: 22,
      },
      {
        id: "mon-rev-2",
        author: "Manish Joshi",
        rating: 5,
        date: "September 25, 2026",
        title: "Fits my 34-inch curved monitor perfectly",
        comment:
          "The corner links bent nicely around the curve of my monitor. Brightness is high and colors match the screen edge accurately.",
        verified: true,
        helpfulCount: 16,
      },
    ],
  },

  "bar-lights": {
    id: "bar-lights",
    slug: "bar-lights",
    title: "Monitor Bar Lights",
    titleKey: "monitorBarTitle",
    category: "Monitor Sync Set",
    badge: "SALE",
    basePriceInINR: 1899.0,
    compareAtPriceInINR: 2499.0,
    variants: [
      {
        id: "single-bar",
        name: "Single Screen Bar",
        priceInINR: 1899.0,
        compareAtPriceInINR: 2499.0,
      },
      {
        id: "dual-bar",
        name: "Dual Screen Set (Pack of 2)",
        priceInINR: 3499.0,
        compareAtPriceInINR: 4599.0,
      },
    ],
    images: [
      "/products/bar-lights/main.png",
      "/products/bar-lights/main.png",
    ],
    video: "/products/bar-lights/videos/main.mp4",
    shortDescription:
      "The ultimate dual-sided desktop illumination system. Features front asymmetrical desk task lighting to eliminate monitor glare, paired with rear dynamic ambient RGB backlighting that syncs with music and screen content.",
    fullDescription: [
      "Reclaim your desktop real estate while protecting your vision. The LightinMotion Monitor Bar Light rests stably on top of any monitor bezel with a weighted counterweight clip, eliminating bulky desk lamp bases.",
      "Its precision optical prism directs light strictly downwards onto your keyboard and workspace, guaranteeing zero glare on your display screen.",
      "The rear-facing addressable RGB zone bathes your back wall in soft ambient color, controllable via a tactile wireless rotating desktop dial.",
    ],
    features: [
      "Asymmetric optical design guarantees zero screen reflection",
      "Dual illumination: front task lighting + rear ambient RGB",
      "Adjustable color temperature from 2700K warm to 6500K cool white",
      "Weighted gravity pivot mount fits any monitor thickness (flat or curved)",
      "Wireless desktop rotary control dial for seamless brightness adjustment",
    ],
    specs: [
      { label: "Material", value: "Anodized Aerospace Aluminum Alloy + ABS" },
      { label: "Color Temperature", value: "2700K - 6500K Stepless Dimming" },
      { label: "Color Rendering Index", value: "Ra ≥ 95 (True Color Accuracy)" },
      { label: "Power Input", value: "USB Type-C (5V / 2A)" },
      { label: "Dimensions", value: "450mm x 22mm x 22mm" },
    ],
    whatsInTheBox: [
      "LightinMotion Dual-Source Monitor Light Bar",
      "Precision Weighted Counterweight Clamp",
      "USB Type-C Braided Power Cable (1.8m)",
      "Wireless Touch/Rotary Desktop Controller",
      "User Manual",
    ],
    shippingInfo: [
      "Free express doorstep delivery across India (2 - 4 business days)",
      "7-Day replacement guarantee",
      "1-Year official manufacturer warranty",
    ],
    defaultReviews: [
      {
        id: "bar-rev-1",
        author: "Sameer Deshmukh",
        rating: 5,
        date: "October 4, 2026",
        title: "Hands down the best desk accessory I own",
        comment:
          "Clears up so much space on my desk. The front light illuminates my keyboard without any reflection on the monitor glass, and the rear RGB backlight looks stunning at night.",
        verified: true,
        helpfulCount: 28,
      },
      {
        id: "bar-rev-2",
        author: "Tarun Batra",
        rating: 5,
        date: "September 29, 2026",
        title: "Premium aluminum build and great rotary dial",
        comment:
          "The wireless controller puck feels very satisfying to rotate. The light quality is warm and easy on the eyes during late night programming.",
        verified: true,
        helpfulCount: 17,
      },
    ],
  },

  "lamp-lights": {
    id: "lamp-lights",
    slug: "lamp-lights",
    title: "LightinMotion Lamp Light",
    titleKey: "lampLightTitle",
    category: "LIGHTINMOTION Collection",
    badge: "SALE",
    basePriceInINR: 1899.0,
    compareAtPriceInINR: 2499.0,
    variants: [
      {
        id: "single-lamp",
        name: "Single Ambient Tower",
        priceInINR: 1899.0,
        compareAtPriceInINR: 2499.0,
      },
      {
        id: "twin-lamp",
        name: "Twin Sync Tower Set (Pack of 2)",
        priceInINR: 3499.0,
        compareAtPriceInINR: 4599.0,
      },
    ],
    images: [
      "/products/lamp-lights/main.png",
      "/products/lamp-lights/main.png",
    ],
    video: "/products/bar-lights/videos/main.mp4",
    shortDescription:
      "Sculptural modern corner ambient floor lamp designed to bathe any room in warm architectural gradients or high-energy sound-reactive light shows. Sleek aircraft-grade aluminum tower with 360-degree diffused illumination.",
    fullDescription: [
      "Turn plain room corners into captivating focal points of light and shadow. The LightinMotion Lamp Light stands gracefully with a slim minimalist footprint, projecting gentle diffuse glow against walls.",
      "Features over 300 animated lighting patterns, fluid multi-color cascades, and real-time acoustic rhythm sync that pulses along with your music, movies, or gaming audio.",
      "Controlled via Bluetooth app or the included tactile remote with timer settings and custom color presets.",
    ],
    features: [
      "Ultra-slim corner-fitting architectural design",
      "16 Million colors with 300+ flow animations",
      "High-sensitivity microphone for rhythmic music sync",
      "Sturdy weighted triangular base prevents tipping",
      "Smart scheduling and sleep timer via smartphone app",
    ],
    specs: [
      { label: "Height", value: "140 cm (55 inches)" },
      { label: "Material", value: "Aluminum Alloy + Frosted PC Diffuser" },
      { label: "Control", value: "Bluetooth App + RF Wireless Remote" },
      { label: "Power", value: "24W Safe Low Voltage Adapter" },
      { label: "LED Life", value: "50,000+ Hours" },
    ],
    whatsInTheBox: [
      "LightinMotion Modular Aluminum Tower Sections",
      "Heavy-Duty Metal Corner Base Plate",
      "Wireless RF Remote Controller",
      "UL-Certified Power Adapter (100V - 240V)",
      "Assembly Screws & Hex Key",
      "User Manual",
    ],
    shippingInfo: [
      "Free express doorstep delivery across India (2 - 4 business days)",
      "7-Day replacement guarantee",
      "1-Year official manufacturer warranty",
    ],
    defaultReviews: [
      {
        id: "lamp-rev-1",
        author: "Priyanka Saxena",
        rating: 5,
        date: "October 2, 2026",
        title: "Gives my living room an upscale lounge vibe",
        comment:
          "Very easy to assemble in under 5 minutes. The diffused light bouncing off the corner walls is warm and relaxing. Great quality aluminum tube.",
        verified: true,
        helpfulCount: 20,
      },
      {
        id: "lamp-rev-2",
        author: "Kushagra Sen",
        rating: 5,
        date: "September 24, 2026",
        title: "The music sync mode is so much fun during parties",
        comment:
          "The lights react accurately to beats and bass drops. The app is simple to use and has tons of cool presets. Very happy with this purchase.",
        verified: true,
        helpfulCount: 13,
      },
    ],
  },

  "custom-strip-light": {
    id: "custom-strip-light",
    slug: "custom-strip-light",
    title: "Custom Sync Lights",
    titleKey: "customSyncTitle",
    category: "LIGHTINMOTION Collection",
    badge: "SALE",
    basePriceInINR: 1000.0,
    compareAtPriceInINR: 1499.0,
    variants: [
      {
        id: "3m-kit",
        name: "Standard 3 Meter Kit",
        priceInINR: 1000.0,
        compareAtPriceInINR: 1499.0,
      },
      {
        id: "5m-kit",
        name: "Extended 5 Meter Kit",
        priceInINR: 1450.0,
        compareAtPriceInINR: 1999.0,
      },
    ],
    images: [
      "/products/custom-strip-light/main.png",
      "/products/custom-strip-light/main.png",
    ],
    video: "/products/tv-backlight/videos/main.mp4",
    shortDescription:
      "Customizable addressable neon LED strip designed for desk perimeters, shelves, and architectural accent lines. Flexible silicone diffusion housing emits continuous, hotspot-free neon illumination that bends to any shape.",
    fullDescription: [
      "Craft bespoke lighting contours along your desktop edge, under shelving, or behind furniture. Unlike raw bare LED strips with annoying visible light dots, LightinMotion Custom Sync Lights are encased in continuous milky silicone.",
      "Provides uniform high-lumen neon diffusion with pixel-level addressability for smooth rainbow chases and ambient gradient fades.",
      "Cuttable at marked points and equipped with strong 3M mounting clips to fit any custom geometry.",
    ],
    features: [
      "Continuous dot-free silicone neon glow diffusion",
      "Flexible bending design to shape around curves and corners",
      "Pixel-addressable RGB with dynamic gradient animations",
      "IP67 water-resistant silicone casing",
      "Smart app, voice assistant, and wireless remote control",
    ],
    specs: [
      { label: "Length", value: "3 Meters / 5 Meters" },
      { label: "Material", value: "UV-Resistant Flexible Food-Grade Silicone" },
      { label: "Waterproof Rating", value: "IP67 Dust & Water Resistant" },
      { label: "Voltage", value: "12V DC Low Voltage" },
      { label: "LED Density", value: "96 LEDs / Meter" },
    ],
    whatsInTheBox: [
      "Flexible Silicone Neon LED Strip",
      "Smart Wi-Fi / Bluetooth Controller Unit",
      "12V Power Adapter",
      "Heavy-Duty Mounting Clips with Screws & 3M Tape",
      "User Manual",
    ],
    shippingInfo: [
      "Free express doorstep delivery across India (2 - 4 business days)",
      "7-Day replacement guarantee",
      "1-Year official manufacturer warranty",
    ],
    defaultReviews: [
      {
        id: "cst-rev-1",
        author: "Harshil Singhania",
        rating: 5,
        date: "October 6, 2026",
        title: "Real neon aesthetic without the harsh glare",
        comment:
          "Put this under the back lip of my oak desk. The silicone diffusion makes it look like a smooth continuous neon bar rather than cheap dots. Looks fantastic!",
        verified: true,
        helpfulCount: 25,
      },
      {
        id: "cst-rev-2",
        author: "Meera Chawla",
        rating: 5,
        date: "September 27, 2026",
        title: "Bends easily and sticks firmly",
        comment:
          "Extremely flexible and the mounting clips hold it securely in place. The app allows you to choose multiple colors on the same strip at once.",
        verified: true,
        helpfulCount: 15,
      },
    ],
  },
};

// Aliases for alternate route paths
PRODUCT_CATALOG["cloud-lights"] = PRODUCT_CATALOG["cloudlights"];
PRODUCT_CATALOG["custom-sync-lights"] = PRODUCT_CATALOG["custom-strip-light"];
