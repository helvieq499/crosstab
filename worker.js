onconnect = function(e) {
  let port = e.ports[0];

  port.addEventListener('message', function(e) {
    port.postMessage(e.toString());
  });

  port.start();
}
