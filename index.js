const app = require("./app");
const PORT = process.env.RUNNING_PORT;

app.listen(PORT, function () {
  console.log("Server is running at => "+PORT);
});
