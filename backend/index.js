const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const loginRoute = require("./routes/LoginRoute.js");
const dosenRoute = require("./routes/DosenRoute.js");
const jadwalRoute = require("./routes/JadwalRoute.js");
const confirmationRoute = require('./routes/ConfirmationRoute.js');
const reminderRoute = require('./routes/ReminderRoute.js');
const authenticationRoutes = require('./routes/AuthenticationWBMRoute');
const cors = require('cors');
require('./controllers/ReminderController.js');

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(loginRoute);
app.use(dosenRoute);
app.use(jadwalRoute);
app.use(confirmationRoute);
app.use(authenticationRoutes);
app.use(reminderRoute);

app.listen(5000, () => console.log('Server Up and Running...'));