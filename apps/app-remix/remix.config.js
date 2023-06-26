const path = require('path')

const glob = require('glob')
const { flatRoutes } = require('remix-flat-routes')

const packages = glob
  .globSync('packages/**/package.json', {
    cwd: path.join(__dirname, '..', '..'),
    ignore: ['**/node_modules/**'],
    absolute: true,
  })
  .map((pkg) => path.dirname(pkg) + '/**/*.js')

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
  },
  postcss: true,
  routes: (defineRoutes) =>
    flatRoutes('routes', defineRoutes, { appDir: path.resolve(__dirname, 'app') }),
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  serverBuildPath: 'api/index.js',
  tailwind: true,
  watchPaths: packages,
}
