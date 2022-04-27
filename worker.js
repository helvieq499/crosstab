let connections = {}
let handlers = {
  subscribe: onSubscribe,
  broadcast: onBroadcast,
}

onconnect = e => {
  let ctx = {
    port: e.ports[0],
  };

  e.ports[0].onmessage = e => handle(ctx, e.data);
};

function handle(ctx, data) {
  let fn = handlers[data[0]];
  if (fn) fn(ctx, data);
  else console.log(`unknown type ${data[0]} from ${getName(ctx)}`);
}

function onSubscribe(ctx, data) {
  console.log(`subscribing ${data[1]} (${data[2]})`);
  connections[ctx.descriptor = data.splice(1, 2)] = ctx.port;
}

function onBroadcast(ctx, data) {
  console.log(`broadcast from ${getName(ctx)}: ${data[1]}`);
  for (let desc in connections) 
    if (connections[desc] != ctx.port)
      connections[desc].postMessage(["message", "broadcast", ctx.descriptor, data[1]]);
}

function getName(ctx) {
  return `${ctx.descriptor[0]} (${ctx.descriptor[1]})`;
}
