import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Span } from "@/components/typography";
import { isDark } from "@/utils/constants";
import { useTranslation } from "react-i18next";
import { useEffect , useState} from "react";
// import { sortServices, unsortServices } from '../request.js'
import { sortServices, unsortServices } from "./request";
import ServiceTableRow from "./ServiceTableRow";


export default function ServiceTableHead(props) {
  useEffect(()=>{
    document.title="Service"
  })
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
 



    const { t } = useTranslation();
    const headCells = [
      {
        id: "uid",
        numeric: true,
        disablePadding: false,
        label: t("Uid"),
        sortable: false, // Enable sorting
      },
      // {
      //   id: "frequency",
      //   numeric: true,
      //   disablePadding: false,
      //   label: t("Frequency"),
      //   sortable: false, // Disable sorting
      // },
      {
        id: "timeStamps",
        numeric: false,
        disablePadding: false,
        label: t("Time Stamps"),
        sortable: true,
      },
      
      {
        id: "actions",
        numeric: true,
        disablePadding: false,
        label: t("Actions"),
        sortable: false, // Disable sorting for Actions
      },
    ];
  
    
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };
  {headCells.map((headCell) => {
    //console.log(headCell.id);
})}


  const createSortHandler = (property) => async (event) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy( property);
    setIsSorted(true);  // Set sorted state
    onRequestSort(event, property);
    handleSort(newOrder,property);
    // Call the sortServices function to get the sorted data
    try {
      // const response = await sortServices(property, newOrder);

     // console.log({ newOrder } , {property});

      // setOrder({ response });
      // setOrderBy({ response });
      // setIsSorted({ response });
    //console.log('property', property)

      // console.log('sort' , isSorted)
    } catch (error) {
      console.error("Error sorting services:", error.message);
    }
  };

  const handleUnsort = async () => {
    try {
      // const response = await unsortServices();
      // console.log({ response });
      // setOrder({ response });
      // setOrderBy({ response });
      setIsSorted(false);  // Reset sorted state
    } catch (error) {
      console.error("Error unsorting services:", error.message);
    }
  };

  
  // useEffect(() => {
  //   document.title = "Service";
  // }, [isSorted,order,orderBy]);



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
{/* 
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
            </TableCell>
          ))} */}
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
      headCell.label // Just display the label without sorting
    )}
  </TableCell>
))}

        </TableRow>
      </TableHead>
    </>
  );
}
