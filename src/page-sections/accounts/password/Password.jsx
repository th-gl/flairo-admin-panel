import React, { useState } from "react";
import {
  Card,
  Grid,
  Stack,
  Button,
  Divider,
  TextField,
  ButtonBase,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { changePassword } from "./request";
import { H6 } from "@/components/typography";

export default function Password() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    current_password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Current Password is required"),
    new_password: Yup.string()
      .min(8, "New Password must be at least 8 characters")
      .required("New Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        
        const response = await changePassword(values);
        if (response.success) {
          toast.success("Password updated successfully");
          resetForm();
        } else {
          toast.error(response.message || "Password update failed");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred during password update");
      }
    },
  });

  return (
    <Card>
      <H6 fontSize={14} p={3}>
        Change Your Password
      </H6>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4} p={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="current_password"
                type={showCurrentPassword ? "text" : "password"}
                label="Current Password"
                value={formik.values.current_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.current_password && formik.errors.current_password
                )}
                helperText={
                  formik.touched.current_password && formik.errors.current_password
                }
                InputProps={{
                  endAdornment: (
                    <ButtonBase onClick={() => setShowCurrentPassword((prev) => !prev)}>
                      {showCurrentPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </ButtonBase>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="new_password"
                type={showNewPassword ? "text" : "password"}
                label="New Password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.new_password && formik.errors.new_password
                )}
                helperText={
                  formik.touched.new_password && formik.errors.new_password
                }
                InputProps={{
                  endAdornment: (
                    <ButtonBase onClick={() => setShowNewPassword((prev) => !prev)}>
                      {showNewPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </ButtonBase>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="confirm_password"
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.confirm_password && formik.errors.confirm_password
                )}
                helperText={
                  formik.touched.confirm_password && formik.errors.confirm_password
                }
                InputProps={{
                  endAdornment: (
                    <ButtonBase onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </ButtonBase>
                  ),
                }}
              />
            </Stack>
            <Stack direction="row" spacing={2} mt={4}>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
              <Button variant="outlined" onClick={formik.handleReset}>
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}