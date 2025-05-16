import { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";

import { bookingFormSchema } from "../../validations/bookingFormSchema";
import css from "./BookingForm.module.css";

const BookingForm = () => {
  const dateInputRef = useRef(null);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Formik
        initialValues={{
          name: "",
          email: "",
          date: null,
          comment: "",
        }}
        validationSchema={bookingFormSchema}
        onSubmit={(values, { resetForm }) => {
          toast.success("Your message has been delivered successfully.");
          resetForm();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            {/* Name */}
            <label>
              <Field
                name="name"
                type="text"
                className={css.field}
                placeholder="Name*"
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </label>

            {/* Email */}
            <label>
              <Field
                name="email"
                type="email"
                className={css.field}
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </label>

            {/* Date */}
            <label>
              <DatePicker
                selected={values.date}
                onChange={(date) => {
                  setFieldValue("date", date);
                }}
                onSelect={() => {
                  setTimeout(() => {
                    if (dateInputRef.current) {
                      dateInputRef.current.setOpen(false);
                    }
                  }, 0);
                }}
                shouldCloseOnSelect={true}
                minDate={new Date()}
                placeholderText="Booking date"
                className={css.field}
                dateFormat="dd.MM.yyyy"
                popperPlacement="bottom-start"
                ref={dateInputRef}
              />
              <ErrorMessage name="date" component="div" className={css.error} />
            </label>

            {/* Comment */}
            <label>
              <Field
                name="comment"
                as="textarea"
                className={`${css.field} ${css.commentField}`}
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={css.error}
              />
            </label>

            <button className={css.submitbtn} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BookingForm;
