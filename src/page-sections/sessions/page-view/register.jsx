import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // MUI

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField"; // CUSTOM DEFINED HOOK
import { useTranslation } from "react-i18next";
import useAuth from "@/hooks/useAuth"; // CUSTOM COMPONENTS

import Link from "@/components/link";
import { H5, H6, Paragraph } from "@/components/typography"; // CUSTOM SESSIONS LAYOUT
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Layout from "../Layout";
export default function RegisterPageView() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { createUserWithEmail } = useAuth();

  const registerWithEmailPassword = async (email, password) => {
    // const auth = getAuth();
    try {
      const userCredential = await createUserWithEmail(
        // auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered:", user);
      return user;
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  };

  // const {
  //   createUserWithEmail
  // } = useAuth();
  const initialValues = {
    email: "",
    password: "",
    remember: true,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"), // password: Yup.string()
    //   .min(6, "Password should be of minimum 6 characters length")
    //   .required("Password is required"),

   password: Yup.string()
    .required("Password  field is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
      "Password must include at least 1 letter, 1 number, and 1 special character"
    ),
  });
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          await registerWithEmailPassword(values.email, values.password);
          // await createUserWithEmail(values.email, values.password);
          // navigate('/');
        } catch (error) {
          // console.log(error.message);
        }
      },
    });
  return (
    <Layout>
      <Box maxWidth={550} p={4}>
        {/* <H5 fontSize={{
        sm: 30,
        xs: 25
      }}>{t("Sign up for 14 days free trial")}</H5> */}

        {/* <Paragraph mt={1} mb={6} color="text.secondary">
          {t("No risk, no obligations, no credit-card required.")}
        </Paragraph> */}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <H6 fontSize={16} mb={1}>
                {t("Register with your email")}
              </H6>

              <TextField
                fullWidth
                placeholder={t("Enter  email")}
                name="email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email && errors.email)}
              />
              <TextField sx={{mt:2}}
                fullWidth
                placeholder={t("Enter Password")}
                name="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                helperText={touched.password && errors.password}
                error={Boolean(touched.password && errors.password)}
              />
            </Grid>

            <Grid size={12}>
              <Button type="submit" variant="contained" fullWidth>
                {t("Sign up via Email")}
              </Button>

              {/* <Paragraph mt={1} color="text.secondary">
                {t("By signing up, you agree")}
                <Box fontWeight={500} component={Link} href="#">
                  {t("Terms of Service")}
                </Box>
                {t("& your consent to receiving email communications from Sales handy.")}
              </Paragraph> */}
            </Grid>
          </Grid>
        </form>

        <Divider
          sx={{
            my: 4,
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          {t("Already have an account?")}
        </Divider>

        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/login")}
          sx={{
            backgroundColor: "primary.50",
          }}
        >
          {t("Log In")}
        </Button>
      </Box>
    </Layout>
  );
}
