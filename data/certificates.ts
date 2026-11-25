import type { LucideIcon } from "lucide-react"
import { BadgeCheck, Mic, Presentation, Trophy, HeartHandshake } from "lucide-react"

/* ------------------------------------------------------------------
 * Certificates
 *
 * To add one:
 *   1. Put the image in public/certificates/<category>/<slug>.webp
 *      plus a small <slug>-thumb.webp (about 640px wide).
 *   2. Add an entry below. Categories with no entries are hidden.
 *   3. Set `featured: true` on up to three to pin them at the top.
 * ------------------------------------------------------------------ */

export type CertificateCategory = "courses" | "events" | "workshops" | "competitions" | "leadership"

export interface CategoryInfo {
  id: CertificateCategory
  label: string
  short: string
  blurb: string
  icon: LucideIcon
  gradient: string
  chip: string
}

export const CERTIFICATE_CATEGORIES: CategoryInfo[] = [
  {
    id: "courses",
    label: "Courses & Certifications",
    short: "Courses",
    blurb: "Online courses and professional certifications.",
    icon: BadgeCheck,
    gradient: "from-blue-500 to-cyan-400",
    chip: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25",
  },
  {
    id: "events",
    label: "Events & Symposiums",
    short: "Events",
    blurb: "Tech talks, meetups, conferences and research symposiums.",
    icon: Mic,
    gradient: "from-violet-500 to-fuchsia-500",
    chip: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/25",
  },
  {
    id: "workshops",
    label: "Workshops & Seminars",
    short: "Workshops",
    blurb: "Hands-on trainings, workshops and info sessions.",
    icon: Presentation,
    gradient: "from-emerald-500 to-teal-400",
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
  },
  {
    id: "competitions",
    label: "Competitions & Awards",
    short: "Awards",
    blurb: "Hackathons, contests and recognitions.",
    icon: Trophy,
    gradient: "from-amber-500 to-orange-500",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
  },
  {
    id: "leadership",
    label: "Leadership & Service",
    short: "Leadership",
    blurb: "Organization roles and volunteer work.",
    icon: HeartHandshake,
    gradient: "from-rose-500 to-pink-500",
    chip: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
  },
]

export interface Certificate {
  slug: string
  title: string
  issuer: string
  category: CertificateCategory
  /** ISO date (YYYY-MM-DD) the certificate was given. */
  date: string
  /** Wording on the certificate, e.g. "Certificate of Attendance". */
  kind: string
  /** Your role, e.g. Participant, Attendee, Speaker, Organizer. */
  role: string
  location?: string
  note?: string
  /** Link to verify the credential online, if there is one. */
  credentialUrl?: string
  featured?: boolean
  image: { w: number; h: number; blur: string }
}

export const CERTIFICATES: Certificate[] = [
  {
    slug: "psits-xi-festival-of-talents-2025",
    title: "PSITS Region XI Festival of Talents 2025",
    issuer: "PSITS Region XI",
    category: "leadership",
    date: "2025-03-16",
    kind: "Certificate of Appreciation",
    role: "Esports Technical Director",
    location: "University of the Immaculate Conception, Davao City",
    note: "Theme: “Future Ready ITE: Shaping the Digital Future of IT Students in Davao Region.”",
    featured: true,
    image: {
      w: 1600,
      h: 1132,
      blur: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQAgCdASoQAAsAA4BaJZACdADGo7Ipy1IAAP6bu5t2sBR7vMuKZq4jvTYOnvITgBagQbDfKt4sZGFJq1GY+chCIpH6Z+zQsJyU3mHrTF4oZ3R0fzAqj1GJCquQlBAA3/+AqQAA",
    },
  },
  {
    slug: "dlsu-ibeht-research-talks",
    title: "IBEHT Research Talks: From Concept to Commerce — The Journey of Innovating Healthcare Products",
    issuer: "De La Salle University – IBEHT",
    category: "events",
    date: "2024-05-31",
    kind: "Certificate of Attendance",
    role: "Attendee",
    location: "Henry Sy Sr. Hall, De La Salle University, Manila",
    note: "Institute of Biomedical Engineering and Health Technologies research talk series.",
    featured: true,
    image: {
      w: 1600,
      h: 1130,
      blur: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoQAAsAA4BaJYgAAujdrIYa4YAA/thuLM5YuCpWq6dH4eImtlNye2Tc2UfLiuIOC2boJZ1vIIcHfQZYrdFhOKPnB7/6cQQA",
    },
  },
  {
    slug: "jugph-meetup-9-modern-api",
    title: "JUG PH Meetup #9: Modern API Development",
    issuer: "Java User Group Philippines",
    category: "events",
    date: "2024-05-29",
    kind: "Certificate of Attendance",
    role: "Attendee",
    location: "Orange & Bronze Software Labs, Makati City",
    featured: true,
    image: {
      w: 1600,
      h: 1131,
      blur: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAQCdASoQAAsAA4BaJZgCdAED3mJdwgAA/t2SN/rT+2/DbiWDUm5DrzhqW6t5PeBxL3Bnui6KAzngekumNxrzwl3ujrReB8VCVHxJLCHDuWbJVwQKeVwAAAA=",
    },
  },
  {
    slug: "jugph-meetup-jcp-25th",
    title: "JUG PH Meetup: Java Community Process 25th Celebration",
    issuer: "Java User Group Philippines",
    category: "events",
    date: "2024-04-05",
    kind: "Certificate of Attendance",
    role: "Attendee",
    location: "Orange & Bronze Software Labs, Makati City",
    image: {
      w: 1600,
      h: 1131,
      blur: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAsAA4BaJYgCdADpuOhJ98AA/t2S2bh7rWAT7FzFnN87VtntcimbpGmMPgHLxYwxA6lGqUDX3LZqg0/QGMWKZu+4c7gxH5yOofqqg4p2QAAA",
    },
  },
  {
    slug: "fwdp-sheisfwdp-community-day",
    title: "#SheIsFWDP Monthly Community Day",
    issuer: "Filipino Web Development Peers",
    category: "events",
    date: "2024-03-31",
    kind: "Certificate of Recognition",
    role: "Participant",
    image: {
      w: 1600,
      h: 1132,
      blur: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAwAgCdASoQAAsAA4BaJbAC7AEPh6tfem6NAAD+5628xbax0HJeiDE1Ey1PKOfbOimhQ0pR5uZvvaiUNGjzp+ibJZDZhOSVcOOAV5kFEbUjszTYneTQAA==",
    },
  },
  {
    slug: "devcon-techkwentuhan-cross-platform",
    title: "TechKwentuhan: Choosing Between Cross-Platform and Native App Development",
    issuer: "DEVCON Davao Chapter",
    category: "events",
    date: "2024-02-07",
    kind: "Certificate of Participation",
    role: "Participant",
    note: "Talk by Godynheil Quisto, senior Android developer.",
    image: {
      w: 1080,
      h: 763,
      blur: "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoQAAsAA4BaJZACdADp4Srsf2AA/uXQIkIkRlZv9B5cxMqrfuDfdTWWE46uG4MpV3xvV9ll0Vrsl0XiwAA=",
    },
  },
  {
    slug: "devcon-techkwentuhan-figma-extended",
    title: "TechKwentuhan: Figma Extended",
    issuer: "DEVCON Davao Chapter",
    category: "events",
    date: "2023-12-10",
    kind: "Certificate of Participation",
    role: "Participant",
    note: "With Ria Cordero, Founder/Creatives Lead of DICE.",
    image: {
      w: 1080,
      h: 763,
      blur: "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoQAAsAA4BaJZACdADp/B+AiQAA/uXQIkIkRlZv9B2U1UAPtG8Ac+TlhV5mTHyVoyf727moJ/SmeA55VAAAAA==",
    },
  },
  {
    slug: "marian-tbi-pitching",
    title: "Info Session on Pitching",
    issuer: "MARIAN Technology Business Incubator",
    category: "workshops",
    date: "2026-02-14",
    kind: "Certificate of Participation",
    role: "Participant",
    location: "ITRC, University of the Immaculate Conception, Davao City",
    image: {
      w: 1600,
      h: 1131,
      blur: "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAQCdASoQAAsAA4BaJaQAApK1g1wAAP72bgJUhZ/Qvdmw72uaebj0JpaQn5DNVVQCNyOAAAA=",
    },
  },
  {
    slug: "uic-vibe-video-editing",
    title: "Basic Video Editing using Adobe Premiere Pro",
    issuer: "UIC VIBE Club",
    category: "workshops",
    date: "2024-04-20",
    kind: "Certificate of Participation",
    role: "Participant",
    location: "ITRC Training Center, University of the Immaculate Conception",
    image: {
      w: 1600,
      h: 1131,
      blur: "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwAQCdASoQAAsAA4BaJagCdAEMxFBTgtAA/VPgv+ADXvwobNvzBsWAuIjY332KDsWFasQNJM48u7VepLcGAwSYJ885d1Qy7EG2ojdrO23mjX5VMMeo7aXRkJXfk8DXvAYhLlYvzgAAAA==",
    },
  },
  {
    slug: "gdsc-uic-astro-workshop",
    title: "Astronomical Workshop: Build Websites at Light Speed",
    issuer: "Google Developer Student Clubs – UIC",
    category: "workshops",
    date: "2024-04-18",
    kind: "Certificate of Participation",
    role: "Participant",
    image: {
      w: 1600,
      h: 1130,
      blur: "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAABwAQCdASoQAAsAA4BaJZmHgAGIAAD+8FdgCuD6kCu+06he+8qWKFlzk25Tb/uk/WmLAAAA",
    },
  },
]

export const certificateSrc = (c: Certificate, thumb = false) =>
  `/certificates/${c.category}/${c.slug}${thumb ? "-thumb" : ""}.webp`

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "2024-05-31" → "May 31, 2024" (string math, so server and browser always agree). */
export const formatCertDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}
