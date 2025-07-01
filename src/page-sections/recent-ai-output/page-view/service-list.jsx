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
  AI_OUTPUT_LIST,
  AI_OUTPUT_TYPES,
  OUTPUT_STATUS,
  AI_MODELS,
  QA_STATS,
} from "@/__fakeData__/aiOutputs";
import Table from "@mui/material/Table";
import ServiceTableHead from "../ServiceTableHead.jsx";
import ServiceTableRow from "../ServiceTableRow.jsx"
import TableBody from "@mui/material/TableBody";

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
import { DB } from "@/contexts/firebaseContext.jsx";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

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
  } = useMuiTable({ defaultOrderBy: "timestamp" });

  const [users, setUsers] = useState([]);
  const [userFilter, setUserFilter] = useState({
    role: "",
    search: "",
    outputType: "",
    status: "",
    aiModel: "",
    qaStatus: "",
  });
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortData, setSortData] = useState({ name: "", order: "" });

  // AI output specific state
  const [aiOutputData, setAiOutputData] = useState(AI_OUTPUT_LIST);
  const [showMockData, setShowMockData] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true); // Optional: show loader during fetch
      const querySnapshot = await getDocs(collection(DB, "users"));
      const data = querySnapshot.docs.map((doc) => {
        const userData = doc.data();
        return {
          id: doc.id,
          ...userData,
          lastLogin:
            userData.lastLogin?.seconds != null
              ? new Date(userData.lastLogin.seconds * 1000)
              : null,
        };
      });
      console.log("data", data);
      setUsers(data);
      setTotalRecords(data.length);
    } catch (error) {
      console.error("Error fetching users: ", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeFilter = (key, value) => {
    setUserFilter((state) => ({
      ...state,
      [key]: value,
    }));
  };

  // Enhanced filtering for AI outputs
  // const filteredUsers = stableSort(
  //   showMockData ? aiOutputData : users,
  //   getComparator(order, orderBy)
  // ).filter((item) => {
  //   let matches = true;

  //   if (userFilter.role && item.role) {
  //     matches = matches && item.role.toLowerCase() === userFilter.role;
  //   }

  //   if (userFilter.search) {
  //     const searchTerm = userFilter.search.toLowerCase();
  //     matches = matches && (
  //       (item.user_name && item.user_name.toLowerCase().includes(searchTerm)) ||
  //       (item.output_type && item.output_type.toLowerCase().includes(searchTerm)) ||
  //       (item.ai_model && item.ai_model.toLowerCase().includes(searchTerm)) ||
  //       (item.prompt && item.prompt.toLowerCase().includes(searchTerm)) ||
  //       (item.output_text && item.output_text.toLowerCase().includes(searchTerm)) ||
  //       (item.name && item.name.toLowerCase().includes(searchTerm))
  //     );
  //   }

  //   if (userFilter.outputType && item.output_type) {
  //     matches = matches && item.output_type === userFilter.outputType;
  //   }

  //   if (userFilter.status && item.status) {
  //     matches = matches && item.status === userFilter.status;
  //   }

  //   if (userFilter.aiModel && item.ai_model) {
  //     matches = matches && item.ai_model === userFilter.aiModel;
  //   }

  //   if (userFilter.qaStatus) {
  //     if (userFilter.qaStatus === 'reviewed') {
  //       matches = matches && item.qa_reviewed === true;
  //     } else if (userFilter.qaStatus === 'pending') {
  //       matches = matches && item.qa_reviewed === false;
  //     } else if (userFilter.qaStatus === 'flagged') {
  //       matches = matches && item.flagged_for_review === true;
  //     }
  //   }

  //   return matches;
  // });

  // const handleDeleteUser = (id) => {
  //   if (showMockData) {
  //     setAiOutputData((state) => state.filter((item) => item.id !== id));
  //   } else {
  //     setUsers((state) => state.filter((item) => item.id !== id));
  //   }
  // };

  const handleDeleteService = async (id) => {
    try {
      const response = await deleteService(id);
      // console.log({ response }, "delete Service");
      if (response.success) {
        toast.success(t("AI output record deleted successfully"));
        if (!showMockData) {
          // await fetchList();
        } else {
          handleDeleteUser(id);
        }
      } else {
        toast.error(
          t(
            "This record cannot be deleted as it may be referenced by other data."
          )
        );
      }
    } catch (error) {
      console.error(error);
      if (showMockData) {
        handleDeleteUser(id);
        toast.success(t("AI output record deleted successfully"));
      } else {
        throw error;
      }
    }
  };

  //   const handleMultipleDeleteService = async () => {
  //     try {
  //       const response = await deleteMultipleService(selected);
  //       // console.log({ response }, "delete Service");
  //       if (response.success) {
  //         // console.log({ response }, "inner delete Service");

  //         toast.success(t("AI output records deleted successfully"));
  //         if (!showMockData) {
  //           // fetchList();
  //         } else {
  //           handleAllUserDelete();
  //         }
  //         // console.log({ response }, "inner second delete Service");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       if (showMockData) {
  //         handleAllUserDelete();
  //         toast.success(t("AI output records deleted successfully"));
  //       } else {
  //         throw error;
  //       }
  //     }
  //   };
  //  const handleSort=(sortOrder,sortField)=>{
  // // console.log({sortOrder},{sortField})
  // setSortData({name:sortField , order:sortOrder})

  //  }

  //   useEffect(() => {
  //     if (showMockData) {
  //       setLoading(false);
  //       setTotalRecords(aiOutputData.length);
  //     } else {
  //       // fetchList();
  //     }
  //   }, [ showMockData]);

  //   const toggleDataSource = () => {
  //     setShowMockData(!showMockData);
  //     setUserFilter({ role: "", search: "", outputType: "", status: "", aiModel: "", qaStatus: "" });
  //   };

  //   const displayedUsers = filteredUsers.slice(
  //     page * rowsPerPage,
  //     page * rowsPerPage + rowsPerPage
  //   );
  const displayedUsers = stableSort(users, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <Card>
            <Box p={2} sx={{ marginTop: "20px" }}>
              <HeadingArea />

              {/* Data Source Toggle */}
              {/* <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
                <FlexBox alignItems="center" gap={2}>
                  <Paragraph fontSize={14} color="text.secondary">
                    {t("Data Source")}:
                  </Paragraph>
                  <Chip
                    label={showMockData ? t("Demo Data") : t("Live Data")}
                    color={showMockData ? "secondary" : "primary"}
                    onClick={toggleDataSource}
                    sx={{ cursor: 'pointer' }}
                  />
                </FlexBox>
                
                {showMockData && (
                  <FlexBox gap={2} alignItems="center" flexWrap="wrap">
                    <Paragraph fontSize={12} color="primary.main">
                      {t("Total Outputs")}: {QA_STATS.totalOutputs}
                    </Paragraph>
                    <Paragraph fontSize={12} color="success.main">
                      {t("Success Rate")}: {QA_STATS.successRate}%
                    </Paragraph>
                    <Paragraph fontSize={12} color="warning.main">
                      {t("QA Reviewed")}: {QA_STATS.qaReviewedCount}
                    </Paragraph>
                    <Paragraph fontSize={12} color="error.main">
                      {t("Flagged")}: {QA_STATS.flaggedForReview}
                    </Paragraph>
                    <Paragraph fontSize={12} color="info.main">
                      {t("Avg Processing")}: {QA_STATS.avgProcessingTime}ms
                    </Paragraph>
                  </FlexBox>
                )}
              </FlexBox> */}

              {/* Enhanced Search and Filter Area */}
              {/* <FlexBox gap={2} alignItems="center" mt={2} mb={2} flexWrap="wrap">
                <Box flex={1} minWidth={250}>
                  <SearchArea
                    value={userFilter.search}
                    gridRoute="/dashboard/ai-output-grid"
                    listRoute="/dashboard/recent-ai-output"
                    onChange={(e) => handleChangeFilter("search", e.target.value)}
                    placeholder={t("Search by user, output type, model, or content...")}
                  />
                </Box>
                
                {showMockData && (
                  <>
                    <FormControl sx={{ minWidth: 150 }}>
                      <InputLabel>{t("Output Type")}</InputLabel>
                      <Select
                        value={userFilter.outputType}
                        label={t("Output Type")}
                        onChange={(e) => handleChangeFilter("outputType", e.target.value)}
                      >
                        <MenuItem value="">{t("All Types")}</MenuItem>
                        {Object.values(AI_OUTPUT_TYPES).map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    
                    {/* <FormControl sx={{ minWidth: 120 }}>
                      <InputLabel>{t("Status")}</InputLabel>
                      <Select
                        value={userFilter.status}
                        label={t("Status")}
                        onChange={(e) => handleChangeFilter("status", e.target.value)}
                      >
                        <MenuItem value="">{t("All Status")}</MenuItem>
                        {Object.values(OUTPUT_STATUS).map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}

              {/* <FormControl sx={{ minWidth: 120 }}>
                      <InputLabel>{t("AI Model")}</InputLabel>
                      <Select
                        value={userFilter.aiModel}
                        label={t("AI Model")}
                        onChange={(e) => handleChangeFilter("aiModel", e.target.value)}
                      >
                        <MenuItem value="">{t("All Models")}</MenuItem>
                        {Object.values(AI_MODELS).map((model) => (
                          <MenuItem key={model} value={model}>
                            {model}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}

              {/* <FormControl sx={{ minWidth: 120 }}>
                      <InputLabel>{t("QA Status")}</InputLabel>
                      <Select
                        value={userFilter.qaStatus}
                        label={t("QA Status")}
                        onChange={(e) => handleChangeFilter("qaStatus", e.target.value)}
                      >
                        <MenuItem value="">{t("All QA")}</MenuItem>
                        <MenuItem value="reviewed">{t("Reviewed")}</MenuItem>
                        <MenuItem value="pending">{t("Pending")}</MenuItem>
                        <MenuItem value="flagged">{t("Flagged")}</MenuItem>
                      </Select>
                    </FormControl> */}
              {/* </>
                )} */}
              {/* </FlexBox> */}
            </Box>

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
                    // handleSort={handleSort}
                    // rowCount={filteredUsers.length}
                    onRequestSort={handleRequestSort}
                    // onSelectAllRows={handleSelectAllRows(
                    //   filteredUsers.map((row) => row.id)
                    // )}
                  />

                  <TableBody>
                    {displayedUsers.length > 0 ? (
                      displayedUsers.map((user) => (
                        <ServiceTableRow
                          key={user.id}
                          user={user}
                          fetchUsers={fetchUsers}
                          isSelected={isSelected(user.id)}
                          handleSelectRow={handleSelectRow}
                          handleDeleteService={handleDeleteService}
                        />
                      ))
                    ) : (
                      <TableDataNotFound />
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <Box padding={1}>
              <TablePagination
                component="div"
                count={users.length} // total number of items (use filteredUsers.length if filtering)
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage={t("Rows per page")}
              />
            </Box>
          </Card>
        </>
      )}
    </>
  );
}
