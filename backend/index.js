const express = require("express");
const dosenRoute = require("./routes/DosenRoute.js");
const reminderRoute = require("./routes/ReminderRoute.js");

const app = express();

app.use(dosenRoute);

app.use(reminderRoute);

app.listen(5000, () => console.log('Server Up and Running...'));