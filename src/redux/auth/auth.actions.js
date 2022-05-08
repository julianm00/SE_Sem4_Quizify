import AuthActionTypes from "./auth.types";
import { toast } from "react-toastify";

//fireabse
import { auth, db, transformCollectionIntoMap } from "../../util/firebase";
import { fetchFromAPI } from "../../util/helpers";

const authStart = () => ({
  type: AuthActionTypes.AUTH_START,
});

const authError = (errorMessage) => ({
  type: AuthActionTypes.AUTH_ERROR,
  payload: errorMessage,
});

const authSucess = () => ({
  type: AuthActionTypes.AUTH_SUCCESS,
});

const userSucess = (data) => ({
  type: AuthActionTypes.USER_SUCESS,
  payload: data,
});

export const registerUserWithEmailAndPassword = (formValues) => {
  return async (dispatch) => {
    if (!formValues) return;

    const { firstname, lastname, email, password } = formValues;

    const user = await auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        toast.error(err.message);
        dispatch(authError(err));
      });

    if (user) {
      try {
        await fetchFromAPI("registerUserWithEmail", {
          body: { firstname, lastname },
        });
        toast.success("Profil erstellt");
      } catch (err) {
        toast.error("Fehler aufgetreeten, laden sie die Seite neu");
      }
    }
  };
};

export const loginInUserWithEmailAndPassword = (formValues) => {
  return async (dispatch) => {
    const { email, password } = formValues;

    const signInProvider = await auth.fetchSignInMethodsForEmail(email);

    if (signInProvider.length > 0 && signInProvider.includes("google.com")) {
      toast.error(`${email} ist ein Google Account`);
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        if (err.code == "auth/user-not-found") {
          toast.error(
            "Es gibt keinen vorhandenen Benutzerdatensatz, der der bereitgestellten Kennung entspricht."
          );
        } else {
          toast.error("" + err);
        }
        dispatch(authError(err.message));
      })
      .then((user) => {
        if (user) toast.success("Wilkommen zurück");
      });
  };
};

export const fetchUserDocStartAsync = () => {
  return async (dispatch) => {
    const userAuth = auth.currentUser;
    if (!userAuth) return;

    // var realProvidedData = JSON.parse(JSON.stringify(userAuth.providerData[0]));

    dispatch(authStart());
    const res = await fetchFromAPI("user", {}).catch((err) => {
      dispatch(authError("error Fetching user"));
    });
    if (res) {
      const { uid } = res;

      const userPublicRaf = db.collection("userpublic").doc(uid);

      userPublicRaf.onSnapshot((snapShot) => {
        dispatch(
          userSucess({
            ...snapShot.data(),
            email: userAuth.email,
          })
        );
      });

      dispatch(authSucess());
    } else {
      dispatch(authError("Error while fetching User"));
    }
  };
};

// const fetchTicketsSuccess = (data) => ({
//   type: AuthActionTypes.FETCH_TICKETS_SUCCESS,
//   payload: data,
// });

// export const fetchTickets = (limit) => {
//   return async (dispatch) => {
//     const userAuth = auth.currentUser;
//     if (!userAuth) return;
//     dispatch(authStart());

//     var ticketsRaf = db
//       .collection("userpublic")
//       .doc(userAuth.uid)
//       .collection("tickets")
//       .orderBy("createdat", "desc");

//     if (limit) ticketsRaf = ticketsRaf.limit(limit);

//     const docs = (await ticketsRaf.get()).docs;

//     const data = transformCollectionIntoMap(docs);

//     dispatch(fetchTicketsSuccess(data));
//     dispatch(authSucess());
//   };
// };

// const fetchTicketSucess = (data) => ({
//   type: AuthActionTypes.FETCH_TICKET_SUCESS,
//   payload: data,
// });

// export const fetchTicket = (ticektuuid) => {
//   return async (dispatch) => {
//     const userAuth = auth.currentUser;
//     if (!userAuth) return;
//     dispatch(authStart());

//     var ticketRaf = db
//       .collection("userpublic")
//       .doc(userAuth.uid)
//       .collection("tickets")
//       .doc(`${userAuth.uid}_${ticektuuid}`);

//     const data = (await ticketRaf.get()).data();

//     dispatch(fetchTicketSucess(data));
//     dispatch(authSucess());
//   };
// };

export const finishInitalSetup = (values) => {
  return async (dispatch) => {
    const userAuth = auth.currentUser;
    if (!userAuth) return;
    dispatch(authStart());

    const res = await fetchFromAPI("finishInitalSetup", {
      body: { values },
    }).catch((err) => {
      dispatch(authError("error with finishInitalSetup"));
    });

    if (res) {
      dispatch(authSucess());
    } else {
      toast.error("error with finishInitalSetup");
      dispatch(authError("error with finishInitalSetup"));
      window.location.reload();
    }
  };
};

// export const changePassword = (values) => {
//   return async (dispatch) => {
//     const userAuth = auth.currentUser;
//     if (!userAuth) return;
//     dispatch(authStart());

//     const res = await fetchFromAPI("changePassword", {
//       body: { ...values },
//     }).catch((err) => {
//       dispatch(authError("error with changePassword user"));
//     });

//     if (res) {
//       dispatch(authSucess());
//       dispatch(signOut());
//       await auth.signOut();
//       window.location.reload();
//     } else {
//       toast.error("error with changePassword user");
//       dispatch(authError("error with changePassword user"));
//     }
//   };
// };

export const deleteAccount = (values) => {
  return async (dispatch) => {
    const userAuth = auth.currentUser;
    if (!userAuth) return;
    dispatch(authStart());

    const res = await fetchFromAPI("deleteAccount", {
      body: { ...values },
    }).catch((err) => {
      dispatch(authError("error with deleteAccount user"));
    });

    if (res) {
      dispatch(authSucess());
      dispatch(signOut());
      await auth.signOut();
      toast.success("Account gelöscht");
      window.location.reload();
    } else {
      toast.error("error with deleteAccount user");
      dispatch(authError("error with deleteAccount user"));
    }
  };
};

export const signOut = () => ({
  type: AuthActionTypes.SIGN_OUT,
});
