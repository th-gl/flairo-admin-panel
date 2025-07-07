import { Fragment } from "react"; // MUI
import useLayout from "@/layouts/layout-1/context/useLayout"; // CUSTOM COMPONENTS
import { useContext } from "react"; // MUI
import { SettingsContext } from "@/contexts/settingsContext"; // CUSTOM ICON COMPONENTS
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider"; // CUSTOM COMPONENTS
import { useState } from "react"; // MUI
import { H3, H6, Paragraph } from "@/components/typography";
import FlexRowAlign from "@/components/flexbox/FlexRowAlign";
import { useTranslation } from "react-i18next";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import { console } from "inspector";

// =========================================================================

// =========================================================================
export default function Layout({ children, login }) {
  // const { t, i18n } = useTranslation();
  //  const [alignment, setAlignment] = useState(i18n.language);
  //  const handleChange = (event, newAlignment) => {
  //    if (newAlignment !== null) {
  //      setAlignment(newAlignment);
  //      i18n.changeLanguage(newAlignment);
  //      const direction = newAlignment === "ar" ? "rtl" : "ltr";
  //      saveSettings({ ...settings, direction });
  //    }
  //    axios.defaults.headers.common["x-current-language"] =
  //      newAlignment === "ar" ? "ar" : "";
  //    window.location.reload();
  //  };
   const { t, i18n } = useTranslation();
    const [alignment, setAlignment] = useState(i18n.language); // Use the active language
    const { handleOpenMobileSidebar } = useLayout();
    const [openSearchBar, setSearchBar] = useState(false);
    const { settings, saveSettings } = useContext(SettingsContext);
    const upSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const downMd = useMediaQuery((theme) => theme.breakpoints.down(1200));
  
    const handleChangeDirection = (value) => {
      saveSettings({ ...settings, direction: value });
    };
  
    const handleChangeTheme = (value) => {
      saveSettings({ ...settings, theme: value });
    };
  
    const handleChange = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
        i18n.changeLanguage(newAlignment);
        const direction = newAlignment === "ar" ? "rtl" : "ltr";
        saveSettings({ ...settings, direction });
// console.log('direction', direction)
      }
      axios.defaults.headers.common["x-current-language"] =
        newAlignment === "ar" ? "ar" : "";
        // setTimeout(() => {
        //   window.location.reload();
        // }, 100);
       window.location.reload();
      // console.log('newAlignmetn' ,newAlignment)

    };
    // console.log('settings' , settings , )
  return (
    <Grid container height="100%">


      <Grid
        size={{
          md: 6,
          xs: 12,
        }}
      >
        <FlexRowAlign bgcolor="primary.main" height="100%">
          <Box color="white" p={6} maxWidth={700}>
            {login ? (
              <H3 fontWeight={600}> {t("Hi, Welcome Back!")} </H3>
            ) : (
                 <H3 fontWeight={600}> {t("Welcome")} </H3>
          
            )}
          </Box>
        </FlexRowAlign>
      </Grid>

      <Grid
        size={{
          md: 6,
          xs: 12,
        }}
      >
        {/* <ToggleButtonGroup
          style={{ marginRight: "76px" }}
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            value="en"
            sx={{
              fontSize: "11px",
              fontWeight: "700",
              "&.Mui-selected": {
                backgroundColor: "#6950E8",
                color: "white",
                "&:hover": {
                  backgroundColor: "#4b38ac",
                },
              },
            }}
          >
            English
          </ToggleButton>

          <ToggleButton
            value="ar"
            sx={{
              fontSize: "11px",
              fontWeight: "700",
              "&.Mui-selected": {
                backgroundColor: "#6950E8",
                color: "white",
                "&:hover": {
                  backgroundColor: "#4b38ac",
                },
              },
            }}
          >
            {t("arabic")}
          </ToggleButton>
        </ToggleButtonGroup>  */}


        <FlexRowAlign bgcolor="background.paper" height="100%">
          {children}
        </FlexRowAlign>
      </Grid>
    </Grid>
  );
}
