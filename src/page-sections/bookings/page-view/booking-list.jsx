import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { getBookings } from "../request.js";
import { Paragraph } from "@/components/typography";
import SearchArea from "../SearchArea.jsx";
import BookingTableHead from "../BookingTableHead.jsx";
import BookingTableRow from "../BookingTableRow.jsx";
import TableSkeleton from "@/components/loader/TableSkeleton.jsx";
import Scrollbar from "@/components/scrollbar";
import { TableDataNotFound, TableToolbar } from "@/components/table";
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable";
import { useTranslation } from "react-i18next";

export default function BookingListView() {
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

  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortData, setSortData] = useState({ name: "", order: "" });
  const [filterObj, setFilterObj] = useState({
    status: "",
    service_id: "",
    created_at: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    status: "",
    service_id: "",
    created_at: "",
  });

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilterObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setAppliedFilters(filterObj);
  };

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBookings(
        rowsPerPage,
        page,
        appliedFilters,
        sortData.name,
        sortData.order
      );
      if (response.success) {
        setTableData(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, appliedFilters, sortData.name, sortData.order]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <>
      {/* {loading ? (
        <TableSkeleton />
      ) : ( */}

      <Card sx={{ mt: 3 }}>
        <Box p={2}>
          <Paragraph
            sx={{ paddingBottom: 5 }}
            fontWeight={"bold"}
            fontSize={19}
          >
            {t("bookings")}{" "}
          </Paragraph>
          <SearchArea
            value={filterObj}
            filterFn={applyFilters}
            onChange={handleChangeFilter}
          />
          {/* <Button onClick={applyFilters} variant="contained" color="primary">
              {t("Filter")}
            </Button> */}
        </Box>
        {selected.length > 0 && (
          <TableToolbar
            selected={selected.length}
            handleDeleteRows={() => {}}
          />
        )}
        <TableContainer>
          <Scrollbar autoHide={false}>
            <Table>
              <BookingTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                rowCount={tableData.length}
                onRequestSort={handleRequestSort}
                onSelectAllRows={handleSelectAllRows(
                  tableData.map((row) => row.id)
                )}
              />
              <TableBody>
                {tableData.length ? (
                  tableData.map((booking) => (
                    <BookingTableRow
                      key={booking.id}
                      booking={booking}
                      isSelected={isSelected(booking.id)}
                      handleSelectRow={handleSelectRow}
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
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={totalRecords}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Card>
      {/* )} */}
    </>
  );
}
