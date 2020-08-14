const express = require('express');
const Eureka = require('eureka-js-client').Eureka;

const app = express();
const PORT = process.env.PORT || 3000;

const client = new Eureka({
    // application instance information
    instance: {
      app: 'third-service',
      hostName: 'localhost',
      instanceId: '1',
      ipAddr: '127.0.0.1',
      port: {
        '$': 3000,
        '@enabled': true,
      },
      vipAddress: 'third-service',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      // eureka server host / port
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/'
    },
  });

app.listen(PORT, () => {
    console.log("Started service...");
    client.start();
})

app.get('/hello', (req, res) => {
 res.json("hello from service3 nodejs")
})

