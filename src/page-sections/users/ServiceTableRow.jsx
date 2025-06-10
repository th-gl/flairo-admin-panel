import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import FlexBox from "@/components/flexbox/FlexBox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";





export default function ServiceTableRow(props) {
  const { t, i18n } = useTranslation();
 // State for Dialog
const { user, isSelected, handleSelectRow, handleDeleteService  } = props;
  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);

  // State for Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };

  

  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  // Handle Delete Confirmation
  const handleDeleteConfirmation = () => {

    setOpenDialog(true); // Open confirmation dialog
    handleCloseOpenMenu(); // Close menu
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false); // Close confirmation dialog
  };

  const handleDeleteConfirm = () => {

    handleDeleteService(user?.id); // Delete user
    setOpenDialog(false); // Close confirmation dialog
  };



  // const { user, isSelected, handleSelectRow, handleDeleteService } = props;
  // console.log(user, "table row user");
  // const navigate = useNavigate();
  // const [openMenuEl, setOpenMenuEl] = useState(null);

  // const handleOpenMenu = (event) => {
  //   setOpenMenuEl(event.currentTarget);
  // };
  // const handleCloseOpenMenu = () => setOpenMenuEl(null);
// Get the current language dynamically
const currentLanguage = i18n.language;
  return (
    <>
      <TableRow hover>
        <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            checked={isSelected}
            onClick={(event) => handleSelectRow(event, user.id)}
          />
        </TableCell>

        <TableCell padding="normal">
          <FlexBox alignItems="center" gap={2}>
            <Avatar src={user.image} alt={user.name} variant="rounded" />

            <div>
              <Paragraph
                fontWeight={500}
                color="text.primary"
                // sx={{
                //   ":hover": {
                //     textDecoration: "underline",
                //     cursor: "pointer",
                //   },
                // }}
              >
                {/* {user.name || "-"} */}
                {/* Use dynamic language for the name */}
                {user.translations[currentLanguage]?.name || "-"}
              </Paragraph>

              {/* <Paragraph fontSize={13}>#{user.id || "-"}</Paragraph> */}
            </div>
          </FlexBox>
        </TableCell>
        <TableCell style={{paddingLeft:"15px"}}>
          {/* {user.description || "-"} */}
          {user.translations[currentLanguage]?.description || "-"}
        </TableCell>

        <TableCell padding="normal">{user.estimated_time || "-"}</TableCell>

        <TableCell padding="normal">{user.estimated_cost || "-"}</TableCell>

        <TableCell padding="normal">
          <TableMoreMenu
            open={openMenuEl}
            handleOpen={handleOpenMenu}
            handleClose={handleCloseOpenMenu}
          >
            <TableMoreMenuItem
              Icon={Edit}
              title={t("Edit")}
              handleClick={() => {
                handleCloseOpenMenu();
                navigate(`/service-create/${user.id}`);
              }}
            />

            <TableMoreMenuItem
              Icon={DeleteOutline}
              title={t("Delete")}
              handleClick={handleDeleteConfirmation} // Open confirmation dialog
              // handleClick={() => {
              //   handleCloseOpenMenu();
              //   handleDeleteService(user.id);
              // }}
            />
          </TableMoreMenu>
        </TableCell>
           {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>{t("Are you sure you want to delete this service?")}</DialogTitle>
        <DialogContent>
          <Paragraph>{t("This action cannot be undone.")}</Paragraph>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
      </TableRow>
    </>
  );
}
