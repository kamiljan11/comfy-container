import { createFileRoute, Outlet } from '@tanstack/react-router'

/**
 * Parent route for the entire /spirituality tree. Acts as a passthrough so
 * child routes (sps, sps2, dmt, iyss, etc.) render correctly. The hub page
 * content lives in `spirituality.index.tsx` and renders when the path is
 * exactly /spirituality.
 */
export const Route = createFileRoute('/spirituality')({ component: SpiritualityTreeLayout })

function SpiritualityTreeLayout() {
  return <Outlet />
}
