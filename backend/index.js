const express = require("express");
const bodyParser = require('body-parser');
const loginRoute = require("./routes/LoginRoute.js");
const dosenRoute = require("./routes/DosenRoute.js");
const jadwalRoute = require("./routes/JadwalRoute.js");
const confirmationRoute = require('./routes/ConfirmationRoute.js');
const cors = require('cors');
// require('./controllers/ReminderController.js');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(loginRoute);
app.use(dosenRoute);
app.use(jadwalRoute);
app.use(confirmationRoute);

app.listen(5000, () => console.log('Server Up and Running...'));