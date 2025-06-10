import { useNavigate } from "react-router-dom"; // MUI

import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import styled from "@mui/material/styles/styled"; // CUSTOM COMPONENTS

import IconWrapper from "@/components/icon-wrapper";
import { Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox"; // CUSTOM ICON COMPONENTS

import GroupSenior from "@/icons/GroupSenior";
import ShoppingCart from "@/icons/ShoppingCart.jsx";
import Add from "@/icons/Add"; // STYLED COMPONENT
import duotone from "@/icons/duotone";
import { useTranslation } from "react-i18next";

export default function HeadingArea({ title, subtitle }) {
  const { t } = useTranslation();
  const TodoList = duotone.TodoList;
  const navigate = useNavigate();
  
  const displayTitle = title || t("Subscription Plans");
  const displaySubtitle = subtitle || t("Manage pricing and subscription plans");
  
  return (
    <FlexBetween flexWrap="wrap" gap={1}>
      <FlexBox alignItems="center">
        <IconWrapper>
          <TodoList
            sx={{
              color: "primary.main",
            }}
          />
        </IconWrapper>
        <div>
          <Paragraph fontWeight={"bold"} fontSize={19}>
            {displayTitle}
          </Paragraph>
          {displaySubtitle && (
            <Small color="text.secondary" sx={{ mt: 0.5 }}>
              {displaySubtitle}
            </Small>
          )}
        </div>
      </FlexBox>
    </FlexBetween>
  );
}
