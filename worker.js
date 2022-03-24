onconnect = e => {
  let port = e.ports[0];
  port.onmessage = e => port.postMessage(e.data);
};
