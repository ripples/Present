//ENV
require('dotenv').config()

process.env.PRODUCTION = (process.env.PRODUCTION && process.env.PATH_TO_BUILD) ? process.env.PRODUCTION : false
process.env.PATH_TO_BUILD = (process.env.PRODUCTION && process.env.PATH_TO_BUILD) ? process.env.PATH_TO_BUILD : undefined
process.env.AUTH_ON = (process.env.AUTH_ON) ? process.env.AUTH_ON : true
process.env.SEVRER_PATH = (process.env.SERVER_PATH) ? process.env.SERVER_PATH : localhost 
process.env.SERVER_PORT = (process.env.SERVER_PORT) ? process.env.SERVER_PORT : 3001
process.env.PRESENT_PATH = (process.env.PRESENT_PATH) ? process.env.PRESENT_PATH : localhost 
process.env.PRESENT_PORT = (process.env.PRESENT_PORT) ? process.env.PRESENT_PORT : 3000 
process.env.PROXY_PORT = (process.env.PROXY_PORT) ? process.env.PROXY_PORT : 80
process.env.SECRET = (process.env.SECRET) ? process.env.SECRET : "It never rains in Southern California" 

console.log("Enviornmental Variables Loaded", process.env)