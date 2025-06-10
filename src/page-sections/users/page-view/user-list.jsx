import HeadingArea from "../HeadingArea.jsx";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import SearchArea from "../SearchArea.jsx";
import { useCallback, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Scrollbar from "@/components/scrollbar";
import { TableDataNotFound, TableToolbar } from "@/components/table";
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";
import { USER_LIST, ACCESS_LEVELS, PLAN_STATUS } from "@/__fakeData__/users";
import Table from "@mui/material/Table";
import UserTableHead from "../UserTableHead.jsx";
import TableBody from "@mui/material/TableBody";
import UserTableRow from "../UserTableRow.jsx";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TableSkeleton from "@/components/loader/TableSkeleton.jsx";
import { toast } from "react-toastify";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FlexBox from "@/components/flexbox/FlexBox";

export default function UserList() {
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
  } = useMuiTable({ defaultOrderBy: "name" });

  const [users, setUsers] = useState(USER_LIST);
  console.log(users);
  const [userFilter, setUserFilter] = useState({ 
    role: "", 
    search: "", 
    accessLevel: "", 
    planStatus: "" 
  });
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(USER_LIST.length);

  const handleChangeFilter = (key, value) => {
    setUserFilter((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const filteredUsers = stableSort(users, getComparator(order, orderBy)).filter(
    (item) => {
      let matches = true;
      
      if (userFilter.role) {
        matches = matches && item.role.toLowerCase() === userFilter.role;
      }
      
      if (userFilter.search) {
        const searchTerm = userFilter.search.toLowerCase();
        matches = matches && (
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm) ||
          item.company?.toLowerCase().includes(searchTerm)
        );
      }
      
      if (userFilter.accessLevel) {
        matches = matches && item.accessLevel === userFilter.accessLevel;
      }
      
      if (userFilter.planStatus) {
        matches = matches && item.planStatus === userFilter.planStatus;
      }
      
      return matches;
    }
  );

  const handleDeleteUser = (id) => {
    setUsers((state) => state.filter((item) => item.id !== id));
    setTotalRecords(prev => prev - 1);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((state) => state.map((item) => 
      item.id === updatedUser.id ? updatedUser : item
    ));
  };

  const handleAllUserDelete = () => {
    setUsers((state) => state.filter((item) => !selected.includes(item.id)));
    setTotalRecords(prev => prev - selected.length);
    handleSelectAllRows([])();
    toast.success(t("Selected users deleted successfully"));
  };

  const handleSort = (sortOrder, sortField) => {
    // Handle sorting logic if needed for API calls
    console.log({ sortOrder }, { sortField });
  };

  // Simulate loading on mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
              
              {/* Enhanced Search and Filter Area */}
              <FlexBox gap={2} alignItems="center" mt={2} mb={2} flexWrap="wrap">
                <Box flex={1} minWidth={250}>
                  <SearchArea
                    value={userFilter.search}
                    gridRoute="/dashboard/user-grid"
                    listRoute="/dashboard/users-list"
                    onChange={(e) => handleChangeFilter("search", e.target.value)}
                    placeholder={t("Search by name, email, or company...")}
                  />
                </Box>
                
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>{t("Access Level")}</InputLabel>
                  <Select
                    value={userFilter.accessLevel}
                    label={t("Access Level")}
                    onChange={(e) => handleChangeFilter("accessLevel", e.target.value)}
                  >
                    <MenuItem value="">{t("All Levels")}</MenuItem>
                    {Object.values(ACCESS_LEVELS).map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>{t("Plan Status")}</InputLabel>
                  <Select
                    value={userFilter.planStatus}
                    label={t("Plan Status")}
                    onChange={(e) => handleChangeFilter("planStatus", e.target.value)}
                  >
                    <MenuItem value="">{t("All Status")}</MenuItem>
                    {Object.values(PLAN_STATUS).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FlexBox>
            </Box>

            {selected.length > 0 && (
              <TableToolbar
                selected={selected.length}
                handleDeleteRows={handleAllUserDelete}
              />
            )}

            <TableContainer>
              <Scrollbar autoHide={false}>
                <Table>
                  <UserTableHead
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
                    {displayedUsers.length > 0 ? (
                      displayedUsers.map((user) => (
                        <UserTableRow
                          key={user.id}
                          user={user}
                          isSelected={isSelected(user.id)}
                          handleSelectRow={handleSelectRow}
                          handleDeleteUser={handleDeleteUser}
                          handleUpdateUser={handleUpdateUser}
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
              component="div"
              rowsPerPage={rowsPerPage}
              count={filteredUsers.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={t("Rows per page")}
            />
          </Card>
        </>
      )}
    </>
  );
} 