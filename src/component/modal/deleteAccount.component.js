import React, { useState } from "react";

//components
import CustomeButton from "../customeButton/cutomeButton.component";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

//redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectModalData } from "../../redux/ui/ui.selector";
import { deleteAccount } from "../../redux/auth/auth.actions";
import { toggelModalClose } from "../../redux/ui/ui.actions";
const DeleteAccountModal = ({ toggelModalClose, deleteAccount }) => {
  const [loading, setLoading] = useState(false);
  const doDeleteAccount = async () => {
    setLoading(true);
    await deleteAccount();
    setLoading(false);
    toggelModalClose();
  };

  return (
    <div>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-50 sm:mx-0 sm:h-10 sm:w-10">
            <XIcon className="h-6 w-6 text-primary-red" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-2xl  font-medium text-gray-900"
            >
              Delete Account
            </Dialog.Title>
            <div className="mt-2 ">
              <div className=" py-3  flex flex-col-reverse md:flex-row justify-between">
                <button
                  onClick={() => toggelModalClose()}
                  className="bt-white w-full md:w-auto mt-6 md:mt-0"
                  type="button"
                >
                  Cancel
                </button>
                <CustomeButton
                  className={`bt-blue w-full md:w-auto  ${
                    loading ? "opacity-70" : "opacity-100"
                  }`}
                  disabled={loading}
                  onClick={() => doDeleteAccount()}
                >
                  Delete
                </CustomeButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  modalData: selectModalData,
});

const mapdispatchToProps = (dispatch) => ({
  deleteAccount: () => dispatch(deleteAccount()),
  toggelModalClose: () => dispatch(toggelModalClose()),
});

export default connect(mapStateToProps, mapdispatchToProps)(DeleteAccountModal);
