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
import { USER_ACTIVITY_LIST, FLOW_BEHAVIOR, DEVICE_STATUS, ACTIVITY_STATS } from "@/__fakeData__/userActivity";
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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FlexBox from "@/components/flexbox/FlexBox";
import Chip from "@mui/material/Chip";
import { Paragraph } from "@/components/typography";

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
    flowBehavior: "", 
    deviceStatus: "",
    activityType: ""
  });
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortData, setSortData] = useState({ name: '', order: '' });

  const [activityData, setActivityData] = useState(USER_ACTIVITY_LIST);
  const [showMockData, setShowMockData] = useState(false);

  const handleChangeFilter = (key, value) => {
    setUserFilter((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const filteredUsers = stableSort(
    showMockData ? activityData : users, 
    getComparator(order, orderBy)
  ).filter((item) => {
    let matches = true;
    
    if (userFilter.role && item.role) {
      matches = matches && item.role.toLowerCase() === userFilter.role;
    }
    
    if (userFilter.search) {
      const searchTerm = userFilter.search.toLowerCase();
      matches = matches && (
        (item.device_id && item.device_id.toLowerCase().includes(searchTerm)) ||
        (item.user_name && item.user_name.toLowerCase().includes(searchTerm)) ||
        (item.activity_type && item.activity_type.toLowerCase().includes(searchTerm)) ||
        (item.name && item.name.toLowerCase().includes(searchTerm))
      );
    }
    
    if (userFilter.flowBehavior && item.flow_behavior) {
      matches = matches && item.flow_behavior === userFilter.flowBehavior;
    }
    
    if (userFilter.deviceStatus && item.status) {
      matches = matches && item.status === userFilter.deviceStatus;
    }
    
    if (userFilter.activityType && item.activity_type) {
      matches = matches && item.activity_type === userFilter.activityType;
    }
    
    return matches;
  });

  const handleDeleteUser = (id) => {
    if (showMockData) {
      setActivityData((state) => state.filter((item) => item.id !== id));
    } else {
      setUsers((state) => state.filter((item) => item.id !== id));
    }
  };

  const handleAllUserDelete = () => {
    if (showMockData) {
      setActivityData((state) => state.filter((item) => !selected.includes(item.id)));
    } else {
      setUsers((state) => state.filter((item) => !selected.includes(item.id)));
    }
    handleSelectAllRows([])();
  };

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getServices("", rowsPerPage, page, sortData.order, sortData.name);
      if (response.success) {
        setUsers(response.data);
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
      if (response.success) {
        toast.success(t("Activity record deleted successfully"));
        if (!showMockData) {
          await fetchList();
        } else {
          handleDeleteUser(id);
        }
      } else {
        toast.error(t("This record cannot be deleted as it may be referenced by other data."));
      }
    } catch (error) {
      console.error(error);
      if (showMockData) {
        handleDeleteUser(id);
        toast.success(t("Activity record deleted successfully"));
      } else {
        throw error;
      }
    }
  };

  const handleMultipleDeleteService = async () => {
    try {
      const response = await deleteMultipleService(selected);
      if (response.success) {
        toast.success(t("Activity records deleted successfully"));
        if (!showMockData) {
          fetchList();
        } else {
          handleAllUserDelete();
        }
      }
    } catch (error) {
      console.error(error);
      if (showMockData) {
        handleAllUserDelete();
        toast.success(t("Activity records deleted successfully"));
      } else {
        throw error;
      }
    }
  };

  const handleSort = (sortOrder, sortField) => {
    setSortData({ name: sortField, order: sortOrder });
  };

  useEffect(() => {
    if (showMockData) {
      setLoading(false);
      setTotalRecords(activityData.length);
    } else {
      fetchList();
    }
  }, [fetchList, showMockData]);

  const toggleDataSource = () => {
    setShowMockData(!showMockData);
    setUserFilter({ role: "", search: "", flowBehavior: "", deviceStatus: "", activityType: "" });
  };

  const displayedUsers = filteredUsers.slice(
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
            <Box p={2}>
              <HeadingArea />
{/*               
              <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
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
                  <FlexBox gap={2} alignItems="center">
                    <Paragraph fontSize={12} color="primary.main">
                      {t("Total Activities")}: {ACTIVITY_STATS.totalActivities}
                    </Paragraph>
                    <Paragraph fontSize={12} color="success.main">
                      {t("Active Devices")}: {ACTIVITY_STATS.activeDevices}
                    </Paragraph>
                    <Paragraph fontSize={12} color="error.main">
                      {t("Suspicious")}: {ACTIVITY_STATS.suspiciousActivities}
                    </Paragraph>
                  </FlexBox>
                )}
              </FlexBox> */}

              <FlexBox gap={2} alignItems="center" mt={2} mb={2} flexWrap="wrap">
                <Box flex={1} minWidth={250}>
                  <SearchArea
                    value={userFilter.search}
                    gridRoute="/dashboard/user-activity-grid"
                    listRoute="/dashboard/user-activity-list"
                    onChange={(e) => handleChangeFilter("search", e.target.value)}
                    placeholder={t("Search by device ID, user, or activity...")}
                  />
                </Box>
                
                {showMockData && (
                  <>
                    <FormControl sx={{ minWidth: 150 }}>
                      <InputLabel>{t("Flow Behavior")}</InputLabel>
                      <Select
                        value={userFilter.flowBehavior}
                        label={t("Flow Behavior")}
                        onChange={(e) => handleChangeFilter("flowBehavior", e.target.value)}
                      >
                        <MenuItem value="">{t("All Behaviors")}</MenuItem>
                        {Object.values(FLOW_BEHAVIOR).map((behavior) => (
                          <MenuItem key={behavior} value={behavior}>
                            {behavior}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    
                    <FormControl sx={{ minWidth: 150 }}>
                      <InputLabel>{t("Device Status")}</InputLabel>
                      <Select
                        value={userFilter.deviceStatus}
                        label={t("Device Status")}
                        onChange={(e) => handleChangeFilter("deviceStatus", e.target.value)}
                      >
                        <MenuItem value="">{t("All Status")}</MenuItem>
                        {Object.values(DEVICE_STATUS).map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              </FlexBox>
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
                    handleSort={handleSort}
                    rowCount={filteredUsers.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllRows={handleSelectAllRows(
                      filteredUsers.map((row) => row.id)
                    )}
                  />

                  <TableBody>
                <TableDataNotFound />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

        
          </Card>
        </>
      )}
    </>
  );
}
