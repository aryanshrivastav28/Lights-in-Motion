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
}

const DEFAULT_METADATA: Record<string, Partial<ReelData>> = {
  "hdmi-sync-tv-backlight.mp4": {
    title: "HDMI Sync TV Backlight",
    badge: "FEATURED",
    productTitle: "HDMI Sync TV Backlight",
    productSlug: "tv-backlight",
    productImage: "/products/tv-backlight/main.png",
  },
  "cloud-lights-room-makeover.mp4": {
    title: "Cloud Lights Aesthetic",
    badge: "TOP SELLING",
    productTitle: "LightinMotion Cloud Lights",
    productSlug: "cloudlights",
    productImage: "/products/cloudlights/main.jpg",
  },
  "monitor-backlight-gaming.mp4": {
    title: "Monitor Backlight Esports",
    badge: "FEATURED",
    productTitle: "Monitor Backlight",
    productSlug: "monitor-backlight",
    productImage: "/products/monitor-backlight/main.png",
  },
  "monitor-bar-lights-setup.mp4": {
    title: "Dual Screen Bar Lights",
    badge: "TRENDING",
    productTitle: "Monitor Bar Lights",
    productSlug: "bar-lights",
    productImage: "/products/bar-lights/main.png",
  },
  "custom-sync-lights-tour.mp4": {
    title: "Custom Strip Ambient Sync",
    badge: "FEATURED",
    productTitle: "Custom Sync Lights",
    productSlug: "custom-strip-light",
    productImage: "/products/custom-strip-light/main.png",
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
