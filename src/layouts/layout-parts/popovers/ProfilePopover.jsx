import { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // MUI

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";
import styled from "@mui/material/styles/styled"; // CUSTOM COMPONENTS

import PopoverLayout from "./PopoverLayout";
import FlexBox from "@/components/flexbox/FlexBox";
import AvatarLoading from "@/components/avatar-loading";
import { H6, Paragraph, Small } from "@/components/typography"; // CUSTOM DEFINED HOOK

import useAuth from "@/hooks/useAuth"; // CUSTOM UTILS METHOD

import { isDark } from "@/utils/constants"; // STYLED COMPONENTS
import { getProfile } from "@/page-sections/accounts/basic-information/request";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  marginLeft: 8,
  borderRadius: 30,
  border: `1px solid ${theme.palette.grey[isDark(theme) ? 800 : 200]}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const StyledSmall = styled(Paragraph)(({ theme }) => ({
  fontSize: 13,
  display: "block",
  cursor: "pointer",
  padding: "5px 1rem",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
export default function ProfilePopover() {
  const { t } = useTranslation();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleMenuItem = (path) => () => {
    navigate(path);
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await getProfile();
      // console.log({ response });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <StyledButtonBase ref={anchorRef} onClick={() => setOpen(true)}>
        <AvatarLoading
          alt="user"
          percentage={60}
          src={data.avatar ? data.avatar : "/static/user/user-11.png"}
          // style={{borderRadius: '100%', height:"100px", width:"100px"}}
          sx={{
            width: 35,
            height: 35,
            objectFit: "cover",
            borderRadius: "50%",
            border: "2px solid transparent",
            padding: 0,
          }}
        />
      </StyledButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center" gap={1}>
            {/* <Avatar
              src={data.avatar ? data.avatar : "/static/user/user-11.png"}
              sx={{
                width: 35,
                height: 35,
              }}
            />  */}

             
          </FlexBox>
        }
      >
        {/* <Box pt={1}>
        <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>
            Set Status
          </StyledSmall>

          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>
            Profile & Account
          </StyledSmall>

          <StyledSmall onClick={handleMenuItem("/account")}>
            {t("Settings")}
          </StyledSmall>

          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>
            Manage Team
          </StyledSmall>

          <Divider
            sx={{
              my: 1,
            }}
          />

         <StyledSmall onClick={logout}>{t("Sign Out")}</StyledSmall>
        </Box> */}

        <Box pt={1}>
  <StyledSmall onClick={handleMenuItem("/account")}>
    Profile Edit 
  </StyledSmall>

  <Divider sx={{ my: 1 }} />

  <StyledSmall onClick={logout}>{t("Sign Out")}</StyledSmall>
</Box>
      </PopoverLayout>
    </Fragment>
  );
}
