import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
// import visuallyHidden from "@mui/utils/visuallyHidden";
import { visuallyHidden } from "@mui/utils"; // Ensure this import is correct
import { Span } from "@/components/typography";
import { isDark } from "@/utils/constants";
import { useTranslation } from "react-i18next";
import { useEffect , useState} from "react";
import { sortBookings,unsortBookings } from "./request";


export default function BookingTableHead(props) {
  useEffect(()=>{
    document.title="Booking"
  })
  const { t } = useTranslation();
  const {
    onSelectAllRows,
    // order,
    // orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    handleSort

  } = props;


  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [isSorted, setIsSorted] = useState(false);


  const headCells = [
    {
      id: "booking-id",
      numeric: true,
      disablePadding: false,
      label: t("booking_id"),
      sortable: false, // Enable sorting
    },
    {
      id: "customer",
      numeric: true,
      disablePadding: false,
      label: t("customer"),
      sortable: false, // Enable sorting
    },
    {
      id: "car",
      numeric: false,
      disablePadding: false,
      label: t("car"),
      sortable: false, // Enable sorting
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: t("estimated_cost"),
      sortable: false, // Enable sorting
    },
    {
      id: "service",
      numeric: true,
      disablePadding: false,
      label: t("Service"),
      sortable: false, // Enable sorting
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: t("status"),
      sortable: false, // Enable sorting
    },
    // {
    //   id:"quote_description",
    //   numeric:false,
    //   disablePadding:false,
    // }
  ];
   

  {headCells.map((headCell) => {
    //  console.log(headCell.id);
})}


const createSortHandler = (property) => async (event) => {
  const isAsc = orderBy === property && order === "asc";
  const newOrder = isAsc ? "desc" : "asc";
  setOrder(newOrder);
  setOrderBy( property);
  setIsSorted(true);  // Set sorted state
  onRequestSort(event, property);
  handleSort(property,newOrder);
  try {
    console.log(isSorted)
  } catch (error) {
    console.error("Error sorting services:", error.message);
  }
};

const handleUnsort = async () => {
  try {

    setIsSorted(false);  // Reset sorted state
  } catch (error) {
    console.error("Error unsorting services:", error.message);
  }
};

  return (
    <>
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
              {headCells.sortable ? 
              (  <TableSortLabel
                active={orderBy === headCell.id}
                onClick={createSortHandler(headCell.id)}
                direction={isSorted && orderBy === headCell.id ? order : "asc"}
              >
                {headCell.label}
                 {isSorted && orderBy === headCell.id ? (
                  <Span sx={visuallyHidden}>
                    {order === "desc"
                      // ? console.log("sorted descending") || "sorted descending"
                      // : console.log("sorted ascending") || "sorted ascending"
                         ? "sorted descending"
                      : "sorted ascending"
                      }
                     

                  </Span>
                ) : null} 

                {/* {orderBy === headCell.id ? (
                  <Span sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Span>
                ) : null} */}
              </TableSortLabel>)
            :
            (headCell.label)}
            
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}
