import { createFileRoute, useLocation } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsPresent } from 'framer-motion'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const location = useLocation()
  const isPresent = useIsPresent()

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, }}
          transition={{ duration: 2 }}
        >
          <h1 className="text-green-600">About Page</h1>
          {isPresent ? 'Present' : 'Leaving...'}
          <p className="mt-4 text-gray-700">
            This is the about page content. You can add any static or dynamic
            information here.
          </p>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
