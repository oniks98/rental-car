import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import css from "./BookingForm.module.css";

const BookingForm = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
      />
      <Formik
        initialValues={{
          name: "",
          email: "",
          date: null,
          comment: "",
        }}
        onSubmit={(values, { resetForm }) => {
          toast.success("Your message has been delivered successfully.");
          resetForm();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            <label>
              <Field
                name="name"
                type="text"
                className={css.field}
                placeholder="Name*"
              />
            </label>
            <label>
              <Field
                name="email"
                type="email"
                className={css.field}
                placeholder="Email*"
              />
            </label>
            <label>
              <DatePicker
                selected={values.date}
                onChange={(date) => setFieldValue("date", date)}
                shouldCloseOnSelect={true}
                placeholderText="Booking date"
                className={css.field}
                popperPlacement="bottom-start"
                dateFormat="dd.MM.yyyy"
              />
            </label>
            <label>
              <Field
                name="comment"
                as="textarea"
                className={`${css.field} ${css.commentField}`}
                placeholder="Comment"
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
