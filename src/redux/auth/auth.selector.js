import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

//auth
export const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.loading
);

//user
export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.currentUser
);
