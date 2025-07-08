import HeadingArea from "../HeadingArea.jsx";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import SearchArea from "../SearchArea.jsx";
import { useCallback, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination"; // CUSTOM COMPONENTS
import Scrollbar from "@/components/scrollbar";
import { TableDataNotFound, TableToolbar } from "@/components/table"; // CUSTOM PAGE SECTION COMPONENTS

import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable"; // CUSTOM DUMMY DATA
import {
  AI_PROMPTS_LIST,
  PROMPT_CATEGORIES,
  PROMPT_STATUS,
  AI_MODELS_FOR_PROMPTS,
  PROMPT_STATS,
} from "@/__fakeData__/aiPrompts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ServiceTableHead from "../../outputs-ai/ServiceTableHead.jsx";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TableSkeleton from "@/components/loader/TableSkeleton.jsx";
import ServiceTableRow from "../../outputs-ai/ServiceTableRow.jsx";
import {
  deleteService,
  getServices,
  deleteMultipleService,
} from "../request.js";
import { toast } from "react-toastify";
import { setDate } from "date-fns";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FlexBox from "@/components/flexbox/FlexBox";
import Chip from "@mui/material/Chip";
import { Paragraph } from "@/components/typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { DB } from "@/contexts/firebaseContext.jsx";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";
import { Grid, Grid2 } from "@mui/material";

export default function ServiceList() {
  const { t } = useTranslation();
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    handleSelectRow,
    handleRequestSort,
    handleSelectAllRows,
    handleChangeRowsPerPage,
    selected,
    isSelected,
    handleChangePage,
  } = useMuiTable({ defaultOrderBy: "updated_at" });

  const [users, setUsers] = useState([]);
  const [userFilter, setUserFilter] = useState({
    role: "",
    search: "",
    category: "",
    status: "",
    author: "",
    complexity: "",
  });
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortData, setSortData] = useState({ name: "", order: "" });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [isEditing, setIsEditing] = useState(null);

  // AI prompt specific state
  const [aiPromptData, setAiPromptData] = useState(AI_PROMPTS_LIST);
  const [showMockData, setShowMockData] = useState(true); // Default to mock data for prompts
  const [newPrompt, setNewPrompt] = useState({
    name: "",
    key: "",
    prompt: "",
    revenuecat_api_key: "",
  });

  const fetchAIPrompts = async () => {
    const snapshot = await getDocs(collection(DB, "ai_outputs"));
    const dataprompt = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    });
    console.log("dataprompt", dataprompt);
    setUsers(dataprompt);
    setTotalRecords(dataprompt.length);
  };

  useEffect(() => {
    fetchAIPrompts();
  }, []);

  useEffect(() => {
    console.log("is editing true useeffect");
    if (isEditing) {
      setNewPrompt({
        name: newPrompt.name,
        key: newPrompt.key,
        prompt: newPrompt.prompt,
        revenuecat_api_key: newPrompt.revenuecat_api_key,
      });
    }
  }, [isEditing]);

  const handleChangeFilter = (key, value) => {
    setUserFilter((state) => ({
      ...state,
      [key]: value,
    }));
  };

  // Enhanced filtering for AI prompts
  const filteredUsers = stableSort(
    showMockData ? aiPromptData : users,
    getComparator(order, orderBy)
  ).filter((item) => {
    let matches = true;

    if (userFilter.role && item.role) {
      matches = matches && item.role.toLowerCase() === userFilter.role;
    }

    if (userFilter.search) {
      const searchTerm = userFilter.search.toLowerCase();
      matches =
        matches &&
        ((item.name && item.name.toLowerCase().includes(searchTerm)) ||
          (item.description &&
            item.description.toLowerCase().includes(searchTerm)) ||
          (item.category && item.category.toLowerCase().includes(searchTerm)) ||
          (item.author && item.author.toLowerCase().includes(searchTerm)) ||
          (item.prompt_text &&
            item.prompt_text.toLowerCase().includes(searchTerm)) ||
          (item.tags &&
            item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))));
    }

    if (userFilter.category && item.category) {
      matches = matches && item.category === userFilter.category;
    }

    if (userFilter.status && item.status) {
      matches = matches && item.status === userFilter.status;
    }

    if (userFilter.author && item.author) {
      matches = matches && item.author === userFilter.author;
    }

    if (userFilter.complexity && item.complexity) {
      matches = matches && item.complexity === userFilter.complexity;
    }

    return matches;
  });

  // const handleDeleteUser = (id) => {
  //   if (showMockData) {
  //     setAiPromptData((state) => state.filter((item) => item.id !== id));
  //   } else {
  //     setUsers((state) => state.filter((item) => item.id !== id));
  //   }
  // };

  // const handleAllUserDelete = () => {
  //   if (showMockData) {
  //     setAiPromptData((state) =>
  //       state.filter((item) => !selected.includes(item.id))
  //     );
  //   } else {
  //     setUsers((state) => state.filter((item) => !selected.includes(item.id)));
  //   }
  //   handleSelectAllRows([])();
  // };

  // const fetchList = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getServices(
  //       "",
  //       rowsPerPage,
  //       page,
  //       sortData.order,
  //       sortData.name
  //     );
  //     // console.log(response);
  //     if (response.success) {
  //       setUsers(response.data);
  //       // console.log(response.data, "response.data prompts");
  //       setTotalRecords(response.totalRecords);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [rowsPerPage, page, sortData.order, sortData.name]);

  // const handleDeleteService = async (id) => {
  //   try {
  //     const response = await deleteService(id);
  //     // console.log({ response }, "delete Service");
  //     if (response.success) {
  //       toast.success(t("AI prompt deleted successfully"));
  //       if (!showMockData) {
  //         await fetchList();
  //       } else {
  //         handleDeleteUser(id);
  //       }
  //     } else {
  //       toast.error(
  //         t(
  //           "This prompt cannot be deleted as it may be referenced by other data."
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     if (showMockData) {
  //       handleDeleteUser(id);
  //       toast.success(t("AI prompt deleted successfully"));
  //     } else {
  //       throw error;
  //     }
  //   }
  // };

  // const handleMultipleDeleteService = async () => {
  //   try {
  //     const response = await deleteMultipleService(selected);
  //     // console.log({ response }, "delete Service");
  //     if (response.success) {
  //       // console.log({ response }, "inner delete Service");

  //       toast.success(t("AI prompts deleted successfully"));
  //       if (!showMockData) {
  //         fetchList();
  //       } else {
  //         handleAllUserDelete();
  //       }
  //       // console.log({ response }, "inner second delete Service");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     if (showMockData) {
  //       handleAllUserDelete();
  //       toast.success(t("AI prompts deleted successfully"));
  //     } else {
  //       throw error;
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!showMockData) {
  //     fetchList();
  //   }
  // }, [fetchList, showMockData]);

  const handleSort = (sortOrder, sortField) => {
    setSortData({ order: sortOrder, name: sortField });
  };

  const resetUsers = (user) => {
    setUsers((state) => [...state.filter((item) => item.id !== user.id), user]);
  };

  const toggleDataSource = () => {
    setShowMockData((prev) => !prev);
    setUsers([]);
    setTotalRecords(0);
    handleSelectAllRows([])();
  };

  // Get unique authors for filtering
  const uniqueAuthors = [
    ...new Set(aiPromptData.map((prompt) => prompt.author)),
  ];
  const handleAddPrompt = () => {
    setIsEditing(false);
    console.log("click");
    setOpenAddDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenAddDialog(false);
    setIsEditing(false);
    setNewPrompt({
      name: "",
      key: "",
      prompt: "",
      revenuecat_api_key: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrompt((prev) => ({ ...prev, [name]: value }));
  };
  // const handleAddNewPrompt = async () => {
  //   if (!newPrompt.name) {
  //     toast.error(`Please fill the prompt name`);
  //     return;
  //   }
  //   if (!newPrompt.key) {
  //     toast.error(`Please fill the prompt key`);
  //     return;
  //   }
  //   if (!newPrompt.revenuecat_api_key) {
  //     toast.error(`Please fill the revenuecat api key`);
  //     return;
  //   }
  //   if (!newPrompt?.prompt) {
  //     toast.error(`Please fill the prompt filed`);
  //     return;
  //   }
  //   try {
  //     const docRef = await addDoc(collection(DB, "aiPrompts"), {
  //       ...newPrompt,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });

  //     toast.success("Prompt added successfully");
  //     setOpenAddDialog(false);
  //     setNewPrompt({
  //       name: "",
  //       key: "",
  //       prompt: "",
  //       createdAt: "",
  //       updatedAt: "",
  //       revenuecat_api_key: "",
  //     });

  //     // Optionally refresh the list
  //     if (!showMockData) {
  //       fetchAIPrompts(); // re-fetch from Firestore
  //     }
  //   } catch (error) {
  //     console.error("Error adding prompt: ", error);
  //     toast.error("Failed to add prompt");
  //   }
  // };
  const handleEditPrompt = (prompt) => {
    console.log("promptddd", prompt);
    setIsEditing(true);
    setCurrentPrompt(prompt);
    // if(isEditing){
    setNewPrompt({
      name: prompt.name,
      key: prompt.key,
      prompt: prompt.prompt,
      revenuecat_api_key: prompt.revenuecat_api_key || "",
    });
    // }

    setOpenAddDialog(true);
  };

  const handleAddNewPrompt = async () => {
    try {
      const { name, key, prompt, revenuecat_api_key } = newPrompt;

      if (!name.trim()) {
        toast.error(t("Prompt name is required"));
        return;
      }

      if (!key.trim()) {
        toast.error(t("API key is required"));
        return;
      }

      if (!revenuecat_api_key.trim()) {
        toast.error(t("RevenueCat API key is required"));
        return;
      }

      if (!prompt.trim()) {
        toast.error(t("Prompt text is required"));
        return;
      }
      const currentTime = new Date();
      const promptData = {
        name: newPrompt.name,
        key: newPrompt.key,
        prompt: newPrompt.prompt,
        revenuecat_api_key: newPrompt.revenuecat_api_key,
        updatedAt: currentTime,
      };

      if (isEditing && currentPrompt) {
        // Update existing document - merge with existing data
        await updateDoc(doc(DB, "aiPrompts", currentPrompt.id), {
          ...promptData,
          createdAt: currentPrompt.createdAt, // Preserve original creation time
        });
        toast.success(t("Prompt updated successfully"));
      } else {
        // Create new document
        await addDoc(collection(DB, "aiPrompts"), {
          ...promptData,
          createdAt: currentTime,
        });
        toast.success(t("Prompt added successfully"));
      }

      await fetchAIPrompts();
      setOpenAddDialog(false);
      setIsEditing(false);
      setCurrentPrompt(null);
      setNewPrompt({
        name: "",
        key: "",
        prompt: "",
        revenuecat_api_key: "",
      });
    } catch (error) {
      console.error("Error saving prompt:", error);
      toast.error(t("Failed to save prompt"));
    }
  };
  users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Card>
        <HeadingArea
          title={t("Outputs AI Management")}
          subtitle={t("View your Outputs AI")}
        />

        <SearchArea
          handleChangeFilter={handleChangeFilter}
          userFilter={userFilter}
          placeholder={t("Search prompts, descriptions, authors...")}
        />

        {selected.length > 0 && (
          <TableToolbar
            selected={selected.length}
            handleDeleteRows={handleMultipleDeleteService}
          />
        )}
        <TableContainer>
          <Scrollbar autoHide={false}>
            <Table>
              <ServiceTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {users.length > 0 ? (
                  users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <ServiceTableRow
                        key={user.id}
                        user={user}
                        fetchAIPrompts={fetchAIPrompts}
                        isSelected={isSelected(user.id)}
                        handleSelectRow={handleSelectRow}
                        handleEdit={handleEditPrompt}
                      />
                    ))
                ) : (
                  <TableDataNotFound />
                )}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePagination
          page={page}
          count={ totalRecords}
          rowsPerPage={rowsPerPage}
          component="div"
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Dialog
        open={openAddDialog}
        onClose={handleDeleteCancel}
        maxWidth="lg"
        fullWidth
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">
          {isEditing ? t("Edit Prompt") : t("Add New Prompt")}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("Api Key")}
                  margin="normal"
                  name="key"
                  value={newPrompt.key}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("Revenuecat Api key")}
                  margin="normal"
                  name="revenuecat_api_key"
                  value={newPrompt.revenuecat_api_key}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label={t("Prompt Name")}
              margin="normal"
              name="name"
              value={newPrompt.name}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              label={t("Prompt")}
              margin="normal"
              multiline
              name="prompt"
              value={newPrompt.prompt}
              onChange={handleInputChange}
              rows={8}
              sx={{ fontFamily: "monospace" }}
            />
            {/* <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, mt: 2 }}>
                    <TextField
                      select
                      label={t("Category")}
                      defaultValue={prompt?.category}
                      SelectProps={{ native: true }}
                    >
                      {Object.values(PROMPT_CATEGORIES).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label={t("Status")}
                      defaultValue={prompt?.status}
                      SelectProps={{ native: true }}
                    >
                      {Object.values(PROMPT_STATUS).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label={t("Recommended Model")}
                      defaultValue={prompt?.recommended_model}
                      SelectProps={{ native: true }}
                    >
                      {Object.values(AI_MODELS_FOR_PROMPTS).map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </TextField>
                  </Box> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleDeleteCancel}>
            {t("Cancel")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewPrompt}
          >
            {isEditing ? t("Update Prompt") : t("Save Prompt")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
