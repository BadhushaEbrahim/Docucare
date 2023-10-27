import * as yup from 'yup';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

const nameRules = /^[A-Za-z]+$/;

const experienceRules = /^\d+-\d+$/;

export const loginSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string()
    .required('Password is required'),
});


export const userSignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      passwordRules,
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  number: yup
    .string()
    .matches(/^\d{10}$/, "Number must be 10 digits")
    .required("Contact is required"),
  userName: yup
    .string()
    .required("Name is required")
    .matches(nameRules, "Name can only contain alphabets"),
  date: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
});

export const doctorSignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      passwordRules,
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  number: yup
    .string()
    .matches(/^\d{10}$/, "Number must be 10 digits")
    .required("Contact is required"),
  fullName: yup
    .string()
    .required("Name is required")
    .matches(nameRules, "Name can only contain alphabets"),
  dob: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  MedicalregisterNo: yup
    .number()
    .required("MedicalregisterNo is required"),
  experience: yup.string().required("Experience is required"),
  specialization: yup.string().required("Specialization is required"),
});

export const userDetailsUpdateSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  number: yup
    .string()
    .matches(/^[0-9]{10}$/, { message: "Number must be 10 characters" })
    .required("Contact is required"),
  userName: yup.string().required("Name is required"),
});

export const doctorDetailsUpdateSchema = yup.object().shape({
    number: yup
    .string()
    .matches(/^[0-9]{10}$/, { message: "Number must be 10 characters" })
    .required("Contact is required"),
  experience: yup
    .string()
    .required("Experience is required")
    .matches(experienceRules, "Enter a valid experience"),
  fullName: yup.string().required("Name is required"),
});

export const changePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(5)
    .matches(passwordRules, { message:"Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"})
    .required("Required"),
    confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

export const PasswordEmailSchema=yup.object().shape({
  email:yup
  .string()
  .required("Email is required")
  .email("Please enter a valid email")
})
export const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(5)
    .matches(passwordRules, { message:"Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"})
    .required("Required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});