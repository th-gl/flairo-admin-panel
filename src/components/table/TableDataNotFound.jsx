import { useEffect, useState } from "react";
import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Paragraph } from "@/components/typography";
import { DB } from "@/contexts/firebaseContext.jsx";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function AiOutputSimpleRows() {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [openMenuEl, setOpenMenuEl] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleViewDetails = (item) => {
    setViewData(item);
    setOpenViewDialog(true);
    handleCloseOpenMenu();
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewData(null);
  };

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(DB, "ai_outputs"));
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        const ts = d.timestamp?.seconds
          ? new Date(d.timestamp.seconds * 1000)
          : null;

        let parsedResponse = null;
        try {
          const cleanString = d.response?.replace(/^```json|```$/g, "").trim();
          parsedResponse = JSON.parse(cleanString);
        } catch (parseErr) {
          console.warn("Failed to parse response for doc:", doc.id, parseErr);
        }

        return {
          id: doc.id,
          uid: d.uid || null,
          timestamp: ts,
          rawResponse: d.response || "",
          parsedResponse,
        };
      });

      setRows(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenMenu = (event, item) => {
    setOpenMenuEl(event.currentTarget);
    setActiveItem(item);
  };

  const handleCloseOpenMenu = () => {
    setOpenMenuEl(null);
    setActiveItem(null);
  };

  const openDeleteConfirmDialog = (id) => {
    setSelectedUserId(id);
    setOpenDeleteDialog(true);
    handleCloseOpenMenu();
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUserId) return;
    try {
      const user = rows.find(r => r.id === selectedUserId);
      const userUid = user?.uid;
      await deleteDoc(doc(DB, "ai_outputs", selectedUserId));
      if (userUid) {
        const functions = getFunctions();
        const deleteUserAccount = httpsCallable(functions, "deleteUserAccount");
        await deleteUserAccount({ uid: userUid });
      }
      toast.success(t("User deleted successfully"));
      setOpenDeleteDialog(false);
      setSelectedUserId(null);
      await fetchData();
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error(t("Failed to delete user"));
    }
  };

  if (!rows.length) {
    return (
      <TableRow>
        <TableCell colSpan={4}>
          <Paragraph>{t("No data found")}</Paragraph>
        </TableCell>
      </TableRow>
    );
  }
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      {paginatedRows.map((item) => (
        <TableRow key={item.id}>
          <TableCell>
            <Paragraph sx={{ padding: "10px" }}>{item.uid}</Paragraph>
          </TableCell>
          <TableCell>
            <Paragraph>
              {item.timestamp
                ? item.timestamp.toLocaleString()
                : t("No Timestamp")}
            </Paragraph>
          </TableCell>
          <TableCell padding="normal">
            <TableMoreMenu
              open={Boolean(openMenuEl) && activeItem?.id === item.id}
              anchorEl={openMenuEl}
              handleOpen={(e) => handleOpenMenu(e, item)}
              handleClose={handleCloseOpenMenu}
            >
              <TableMoreMenuItem
                Icon={DeleteOutline}
                title={t("Delete")}
                handleClick={() => openDeleteConfirmDialog(item.id)}
              />
              <TableMoreMenuItem
                Icon={VisibilityIcon}
                title={t("View Details")}
                handleClick={() => handleViewDetails(item)}
              />
            </TableMoreMenu>
          </TableCell>
        </TableRow>
      ))}
      {/* AI Output Delete Confirmation */}

      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>
          {t("Are you sure you want to delete this user?")}
        </DialogTitle>
        <DialogContent>
          <Paragraph>{t("This action cannot be undone.")}</Paragraph>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* AI Output view Details */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle>{t("View AI Output Details")}</DialogTitle>
        <DialogContent>
          {viewData?.parsedResponse &&
            Object.entries(viewData.parsedResponse).map(([key, section]) => (
              <Paragraph key={key} mb={3}>
                <Paragraph sx={{ color: "gray", margin: "7px" }}>
                  {section.title || key}
                </Paragraph>
                <Paragraph
                  sx={{
                    backgroundColor: "#f5f5f5",
                    padding: "10px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {section.text || JSON.stringify(section, null, 2)}
                </Paragraph>
              </Paragraph>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>{t("Close")}</Button>
        </DialogActions>
      </Dialog>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // reset to first page on page size change
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </>
  );
}

