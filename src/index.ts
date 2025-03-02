import express from "express";

const app = express();

const port = process.env.PORT || 8989;

app.get("/", (request, response) => {
  response.send("<h1>This is our App</h1>");
});

app.get("/login", (request, response) => {
  response.send("<strong>This is our login page</strong>");
});

app.listen(port, () => {
  console.log(`The Application is running on port http://localhost:${port}`);
});
