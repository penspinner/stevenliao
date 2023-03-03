const path = require('path')

const glob = require('glob')
const { flatRoutes } = require('remix-flat-routes')

const packages = glob
  .globSync('packages/**/package.json', {
    cwd: path.join(__dirname, '..', '..'),
    ignore: ['**/node_modules/**'],
    absolute: true,
  })
  .map((pkg) => path.dirname(pkg))

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  future: {
    unstable_postcss: true,
    unstable_tailwind: true,
    v2_errorBoundary: true,
    v2_meta: true,
  },
  routes: (defineRoutes) =>
    flatRoutes('routes', defineRoutes, { appDir: path.resolve(__dirname, 'app') }),
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  serverBuildPath: 'api/index.js',
  watchPaths: packages,
}
