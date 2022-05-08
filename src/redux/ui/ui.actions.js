import UITYPES from "./ui.types";

export const toggelSideNavExpand = () => ({
  type: UITYPES.TOGGLE_SIDENAV,
});

//values
//control, text
export const toggelModalOpen = (data) => ({
  type: UITYPES.TOGGLE_MODAL_OPEN,
  payload: data,
});

export const toggelModalClose = () => ({
  type: UITYPES.TOGGLE_MODAL_CLOSE,
});
