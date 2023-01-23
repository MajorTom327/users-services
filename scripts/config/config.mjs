import * as R from 'ramda'

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

// Add here all the env vars you want to be available in the bundle
const envVarsKeys = [
  'NODE_ENV',
  'PORT',
  'DATABASE_URL',
  'AUTH_TOKEN_SECRET'
]

// Add here all the external dependencies you want to be available in the bundle
const external = [
  'path', 'express', '@apollo', 'body-parser', 'compression', 'buffer', 'prisma', '@prisma/client'
]

export const baseSettings = {
  entryPoints: [
    'src/index.ts'
  ],

  bundle: true,
  sourcemap: false,
  target: 'es2015',
  format: 'cjs',
  outdir: 'dist',
  platform: 'browser',

  external,
  define: R.reduce((add, key) => R.assoc(`process.env.${key}`, `"${process.env[key]}"`, add), {}, envVarsKeys),
  plugins: [
  ]
}

export const devSettings = {
  jsxDev: true,
  jsx: 'automatic'
}

export const prodSettings = {
  minify: true,
  drop: ['debugger', 'console'],
  treeShaking: true
}

export const settings = R.compose(
  R.when(R.always(isDev), R.mergeDeepRight(devSettings)),
  R.when(R.always(isProd), R.mergeDeepRight(prodSettings))
)(baseSettings)
