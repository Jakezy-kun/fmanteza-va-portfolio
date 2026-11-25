"use client"

import type { ComponentType, CSSProperties } from "react"

export type LogoIcon = ComponentType<{ className?: string; size?: number | string }>

export interface MarqueeLogo {
  name: string
  icon: LogoIcon
  /** Brand colour on light backgrounds. */
  light: string
  /** Brand colour on dark backgrounds (defaults to `light`). */
  dark?: string
  /** Free-form tag used to spotlight a subset of logos. */
  group?: string
}

interface LogoMarqueeProps {
  logos: MarqueeLogo[]
  reverse?: boolean
  paused?: boolean
  /** Seconds per logo; keeps every row moving at roughly the same speed. */
  secondsPerItem?: number
  /** Pad each group up to this many tiles so it always overflows wide screens. */
  minItems?: number
  /** When set, logos outside this group are dimmed. */
  spotlight?: string | null
}

/**
 * Seamless CSS marquee: two identical groups side by side, the track slides
 * by -50% and loops. Pauses on hover; honours prefers-reduced-motion via
 * globals.css. Decorative only: callers provide an accessible list elsewhere.
 */
export function LogoMarquee({
  logos,
  reverse = false,
  paused = false,
  secondsPerItem = 3.6,
  minItems = 12,
  spotlight = null,
}: LogoMarqueeProps) {
  const padCount = Math.max(0, minItems - logos.length)
  const padded = [
    ...logos.map((logo) => ({ logo, pad: false })),
    ...Array.from({ length: padCount }, (_, i) => ({ logo: logos[i % logos.length], pad: true })),
  ]
  const duration = `${padded.length * secondsPerItem}s`

  const group = (clone: boolean) => (
    <ul
      className={`marquee-group flex shrink-0 items-center gap-3 md:gap-4 pr-3 md:pr-4 ${clone ? "marquee-clone" : ""}`}
    >
      {padded.map(({ logo, pad }, i) => (
        <LogoTile
          key={`${logo.name}-${i}`}
          logo={logo}
          className={pad ? "marquee-pad" : ""}
          state={!spotlight ? "idle" : logo.group === spotlight ? "on" : "off"}
        />
      ))}
    </ul>
  )

  return (
    <div className="marquee marquee-mask relative overflow-hidden py-2" data-paused={paused} aria-hidden>
      <div
        className="marquee-track flex w-max"
        data-reverse={reverse}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}

function LogoTile({
  logo,
  state,
  className = "",
}: {
  logo: MarqueeLogo
  state: "idle" | "on" | "off"
  className?: string
}) {
  const Icon = logo.icon
  const vars = { "--logo-light": logo.light, "--logo-dark": logo.dark ?? logo.light } as CSSProperties

  return (
    <li
      style={vars}
      data-spotlight={state}
      className={`logo-tile group/tile flex items-center gap-3 h-14 md:h-16 pl-3 pr-5 md:pl-3.5 md:pr-6 rounded-2xl whitespace-nowrap select-none
        bg-white dark:bg-white/[0.035] border border-black/10 dark:border-white/10 shadow-sm
        transition-[opacity,filter,transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5
        ${state === "off" ? "opacity-25 grayscale" : ""} ${className}`}
    >
      <span
        className="logo-icon flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-black/[0.035] dark:bg-white/[0.06]
          transition-transform duration-300 group-hover/tile:scale-110"
      >
        <Icon className="w-5 h-5 md:w-[22px] md:h-[22px]" />
      </span>
      <span className="font-display text-sm md:text-[15px] font-semibold text-gray-800 dark:text-gray-100">
        {logo.name}
      </span>
    </li>
  )
}
