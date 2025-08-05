// src/routes/__root.tsx
import {
  createRootRoute,
  getRouterContext,
  Link,
  Outlet,
  useMatch,
  useMatches,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AnimatePresence, useIsPresent } from 'framer-motion'
import { cloneDeep } from 'lodash'
import { useContext, useRef } from 'react'

const AnimatedOutlet = () => {
  const RouterContext = getRouterContext()
  const routerContext = useContext(RouterContext)
  const renderedContext = useRef(routerContext)
  const isPresent = useIsPresent()

  if (isPresent) {
    renderedContext.current = cloneDeep(routerContext);

  }

  return (

      <RouterContext.Provider value={renderedContext.current}>
        <Outlet />
      </RouterContext.Provider>
  )
}

export const Route = createRootRoute({
  component: () => {
    const matches = useMatches()
    const match = useMatch({ strict: false })
    const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1
    const nextMatch = matches[nextMatchIndex]

    return (
      <>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">Home Page</Link>
          <Link to="/about" className="[&.active]:font-bold">About</Link>
        </div>
        <hr />

        <AnimatePresence mode="popLayout">
          <AnimatedOutlet key={nextMatch?.id ?? 'root'} />
        </AnimatePresence>

        <TanStackRouterDevtools />
      </>
    )
  },
})
