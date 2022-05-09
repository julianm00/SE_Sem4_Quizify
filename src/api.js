import express from "express";
import cors from "cors";
import { auth } from "./firebase";

//user functions
import registerUserWithEmail from "./registerUserwithEmail";
import runPython from "./runPython";
import runJavascript from "./runJavascript";
import checkAnswer from "./checkAnswer";

const app = express();

//rawdody
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);

// Middelware
app.use(cors({ origin: true }));
app.use(decodeJWT);

async function decodeJWT(req, res, next) {
  if (req.headers.authorization) {
    if (req.headers.authorization.startsWith("Bearer ")) {
      const idToken = req.headers.authorization.split("Bearer ")[1];

      try {
        if (idToken != "null") {
          const decodedToken = await auth.verifyIdToken(idToken);
          req["currentUser"] = decodedToken;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  next();
}

// validation of Users

function validateUser(req) {
  var user = req["currentUser"];

  if (!user) {
    throw new Error(
      "You must be logged in to make this request. i.e Authroization: Bearer <token>"
    );
  }
  return user;
}

// Catch async errors when awaiting promises
function runAsync(callback) {
  return (req, res, next) => {
    callback(req, res, next).catch(next);
  };
}

/* Setup */

app.get(
  "/setUp",
  runAsync(async (req, res) => {
    console.log("setupFacultyCourseYear");

    res.status(200).send({ status: "OK" });
  })
);

/* User */

app.post(
  "/user",
  runAsync(async (req, res) => {
    console.log("user");

    const user = validateUser(req);
    res.status(200).send({ status: "OK", uid: user.uid });
  })
);

app.post(
  "/registerUserWithEmail",
  runAsync(async (req, res) => {
    console.log("resiterUser");
    const user = validateUser(req);

    const errorMessage = await registerUserWithEmail(user, {
      ...req.body,
    });
    if (errorMessage) res.status(500).send({ status: "FAILED" });

    res.status(200).send({ status: "OK" });
  })
);

var testString = "";

app.post(
  "/runJavascript",
  runAsync(async (req, res) => {
    const user = validateUser(req);

    const functionres = await runJavascript(
      {
        ...req.body,
      },
      res
    );

    console.log(functionres);

    if (functionres.error) {
      res
        .status(500)
        .send({ status: "FAILED", errorMessage: functionres.errorMessage });
    }

    res.status(200).send({ status: "OK", msg: functionres.msg });
  })
);

app.post(
  "/runPython",
  runAsync(async (req, res) => {
    console.log("runPython", req.body);
    const user = validateUser(req);

    const functionres = await runPython(
      {
        ...req.body,
      },
      res
    );

    if (functionres.error) {
      res
        .status(500)
        .send({ status: "FAILED", errorMessage: functionres.errorMessage });
    }

    res.status(200).send({ status: "OK", msg: functionres.msg });
  })
);

app.post(
  "/checkAnswer",
  runAsync(async (req, res) => {
    console.log("checkAnswer");
    const user = validateUser(req);

    const errorMessage = await checkAnswer(user, {
      ...req.body,
    });
    if (errorMessage) res.status(500).send({ status: "FAILED" });

    res.status(200).send({ status: "OK" });
  })
);

export { app, testString };
