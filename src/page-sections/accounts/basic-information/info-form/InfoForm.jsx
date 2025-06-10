import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import * as Yup from "yup";
import { useFormik } from "formik"; // CUSTOM COMPONENTS
import { useTranslation } from "react-i18next";
import { H6 } from "@/components/typography";
import { useEffect } from "react";
import { getProfile, updateProfile } from "../request";
import { toast } from "react-toastify";

export default function InfoForm({ data, fetchData }) {
  useEffect(()=>{
    document.title="Basic information"
  })
   const { t } = useTranslation();
  const initialValues = {
    user_id: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone_number: "",
  };
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(3, `${t("Must be greater than 3 characters")}`)
      .required(`${t("First Name is Required!")}`)
      .test('no-whitespace', `${t("First name cannot contain only spaces")}`, value => value.trim().length > 0),
    
    middle_name: Yup.string()
      .required(`${t("Middle name is Required!")}`)
      .test('no-whitespace', `${t("Middle name cannot contain only spaces")}`, value => value.trim().length > 0),
  
    email: Yup.string()
      .email(`${t("Invalid email format")}`)
      .required(`${t("Email is Required!")}`)
      .test('no-whitespace', `${t("Email cannot contain only spaces")}`, value => value.trim().length > 0),
  
    last_name: Yup.string()
      .required(`${t("Last Name is Required!")}`)
      .test('no-whitespace', `${t("Last name cannot contain only spaces")}`, value => value.trim().length > 0),
  
    phone_number: Yup.string()
      .min(9, `${t("Phone number must be at least 9 characters")}`)
      .required(`${t("Phone Number is required!")}`)
      .test('no-whitespace', `${t("Phone number cannot contain only spaces")}`, value => value.trim().length > 0),
  });
  
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    setValues,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateProfile(values);
        // console.log({ response });
        if (response.success) {
          fetchData();
          toast.success(`${t("Profile Updated Successfully")}`);
          window.location.reload();
        // resetForm();
        }
      } catch (error) {
        toast.error(`${t("Error Updating Profile")}`);
        console.error(error);
        throw error;
      }
    },
  });

  // const fetchData = async () => {
  //   try {
  //     const response = await getProfile();
  //     console.log({ response });
  //     if (response.success) {
  //       setValues({
  //         user_id: response?.data?.id || "",
  //         first_name: response?.data?.first_name || "",
  //         last_name: response?.data?.last_name || "",
  //         phone_number: response?.data?.phone_number || "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  const initData = () => {
    setValues({
      user_id: data?.id || "",
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      middle_name: data?.middle_name || "",
      email: data?.email || "",
      phone_number: data?.phone_number || "",
    });
  };
  useEffect(() => {
    // fetchData();
    initData();
  }, [data]);

  return (
    <Card
      sx={{
        mt: 3,
      }}
    >
      <H6 fontSize={14} px={3} py={2}>
       {t("Basic Information")}
      </H6>

      <Divider />

      <form onSubmit={handleSubmit}>
        <Box margin={3}>
          <Grid container spacing={3}>
            <Grid
              size={{
                sm: 6,
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                name="first_name"
                label={t("First Name")}
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                helperText={touched.first_name && errors.first_name}
                error={Boolean(touched.first_name && errors.first_name)}
              />
            </Grid>
            <Grid
              size={{
                sm: 6,
                xs: 12,
              }}
            >
              <TextField
                type="text"
                fullWidth
                name="middle_name"
                label={t("Middle Name")}
                value={values.middle_name}
                onChange={handleChange}
                helperText={touched.middle_name && errors.middle_name}
                error={Boolean(touched.middle_name && errors.middle_name)}
              />
            </Grid>
            <Grid
              size={{
                sm: 6,
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                name="last_name"
                label={t("Last Name")}
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                helperText={touched.last_name && errors.last_name}
                error={Boolean(touched.last_name && errors.last_name)}
              />
            </Grid>
            <Grid
              size={{
                sm: 6,
                xs: 12,
              }}
            >
              <TextField
                type="email"
                fullWidth
                name="email"
                label={t("Email")}
                value={values.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email && errors.email)}
              />
            </Grid>

            <Grid
              size={{
                sm: 6,
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                name="phone_number"
                label={t("Phone Number")}
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone_number}
                helperText={touched.phone_number && errors.phone_number}
                error={Boolean(touched.phone_number && errors.phone_number)}
              />
            </Grid>

            <Grid size={12}>
              <Button type="submit" variant="contained">
                {t("Save Changes")}
              </Button>

              {/* <Button
                variant="outlined"
                sx={{
                  ml: 2,
                }}
                onClick={() => resetForm()} // Reset the form when Cancel is clicked
              >
                {t("Cancel")}
              </Button> */}
            </Grid>
          </Grid>
        </Box>
      </form>
    </Card>
  );
}
