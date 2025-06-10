import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // MUI
import Chip from "@mui/material/Chip";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell"; // MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline"; // CUSTOM COMPONENTS

import FlexBox from "@/components/flexbox/FlexBox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import { useTranslation } from "react-i18next";
import { utils } from "../../../utils/functionUtils";

const CustomerProfileTableRow = (props) => {
  const { t } = useTranslation();
  const { data, isSelected, handleSelectRow, role, handleDeleteUser } = props;
  // console.log({ role }, "CustomerProfileTableRow");

  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuEl(event.currentTarget);
  };

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
  const handleCloseOpenMenu = () => setOpenMenuEl(null);
  // console.log(`customer profile `, props);
  return (
    <>
      {" "}
      {role === "car" ? (
        <TableRow
          onClick={() =>
            navigate(`/dashboard/bookings-detail?id=${booking.id}`)
          }
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
              <Avatar
                src={data?.image ? data?.image : ""}
                style={{ height: "50px", width: "50px", borderRadius: "10px" }}
              />
              <div>
                <Paragraph fontSize={13}>
                  {data?.maker?.name + " " + data?.model?.name}
                  {/* {data?.car?.car?.maker?.name 
                  +
                    " " +
                    data?.car?.car?.model?.name 
                  } */}
                </Paragraph>
              </div>
            </FlexBox>
          </TableCell>
          <TableCell sx={{ paddingLeft: "1rem" }}>
            {data?.number_plate}
            {/* {data?.car?.number_plate} */}
          </TableCell>

          <TableCell padding="normal">
            {data?.maker?.name}
            {/* {data?.car?.car?.maker?.name} */}
          </TableCell>

          <TableCell padding="normal">
            {data?.model?.name}
            {/* {data?.car?.car?.model?.name} */}
          </TableCell>

          <TableCell padding="normal">
            {data?.year?.year}
            {/* {data?.car?.car?.year?.year} */}
          </TableCell>
        </TableRow>
      ) : (
        <TableRow
          onClick={() =>
            navigate(`/dashboard/bookings-detail?id=${booking.id}`)
          }
          hover
          sx={{ cursor: "pointer" }}
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

          <TableCell padding="normal">
            {" "}
            {data?.car?.car?.maker?.name +
              " " +
              data?.car?.car?.model?.name +
              " " +
              data?.car?.car?.year?.year}
          </TableCell>
          <TableCell style={{ paddingLeft: "15px" }}>
            {data?.workshop?.owner?.first_name ||
            data?.workshop?.owner?.last_name
              ? `${data?.workshop?.owner?.first_name} ${data?.workshop?.owner?.last_name}`
              : "-"}
          </TableCell>

          <TableCell padding="normal">
            {props.data?.booking_items
              ? props.data?.booking_items[0]?.service?.estimated_cost
                ? props.data?.booking_items[0]?.service?.estimated_cost
                : " N/A"
              : " N/A"}
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
                            : data?.status === "completed"
                              ? "rgba(189, 241, 94, 0.21)"
                              : data?.status === "cancelled"
                                ? "rgba(249, 170, 125, 0.23)"
                                : data?.status === "quote_received"
                                  ? "rgba(114, 208, 242, 0.12)"
                                  : data?.status === "quote_accepted"
                                    ? "rgba(113, 241, 239, 0.12)"
                                    : data?.status === "quote_rejected"
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
                            : data?.status === "completed"
                              ? "rgba(190, 241, 94, 0.6)"
                              : data?.status === "cancelled"
                                ? "rgba(249, 170, 125, 0.72)"
                                : data?.status === "quote_received"
                                  ? "rgba(114, 208, 242, 0.75)"
                                  : data?.status === "quote_accepted"
                                    ? "rgba(113, 241, 239, 0.84)"
                                    : data?.status === "quote_rejected"
                                      ? "rgba(250, 138, 173, 0.71)"
                                      : data?.status === "quote_send"
                                        ? "rgba(140, 136, 242, 0.86)"
                                        : "red", // default text color
              }}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CustomerProfileTableRow;
