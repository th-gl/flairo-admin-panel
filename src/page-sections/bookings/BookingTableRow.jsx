import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import FlexBox from "@/components/flexbox/FlexBox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
// import Timeline from "../../../components/Timeline.jsx";
import Timeline from '../../components/Timeline.jsx'
import { utils } from "../../utils/functionUtils";
import { useTranslation } from "react-i18next";


export default function BookingTableRow(props) {


  const { t } = useTranslation();
  const statusLabels = (status) => {
    const labels = {
      in_progress: t("in_progress"),
      pending: t("pending"),
      accepted: t("accepted"),
      rejected: t("rejected"),
      completed: t("completed"),
      cancelled: t("cancelled"),
      done: t("done"),
      quote_received: t("quote_received"),
      quote_accepted: t("quote_accepted"),
      quote_rejected: t("quote_rejected"),
      quote_send: t("quote_send"),
    };
    return labels[status];
  };
  const { booking, isSelected, handleSelectRow, handleDeleteBooking ,data} = props;

  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };
  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  // console.log(utils.getImageUrl(booking?.car?.images));
  // console.log("im prps" , props)
  return (
    <>
    
      <TableRow hover sx={{ cursor: "pointer" }}>
        {/* <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            checked={isSelected}
            onClick={(event) => handleSelectRow(event, booking.id)}
          />
        </TableCell> */}

        <TableCell padding="normal">
          <FlexBox
            alignItems="center"
            gap={2}
            onClick={() => navigate(`/bookings-detail?id=${booking.id}`)}
          >
            <Avatar
              src={
                booking.images[0]                
                  ? booking.images[0]
                  : ""
              }
              variant="rounded"
            />
            {/*   <img
              src={ 
                booking.images[0]                
                  ? booking.images[0]
                  : ""
              }
              variant="rounded" style={{height:"50px", width:"50px", borderRadius:"10px"}}
            /> */}
            <div>
              <Paragraph
                fontSize={13}
                sx={{
                  ":hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}
              >
                #{booking?.id || "-"}
              </Paragraph>
            </div>
          </FlexBox>
        </TableCell>
        <TableCell style={{paddingLeft:"10px"}}>
          {/* {data[2].workshop.owner} */}
          {/* {booking?.truck_driver?.first_name && booking?.truck_driver?.last_name
            ? `${booking?.truck_driver?.first_name} ${booking?.truck_driver?.last_name}`
            : "N/A"} */}
             {/* {booking?.truck_driver?.first_name
            ? booking?.truck_driver?.first_name
            : "N/A"}  */}
            {booking?.creator?.first_name && booking?.creator.last_name ? `${booking?.creator?.first_name}  ${booking?.creator.last_name}`  : "N/A"}
          

        </TableCell>

        <TableCell padding="normal">{booking?.car?.car?.maker?.name} {booking?.car?.car?.model?.name}</TableCell>
        

        <TableCell padding="normal">
          {/* {booking?.service?.estimated_cost || "-"} */}
          {booking?.booking_items[0]?.service?.estimated_cost
            ? booking?.booking_items[0]?.service?.estimated_cost
            : "N/A"}
        </TableCell>

        <TableCell padding="normal">
          {booking?.booking_items[0]?.service?.name
            ? booking?.booking_items[0]?.service?.name
            : "N/A"}
          {/* {data[0].booking_items[0].service.name} */}
        </TableCell>

        <TableCell padding="normal">
          <Chip
            color="warning"
            size="small"
            label={statusLabels(booking?.status )}
            style={{
              backgroundColor: 
                booking?.status === "done" ? "rgba(117, 191, 255, 0.34)" :
                booking?.status === "pending" ? "rgba(233, 248, 131, 0.32)" :
                booking?.status === "in_progress" ? "rgba(215, 124, 248, 0.12)" :
                booking?.status === "accepted" ? "rgba(249, 125, 249, 0.12)" :
                booking?.status === "rejected" ? "rgba(254, 138, 138, 0.12)" :
                // booking?.status === "completed" ? "rgba(189, 241, 94, 0.21)" :
                booking?.status === "cancelled" ? "rgba(249, 170, 125, 0.23)" :
                booking?.status === "quote_received" ? "rgba(114, 208, 242, 0.12)" :
                // booking?.status === "quote_accepted" ? "rgba(113, 241, 239, 0.12)" :
                booking?.status === "quote_rejected" ? "rgba(250, 138, 173, 0.12)" :
                booking?.status === "quote_send" ? "rgba(139, 136, 242, 0.16)" :
                "#EF47701A", // default background color
            
              color: 
                booking?.status === "done" ? "rgb(64, 0, 255)" :
                booking?.status === "pending" ? "rgb(255, 225, 0)" :
                booking?.status === "in_progress" ? "rgba(196, 6, 243, 0.94)" :
                booking?.status === "accepted" ? "rgba(241, 0, 253, 0.12)" :
                booking?.status === "rejected" ? "rgba(255, 2, 2, 0.93)" :
                // booking?.status === "completed" ? "rgba(190, 241, 94, 0.6)" :
                booking?.status === "cancelled" ? "rgba(249, 170, 125, 0.72)" :
                booking?.status === "quote_received" ? "rgba(114, 208, 242, 0.75)" :
                // booking?.status === "quote_accepted" ? "rgba(113, 241, 239, 0.84)" :
                booking?.status === "quote_rejected" ? "rgba(250, 138, 173, 0.71)" :
                booking?.status === "quote_send" ? "rgba(140, 136, 242, 0.86)" :
                "#EB194C", // default text color
            }}
            
            // style={{
            //   backgroundColor: "rgba(254,191,6,0.12)",
            //   color: "#febf06",
            // }}
          />
        </TableCell>
      </TableRow>
      
    </>
  );
}
