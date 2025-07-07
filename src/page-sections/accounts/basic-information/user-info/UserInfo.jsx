import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress"; // MUI ICON COMPONENTS

import CameraAlt from "@mui/icons-material/CameraAlt";
import MoreHoriz from "@mui/icons-material/MoreHoriz"; // CUSTOM ICON COMPONENTS
import { styled } from "@mui/system";
import DateRange from "@/icons/DateRange";
import Bratislava from "@/icons/Bratislava";
import Call from "@/icons/Call";
import MapMarkerIcon from "@/icons/MapMarkerIcon"; // CUSTOM COMPONENTS

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InfoItem from "./InfoItem";
import AvatarBadge from "@/components/avatar-badge";
import AvatarLoading from "@/components/avatar-loading";
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { H6, Paragraph, Small } from "@/components/typography"; // STYLED COMPONENTS
import { format } from "date-fns";

import { ProgressWrapper, ContentWrapper } from "../styles";
import { getProfile, uploadImage } from "../request";

import { utils } from "../../../../utils/functionUtils";
import convertToFormData from "../../../../utils/convertToFormData";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { BorderAllRounded } from "@mui/icons-material";
export default function UserInfo({ data, fetchData }) {
  // const [data, setData] = useState({});
  const { t } = useTranslation();
  const formatISOtDateTime = (dateString) => {
    // console.log({ dateString });

    // 2024-12-31T07:10:57Z
    // const date = new Date(dateString);
    const date = new Date("2024-12-31T07:10:57Z");
    // console.log({ date });
    return format(date, "dd MMM yyyy, h:mm a");
  };

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: { avatar: null },
  });

  const uploadImageFn = async (file) => {
    try {
      const formData = convertToFormData({ profile_image: file });
      await uploadImage(formData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("second");
      setFieldValue("avatar", file);

      try {
        await uploadImageFn(file);
        window.location.reload();
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const imagePreview = values?.avatar
    ? URL.createObjectURL(values?.avatar)
    : data?.avatar
      ? data?.avatar
      : "/static/user/user-11.png";

  // const fetchData = async () => {
  //   try {
  //     const response = await getProfile();
  //     console.log({ response });
  //     setData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    // fetchData();

    return () => {
      if (values.avatar) {
        URL.revokeObjectURL(values.avatar);
      }
    };
  }, [values.avatar, data]);

  // const EmailIcon = () => {
  //   return (
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  //       <path d="M12 13l8-5V5l-8 5-8-5v3l8 5zm0 2l-8 5v3l8-5 8 5v-3l-8-5z" />
  //     </svg>
  //   );
  // };

  return (
    <ContentWrapper>
      <form>
        <FlexBox justifyContent="center">
          <AvatarBadge
            badgeContent={
              <label htmlFor="icon-button-file">
                <input
                  type="file"
                  accept="image/*"
                  id="icon-button-file"
                  onChange={handleImageChange}
                  style={{
                    display: "none",
                  }}
                />

                <IconButton aria-label="upload picture" component="span">
                  <CameraAlt
                    sx={{
                      fontSize: 16,
                      color: "grey.400",
                    }}
                  />
                </IconButton>
              </label>
            }
          >
            <AvatarLoading
              borderSize={2}
              percentage={60}
              alt="Team Member"
              src={imagePreview || data?.avatar}
              style={{ borderRadius: "50%" }}
              sx={{
                borderRadius: "50%",
                height: 100,
                width: 100,
                objectFit: "cover",
                padding: 0,
              }}
            />
          </AvatarBadge>
        </FlexBox>
      </form>

      <Box mt={2}>
        <H6 fontSize={18} textAlign="center">
          {/* // data?.first_name ? */}
          {/* {data?.first_name ? data?.first_name : " "} &nbsp;
          {data?.middle_name ? data?.middle_name : ""} &nbsp;
          {data?.last_name ? data?.last_name : ""} */}
          {/* // : t("username") */}
          {data?.first_name && <>{data.first_name} </>}
          {data?.middle_name && <>{data.middle_name} </>}
          {data?.last_name && <>{data.last_name}</>}
        </H6>

        <FlexBetween maxWidth={700} flexWrap="wrap" margin="auto" mt={1}>
          <InfoItem Icon={Call} title={data?.phone_number} />

          <FlexBox
            alignItems="center"
            justifyContent="center"
            gap={1}
            color="grey.500"
          >
            {data?.email ? (
              <InfoItem Icon={MailOutlineIcon} title={data?.email} />
            ) : null}
          </FlexBox>
          {/* <InfoItem Icon={DateRange} title={formatISOtDateTime()} /> */}
        </FlexBetween>

        {/* <FlexBox
          alignItems="center"
          justifyContent="center"
          gap={2}
          color="grey.500"
          mt={2}
        >
          <Paragraph>{t("Driver Mode")}</Paragraph>
          <Button disabled={data?.driver_mode === 0 ? false : true}>
            {data?.driver_mode === 0 ? `${t("Active")}` : `${t("In active")}`}
          </Button>
        </FlexBox> */}

        {/* <FlexBetween marginTop={6} flexWrap="wrap">
          <ProgressWrapper>
            <Paragraph mb={0.5}>Profile Completion</Paragraph>

            <FlexBox alignItems="center" gap={1}>
              <LinearProgress
                value={60}
                color="success"
                variant="determinate"
              />
              <Small fontWeight={500}>60%</Small>
            </FlexBox>
          </ProgressWrapper>

          <FlexBox gap={1}>
            <Button size="small" color="secondary">
              Follow
            </Button>

            <Button size="small">Hire Me</Button>

            <Button
              size="small"
              color="secondary"
              sx={{
                minWidth: 0,
              }}
            >
              <MoreHoriz fontSize="small" />
            </Button>
          </FlexBox>
        </FlexBetween> */}
      </Box>
    </ContentWrapper>
  );
}
