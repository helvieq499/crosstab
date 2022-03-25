let connections = {}

onconnect = e => {
  let port = e.ports[0];
  let ctx = {};
    
  port.onmessage = e => {
    switch (e.data[0]) {
      case "subscribe":
        console.log(`subscribing ${e.data[1]} (${e.data[2]})`);
        connections[ctx.descriptor = e.data.splice(1, 2)] = port;
        break;
      case "broadcast":
        console.log(`broadcast from ${ctx.descriptor[0]} (${ctx.descriptor[1]}): ${e.data[1]}`);
        for (let desc in connections) 
          if (connections[desc] != port)
            connections[desc].postMessage(["message", "broadcast", desc, e.data[1]]);
        break;
    }
  }
};
