let connections = {}

onconnect = e => {
  let port = e.ports[0];
  port.onmessage = e => {
    switch (e.data[0]) {
      case "subscribe":
        console.log(`subscribing ${e.data[1]} (${e.data[2]})`);
        connections[port] = e.data.splice(1);
        break;
      case "broadcast":
        let current = connections[port];
        console.log(`broadcast from ${current[0]} (${current[1]}): ${e.data[1]}`);
        for (let p in connections) 
          if (p != port)
            p.postMessage(["message", "broadcast", connections[port], e.data[1]]);
        break;
    }
  }
};
