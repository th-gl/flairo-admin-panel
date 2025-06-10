import Box from "@mui/material/Box";
import HeadingArea from "../HeadingArea.jsx";
import SearchArea from "../SearchArea.jsx";
import Card from "@mui/material/Card";
import { Paragraph } from "@/components/typography"; // CUSTOM PAGE SECTION COMPONENTS
import IconWrapper from "@/components/icon-wrapper";
import { FlexBetween, FlexBox } from "@/components/flexbox"; // CUSTOM ICON COMPONENTS
import ShoppingCart from "@/icons/ShoppingCart.jsx";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import DropZone from "@/components/dropzone";
import { useCallback } from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useRef } from "react";
import { useFormik } from "formik"; // CUSTOM COMPONENTS
import * as Yup from "yup";
import { createServices, getService, updateService } from "../request.js";
import convertToFormData from "@/utils/convertToFormData.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import duotone from "@/icons/duotone";

export default function ServiceCreate() {
  const TodoList = duotone.TodoList;

  const params = useParams();
  const id = params.id;
  // console.log({ id });
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const editorRef = useRef(null);
  const [files, setFiles] = useState(null);
  const { t } = useTranslation();
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };

  // Handle file drop and validation
  const handleDropFile = useCallback((acceptedFiles) => {
    // Allowed image file types (e.g., JPEG, PNG, GIF)
    const imageFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];

    // Filter out non-image files
    const validFiles = acceptedFiles.filter((file) =>
      imageFileTypes.includes(file.type)
    );

    if (validFiles.length === 0) {
      toast.error(`${t("Only image files (JPEG, PNG, GIF) are allowed!")}`);
      return;
    }

    // Map the valid files to generate the preview URL
    const mappedFiles = validFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // Set the first valid file to form and preview
    setFieldValue("image", mappedFiles[0]);
    setFiles(mappedFiles[0]?.preview);
    // console.log({ mappedFiles });
  }, []);

  // Handle file removal
  const handleRemoveFile = () => {
    setFiles(null);
    setFieldValue("image", "");
  };

  const initialValues = {
    name: "",
    description: "",
    estimated_time: 1,
    estimated_cost: 1,
    image: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(30, `${t("Name cannot exceed 30 characters")}`)
      .required(`${t("Name is required!")}`),
    description: Yup.string()
      .max(150, `${t("Description cannot exceed 150 characters")}`)
      .required(`${t("Description is required!")}`),
    estimated_time: Yup.number()
      .typeError(t("Estimated Time must be a number"))
      .integer(t("Estimated Time must be an integer"))
      .positive(t("Estimated Time must be greater than 0"))
      .max(999, t("Estimated Time cannot exceed 999")),
    estimated_cost: Yup.number()
      .max(999, `${t("Estimated Cost cannot exceed 999")}`)
      .positive(`${t("Estimated Cost must be a positive number")}`),
    image: isEdit
      ? Yup.mixed()
      : Yup.mixed().required(`${t("Image is required!")}`),
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    resetForm,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // console.log({ values });
      try {
        const formData = convertToFormData(values);

        let responseData;
        if (!isEdit) {
          responseData = await createServices(formData);
          // console.log({ responseData });
        } else {
          formData.append("_method", "put");
          responseData = await updateService(id, formData);
        }
        // console.log({ responseData });
        if (responseData.success) {
          toast.success(
            isEdit
              ? `${t("Service updated successfully")}`
              : `${t("Service created successfully")}`
          );
          resetForm();
          navigate("/services-list");
        } else {
          toast.error(t("Service with this name already exists"));
        }
      } catch (error) {
        toast.error(t("Image cannot be empty."));
        console.error(error);
        throw error;
      }
    },
  });

  const getServicesData = async (id) => {
    try {
      const response = await getService(id);
      // console.log(response.data);
      if (response.success) {
        setValues({
          name: response?.data?.name || "",
          description: response?.data?.description || "",
          estimated_time: response?.data?.estimated_time || "",
          estimated_cost: response?.data?.estimated_cost || "",
        });
        setFiles(response?.data?.image || null);
      }
    } catch (error) {
      // toast.error("The image field must be a file")
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      getServicesData(id);
    }
    setIsEdit(id ? true : false);
  }, []);

  return (
    <>
      <Box p={2}>
        <FlexBox alignItems="center">
          <IconWrapper>
            <TodoList
              sx={{
                color: "primary.main",
              }}
            />
          </IconWrapper>
          <Paragraph fontSize={16}>
            {isEdit ? t("Update Service") : t("Create New Service")}
          </Paragraph>
        </FlexBox>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container p={2} spacing={3}>
          <Grid size={{ md: 6, sm: 12, xs: 12 }}>
            <Card>
              <Box p={3} sx={{ mb: 4 }}>
                <Grid
                  size={{
                    sm: 12,
                    xs: 12,
                  }}
                >
                  <Paragraph fontSize={14} sx={{ pb: 2 }}>
                    {t("Service Name")}
                  </Paragraph>
                  <TextField
                    type="text"
                    fullWidth
                    name="name"
                    label={t("Service Name")}
                    value={values.name}
                    onChange={handleChange}
                    helperText={touched.name && errors.name}
                    error={Boolean(touched.name && errors.name)}
                  />
                </Grid>
              </Box>
            </Card>
            <Card sx={{ mt: 3 }}>
              <Box p={3} sx={{ mb: 4 }}>
                <Grid
                  size={{
                    sm: 12,
                    xs: 12,
                  }}
                >
                  <Paragraph fontSize={14} sx={{ pb: 2 }}>
                    {t("Description")}
                  </Paragraph>
                  <TextField
                    type="text"
                    fullWidth
                    name="description"
                    label={t("Description")}
                    value={values.description}
                    onChange={handleChange}
                    helperText={touched.description && errors.description}
                    error={Boolean(touched.description && errors.description)}
                  />
                </Grid>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Card style={{ minHeight: "165px" }}>
              <Box p={3} sx={{ mb: 4 }}>
                <Grid
                  size={{
                    sm: 12,
                    xs: 12,
                  }}
                >
                  <Paragraph fontSize={14} sx={{ pb: 2 }}>
                    {t("Estimated Cost")}
                  </Paragraph>
                  <TextField
                    type="number"
                    fullWidth
                    name="estimated_cost"
                    label={t("Estimated Cost")}
                    value={values.estimated_cost}
                    onChange={handleChange}
                    helperText={touched.estimated_cost && errors.estimated_cost}
                    error={Boolean(
                      touched.estimated_cost && errors.estimated_cost
                    )}
                  />
                </Grid>
              </Box>
            </Card>
            <Card sx={{ mt: 3 }}>
              <Box p={3} sx={{ mb: 4 }}>
                <Grid
                  size={{
                    sm: 12,
                    xs: 12,
                  }}
                >
                  <Paragraph fontSize={14} sx={{ pb: 2 }}>
                    {t("Estimated Time")}
                  </Paragraph>
                  <TextField
                    type="number"
                    fullWidth
                    name="estimated_time"
                    label={t("Estimated Time")}
                    value={values.estimated_time}
                    onChange={handleChange}
                    helperText={touched.estimated_time && errors.estimated_time}
                    error={Boolean(
                      touched.estimated_time && errors.estimated_time
                    )}
                  />
                </Grid>
              </Box>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card sx={{ py: 3, px: 3 }}>
              <DropZone
                file={files}
                onRemove={handleRemoveFile}
                onDrop={handleDropFile}
              />
              {touched.image && errors.image && (
                <Paragraph color="error.main" mt={2}>
                  {errors.image}
                </Paragraph>
              )}
            </Card>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Button type="submit" variant="contained" sx={{ mb: 5 }}>
            {isEdit ? t("Update Service") : t("Create Service")}
          </Button>
        </Grid>
      </form>
    </>
  );
}
