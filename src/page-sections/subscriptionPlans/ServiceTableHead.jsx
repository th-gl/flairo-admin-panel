import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Span } from "@/components/typography";
import { isDark } from "@/utils/constants";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { sortServices, unsortServices } from "./request";

export default function ServiceTableHead(props) {
  useEffect(() => {
    document.title = "Subscription Plans Management"
  })
  
  const {
    onSelectAllRows,
    numSelected,
    rowCount,
    onRequestSort,
    handleSort
  } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  const { t } = useTranslation();
  
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("Plan Name"),
      sortable: true,
    },
    {
      id: "type",
      numeric: false,
      disablePadding: false,
      label: t("Type"),
      sortable: true,
    },
    {
      id: "aiprompts",
      numeric: true,
      disablePadding: false,
      label: t("Ai Prompts"),
      sortable: true,
    },
    // {
    //   id: "weeklyDecodeLimit",
    //   numeric: true,
    //   disablePadding: false,
    //   label: t("Weekly Decodes"),
    //   sortable: true,
    // },
    // {
    //   id: "subscriberCount",
    //   numeric: true,
    //   disablePadding: false,
    //   label: t("Subscribers"),
    //   sortable: true,
    // },
    // {
    //   id: "status",
    //   numeric: false,
    //   disablePadding: false,
    //   label: t("Status"),
    //   sortable: true,
    // },
    {
      id: "updatedAt",
      numeric: false,
      disablePadding: false,
      label: t("Last Updated"),
      sortable: true,
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: false,
      label: t("Actions"),
      sortable: false,
    },
  ];

  const createSortHandler = (property) => async (event) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(property);
    setIsSorted(true);
    onRequestSort(event, property);
    handleSort(newOrder, property);
    
    try {
      // Future API integration for sorting subscription plans
    } catch (error) {
      console.error("Error sorting subscription plans:", error.message);
    }
  };

  const handleUnsort = async () => {
    try {
      setIsSorted(false);
    } catch (error) {
      console.error("Error unsorting subscription plans:", error.message);
    }
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
            sortDirection={isSorted && orderBy === headCell.id ? order : false}
            sx={{
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                onClick={createSortHandler(headCell.id)}
                direction={isSorted && orderBy === headCell.id ? order : "asc"}
              >
                {headCell.label}
                {isSorted && orderBy === headCell.id ? (
                  <Span sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
