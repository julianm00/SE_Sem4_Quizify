export default async function runJavascript(data, resObject) {
  try {
    var res = {
      msg: "",
      error: false,
      errorMessage: "",
    };

    const { code } = data;

    var output;

    var javascript = require("child_process").spawn("node", [
      "./src/script.js",
      code,
    ]);

    // javascript.stdout.on("data", function (data) {
    //   console.log("Pipe data from javascript script ...");
    //   output = data.toString();
    //   console.log(output);
    //   res.msg = output;
    // });
    // resolve();

    javascript.stdout.on("data", function (data) {
      console.log("Pipe data from javascript script ...");
      output = data.toString();
      res.msg = output;
      resObject.status(200).send({ status: "OK", msg: output });
    });

    javascript.on("close", (code) => {
      // send data to browser
      console.log("close");

      if (!output) {
        resObject
          .status(500)
          .send({ status: "FAILED", errorMessage: "No Output" });
      }
    });

    await new Promise((resolve, reject) => {
      javascript.stderr.on("data", function (data) {
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

    console.log("send back");

    return res;
  } catch (err) {
    console.log("error with runJavascript", err);
    res.error = true;
    res.errorMessage = err;
    return res;
  }
}

// testString = "console.log('test')";

// child.stdout.on("data", function (data) {
//   console.log(data.toString());
// });
