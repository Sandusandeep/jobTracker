import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f6f4ee",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "Role Ready",
  title: {
    default: "Free Job Search Tools & Application Tracker",
    template: "%s | Role Ready",
  },
  description:
    "Free job-search tools for early-career developers: track applications, plan your week, and prepare interview stories with simple editable resources.",
  openGraph: {
    type: "website",
    siteName: "Role Ready",
    title: "Free Job Search Tools & Application Tracker | Role Ready",
    description:
      "Organize applications, follow-ups, and interview preparation with Role Ready's free browser tracker and editable job-search resources.",
    url: siteUrl.toString(),
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Job Search Tools & Application Tracker | Role Ready",
    description:
      "Organize applications, follow-ups, and interview preparation with free, editable job-search tools.",
    images: [new URL("/opengraph-image", siteUrl).toString()],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/role-ready.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
