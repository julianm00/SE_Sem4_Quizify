import { userpublic } from "./folderpaths";
import { answers } from "./answers";

export default async function checkAnswer(user, data) {
  try {
    console.log(user);
    const { id, answer } = data;
    if (!answer) throw "No answer given";
    var status;

    if (answer == answers[id].output) {
      console.log("Question is right");
      //safe to db
      await userpublic
        .doc(user.uid)
        .collection("questions")
        .doc(id + "")
        .set({
          id,
          answer,
          status: 1,
          createdat: new Date(),
        });
    } else {
      status = 0;
      await userpublic
        .doc(user.uid)
        .collection("questions")
        .doc(id + "")
        .set({
          id,
          answer,
          status: 0,
          createdat: new Date(),
        });
      throw "Not the right answer";
    }
  } catch (err) {
    console.log("error with checkAnswer", err);
    return err;
  }
}
