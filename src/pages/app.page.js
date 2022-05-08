import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

//components
import CustomeButton from "../component/customeButton/cutomeButton.component";
import FormikControl from "../component/formik/formikControl.component";

//redux
import { connect } from "react-redux";
import { toggelModalOpen } from "../redux/ui/ui.actions";

import {
  transformArrayDataToOptionsForFormik,
  fetchFromAPI,
} from "../util/helpers";

import { aufgaben } from "../util/aufgaben";

const AppPage = ({ toggelModalOpen }) => {
  const CodeSchema = Yup.object().shape({
    code: Yup.string().required(" "),
  });

  const navigation = useNavigate();

  // if (match) console.log(match.substring(4));
  const id = window.location.pathname.substring(5);

  const aufgabe = aufgaben.filter((a) => a.id == id)[0];

  const [response, setResponse] = useState("");

  const options = ["javascript", "python"];

  const isThereCode = (code) => code.length > 0;

  const goPrevPage = (id) => {
    const res = id - 1;
    if (res < 1) return;
    navigation(`/app/${res}`);
  };

  const goNextPage = (id) => {
    const res = id + 1;
    if (res > aufgaben.length) return;
    navigation(`/app/${res}`);
  };

  return (
    <div>
      <Formik
        initialValues={{
          code: "",
          programminglanguage: options[0],
        }}
        validationSchema={CodeSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          if (
            isThereCode(values.code) &&
            values.programminglanguage == "javascript"
          ) {
            const res = await fetchFromAPI("runJavascript", {
              body: {
                code: values.code,
              },
            });
          } else if (
            isThereCode(values.code) &&
            values.programminglanguage == "python"
          ) {
            const res = await fetchFromAPI("runPython", {
              body: {
                code: values.code,
              },
            });

            setResponse(res.msg);
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <div className="flex flex-col h-screen">
              <div>
                <div className="flex flex-col h-screen">
                  <div className=" grid md:grid-cols-7 grid-cols-1 h-2/3">
                    <div className="bg-gray-200 col-span-2 py-2 px-4">
                      <div className="flex justify-between items-center gap-8">
                        <FormikControl
                          control="select"
                          name="programminglanguage"
                          options={transformArrayDataToOptionsForFormik(
                            options
                          )}
                          label=" "
                        />

                        <CustomeButton
                          className="bt-blue mt-2"
                          type="submit"
                          disabled={!isValid || isSubmitting}
                          isSubmitting={isSubmitting}
                        >
                          Run
                        </CustomeButton>
                      </div>

                      <p className="text-lg font-semibold underline">
                        {aufgabe.header}
                      </p>
                      <p>{aufgabe.aufgabentext}</p>
                    </div>
                    <div className="col-span-5 border bg-gray-200">
                      <FormikControl
                        control="textarea"
                        type="text"
                        name="code"
                        placeholder="Code Here"
                        className="h-full"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-800 h-1/3 justify-end text-white border-t-4 border-primary-gray py-4 px-2">
                    <p>Output</p>
                    <p>{response}</p>
                  </div>
                </div>
              </div>

              <div className="bottom-0 left-0 fixed z-50  shadow-xl w-full ">
                <div className="flex justify-center bg-blue-700">
                  <div className="flex w-full  justify-between px-12 py-2 ">
                    <button
                      className="bg-blue-500 cursor-pointer text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => goPrevPage(aufgabe.id)}
                    >
                      Prev
                    </button>

                    <Link
                      to="/app/user"
                      className="bg-blue-500 cursor-pointer text-white font-bold py-2 px-4 rounded-full"
                    >
                      Profil
                    </Link>

                    <button
                      className="bg-blue-500 cursor-pointer text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => goNextPage(aufgabe.id)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapdispatchToProps = (dispatch) => ({
  toggelModalOpen: (data) => dispatch(toggelModalOpen(data)),
});

export default connect(null, mapdispatchToProps)(AppPage);
