import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Ferdinand M. Manteza Jr. | Full Stack Developer",
  description: "Portfolio of Ferdinand M. Manteza Jr. - Full Stack Developer & UX/Product Designer specializing in Learning Technologies",
  keywords: ["Full Stack Developer", "UX Designer", "Web Development", "Mobile Development", "UI/UX"],
  openGraph: {
    title: "Ferdinand M. Manteza Jr. | Full Stack Developer",
    description: "Building innovative solutions that bridge technology and education.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
