import 'babel-polyfill'
import express from 'express'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import nofavicon from 'express-no-favicons'
import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'
import { findVideos, findVideo } from './api'

const DEV = process.env.NODE_ENV === 'development'
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const app = express()

// JWTOKEN COOKIE - in a real app obviously you set this after signup/login:

app.use(cookieParser())

app.use((req, res, next) => {
  const cookie = req.cookies.jwToken
  const jwToken = 'fake' // TRY: set to 'real' to authenticate ADMIN route

  if (cookie !== jwToken) {
    res.cookie('jwToken', jwToken, { maxAge: 900000 })
    req.cookies.jwToken = jwToken
  }

  next()
})

// API
app.get('/api/videos/:category', async (req, res) => {
  const jwToken = req.headers.authorization.split(' ')[1]
  const data = await findVideos(req.params.category, jwToken)
  res.json(data)
})

app.get('/api/video/:slug', async (req, res) => {
  const jwToken = req.headers.authorization.split(' ')[1]
  const data = await findVideo(req.params.slug, jwToken)
  res.json(data)
})

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig])
  const clientCompiler = compiler.compilers[0]
  const options = {
    publicPath: clientConfig.output.publicPath,
    stats: { colors: true }
  }
  const devMiddleware = webpackDevMiddleware(compiler, options)

  app.use('/favicon.ico', (req, res) => {
    res.send('')
  })

  // into our middleware along with the webpack compiler
  app.use(devMiddleware)

  // this adds hot reloading
  app.use(webpackHotMiddleware(clientCompiler))

  // this add hot reloading to the actual node server <3, not required but nice to have
  app.use(webpackHotServerMiddleware(compiler))
}
else {
  const clientStats = require('../buildClient/stats.json') // eslint-disable-line import/no-unresolved
  const serverRender = require('../buildServer/main.js').default // eslint-disable-line import/no-unresolved

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
}

app.listen(3000, () => {
  console.log('Listening @ http://localhost:3000/')
})
