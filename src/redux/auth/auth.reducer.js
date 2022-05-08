import AuthActionTypes from "./auth.types";
const INITIAL_STATE = {
  loading: undefined,
  errorMessage: undefined,
  currentUser: undefined,
};

const authReducer = (currentstate = INITIAL_STATE, action) => {
  switch (action.type) {
    //standard cases
    case AuthActionTypes.AUTH_START:
      return {
        ...currentstate,
        loading: true,
      };
    case AuthActionTypes.AUTH_ERROR:
      return {
        ...currentstate,
        errorMessage: action.payload,
      };

    case AuthActionTypes.AUTH_SUCCESS:
      return {
        ...currentstate,
        loading: false,
      };

    //get User Data
    case AuthActionTypes.USER_SUCESS:
      return {
        ...currentstate,
        currentUser: action.payload,
      };

    //rest
    case AuthActionTypes.SIGN_OUT:
      return {
        ...INITIAL_STATE,
      };
    default: {
      return currentstate;
    }
  }
};

export default authReducer;
