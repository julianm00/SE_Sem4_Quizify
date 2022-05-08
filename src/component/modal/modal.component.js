import React from "react";

/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

//redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectModalIsOpen,
  selectModalControl,
} from "../../redux/ui/ui.selector";
import { toggelModalClose } from "../../redux/ui/ui.actions";

import ModalControl from "./modalControl.component";

const Modal = ({ isOpen, control }) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={undefined}
        onClose={() => console.log("close")}
      >
        <div className="flex  items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
              <ModalControl control={control} />
              <button raf={cancelButtonRef}></button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const mapStateToProps = createStructuredSelector({
  isOpen: selectModalIsOpen,
  control: selectModalControl,
});

const mapdispatchToProps = (dispach) => ({
  toggelModalClose: () => dispach(toggelModalClose()),
});

export default connect(mapStateToProps, mapdispatchToProps)(Modal);
