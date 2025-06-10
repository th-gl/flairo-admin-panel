import React from "react";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Span } from "@/components/typography";
import { isDark } from "@/utils/constants";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useTranslation } from "react-i18next";


const WorkshopProfileTableHead = (props) => {
  const { t } = useTranslation();

  const serviceHeadCells = [
    {
      id: "service",
      numeric: true,
      disablePadding: false,
      label: t("Service"),
      sortable: false, // Enable sorting
    },
    {
      id: "estimated_time",
      numeric: false,
      disablePadding: false,
      label: t("Estimated Time"),
      sortable: false, // Enable sorting
    },
    {
      id: "selected_cars",
      numeric: true,
      disablePadding: false,
      // label: t("Selected Cars"),
      label:(""),
      sortable: false, // Enable sorting
    },
    {
      id: "estimated_cost",
      numeric: true,
      disablePadding: false,
      label: t("Estimated Cost"),
      sortable: false, // Enable sorting
    },
    // {
    //   id: "status",
    //   numeric: true,
    //   disablePadding: false,
    //   label: t("Status"),
    //   sortable: false, // Enable sorting
    // },
  ];
  
  const bookingHeadCells = [
    {
      id: "bookingId",
      numeric: true,
      disablePadding: false,
      label: t("Booking ID"),
      sortable: false, // Enable sorting
    },
    {
      id: "customer",
      numeric: false,
      disablePadding: false,
      label: t("Customer"),
      sortable: false, // Enable sorting
    },
    {
      id: "car",
      numeric: false,
      disablePadding: false,
      label: t("Car"),
      sortable: false, // Enable sorting
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: t("Price"),
      sortable: false, // Enable sorting
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: t("Status"),
      sortable: false, // Enable sorting
    },
  ];

  const {
    onSelectAllRows,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    role,
  } = props;

  // console.log({ role }, "WorkshopProfileTableHead");
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        backgroundColor: (theme) => (isDark(theme) ? "grey.700" : "grey.100"),
      }}
    >
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            onChange={onSelectAllRows}
            checked={rowCount > 0 && numSelected === rowCount}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell> */}

        {(role === "booking" ? bookingHeadCells : serviceHeadCells).map(
          (headCell) => (
            <TableCell
              key={headCell.id}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                color: "text.primary",
                fontWeight: 600,
              }}
            >
              {bookingHeadCells.sortable ?
              (   <TableSortLabel
                active={orderBy === headCell.id}
                onClick={createSortHandler(headCell.id)}
                direction={orderBy === headCell.id ? order : "asc"}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Span sx={visuallyHidden}>
                    {order === "desc"
                      ? `${t("sorted descending")}`
                      : `${t("sorted ascending")}`}
                  </Span>
                ) : null}
              </TableSortLabel>):
            (headCell.label)}
           
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default WorkshopProfileTableHead;
