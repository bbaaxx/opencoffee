const ApiBuilder = require("claudia-api-builder");
const api = new ApiBuilder();

const routePrefix = "opencoffee";
const envTst = process.env.PROGRESS;

api.get(`/${routePrefix}`, async (request) => {
  return { envTst, gota: "/GET" };
});

api.get(`/${routePrefix}/{itemId}`, async (request) => {
  return { envTst, gota: "/GET/:itemId", id: request.pathParams.itemId };
});

api.post(`/${routePrefix}`, async (request) => {
  return { envTst, gota: "/POST", echo: request.body };
});

module.exports = api;
