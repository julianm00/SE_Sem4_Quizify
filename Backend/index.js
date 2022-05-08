const express     = require("express");
const cors        = require("cors");
const bodyParser  = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () =>
  console.log(`Compile App on Port: ${port}!`)
);
