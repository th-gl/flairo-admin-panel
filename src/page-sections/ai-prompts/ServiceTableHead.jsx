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
import { alpha } from "@mui/material/styles";

export default function ServiceTableHead(props) {
  useEffect(() => {
    document.title = "AI Prompts Management";
  });

  const { onSelectAllRows, numSelected, rowCount, onRequestSort, handleSort } =
    props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  const { t } = useTranslation();

  const headCells = [
  
    {
      id: "promptname",
      numeric: false,
      disablePadding: false,
      label: t("Prompt Name"),
      sortable: true,
    },
      {
      id: "apikey",
      numeric: false,
      disablePadding: false,
      label: t("Api Key"),
      sortable: true,
    },
      {
      id: "revenuecat_api_key",
      numeric: false,
      disablePadding: false,
      label: t("Revenuecat Api Key"),
      sortable: true,
    },
    // {
    //   id: "status",
    //   numeric: false,
    //   disablePadding: false,
    //   label: t("Status"),
    //   sortable: true,
    // },
    // {
    //   id: "prompt",
    //   numeric: true,
    //   disablePadding: false,
    //   label: t("Prompt"),
    //   sortable: true,
    // },
    {
      id: "updated_at",
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
      // Future API integration for sorting AI prompts
    } catch (error) {
      console.error("Error sorting AI prompts:", error.message);
    }
  };

  const handleUnsort = async () => {
    try {
      setIsSorted(false);
    } catch (error) {
      console.error("Error unsorting AI prompts:", error.message);
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
            sx={{
              "&.Mui-checked": {
                color: "primary.main",
              },
              "&.MuiCheckbox-indeterminate": {
                color: "primary.main",
              },
              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.1),
              },
            }}
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
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
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