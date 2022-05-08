import React from "react";

//modals
import FinishInitalSetupModal from "./finishInitalSetup.modal";
import DeleteAccountModal from "./deleteAccount.component";

const ModalControl = ({ control }) => {
  switch (control) {
    case "finishInitalSetup":
      return <FinishInitalSetupModal />;
    case "deleteAccount":
      return <DeleteAccountModal />;
    default:
      return null;
  }
};

export default ModalControl;
