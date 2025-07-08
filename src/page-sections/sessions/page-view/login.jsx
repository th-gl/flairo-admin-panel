import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik"; // MUI
import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
// import Divider from "@mui/material/Divider";
// import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import ButtonBase from "@mui/material/ButtonBase";
import LoadingButton from "@mui/lab/LoadingButton";
import styled from "@mui/material/styles/styled"; // MUI ICON COMPONENT

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // CUSTOM DEFINED HOOK
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth"; // CUSTOM LAYOUT COMPONENT

import Layout from "../Layout"; // CUSTOM COMPONENTS

// import Link from "@/components/link";
import { H5, H6, Paragraph } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox"; // CUSTOM ICON COMPONENTS

// import Twitter from "@/icons/social/Twitter";
// import Facebook from "@/icons/social/Facebook";
// import GoogleIcon from "@/icons/GoogleIcon"; // STYLED COMPONENT
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  padding: 12,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
}));
export default function LoginPageView() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  });
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithEmail  } = useAuth();

 

  const initialValues = {
    email: "",
    password: "",
    remember: true,
  };
  const validationSchema = Yup.object().shape({
    // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, `${t("Password should be of minimum 6 characters length")}`)
      .required(`${t("Password is required")}`),
  });

  const loginWithEmailPassword = async (email, password) => {
    // const auth = getAuth();
    try {
      const userCredential = await signInWithEmail(
        // auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      return user;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // console.log("first");

      try {
        await loginWithEmailPassword(values.email, values.password);
        // await login(values.phone_number, values.password);
        // navigate("/");
      } catch (error) {
        // console.log(error);
        toast.error(t("Incorrect password or email."));
      }
    },
  });
  return (
    <Layout login>
      <Box maxWidth={550} p={4}>
        <H5
          fontSize={{
            sm: 30,
            xs: 25,
          }}
        >
          {t("Sign In")}
        </H5>

        {/* <Paragraph mt={1} mb={6} color="text.secondary">
          New user?{' '}
          <Box fontWeight={500} component={Link} href="/register">
            Create an Account
          </Box>
        </Paragraph> */}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={3}>
            <Grid size={12}>
            

              <TextField
                fullWidth
                placeholder={t("Enter your email")}
                name="email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email && errors.email)}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                placeholder={t("Password")}
                type={showPassword ? "text" : "password"}
                name="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                helperText={touched.password && errors.password}
                error={Boolean(touched.password && errors.password)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <ButtonBase
                        disableRipple
                        disableTouchRipple
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </ButtonBase>
                    ),
                  },
                }}
              />

              {/* <FlexBetween my={1}>
                <FlexBox alignItems="center" gap={1}>
                  <Checkbox sx={{
                  p: 0
                }} name="remember" value={values.remember} onChange={handleChange} checked={values.remember} />
                  <Paragraph fontWeight={500}>Remember me</Paragraph>
                </FlexBox>

                <Box fontSize={13} component={Link} fontWeight={500} color="error.500" href="/forget-password">
                  Forget Password?
                </Box>
              </FlexBetween> */}
            </Grid>

            <Grid size={12}>
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                variant="contained"
                fullWidth
              >
                {t("Sign In")}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>

        {/* <Divider
          sx={{
            my: 4,
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          OR
        </Divider>

        <FlexBox justifyContent="center" flexWrap="wrap" gap={2}>

        <Grid size={12}>
 
              
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/register")}
          sx={{
            backgroundColor: "primary.50",
          }}
        >
          {t("Register")}
        </Button>
            </Grid>
        
        </FlexBox> */}
      </Box>
    </Layout>
  );
}
