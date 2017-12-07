//ENV
require('dotenv').config()

process.env.PRODUCTION = (process.env.PRODUCTION && process.env.PATH_TO_BUILD) ? process.env.PRODUCTION : false
process.env.PATH_TO_BUILD = (process.env.PRODUCTION && process.env.PATH_TO_BUILD) ? process.env.PATH_TO_BUILD : undefined
process.env.AUTH_ON = (process.env.AUTH_ON) ? process.env.AUTH_ON : true
process.env.SERVER_PATH = (process.env.SERVER_PATH) ? process.env.SERVER_PATH : 'localhost' 
process.env.SERVER_PORT = (process.env.SERVER_PORT) ? process.env.SERVER_PORT : 3001
process.env.PRESENT_PATH = (process.env.PRESENT_PATH) ? process.env.PRESENT_PATH : 'localhost' 
process.env.PRESENT_PORT = (process.env.PRESENT_PORT) ? process.env.PRESENT_PORT : 3000 
process.env.PROXY_PORT = (process.env.PROXY_PORT) ? process.env.PROXY_PORT : 3002
process.env.COOKIE_SECRET = (process.env.COOKIE_SECRET) ? process.env.COOKIE_SECRET : "It never rains in Southern California"
process.env.LTI_SECRET = (process.env.LTI_SECRET) ? process.env.LTI_SECRET : "secret"