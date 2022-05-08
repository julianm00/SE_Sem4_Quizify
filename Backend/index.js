const express     = require("express");
const cors        = require("cors");
const bodyParser  = require("body-parser");
const { spawn }   = require("child_process");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post("/python", (req, res) => {
  try {
    var output;
    const { code } = req.body;
    const python = spawn("python", ["run_script.py", code]);

    //on start
    // collect data from script
    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      output = data.toString();
    });

    //on close
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      // send data to browser
      if (output) {
        res.status(200).json({ msg: output }).send();
      } else {
        res.status(400).json({ msg: "Syntax Error" }).send();
      }
    });
  } catch (err) {
    res.status(400).json({ msg: err }).send();
  }
});

app.listen(port, () =>
  console.log(`Compile App on Port: ${port}!`)
);