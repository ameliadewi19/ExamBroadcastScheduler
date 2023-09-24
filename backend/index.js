const express = require("express");
const bodyParser = require('body-parser');
const dosenRoute = require("./routes/DosenRoute.js");
const confirmationRoute = require('./routes/ConfirmationRoute.js');
require('./controllers/ReminderController.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(dosenRoute);
app.use(confirmationRoute);
<<<<<<< HEAD

=======
app.use(reminderRoute);
>>>>>>> 8d38b81816e5e5026085e33fb7256083ab70afbf

app.listen(5000, () => console.log('Server Up and Running...'));