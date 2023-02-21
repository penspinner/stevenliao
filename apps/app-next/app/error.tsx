'use client'

import { RootErrorBoundary } from 'personal-site'

const Error = ({ error }: { error: Error; reset: () => void }) => {
  return <RootErrorBoundary thrown={error} />
}

export default Error
