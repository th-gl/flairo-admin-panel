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
import { DB } from "@/contexts/firebaseContext.jsx";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function ServiceTableHead(props) {
  useEffect(() => {
    document.title = "Recent AI Output"
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
  
  
  // const headCells = [
  //   {
  //     id: "user_name",
  //     numeric: false,
  //     disablePadding: false,
  //     label: t("User"),
  //     sortable: true,
  //   },
  //   {
  //     id: "output_type",
  //     numeric: false,
  //     disablePadding: false,
  //     label: t("Output Type"),
  //     sortable: true,
  //   },
  //   {
  //     id: "ai_model",
  //     numeric: false,
  //     disablePadding: false,
  //     label: t("AI Model"),
  //     sortable: true,
  //   },
  //   // {
  //   //   id: "status",
  //   //   numeric: false,
  //   //   disablePadding: false,
  //   //   label: t("Status"),
  //   //   sortable: true,
  //   // },
  //   // {
  //   //   id: "processing_time_ms",
  //   //   numeric: true,
  //   //   disablePadding: false,
  //   //   label: t("Processing Time"),
  //   //   sortable: true,
  //   // },
  //   // {
  //   //   id: "confidence_score",
  //   //   numeric: true,
  //   //   disablePadding: false,
  //   //   label: t("Confidence"),
  //   //   sortable: true,
  //   // },
  //   // {
  //   //   id: "qa_reviewed",
  //   //   numeric: false,
  //   //   disablePadding: false,
  //   //   label: t("QA Status"),
  //   //   sortable: true,
  //   // },
  //   {
  //     id: "actions",
  //     numeric: false,
  //     disablePadding: false,
  //     label: t("Actions"),
  //     sortable: false,
  //   },
  // ];
  const headCells = [
    {
      id: "device_id",
      numeric: false,
      disablePadding: false,
      label: t("Device ID"),
      sortable: true,
    },


    {
      id: "devicemodel",
      numeric: false,
      disablePadding: false,
      label: t("Device Model"),
      sortable: true,
    },
    {
      id: "platform",
      numeric: false,
      disablePadding: false,
      label: t("Platform"),
      sortable: true,
    },
      {
      id: "osVersion",
      numeric: false,
      disablePadding: false,
      label: t("Os Version"),
      sortable: true,
    },
    {
      id: "lastLogin",
      numeric: false,
      disablePadding: false,
      label: t("Last Login"),
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
      // Future API integration for sorting AI outputs
    } catch (error) {
      console.error("Error sorting AI outputs:", error.message);
    }
  };

  const handleUnsort = async () => {
    try {
      setIsSorted(false);
    } catch (error) {
      console.error("Error unsorting AI outputs:", error.message);
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
