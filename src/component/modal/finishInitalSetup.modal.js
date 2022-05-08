import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";

//components
import FormikControl from "../formik/formikControl.component";
import SignOut from "../signOut/signOut.component";
import { Dialog } from "@headlessui/react";
import { ClipboardCheckIcon } from "@heroicons/react/outline";

//redux
import { connect } from "react-redux";
import { finishInitalSetup } from "../../redux/auth/auth.actions";
import { toggelModalClose } from "../../redux/ui/ui.actions";

//helper
import { transformArrayDataToOptionsForFormik } from "../../util/helpers";
import CustomeButton from "../customeButton/cutomeButton.component";

const FinishInitalSetupModal = ({ toggelModalClose, finishInitalSetup }) => {
  const Schema = Yup.object().shape({
    birthday: Yup.string()
      .required(" ")
      .test("wholeNumbers", "Zahl muss gerade sein", (number) => {
        return number % 1 === 0;
      })
      .test("Länge", "kleiner als 32", (value) => {
        return value < 32;
      })
      .test("Größer", "> 0", (value) => {
        return value > 0;
      }),
    brithyear: Yup.string()
      .required(" ")
      .test("wholeNumbers", "Zahl muss gerade sein", (number) => {
        return number % 1 === 0;
      })
      .test("Länge", "< 2022 ", (value) => {
        return value < 2022;
      })
      .test("Länge", "> 2009", (value) => {
        return value > 2009;
      }),
  });

  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const year = ["test"];

  const course = ["test"];

  const faculty = ["test"];

  const gender = ["Frau", "Man", "Divers"];

  return (
    <div>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-50 sm:mx-0 sm:h-10 sm:w-10">
            <ClipboardCheckIcon
              className="h-6 w-6 text-primary-green"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-2xl  font-medium text-gray-900"
            >
              Bitte beantworte kurz diese Fragen zu deinem Profil
            </Dialog.Title>
            <div className="mt-2 ">
              <Formik
                initialValues={{
                  birthday: "",
                  birthmonth: months[0],
                  brithyear: "",
                  faculty: faculty[0],
                  year: year[0],
                  course: course[0],
                }}
                validationSchema={Schema}
                // onSubmit={async (values, { setSubmitting }) => {
                //   setSubmitting(true);
                //   console.log("test");

                //   // await finishInitalSetup(values);
                //   toggelModalClose();
                //   setSubmitting(false);
                // }}

                onSubmit={async (values, { setSubmitting }) => {
                  console.log("test");
                }}
              >
                {({ isSubmitting, isValid }) => (
                  <Form>
                    <FormikControl
                      control="select"
                      name="type"
                      options={transformArrayDataToOptionsForFormik(gender)}
                      label="gender"
                      placeholder="type"
                      // onChange={(val) => submitForm()}
                    />

                    <div className=" flex gap-4 justify-between">
                      <FormikControl
                        control="input"
                        min="1"
                        type="number"
                        step="1"
                        name="birthday"
                        label="Tag"
                        placeholder="20"
                      />

                      <FormikControl
                        control="select"
                        name="type"
                        options={transformArrayDataToOptionsForFormik(months)}
                        label="Monat"
                        placeholder="type"
                      />

                      <FormikControl
                        control="input"
                        min="1"
                        type="number"
                        step="1"
                        name="brithyear"
                        label="Jahr"
                        placeholder="2001"
                      />
                    </div>

                    <div className="flex gap-4 justify-between">
                      <FormikControl
                        control="select"
                        name="type"
                        options={transformArrayDataToOptionsForFormik(faculty)}
                        label="faculty"
                        placeholder="type"
                        // onChange={(val) => submitForm()}
                      />
                      <FormikControl
                        control="select"
                        name="type"
                        options={transformArrayDataToOptionsForFormik(year)}
                        label="year"
                        placeholder="type"
                        // onChange={(val) => submitForm()}
                      />
                      <FormikControl
                        control="select"
                        name="type"
                        options={transformArrayDataToOptionsForFormik(course)}
                        label="course"
                        placeholder="type"
                        // onChange={(val) => submitForm()}
                      />
                    </div>

                    <div className=" py-3  sm:flex sm:flex-row-reverse sm:justify-between">
                      <CustomeButton
                        className="bt-blue w-full sm:w-auto"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        isSubmitting={isSubmitting}
                      >
                        Finish
                      </CustomeButton>
                      <SignOut>
                        <CustomeButton
                          className="mt-8 sm:mt-0 bt-white w-full sm:w-auto"
                          disabled={!isValid || isSubmitting}
                          isSubmitting={false}
                        >
                          SignOut
                        </CustomeButton>
                      </SignOut>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapdispatchToProps = (dispatch) => ({
  finishInitalSetup: (values) => dispatch(finishInitalSetup(values)),
  toggelModalClose: () => dispatch(toggelModalClose()),
});

export default connect(null, mapdispatchToProps)(FinishInitalSetupModal);
