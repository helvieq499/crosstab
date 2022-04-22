let connections = {}

onconnect = e => {
  let ctx = {
    port: e.ports[0],
  };

  ctx.port.onmessage = e => handle(ctx, e.data);
};

function handle(ctx, data) {
  switch (data[0]) {
    case "subscribe":
      console.log(`subscribing ${data[1]} (${data[2]})`);
      connections[ctx.descriptor = data.splice(1, 2)] = ctx.port;
      break;
      
    case "broadcast":
      console.log(`broadcast from ${ctx.descriptor[0]} (${ctx.descriptor[1]}): ${data[1]}`);
      for (let desc in connections) 
        if (connections[desc] != ctx.port)
          connections[desc].postMessage(["message", "broadcast", ctx.descriptor, data[1]]);
      break;
  }
}
