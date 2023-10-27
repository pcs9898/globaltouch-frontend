import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid Email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is Required").max(29).min(2),
  email: yup.string().required("Email is required").email("Invalid Email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// export const updateCountryCodeSchema = yup.object().shape({
//   country_code: yup.string().required("Country is required"),
// });
