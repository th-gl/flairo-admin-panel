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


const DriverProfileTableHead = (props) => {
  const { t } = useTranslation();
  const headCells = [
    {
      id: "bookingId",
      numeric: true,
      disablePadding: false,
      label: t("Booking ID"),
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
      id: "workshop",
      numeric: true,
      disablePadding: false,
      label: t("WorkShop"),
      sortable: false, // Enable sorting
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: t("Price"),
      sortable: false, // Enable sorting
    },
    // {
    //   id: "status",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Status",
    // },
  ];

  const {
    onSelectAllRows,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

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

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            {headCells.sortable? ( <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Span sx={visuallyHidden}>
                  {order === "desc" ? `${("sorted descending")}` : `${("sorted ascending")}`}
                </Span>
              ) : null}
            </TableSortLabel>):(headCell.label)}
           
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default DriverProfileTableHead;
