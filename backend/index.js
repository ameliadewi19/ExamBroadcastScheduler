const express = require("express");
const dosenRoute = require("./routes/DosenRoute.js");
const confirmationRoute = require('./routes/ConfirmationRoute.js');
require('./controllers/ReminderController.js');

const app = express();

app.use(dosenRoute);
app.use(confirmationRoute);


app.listen(5000, () => console.log('Server Up and Running...'));