const express = require("express");
const bodyParser = require('body-parser');
const loginRoute = require("./routes/LoginRoute.js");
const dosenRoute = require("./routes/DosenRoute.js");
const reminderRoute = require("./routes/ReminderRoute.js");
const confirmationRoute = require('./routes/ConfirmationRoute.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(loginRoute);
app.use(dosenRoute);
app.use(confirmationRoute);
app.use(reminderRoute);

app.listen(5000, () => console.log('Server Up and Running...'));