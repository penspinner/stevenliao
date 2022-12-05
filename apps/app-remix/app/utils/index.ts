export const createCacheControlHeaders = ({
  visibility = 'private',
  maxage = 0,
  sMaxage = maxage,
  swr = sMaxage,
}: {
  visibility?: 'private' | 'public'
  maxage?: number
  sMaxage?: number
  swr?: number
} = {}) => {
  return {
    'Cache-Control': `${visibility}, max-age=${maxage}, s-maxage=${sMaxage}, stale-while-revalidate=${swr}`,
  }
}
