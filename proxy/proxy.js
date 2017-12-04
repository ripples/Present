var proxy = require('redbird')({port: process.env.PROXY_PORT});

const serverPathAndPort = process.env.SERVER_PATH + ":" + process.env.SERVER_PORT

if(process.env.PRODUCTION == "true"){
	proxy.register(process.env.PRESENT_PATH, "http://" + serverPathAndPort+ "/");		
}
else{
	proxy.register(process.env.PRESENT_PATH, "http://" + process.env.PRESENT_PATH + ":" + process.env.PRESENT_PORT + "/");
}
proxy.register(process.env.PRESENT_PATH + "/api", "http://" + serverPathAndPort + "/api");

proxy.register(process.env.PRESENT_PATH + "/upload", "http://" + serverPathAndPort + "/upload");
