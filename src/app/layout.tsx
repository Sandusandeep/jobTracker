import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f6f4ee",
};

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  applicationName: "Role Ready",
  title: {
    default: "Role Ready — A calmer job search, one small system at a time",
    template: "%s | Role Ready",
  },
  description:
    "Simple, editable job-search templates for early-career developers. Track applications, plan your week, and prepare for interviews without another subscription.",
  openGraph: {
    type: "website",
    siteName: "Role Ready",
    title: "Role Ready — A calmer job search",
    description: "Practical, editable templates to help early-career developers organize their job search.",
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
