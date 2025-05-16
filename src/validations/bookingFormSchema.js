import * as yup from "yup";

export const bookingFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be in the format: example@domain.com")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
      "Email must be in the format: example@domain.com"
    )
    .max(50, "Email is too long"),
});
