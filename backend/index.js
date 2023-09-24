const bookRoute = require("./routes/BookRoute.js");

const app = express();

app.use(bookRoute);

app.listen(5000, () => console.log('Server Up and Running...'));