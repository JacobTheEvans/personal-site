let Router = require("express").Router;

const apiRouter = Router();

//import endpoints
let portRouter = require("./port.js");
let articleRouter = require("./article.js");

apiRouter.use("/port", portRouter);
apiRouter.use("/article", articleRouter);

module.exports = apiRouter;
