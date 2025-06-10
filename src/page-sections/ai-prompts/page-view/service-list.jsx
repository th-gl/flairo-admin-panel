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
import ServiceTableHead from "../ServiceTableHead.jsx";
import TableBody from "@mui/material/TableBody";
import ServiceTableRow from "../ServiceTableRow.jsx";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TableSkeleton from "@/components/loader/TableSkeleton.jsx";
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

  // AI prompt specific state
  const [aiPromptData, setAiPromptData] = useState(AI_PROMPTS_LIST);
  const [showMockData, setShowMockData] = useState(true); // Default to mock data for prompts

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

  const handleDeleteUser = (id) => {
    if (showMockData) {
      setAiPromptData((state) => state.filter((item) => item.id !== id));
    } else {
      setUsers((state) => state.filter((item) => item.id !== id));
    }
  };

  const handleAllUserDelete = () => {
    if (showMockData) {
      setAiPromptData((state) =>
        state.filter((item) => !selected.includes(item.id))
      );
    } else {
      setUsers((state) => state.filter((item) => !selected.includes(item.id)));
    }
    handleSelectAllRows([])();
  };

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getServices(
        "",
        rowsPerPage,
        page,
        sortData.order,
        sortData.name
      );
      // console.log(response);
      if (response.success) {
        setUsers(response.data);
        // console.log(response.data, "response.data prompts");
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage, page, sortData.order, sortData.name]);

  const handleDeleteService = async (id) => {
    try {
      const response = await deleteService(id);
      // console.log({ response }, "delete Service");
      if (response.success) {
        toast.success(t("AI prompt deleted successfully"));
        if (!showMockData) {
          await fetchList();
        } else {
          handleDeleteUser(id);
        }
      } else {
        toast.error(
          t(
            "This prompt cannot be deleted as it may be referenced by other data."
          )
        );
      }
    } catch (error) {
      console.error(error);
      if (showMockData) {
        handleDeleteUser(id);
        toast.success(t("AI prompt deleted successfully"));
      } else {
        throw error;
      }
    }
  };

  const handleMultipleDeleteService = async () => {
    try {
      const response = await deleteMultipleService(selected);
      // console.log({ response }, "delete Service");
      if (response.success) {
        // console.log({ response }, "inner delete Service");

        toast.success(t("AI prompts deleted successfully"));
        if (!showMockData) {
          fetchList();
        } else {
          handleAllUserDelete();
        }
        // console.log({ response }, "inner second delete Service");
      }
    } catch (error) {
      console.error(error);
      if (showMockData) {
        handleAllUserDelete();
        toast.success(t("AI prompts deleted successfully"));
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    if (!showMockData) {
      fetchList();
    }
  }, [fetchList, showMockData]);

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

  return (
    <>
      <Card>
        <HeadingArea
          title={t("AI Prompts Management")}
          subtitle={t("Manage and edit your AI prompt templates")}
        />

        {/* Filters */}
        <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
          <FlexBox gap={2} alignItems="center" justifyContent="space-between" flexWrap="wrap">
            <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>{t("Category")}</InputLabel>
              <Select
                value={userFilter.category}
                label={t("Category")}
                onChange={(e) => handleChangeFilter("category", e.target.value)}
              >
                <MenuItem value="">{t("All Categories")}</MenuItem>
                {Object.values(PROMPT_CATEGORIES).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{t("Status")}</InputLabel>
              <Select
                value={userFilter.status}
                label={t("Status")}
                onChange={(e) => handleChangeFilter("status", e.target.value)}
              >
                <MenuItem value="">{t("All Status")}</MenuItem>
                {Object.values(PROMPT_STATUS).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{t("Author")}</InputLabel>
              <Select
                value={userFilter.author}
                label={t("Author")}
                onChange={(e) => handleChangeFilter("author", e.target.value)}
              >
                <MenuItem value="">{t("All Authors")}</MenuItem>
                {uniqueAuthors.map((author) => (
                  <MenuItem key={author} value={author}>
                    {author}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Box>
      


            <Box>
              <Button
                variant="outlined"
                onClick={toggleDataSource}
                sx={{ ml: "auto" }}
                size="small"
              >
                {showMockData ? t("Use Live Data") : t("Use Demo Data")}
              </Button>
            </Box>
          </FlexBox>
        </Box>

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

        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table stickyHeader aria-label="prompts table">
              <ServiceTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                rowCount={filteredUsers.length}
                onRequestSort={handleRequestSort}
                onSelectAllRows={handleSelectAllRows(
                  filteredUsers.map((n) => n.id)
                )}
                handleSort={handleSort}
              />

              <TableBody>
                {loading ? (
                  <TableSkeleton />
                ) : filteredUsers.length === 0 ? (
                  <TableDataNotFound />
                ) : (
                  filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => (
                      <ServiceTableRow
                        user={user}
                        key={user.id}
                        isSelected={isSelected(user.id)}
                        handleSelectRow={handleSelectRow}
                        handleDeleteService={handleDeleteService}
                        resetUsers={resetUsers}
                      />
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          count={showMockData ? filteredUsers.length : totalRecords}
          rowsPerPage={rowsPerPage}
          component="div"
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
