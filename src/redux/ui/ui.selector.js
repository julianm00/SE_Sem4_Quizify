import { createSelector } from "reselect";

const selectUi = (state) => state.ui;

export const selectMenuOpen = createSelector([selectUi], (ui) => ui.menu_open);

export const selectModalIsOpen = createSelector(
  [selectUi],
  (ui) => ui.modal_open
);

export const selectModalControl = createSelector(
  [selectUi],
  (ui) => ui.modal_control
);

export const selectModalData = createSelector(
  [selectUi],
  (ui) => ui.modal_data
);
