const express = require("express");
const dosenRoute = require("./routes/DosenRoute.js");
const reminderRoute = require("./routes/ReminderRoute.js");
const confirmationRoute = require('./routes/ConfirmationRoute.js');

const app = express();

app.use(dosenRoute);
app.use(confirmationRoute);

app.use(reminderRoute);

app.listen(5000, () => console.log('Server Up and Running...'));