const express = require("express");
const dosenRoute = require("./routes/DosenRoute.js");

const app = express();

app.use(dosenRoute);

app.listen(5000, () => console.log('Server Up and Running...'));