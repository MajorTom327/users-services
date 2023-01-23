import * as R from 'ramda'

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

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

  external: [
    'path', 'express'
  ],
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
  },
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
