import { auth } from "./firebase";
import { useEffect } from "react";

//docker url = the Docker URL is the same when the Settings are the same
//https://backend-7x6by2zn6q-ey.a.run.app

//testing url
//http://localhost:8004

/**
 * A helper function to fetch data from your API.
 * It sets the Firebase auth token on the request.
 */

export async function fetchFromAPI(endpointURL, opts) {
  try {
    const { method, body, API } = {
      method: "POST",
      body: null,
      //this url has to change in Production
      API: "http://localhost:3333",
      ...opts,
    };

    const user = auth.currentUser;

    const token = user && (await user.getIdToken());

    const res = await fetch(`${API}/${endpointURL}`, {
      method,
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) return res.json();
    console.log("Error with fetch");
  } catch (err) {
    console.log("Error with fetchFromAPI" + err);
  }
}

export const useScrollTop = () => {
  useEffect(() => {
    console.log();
    window.scrollTo(0, 0);
  }, []);
};

export const backgroundColor = [
  "#bf360c",
  "#f4511e",
  "#ef6c00",
  "#689f38",
  "#33691e",
  "#004d40",
  "#0097a",
  "#0288d1",
  "#01579h",
  "#455a64",
  "#78909c",
  "#7e57c2",
  "#512da8",
  "#7b1fa2",
  "#ab47bc",
  "#ec407a",
  "#c2185b",
  "#8d6e63",
  "#5d4037",
  "#a0c3ff",
  "#bfbfbf",
];

export const getuserCombination = (username) => {
  const userNameArray = username.split(" ");
  const userCombination =
    userNameArray[0].charAt(0).toUpperCase() +
    "" +
    userNameArray[1].charAt(0).toUpperCase();
  return userCombination;
};

export const transformArrayDataToOptionsForFormik = (data) => {
  const newArray = data.map((e) => {
    return { key: e, value: e };
  });
  return newArray;
};
