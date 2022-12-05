import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

import { Container } from '~/components/container'

type ErrorBoundaryProps = {
  thrown: unknown
}

export const SharedErrorBoundary = ({ thrown }: ErrorBoundaryProps) => {
  return (
    <div className="flex max-w-full flex-col items-center">
      <ExclamationCircleIcon className="h-10 w-10 text-red-500 dark:text-red-300" />
      <h1 className="mt-2 text-lg font-medium text-red-600 dark:text-red-300">An error occurred</h1>
      {thrown instanceof Error ? (
        <>
          {thrown.message && (
            <p className="mt-4 max-w-lg text-red-600 dark:text-red-300">{thrown.message}</p>
          )}
          <details className="mt-2 max-w-full justify-between break-words text-center text-red-600 dark:text-red-300">
            <summary>Call stack</summary>
            <p>{thrown.stack}</p>
          </details>
        </>
      ) : (
        <p className="mt-4 max-w-lg text-red-600 dark:text-red-300">{`${thrown}`}</p>
      )}
    </div>
  )
}

export const PaddedErrorBoundary = ({ thrown }: ErrorBoundaryProps) => {
  return (
    <div className="relative mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <SharedErrorBoundary thrown={thrown} />
    </div>
  )
}

export const RootErrorBoundary = ({ thrown }: ErrorBoundaryProps) => {
  return (
    <Container className="mt-14">
      <SharedErrorBoundary thrown={thrown} />
    </Container>
  )
}

export const RootNotFound = () => {
  return (
    <Container className="mt-14">
      <h1 className="xs:text-5xl relative text-3xl text-zinc-900 dark:text-zinc-200">
        404 Not Found
      </h1>
    </Container>
  )
}
