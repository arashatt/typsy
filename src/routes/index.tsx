import { createFileRoute, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useIsPresent, AnimatePresence, motion } from 'framer-motion'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const isPresent = useIsPresent()
  const location = useLocation()

  // Uncomment and use if you want to block navigation with a confirmation dialog
  /*
  const { proceed, reset, status, next } = useBlocker({
    shouldBlockFn: () => isPresent,
    withResolver: true,
  })
  */

  useEffect(() => {
    console.log('isPresent changed:', isPresent)
    // For example, you can react to isPresent change here
    // if (isPresent && status === 'blocked') proceed()
  }, [isPresent])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration:2 }}
        >
          <h1 className="text-red-600">About Page</h1>
          {isPresent ? 'Present' : 'Leaving...'}
          <p className="mt-4 text-gray-700">
            This is the about page content. You can add any static or dynamic
            information here.
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Uncomment this block if using navigation blocking */}
      {/* 
      {status === 'blocked' && (
        <div>
          <p>You are navigating to {next.pathname}</p>
          <p>Are you sure you want to leave?</p>
          <button onClick={proceed}>Yes</button>
          <button onClick={reset}>No</button>
        </div>
      )}
      */}
    </>
  )
}
