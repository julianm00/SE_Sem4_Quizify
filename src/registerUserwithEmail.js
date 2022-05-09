import { userpublic } from "./folderpaths";

export default async function registerUserWithEmail(user, data) {
  try {
    const { firstname, lastname } = data;
    await userpublic.doc(user.uid).set({
      firstname,
      lastname,
      uid: user.uid,
    });
  } catch (err) {
    console.log("error with registerUserWithEmail", err);
    return err;
  }
}
