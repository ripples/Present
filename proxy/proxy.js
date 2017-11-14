var proxy = require('redbird')({port: 80});

proxy.register("localhost", "http://localhost:3000");

proxy.register("localhost/api", "http://localhost:3001/api");
proxy.register("localhost/upload", "http://localhost:3001/upload");
