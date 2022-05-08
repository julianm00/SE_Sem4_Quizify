import UI_TYPES from "./ui.types";

const INITIAL_STATE = {
  menu_open: false,
  modal_open: false,
  modal_control: undefined,
  modal_data: undefined,
};

const uiReducer = (currentstate = INITIAL_STATE, action) => {
  switch (action.type) {
    case UI_TYPES.TOGGEL_MENU:
      return {
        ...currentstate,
        menu_open: !currentstate.menu_open,
      };

    case UI_TYPES.TOGGLE_MODAL_OPEN:
      return {
        ...currentstate,
        modal_open: true,
        modal_control: action.payload.control,
        modal_data: action.payload.data,
      };

    case UI_TYPES.TOGGLE_MODAL_CLOSE:
      return {
        ...currentstate,
        modal_open: false,
      };

    default:
      return {
        ...currentstate,
      };
  }
};

export default uiReducer;
