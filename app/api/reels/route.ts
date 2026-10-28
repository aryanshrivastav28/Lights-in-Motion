import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface ReelData {
  id: string;
  filename: string;
  src: string;
  title: string;
  badge?: "FEATURED" | "TOP SELLING" | "TRENDING" | "NEW";
  productTitle: string;
  productSlug: string;
  productImage: string;
  instagramUrl?: string;
}

const DEFAULT_METADATA: Record<string, Partial<ReelData>> = {
  "instagram-reel-1.mp4": {
    title: "LightinMotion Gaming Sync Setup",
    badge: "FEATURED",
    productTitle: "LightinMotion Monitor Backlight",
    productSlug: "monitor-backlight",
    productImage: "/products/monitor-backlight/main.png",
    instagramUrl: "https://www.instagram.com/reel/DdlxarRgn2s/",
  },
  "instagram-reel-2.mp4": {
    title: "LightinMotion TV Sync Ambient Setup",
    badge: "TRENDING",
    productTitle: "LightinMotion TV Backlight",
    productSlug: "tv-backlight",
    productImage: "/products/tv-backlight/main.png",
    instagramUrl: "https://www.instagram.com/reel/DbKqkjayGau/",
  },
};

export async function GET() {
  try {
    const reelsDir = path.join(process.cwd(), "public", "reels");
    
    if (!fs.existsSync(reelsDir)) {
      fs.mkdirSync(reelsDir, { recursive: true });
    }

    const files = fs.readdirSync(reelsDir);
    const videoExtensions = [".mp4", ".webm", ".mov", ".m4v", ".ogv"];
    const videoFiles = files.filter((file) =>
      videoExtensions.includes(path.extname(file).toLowerCase())
    );

    const reels: ReelData[] = videoFiles.map((filename, index) => {
      const ext = path.extname(filename);
      const rawName = path.basename(filename, ext);
      const cleanTitle = rawName
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      const meta = DEFAULT_METADATA[filename] || {};

      const badges: ("FEATURED" | "TOP SELLING" | "TRENDING" | "NEW")[] = [
        "FEATURED",
        "TOP SELLING",
        "TRENDING",
        "NEW",
      ];
      const autoBadge = badges[index % badges.length];

      return {
        id: rawName,
        filename,
        src: `/reels/${filename}`,
        title: meta.title || cleanTitle,
        badge: meta.badge || autoBadge,
        productTitle: meta.productTitle || cleanTitle,
        productSlug: meta.productSlug || "cloudlights",
        productImage: meta.productImage || "/products/cloudlights/main.jpg",
        instagramUrl: meta.instagramUrl,
      };
    });

    return NextResponse.json({ success: true, reels });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
