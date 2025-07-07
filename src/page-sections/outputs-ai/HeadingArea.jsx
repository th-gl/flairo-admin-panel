import { useNavigate } from "react-router-dom"; // MUI

import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import styled from "@mui/material/styles/styled"; // CUSTOM COMPONENTS

import IconWrapper from "@/components/icon-wrapper";
import { Paragraph } from "@/components/typography";
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
  
  return (
    <FlexBetween flexWrap="wrap" gap={1} sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
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
            {title || t("Outputs AI Management")}
          </Paragraph>
          {subtitle && (
            <Paragraph fontSize={14} color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Paragraph>
          )}
        </div>
      </FlexBox>
      {/* <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => navigate("/ai-prompts-create")}
      >
        {t("Create New Prompt")}
      </Button> */}
    </FlexBetween>
  );
}
