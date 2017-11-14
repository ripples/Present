var proxy = require('redbird')({port: 80});

console.log(process.env);

const serverPathAndPort = process.env.SERVER_PATH + ":" + process.env.SERVER_PORT

if(process.env.PRODUCTION){
	proxy.register(process.env.PRESENT_PATH, "http://" + serverPathAndPort+ "/");		
}
else{
	proxy.register(process.env.PRESENT_PATH, "http://" + process.env.PRESENT_PATH + ":" + process.env.PRESENT_PORT + "/");
}
//proxy.register(process.env.PRESENT_PATH)

proxy.register(process.env.PRESENT_PATH + "/api", "http://" + serverPathAndPort + "/api");

proxy.register(process.env.PRESENT_PATH + "/upload", "http://" + serverPathAndPort + "/upload");
