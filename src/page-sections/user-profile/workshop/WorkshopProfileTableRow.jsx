import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // MUI
import Chip from "@mui/material/Chip";

import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell"; // MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline"; // CUSTOM COMPONENTS

import FlexBox from "@/components/flexbox/FlexBox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";

import { utils } from "../../../utils/functionUtils";
import { useTranslation } from "react-i18next";
import axios from "axios";

const WorkshopProfileTableRow = (props) => {
  const { t } = useTranslation();
  const { data, isSelected, handleSelectRow, role, handleDeleteUser, booking } =
    props;
  // console.log({ role }, "WorkshopProfileTableRow");
  // console.log(booking);

  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };
  const [bookingData, setBookingData] = useState({});

  const handleCloseOpenMenu = () => setOpenMenuEl(null);
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

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/bookings/${props.data?.id}`);
        const filterData = response?.data?.data?.booking_timelines.filter(
          (item) => {
            if (item.stage === "Issue One") {
              return item;
            }
          }
        );
        // console.log(filterData, "filter data ssss", props.data?.id);
        setBookingData(filterData);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [props.data?.id ,]);

  console.log(bookingData);

  return (
    <>
      {" "}
      {role === "service" ? (
        <TableRow
        // onClick={() =>
        //   navigate(`/dashboard/bookings-detail?id=${booking.id}`)
        // }
        // hover
        // sx={{ cursor: "pointer" }}
        >
          {/* <TableCell padding="checkbox">
            <Checkbox
              size="small"
              color="primary"
              checked={isSelected}
              onClick={(event) => handleSelectRow(event, booking.id)}
            />
          </TableCell> */}

          <TableCell padding="normal">
            <FlexBox alignItems="center" gap={2}>
              {/* <img src={data?.booking_items[0]?.service?.image} alt="..." variant="rounded"  style={{ height: "50px", width: "50px" }} /> */}
              <Avatar
                src={
                  data?.booking_items[0]?.service?.image
                    ? data?.booking_items[0]?.service?.image
                    : "N/A"
                }
                alt="..."
                variant="rounded"
                style={{ height: "50px", width: "50px" }}
              />
              <div>
                <Paragraph fontSize={13}>
                  {props?.data?.booking_items[0]?.service?.name
                    ? props?.data?.booking_items[0]?.service?.name
                    : "N/A"}
                </Paragraph>
              </div>
            </FlexBox>
          </TableCell>
          <TableCell padding="normal" sx={{ marginLeft: "25px" }}>
            {props?.data?.booking_items[0]?.service?.estimated_time
              ? props?.data?.booking_items[0]?.service?.estimated_time
              : "N/A"}
          </TableCell>

          <TableCell padding="normal">
            {/* {data?.car?.car?.maker?.name +
              " " +
              data?.car?.car?.model?.name +
              " " +
              data?.car?.car?.year?.year} */}
          </TableCell>

          <TableCell padding="normal" sx={{ marginLeft: "25px" }}>
            {data?.booking_items[0]?.service?.estimated_cost
              ? data?.booking_items[0]?.service?.estimated_cost
              : "N/A"}
          </TableCell>

          {/* <TableCell padding="normal">
            <Chip
              color="warning"
              size="small"
              label={statusLabels(data?.status)}
              style={{
                backgroundColor: 
                   data?.status === "done" ? "rgba(117, 191, 255, 0.34)" :
                   data?.status === "pending" ? "rgba(233, 248, 131, 0.32)" :
                   data?.status === "in_progress" ? "rgba(215, 124, 248, 0.12)" :
                   data?.status === "accepted" ? "rgba(249, 125, 249, 0.12)" :
                   data?.status === "rejected" ? "rgba(254, 138, 138, 0.12)" :
                  //  data?.status === "completed" ? "rgba(189, 241, 94, 0.21)" :
                  //  data?.status === "cancelled" ? "rgba(249, 170, 125, 0.23)" :
                   data?.status === "quote_received" ? "rgba(114, 208, 242, 0.12)" :
                  //  data?.status === "quote_accepted" ? "rgba(113, 241, 239, 0.12)" :
                   data?.status === "quote_rejected" ? "rgba(250, 138, 173, 0.12)" :
                   data?.status === "quote_send" ? "rgba(139, 136, 242, 0.16)" :
                  "#EF47701A", // default background color
              
                color: 
                   data?.status === "done" ? "rgb(64, 0, 255)" :
                   data?.status === "pending" ? "rgb(255, 225, 0)" :
                   data?.status === "in_progress" ? "rgba(196, 6, 243, 0.94)" :
                   data?.status === "accepted" ? "rgba(241, 0, 253, 0.12)" :
                   data?.status === "rejected" ? "rgba(255, 2, 2, 0.93)" :
                  //  data?.status === "completed" ? "rgba(190, 241, 94, 0.6)" :
                  //  data?.status === "cancelled" ? "rgba(249, 170, 125, 0.72)" :
                   data?.status === "quote_received" ? "rgba(114, 208, 242, 0.75)" :
                  //  data?.status === "quote_accepted" ? "rgba(113, 241, 239, 0.84)" :
                   data?.status === "quote_rejected" ? "rgba(250, 138, 173, 0.71)" :
                   data?.status === "quote_send" ? "rgba(140, 136, 242, 0.86)" :
                  "#EB194C", // default text color
              }}
              // style={{
              //   backgroundColor: "rgba(254,191,6,0.12)",
              //   color: "#febf06",
              // }}
            />
          </TableCell> */}
        </TableRow>
      ) : (
        <TableRow
        // onClick={() =>
        //   navigate(`/dashboard/bookings-detail?id=${booking.id}`)
        // }
        // hover
        //  sx={{ cursor: "pointer" }}
        >
          {/* <TableCell padding="checkbox">
            <Checkbox
              size="small"
              color="primary"
              checked={isSelected}
              onClick={(event) => handleSelectRow(event, booking.id)}
            />
          </TableCell> */}

          <TableCell padding="normal">
            <FlexBox alignItems="center" gap={2}>
              {/* <Avatar src={data?.car?.image} variant="rounded" /> */}
              {/* <img src={data?.car?.image} alt="" /> */}
              <div>
                <Paragraph fontSize={13}>#{data?.id || "-"}</Paragraph>
              </div>
            </FlexBox>
          </TableCell>
          <TableCell sx={{ paddingLeft: "1rem" }}>
        
            {data?.creator?.first_name && data?.creator?.last_name
              ? `${data?.creator?.first_name} ${data?.creator?.last_name}`
              : "N/A"}
          </TableCell>

          <TableCell padding="normal">
            {" "}
            {data?.car?.car?.maker?.name +
              " " +
              data?.car?.car?.model?.name +
              " " +
              data?.car?.car?.year?.year}
          </TableCell>

          <TableCell padding="normal">
               <span>
                {bookingData[0]?.quote_amount ? bookingData[0]?.quote_amount : "N/A"}
              </span>
           </TableCell>

          <TableCell padding="normal">
            <Chip
              color="warning"
              size="small"
              label={statusLabels(data?.status)}
              style={{
                backgroundColor:
                  data?.status === "done"
                    ? "rgba(117, 191, 255, 0.34)"
                    : data?.status === "pending"
                      ? "rgba(233, 248, 131, 0.32)"
                      : data?.status === "in_progress"
                        ? "rgba(215, 124, 248, 0.12)"
                        : data?.status === "accepted"
                          ? "rgba(249, 125, 249, 0.12)"
                          : data?.status === "rejected"
                            ? "rgba(254, 138, 138, 0.12)"
                            : //  data?.status === "completed" ? "rgba(189, 241, 94, 0.21)" :
                              //  data?.status === "cancelled" ? "rgba(249, 170, 125, 0.23)" :
                              data?.status === "quote_received"
                              ? "rgba(114, 208, 242, 0.12)"
                              : //  data?.status === "quote_accepted" ? "rgba(113, 241, 239, 0.12)" :
                                data?.status === "quote_rejected"
                                ? "rgba(250, 138, 173, 0.12)"
                                : data?.status === "quote_send"
                                  ? "rgba(139, 136, 242, 0.16)"
                                  : "#EF47701A", // default background color

                color:
                  data?.status === "done"
                    ? "rgb(64, 0, 255)"
                    : data?.status === "pending"
                      ? "rgb(255, 225, 0)"
                      : data?.status === "in_progress"
                        ? "rgba(196, 6, 243, 0.94)"
                        : data?.status === "accepted"
                          ? "rgba(241, 0, 253, 0.12)"
                          : data?.status === "rejected"
                            ? "rgba(255, 2, 2, 0.93)"
                            : //  data?.status === "completed" ? "rgba(190, 241, 94, 0.6)" :
                              //  data?.status === "cancelled" ? "rgba(249, 170, 125, 0.72)" :
                              data?.status === "quote_received"
                              ? "rgba(114, 208, 242, 0.75)"
                              : //  data?.status === "quote_accepted" ? "rgba(113, 241, 239, 0.84)" :
                                data?.status === "quote_rejected"
                                ? "rgba(250, 138, 173, 0.71)"
                                : data?.status === "quote_send"
                                  ? "rgba(140, 136, 242, 0.86)"
                                  : "#EB194C", // default text color
              }}
              // style={{
              //   backgroundColor: "rgba(254,191,6,0.12)",
              //   color: "#febf06",
              // }}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default WorkshopProfileTableRow;
