var host = process.env.HOST || "0.0.0.0";
var port = process.env.PORT || 8080;

var cron = require("node-cron");
var cors_proxy = require("cors-anywhere");
var server;

function startServer() {
  server = cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
  });
  server.listen(port, host, function () {
    console.log("Server is running on " + host + ":" + port);
  });
}

startServer();

cron.schedule("*/13 * * * *", function () {
  if (server) {
    server.close(function () {
      startServer();
    });
  } else {
    startServer();
  }

  startServer();
});
