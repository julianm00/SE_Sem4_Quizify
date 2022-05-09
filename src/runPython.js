import { spawn } from "child_process";

export default async function runPython(data, resObject) {
  var res = {
    msg: "",
    error: false,
    errorMessage: "",
  };
  try {
    const { code } = data;

    var output;

    const python = spawn("python", ["./src/script.py", code]);

    //on start
    // collect data from script

    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      output = data.toString();
      res.msg = output;
      resObject.status(200).send({ status: "OK", msg: output });
    });

    python.on("close", (code) => {
      if (!output) {
        resObject
          .status(500)
          .send({ status: "FAILED", errorMessage: "No Output" });
      }
    });

    await new Promise((resolve, reject) => {
      python.stderr.on("data", function (data) {
        output = data.toString();
        res.error = true;
        if (output) {
          res.errorMessage = "Error" + output;
        } else {
          res.errorMessage = "Syntax Error";
        }
        resolve();
      });
    });

    return res;
  } catch (err) {
    console.log("error with runPython", err);
    res.error = true;
    res.errorMessage = err;
    return res;
  }
}
