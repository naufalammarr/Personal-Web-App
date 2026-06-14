import { createContext } from 'react'

/**
 * PageScrollContext
 * -----------------
 * Each routed page scrolls inside an internal `overflow-y-auto` region owned
 * by <PageTransition> (not the window). This context hands that scroll
 * container's ref down to pages so they can drive scroll-linked effects
 * (e.g. hero parallax) via Framer's `useScroll({ container })`.
 *
 * Value: a React ref object pointing at the scrolling element, or null when
 * a consumer is rendered outside a PageTransition.
 */
export const PageScrollContext = createContext(null)
