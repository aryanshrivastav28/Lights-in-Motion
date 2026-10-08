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
  headline: string;
  introduction: string;
  experienceTitle: string;
  experienceContent: string[];
  keyFeatures: string[];
  perfectFor: string[];
  specs: {
    label: string;
    value: string;
  }[];
  whatsInTheBox: string[];
  tagline: string;
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
  shippingInfo: string[];
  defaultReviews: ReviewItem[];
}

export const PRODUCT_CATALOG: Record<string, DetailedProduct> = {
  "cloudlights": {
    id: "cloudlights",
    slug: "cloudlights",
    title: "LightinMotion Cloud Lights",
    titleKey: "cloudLightsTitle",
    headline: "Transform Your Ceiling Into a Dreamy Ambient Experience",
    introduction:
      "Bring a unique atmospheric glow to your room with LightinMotion Cloud Lights. Designed to create a soft, immersive cloud-like effect, these lights turn ordinary spaces into a visually stunning environment. Perfect for bedrooms, gaming setups, studios, streaming spaces, and room makeovers, Cloud Lights add depth and character without overwhelming the space.",
    experienceTitle: "Create Your Own Atmosphere",
    experienceContent: [
      "Choose the perfect lighting mood for your space — from relaxing ambient tones to vibrant RGB colors for gaming, parties, and content creation.",
      "The soft diffused lighting creates a beautiful glow that works as both decorative lighting and ambient room illumination.",
    ],
    perfectFor: [
      "🎮 Gaming Rooms",
      "🛏️ Bedrooms",
      "🎥 Streaming & Content Creation",
      "🎵 Music & Entertainment Spaces",
      "🏠 Room Makeovers",
      "✨ Aesthetic Setups",
    ],
    keyFeatures: [
      "🌈 Dynamic RGB ambient lighting",
      "☁️ Soft, diffused cloud-style illumination",
      "🎮 Perfect for gaming setups",
      "🎥 Great for photos & videos",
      "💡 Creates immersive room ambience",
      "🛠️ Designed for easy installation",
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
    tagline: "Turn your ceiling into an atmosphere.",
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
      "Transform your ceiling into a dreamy ambient experience with soft, immersive cloud-like diffusion.",
    fullDescription: [
      "Bring a unique atmospheric glow to your room with LightinMotion Cloud Lights. Designed to create a soft, immersive cloud-like effect, these lights turn ordinary spaces into a visually stunning environment.",
      "Perfect for bedrooms, gaming setups, studios, streaming spaces, and room makeovers, Cloud Lights add depth and character without overwhelming the space.",
    ],
    features: [
      "Dynamic RGB ambient lighting",
      "Soft, diffused cloud-style illumination",
      "Perfect for gaming setups & streaming",
      "Acoustic music sync with dynamic storm lightning",
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

  "custom-strip-light": {
    id: "custom-strip-light",
    slug: "custom-strip-light",
    title: "LightinMotion Custom Sync Lights",
    titleKey: "customSyncTitle",
    headline: "Your Lighting. Your Rules.",
    introduction:
      "Take complete control of your lighting with LightinMotion Custom Sync Lights — a flexible RGB lighting solution designed for custom installations and creative setups. Whether you want lighting around your desk, bed, shelves, walls, cabinets, or an entire room, Custom Sync Lights let you create a setup that matches your space and your style.",
    experienceTitle: "Built for Custom Setups",
    experienceContent: [
      "Unlike fixed-size lighting products, Custom Sync Lights are designed to adapt to your requirements.",
      "Create unique lighting layouts, accent specific areas, or build a complete RGB environment tailored to your architectural lines.",
    ],
    perfectFor: [
      "🖥️ Desks",
      "🛏️ Beds",
      "📚 Shelves",
      "🧱 Walls",
      "🗄️ Cabinets",
      "🎮 Gaming Rooms",
      "🎙️ Studios",
      "🛠️ Custom Projects",
    ],
    keyFeatures: [
      "🌈 Addressable RGB lighting",
      "🎨 Customizable lighting layouts",
      "⚡ Smooth dynamic effects",
      "📱 Smart control options",
      "🎮 Perfect for gaming setups",
      "🏠 Ideal for room & furniture lighting",
      "🔧 Flexible installation",
    ],
    specs: [
      { label: "Length Options", value: "3M Standard Kit / 5M Extended Kit" },
      { label: "Diffuser Casing", value: "UV-Resistant Flexible Food-Grade Silicone" },
      { label: "Waterproof Rating", value: "IP67 Dust & Water Resistant" },
      { label: "LED Density", value: "96 Addressable LEDs / meter" },
      { label: "Operating Voltage", value: "12V DC Low Voltage" },
      { label: "Control Protocol", value: "Wi-Fi + Bluetooth App & RF Remote" },
    ],
    whatsInTheBox: [
      "Flexible Silicone Neon LED Strip",
      "Smart Wi-Fi / Bluetooth Controller Unit",
      "12V DC Power Adapter",
      "Heavy-Duty Mounting Clips with Screws & 3M Tape",
      "User & Installation Manual",
    ],
    tagline: "If you can imagine the setup, you can light it.",
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
      "A flexible addressable RGB lighting solution designed for custom installations and creative setups.",
    fullDescription: [
      "Take complete control of your lighting with LightinMotion Custom Sync Lights — a flexible RGB lighting solution designed for custom installations and creative setups.",
      "Whether you want lighting around your desk, bed, shelves, walls, cabinets, or an entire room, Custom Sync Lights let you create a setup that matches your space and your style.",
    ],
    features: [
      "Addressable RGB lighting",
      "Customizable lighting layouts",
      "Smooth dynamic effects & smart control",
      "Flexible silicone installation",
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

  "lamp-lights": {
    id: "lamp-lights",
    slug: "lamp-lights",
    title: "LightinMotion Lamp Light",
    titleKey: "lampLightTitle",
    headline: "A Modern Lamp. A Complete Lighting Experience.",
    introduction:
      "Upgrade your setup with the LightinMotion Lamp Light — a modern ambient lighting solution designed to add depth, color, and personality to your room. Its sleek vertical design makes it perfect for placing beside your desk, TV, gaming setup, bed, or entertainment area.",
    experienceTitle: "Designed to Complement Your Setup",
    experienceContent: [
      "Use it as a subtle ambient light while working, a vibrant RGB accent while gaming, or a cinematic background light while watching movies.",
      "The Lamp Light helps create a more immersive environment without taking up unnecessary space.",
    ],
    perfectFor: [
      "🎮 Gaming",
      "🛏️ Bedrooms",
      "🖥️ Desks",
      "🛋️ Living Rooms",
      "🎥 Streaming",
      "🎙️ Studios",
    ],
    keyFeatures: [
      "🌈 Vibrant RGB illumination",
      "💡 Soft ambient light distribution",
      "🎮 Perfect for gaming setups",
      "🎬 Ideal for movies & entertainment",
      "🖥️ Complements desks and monitors",
      "🏠 Modern minimalist design",
      "📱 Smart lighting control",
    ],
    specs: [
      { label: "Height", value: "140 cm (55 inches)" },
      { label: "Chassis Material", value: "Aerospace Matte Black Aluminum Alloy" },
      { label: "Diffuser", value: "360-Degree Frosted Optical PC" },
      { label: "Control Methods", value: "Smartphone App + RF Wireless Remote" },
      { label: "Sound Sync", value: "Acoustic Sensor Microphone Built-In" },
      { label: "Power Input", value: "100V - 240V AC to 24W Low Voltage DC" },
    ],
    whatsInTheBox: [
      "LightinMotion Modular Aluminum Tower Sections",
      "Heavy-Duty Metal Triangular Corner Base Plate",
      "Wireless RF Remote Controller",
      "UL-Certified Power Adapter (100V - 240V)",
      "Assembly Screws & Hex Key",
      "User Manual",
    ],
    tagline: "Light up the space. Set the mood.",
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
      "A modern ambient lighting solution designed to add depth, color, and personality to your room.",
    fullDescription: [
      "Upgrade your setup with the LightinMotion Lamp Light — a modern ambient lighting solution designed to add depth, color, and personality to your room.",
      "Its sleek vertical design makes it perfect for placing beside your desk, TV, gaming setup, bed, or entertainment area.",
    ],
    features: [
      "Vibrant RGB illumination with 300+ flow animations",
      "Soft ambient light distribution with zero glare",
      "Acoustic music sync sensor",
      "Modern minimalist matte aluminum tower",
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

  "monitor-backlight": {
    id: "monitor-backlight",
    slug: "monitor-backlight",
    title: "LightinMotion Monitor Backlight",
    titleKey: "monitorBacklightTitle",
    headline: "Go Beyond Your Screen.",
    introduction:
      "Transform your monitor into a more immersive visual experience with the LightinMotion Monitor Backlight. Designed to illuminate the wall behind your monitor, it creates a soft ambient glow that extends your setup beyond the edges of the screen.",
    experienceTitle: "Designed for Gamers & Creators",
    experienceContent: [
      "Whether you're gaming, editing, working, or watching content, the backlight adds depth to your setup while creating a more visually comfortable environment.",
      "With dynamic RGB effects and screen synchronization, your lighting can react to what's happening on your display.",
    ],
    perfectFor: [
      "🎮 Gaming",
      "🎥 Streaming",
      "💻 Workstations",
      "🎨 Content Creation",
      "🎬 Movie Setups",
    ],
    keyFeatures: [
      "🌈 Addressable RGB LEDs",
      "⚡ Real-time screen synchronization",
      "🎮 Designed for gaming",
      "🖥️ Creates immersive monitor ambience",
      "📱 App-based control",
      "🔧 Easy installation",
      "💡 Smooth & vibrant light diffusion",
      "🎨 Multiple lighting effects",
    ],
    specs: [
      { label: "Monitor Sizes", value: "24-27\" Standard & 32-34\" Ultrawide" },
      { label: "Sync Refresh Rate", value: "Up to 240Hz zero-drop screen capture" },
      { label: "Latency", value: "< 5 ms Imperceptible" },
      { label: "Connection", value: "USB direct data + 5V/12V DC power" },
      { label: "Operating System", value: "Windows 10/11 & macOS 12+" },
      { label: "LED Type", value: "Addressable WS2812B RGB LEDs" },
    ],
    whatsInTheBox: [
      "3-Sided / 4-Sided Monitor RGB LED Strip",
      "Hardware Controller Unit with USB interface",
      "USB Data Cable & Dedicated Power Adapter",
      "3M Non-Damaging Mounting Clips",
      "Quick Setup Card & Calibration Guide",
    ],
    tagline: "Your monitor is only the beginning.",
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
      "Illuminates the wall behind your monitor with soft ambient glow that extends your setup beyond the screen edges.",
    fullDescription: [
      "Transform your monitor into a more immersive visual experience with the LightinMotion Monitor Backlight.",
      "Designed to illuminate the wall behind your monitor, it creates a soft ambient glow that extends your setup beyond the edges of the screen.",
    ],
    features: [
      "Addressable RGB LEDs with sub-millisecond sync",
      "Zero FPS drop background desktop sync app",
      "Fits flat and curved displays with corner links",
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
    title: "LightinMotion Monitor Bar Lights",
    titleKey: "monitorBarTitle",
    headline: "Light Your Setup From Every Angle.",
    introduction:
      "Add powerful ambient lighting to your gaming or workstation setup with LightinMotion Monitor Bar Lights. Designed to sit alongside your monitor, these vertical light bars create a wider lighting effect around your display while adding a premium gaming aesthetic to your desk.",
    experienceTitle: "Dynamic Lighting. Immersive Setup.",
    experienceContent: [
      "Use the light bars independently for ambient room lighting or pair them with your other LightinMotion products to create a synchronized lighting environment.",
      "From subtle ambient lighting to vibrant RGB effects, customize the atmosphere to match your setup.",
    ],
    perfectFor: [
      "🖥️ Gaming Desks",
      "🖥️🖥️ Dual Monitor Setups",
      "🎥 Streaming",
      "🎨 Content Creation",
      "💼 Workstations",
    ],
    keyFeatures: [
      "🌈 Vibrant RGB lighting",
      "🎮 Gaming-focused design",
      "⚡ Dynamic lighting effects",
      "🖥️ Designed for monitor setups",
      "💡 Wide ambient light projection",
      "📱 Smart lighting control",
      "🎨 Multiple colors & effects",
      "🔧 Easy setup",
    ],
    specs: [
      { label: "Configuration", value: "Single Screen Bar or Dual Screen Set" },
      { label: "Chassis Material", value: "Anodized Aerospace Aluminum Alloy + ABS" },
      { label: "Color Temperature", value: "2700K - 6500K Stepless Dimming" },
      { label: "Color Rendering Index", value: "Ra ≥ 95 (True Color Accuracy)" },
      { label: "Power Input", value: "USB Type-C (5V / 2A)" },
      { label: "Dimensions", value: "450mm x 22mm x 22mm" },
    ],
    whatsInTheBox: [
      "LightinMotion Dual-Source Monitor Light Bar(s)",
      "Precision Weighted Counterweight Clamp",
      "USB Type-C Braided Power Cable (1.8m)",
      "Wireless Touch/Rotary Desktop Controller",
      "User Manual",
    ],
    tagline: "Make your setup impossible to ignore.",
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
      "Vertical dual light bars creating a wider lighting effect around your display with a premium aesthetic.",
    fullDescription: [
      "Add powerful ambient lighting to your gaming or workstation setup with LightinMotion Monitor Bar Lights.",
      "Designed to sit alongside your monitor, these vertical light bars create a wider lighting effect around your display while adding a premium gaming aesthetic to your desk.",
    ],
    features: [
      "Asymmetric optical design guarantees zero screen reflection",
      "Dual illumination: front task lighting + rear ambient RGB",
      "Wireless desktop rotary control dial for seamless brightness adjustment",
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

  "tv-backlight": {
    id: "tv-backlight",
    slug: "tv-backlight",
    title: "LightinMotion TV Backlight",
    titleKey: "tvBacklightTitle",
    headline: "Transform Your TV Into an Immersive Entertainment Experience",
    introduction:
      "Take your movies, gaming, and streaming to the next level with the LightinMotion TV Backlight — a smart RGB ambient lighting system that reacts dynamically to the content on your screen. Designed to extend the colors of your display onto the wall behind your TV, it creates a wider and more immersive visual experience.",
    experienceTitle: "Real-Time Screen Synchronization",
    experienceContent: [
      "LightinMotion analyzes the colors displayed on your TV and reproduces them on the LED strip in real time. From intense gaming scenes to cinematic movies, the lighting continuously adapts to your screen.",
      "Your screen doesn't stop at the edges of your TV — the experience continues onto your wall.",
      "Built for Movies & Gaming: Whether you're watching a blockbuster, playing PlayStation or Xbox, or streaming your favorite content, LightinMotion adds dynamic ambient lighting to your entertainment setup.",
    ],
    perfectFor: [
      "🎬 Home Theaters & Living Rooms",
      "🎮 PS5, Xbox & Console Gaming",
      "🍿 Movie & Streaming Nights",
      "🏆 Sports & Stadium Immersion",
      "📺 55\" to 85\" 4K Televisions",
    ],
    keyFeatures: [
      "⚡ Ultra-low-latency screen synchronization",
      "🌈 60 addressable RGB LEDs per meter",
      "🎮 Designed for gaming & entertainment",
      "📺 Supports 55–65\" & 75–85\" TVs",
      "🎨 Dynamic full-color RGB effects",
      "🔥 Smart black-bar detection",
      "📱 iOS & Android app control",
      "🔧 Heavy-duty 3M adhesive mounting",
      "💡 Smooth & wide light diffusion",
    ],
    specs: [
      { label: "LED Density", value: "60 Addressable RGB LEDs/m" },
      { label: "Sync Latency", value: "<15 ms" },
      { label: "TV Compatibility", value: "55–65\" & 75–85\"" },
      { label: "Resolution Support", value: "Up to 4K Ultra HD" },
      { label: "HDR", value: "HDR10" },
      { label: "App", value: "iOS & Android" },
    ],
    whatsInTheBox: [
      "Pre-Measured RGB LED TV Strip",
      "LightinMotion Immersion Sync Controller",
      "12V Power Adapter",
      "Cable Management Clips",
      "Flexible Corner Connectors",
      "Installation Manual",
      "Calibration Guide",
    ],
    tagline: "Watch. Play. Feel the difference.",
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
      "A smart RGB ambient lighting system that reacts dynamically to the content on your screen.",
    fullDescription: [
      "Take your movies, gaming, and streaming to the next level with the LightinMotion TV Backlight — a smart RGB ambient lighting system that reacts dynamically to the content on your screen.",
      "Designed to extend the colors of your display onto the wall behind your TV, it creates a wider and more immersive visual experience.",
    ],
    features: [
      "Ultra-low-latency real-time screen color reproduction",
      "60 addressable RGB LEDs per meter",
      "Zero black bar bleed algorithm",
      "Compatible with PS5, Xbox, Switch, and 4K HDR displays",
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
};

// Aliases for alternate route paths
PRODUCT_CATALOG["cloud-lights"] = PRODUCT_CATALOG["cloudlights"];
PRODUCT_CATALOG["custom-sync-lights"] = PRODUCT_CATALOG["custom-strip-light"];
