import ImageSelector from "../../../components/ImageSelector.jsx";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Chip from "@mui/material/Chip";
import { Paragraph } from "../../../components/typography/index.jsx";
import Typography from "@mui/material/Typography";
import GoogleMaps from "../../../components/GoogleMaps.jsx";
import Timeline from "../../../components/Timeline.jsx";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooking } from "../request.js";

import { utils } from "../../../utils/functionUtils.js";
import { format } from "date-fns";
import BookingDetailSkeleton from "@/components/loader/BookingDetailSkeleton.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import dumyImg from '../../../assets/imageeee.jpg'

export default function BookingDetailView() {
  const theme = useTheme();
  const isRtl = theme.direction === "rtl"; // Check if the
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
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  // console.log({ id });

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await getBooking(id);
      // console.log(response);
      if (response.success) {
        setdata(response.data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const formatDateTime = (dateString) => {
    if (!dateString) {
      return ""; // or any default value you want to return in case of missing date
    }
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy, h:mm a");
  };

  // const formatDateTime = (dateString) => {
  //   console.log({ dateString });
  //   const date = new Date(dateString);
  //   return format(date, "dd MMM yyyy, h:mm a");
  // };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <BookingDetailSkeleton />
      ) : (
        // <Paragraph> Loading....</Paragraph>
        <>
          <Card>
            <Box>
              {isRtl ? (
                <KeyboardArrowRight
                  sx={{
                    color: "#6B7280",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                  fontSize="large"
                  onClick={() => navigate(`/bookings-list`)}
                />
              ) : (
                <KeyboardArrowLeft
                  sx={{
                    color: "#6B7280",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                  fontSize="large"
                  onClick={() => navigate(`/bookings-list`)}
                />
              )}
              <Grid container p={2} spacing={3}>
                <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                   <ImageSelector images={data.images} /> 
                  {/* <Avatar src={data?.images ? data?.images
                     : 
                      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} /> */}
                </Grid>
                <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                  <Box>
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
                                    : // data?.status === "completed" ? "rgba(189, 241, 94, 0.21)" :
                                      data?.status === "cancelled"
                                      ? "rgba(249, 170, 125, 0.23)"
                                      : data?.status === "quote_received"
                                        ? "rgba(114, 208, 242, 0.12)"
                                        : // data?.status === "quote_accepted" ? "rgba(113, 241, 239, 0.12)" :
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
                                  ? "rgb(240, 0, 253)"
                                  : data?.status === "rejected"
                                    ? "rgba(255, 2, 2, 0.93)"
                                    : // data?.status === "completed" ? "rgba(190, 241, 94, 0.6)" :
                                      data?.status === "cancelled"
                                      ? "rgba(249, 170, 125, 0.72)"
                                      : data?.status === "quote_received"
                                        ? "rgba(114, 208, 242, 0.75)"
                                        : // data?.status === "quote_accepted" ? "rgba(113, 241, 239, 0.84)" :
                                          data?.status === "quote_rejected"
                                          ? "rgba(250, 138, 173, 0.71)"
                                          : data?.status === "quote_send"
                                            ? "rgba(140, 136, 242, 0.86)"
                                            : "#EB194C", // default text color
                      }}
                    />
                  </Box>
                  <Paragraph sx={{ color: "#6B7280", marginTop: "20px" }}>
                    {/* {data?.updated_at} */}
                    {/* {formatDateTime(data?.updated_at) || data?.created_at} */}
                    {formatDateTime(data?.updated_at || data?.created_at) ||
                      "No Date Available"}

                    {/* {utils.formatDateTime(data?.updated_at) || "data?.created_at"} */}
                  </Paragraph>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontWeight: "bold", marginTop: "10px" }}
                  >
                    {data.booking_timelines[0]?.booking_id
                      ? data.booking_timelines[0]?.booking_id
                      : "N/A"}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: "#6950E8",
                      marginTop: "10px",
                    }}
                  >
                    {data?.booking_amount ? `${data?.booking_amount}BHD` : "-"}
                  </Typography>
                  <Box sx={{ marginTop: "10px" }}>
                    <Paragraph sx={{ color: "#6B7280" }}>
                      {data?.service?.description}
                    </Paragraph>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "15px",
                      }}
                    >
                      <Paragraph
                        sx={{
                          color: "#6B7280",
                          maxWidth: "100px",
                          width: "100%",
                        }}
                      >
                        {t("car")}
                      </Paragraph>
                      <Paragraph sx={{ color: "#6B7280" }}>
                        {data?.car?.car?.maker?.name +
                          " " +
                          data?.car?.car?.model?.name +
                          " " +
                          data?.car?.car?.year?.year}
                      </Paragraph>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Paragraph
                        sx={{
                          color: "#6B7280",
                          maxWidth: "100px",
                          width: "100%",
                        }}
                      >
                        {t("location")}
                      </Paragraph>
                      <Paragraph sx={{ color: "#6B7280" }}>
                        {data?.workshop?.location?.address
                          ? data?.workshop?.location?.address
                          : "N/A"}
                      </Paragraph>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "15px",
                      }}
                    >
                      <Paragraph
                        sx={{
                          color: "#6B7280",
                          maxWidth: "100px",
                          width: "100%",
                        }}
                      >
                        {t("Information")}
                      </Paragraph>
                      <Paragraph sx={{ color: "#6B7280" }}>
                        <Paragraph>
                          {data?.issue_description
                            ? data?.issue_description
                            : "N/A"}
                        </Paragraph>
                      </Paragraph>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
          <Grid container py={2} spacing={3}>
            <Grid size={{ md: 8, sm: 12, xs: 12 }}>
              <Card sx={{ borderRadius: "16px" }}>
                <Box sx={{ backgroundColor: "#F3F4F6", padding: "20px" }}>
                  <Paragraph>{t("map")}</Paragraph>
                </Box>
                <GoogleMaps
                  lat={
                    data?.workshop?.location?.latitude
                      ? data?.workshop?.location?.latitude
                      : "N/A"
                  }
                  lng={
                    data?.workshop?.location?.longitude
                      ? data?.workshop?.location?.longitude
                      : "N/A"
                  }
                />
              </Card>
            </Grid>

            {/* {data?.booking_items?.service?.is_enabled === 1 ? "": ""} */}
            <Grid size={{ md: 4, sm: 12, xs: 12 }}>
              {/* if the towing is enable data will showing */}
              {data?.is_towing === 0 ? (
              <Card sx={{ borderRadius: "16px" }}>
                <Box sx={{ backgroundColor: "#F3F4F6", padding: "20px" }}>
                  <Paragraph sx={{ color: "#6B7280" }}>
                    {t("workshop")}
                  </Paragraph>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Box>
                    <Paragraph>
                      {data?.workshop?.owner?.first_name
                        ? data?.workshop?.owner?.first_name
                        : "N/A"}
                    </Paragraph>
                    <Paragraph>
                      {data?.workshop?.owner?.phone_number
                        ? data?.workshop?.owner?.phone_number
                        : ""}
                    </Paragraph>
                  </Box>
                  <Box>
                    <Chip
                      size="small"
                      label={statusLabels(
                        data?.workshop_status ? data?.workshop_status : "N/A"
                      )}
                      // label={statusLabels(data?.workshop_status) || ""}

                      style={{
                        backgroundColor:
                          data?.workshop_status === "done"
                            ? "rgba(117, 191, 255, 0.34)"
                            : data?.workshop_status === "pending"
                              ? "rgba(233, 248, 131, 0.32)"
                              : data?.workshop_status === "in_progress"
                                ? "rgba(215, 124, 248, 0.12)"
                                : data?.workshop_status === "accepted"
                                  ? "rgba(249, 125, 249, 0.12)"
                                  : data?.workshop_status === "rejected"
                                    ? "rgba(254, 138, 138, 0.12)"
                                    : //data?.workshop_status === "completed" ? "rgba(189, 241, 94, 0.21)" :
                                      data?.workshop_status === "cancelled"
                                      ? "rgba(249, 170, 125, 0.23)"
                                      : data?.workshop_status ===
                                          "quote_received"
                                        ? "rgba(114, 208, 242, 0.12)"
                                        : //data?.workshop_status === "quote_accepted" ? "rgba(113, 241, 239, 0.12)" :
                                          data?.workshop_status ===
                                            "quote_rejected"
                                          ? "rgba(250, 138, 173, 0.12)"
                                          : data?.workshop_status ===
                                              "quote_send"
                                            ? "rgba(139, 136, 242, 0.16)"
                                            : "#EF47701A", // default background color

                        color:
                          data?.workshop_status === "done"
                            ? "rgb(64, 0, 255)"
                            : data?.workshop_status === "pending"
                              ? "rgb(255, 225, 0)"
                              : data?.workshop_status === "in_progress"
                                ? "rgba(196, 6, 243, 0.94)"
                                : data?.workshop_status === "accepted"
                                  ? "rgb(240, 0, 253)"
                                  : data?.workshop_status === "rejected"
                                    ? "rgba(255, 2, 2, 0.93)"
                                    : //data?.workshop_status === "completed" ? "rgba(190, 241, 94, 0.6)" :
                                      data?.workshop_status === "cancelled"
                                      ? "rgba(249, 170, 125, 0.72)"
                                      : data?.workshop_status ===
                                          "quote_received"
                                        ? "rgba(114, 208, 242, 0.75)"
                                        : //data?.workshop_status === "quote_accepted" ? "rgba(113, 241, 239, 0.84)" :
                                          data?.workshop_status ===
                                            "quote_rejected"
                                          ? "rgba(250, 138, 173, 0.71)"
                                          : data?.workshop_status ===
                                              "quote_send"
                                            ? "rgba(140, 136, 242, 0.86)"
                                            : "#EB194C", // default text color
                      }}
                    />
                  </Box>
                </Box>
              </Card>
              ) : (
                ""
              )}  

              {/* jab towing toggle off ho tbh nahi ana chaiye  */}
              {data.is_towing === 1 && (
  <>
    {/* Workshop Card */}
    { data?.workshop?.owner?.first_name && (
      <Card sx={{ borderRadius: "16px" }}>
      <Box sx={{ backgroundColor: "#F3F4F6", padding: "20px" }}>
        <Paragraph sx={{ color: "#6B7280" }}>
          {t("workshop")}
        </Paragraph>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Box>
          <Paragraph>
            {data?.workshop?.owner?.first_name || "N/A"}
          </Paragraph>
          <Paragraph>
            {data?.workshop?.owner?.phone_number
              ? `${data?.workshop?.owner?.phone_number}`
              : ""}
          </Paragraph>
        </Box>
        <Box>
          <Chip
            size="small"
            label={statusLabels(data?.workshop_status || "N/A")}
            style={{
              backgroundColor:
                data?.workshop_status === "done"
                  ? "rgba(117, 191, 255, 0.34)"
                  : data?.workshop_status === "pending"
                  ? "rgba(233, 248, 131, 0.32)"
                  : data?.workshop_status === "in_progress"
                  ? "rgba(215, 124, 248, 0.12)"
                  : data?.workshop_status === "accepted"
                  ? "rgba(249, 125, 249, 0.12)"
                  : data?.workshop_status === "rejected"
                  ? "rgba(254, 138, 138, 0.12)"
                  : data?.workshop_status === "cancelled"
                  ? "rgba(249, 170, 125, 0.23)"
                  : data?.workshop_status === "quote_received"
                  ? "rgba(114, 208, 242, 0.12)"
                  : data?.workshop_status === "quote_rejected"
                  ? "rgba(250, 138, 173, 0.12)"
                  : data?.workshop_status === "quote_send"
                  ? "rgba(139, 136, 242, 0.16)"
                  : "#EF47701A", // default background color
              color:
                data?.workshop_status === "done"
                  ? "rgb(64, 0, 255)"
                  : data?.workshop_status === "pending"
                  ? "rgb(255, 225, 0)"
                  : data?.workshop_status === "in_progress"
                  ? "rgba(196, 6, 243, 0.94)"
                  : data?.workshop_status === "accepted"
                  ? "rgb(240, 0, 253)"
                  : data?.workshop_status === "rejected"
                  ? "rgba(255, 2, 2, 0.93)"
                  : data?.workshop_status === "cancelled"
                  ? "rgba(249, 170, 125, 0.72)"
                  : data?.workshop_status === "quote_received"
                  ? "rgba(114, 208, 242, 0.75)"
                  : data?.workshop_status === "quote_rejected"
                  ? "rgba(250, 138, 173, 0.71)"
                  : data?.workshop_status === "quote_send"
                  ? "rgba(140, 136, 242, 0.86)"
                  : "#EB194C", // default text color
            }}
          />
        </Box>
      </Box>
    </Card>
    )}
    

    {/* Driver Request Card */}
    <Card sx={{ borderRadius: "16px", marginTop: "20px" }}>
      <Box sx={{ backgroundColor: "#F3F4F6", padding: "20px" }}>
        <Paragraph sx={{ color: "#6B7280" }}>
          {t("driver_request")}
        </Paragraph>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Box>
          <Paragraph>
            {data?.truck_driver?.first_name && data?.truck_driver?.last_name
              ? `${data?.truck_driver?.first_name} ${data?.truck_driver?.last_name}`
              : `${t("The driver’s information will appear once they accept the request.")}`}
          </Paragraph>
          <Paragraph>
            {data?.truck_driver?.phone_number || ""}
          </Paragraph>
        </Box>

        {/* The Paragraph will take full space if the chip is not rendered */}
        {data?.truck_driver?.first_name && data?.truck_driver?.last_name && (
          <Box>
            <Chip
              size="small"
              label={statusLabels(data?.truck_driver_status)}
              style={{
                backgroundColor:
                  data?.truck_driver_status === "done"
                    ? "rgba(117, 191, 255, 0.34)"
                    : data?.truck_driver_status === "pending"
                    ? "rgba(233, 248, 131, 0.32)"
                    : data?.truck_driver_status === "in_progress"
                    ? "rgba(215, 124, 248, 0.12)"
                    : data?.truck_driver_status === "accepted"
                    ? "rgba(249, 125, 249, 0.12)"
                    : data?.truck_driver_status === "rejected"
                    ? "rgba(254, 138, 138, 0.12)"
                    : data?.truck_driver_status === "cancelled"
                    ? "rgba(249, 170, 125, 0.23)"
                    : data?.truck_driver_status === "quote_received"
                    ? "rgba(114, 208, 242, 0.12)"
                    : data?.truck_driver_status === "quote_rejected"
                    ? "rgba(250, 138, 173, 0.12)"
                    : data?.truck_driver_status === "quote_send"
                    ? "rgba(139, 136, 242, 0.16)"
                    : "#EF47701A", // default background color
                color:
                  data?.truck_driver_status === "done"
                    ? "rgb(64, 0, 255)"
                    : data?.truck_driver_status === "pending"
                    ? "rgb(255, 225, 0)"
                    : data?.truck_driver_status === "in_progress"
                    ? "rgba(196, 6, 243, 0.94)"
                    : data?.truck_driver_status === "accepted"
                    ? "rgb(240, 0, 253)"
                    : data?.truck_driver_status === "rejected"
                    ? "rgba(255, 2, 2, 0.93)"
                    : data?.truck_driver_status === "cancelled"
                    ? "rgba(249, 170, 125, 0.72)"
                    : data?.truck_driver_status === "quote_received"
                    ? "rgba(114, 208, 242, 0.75)"
                    : data?.truck_driver_status === "quote_rejected"
                    ? "rgba(250, 138, 173, 0.71)"
                    : data?.truck_driver_status === "quote_send"
                    ? "rgba(140, 136, 242, 0.86)"
                    : "#EB194C", // default text color
              }}
            />
          </Box>
        )}
      </Box>
    </Card>
  </>
)}

            </Grid>
          </Grid>
          <Grid container py={2} spacing={3}>
            <Grid size={{ md: 8, sm: 12, xs: 12 }}>
              <Card sx={{ borderRadius: "16px" }}>
                <Box sx={{ backgroundColor: "#F3F4F6", padding: "20px" }}>
                  <Paragraph>{t("timeline")}</Paragraph>
                </Box>
                {}
                <Timeline
                  timeline={
                    data?.booking_timelines ? data?.booking_timelines : "N/A"
                  }
                  booking={data ? data : {}}
                  isRtl={isRtl}
                />
              </Card>
            </Grid>
            <Grid size={{ md: 4, sm: 12, xs: 12 }}>
              <Card sx={{ borderRadius: "16px" }}>
                <Box sx={{ backgroundColor: "#F3F4F6", padding: "20px" }}>
                  <Paragraph sx={{ color: "#6B7280" }}>
                    {t("services")}
                  </Paragraph>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <Avatar
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "10px",
                      }}
                      src={
                        data?.booking_items[0]?.service?.image
                          ? data?.booking_items[0]?.service?.image
                          : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      // src={data.images[0]}
                      //src={data?.service?.image}
                      //    src={
                      //      data?.service?.image ||
                      //     "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                      //  }
                      alt=""
                    />
                    {/* {data?.creator?.first_name? data?.creator?.first_name : "N/A"} */}
                    <Paragraph>
                      {data?.booking_items[0]?.service?.name
                        ? data?.booking_items[0]?.service?.name
                        : "N/A"}
                    </Paragraph>
                  </Box>
                  <Box>
                    <Paragraph></Paragraph>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Box>
                    <Paragraph sx={{ fontWeight: "bold" }}>
                      {t("total")}
                    </Paragraph>
                  </Box>
                  <Box>
                    <Paragraph>
                      {data?.booking_timelines?.[0]?.quote_amount ||
                        data?.booking_timelines?.[1]?.quote_amount ||
                        data?.booking_timelines?.[2]?.quote_amount ||
                        data?.booking_timelines?.[3]?.quote_amount ||
                        data?.booking_timelines?.[4]?.quote_amount ||
                        data?.booking_timelines?.[5]?.quote_amount ||
                        data?.booking_timelines?.[6]?.quote_amount ||
                        data?.booking_timelines?.[7]?.quote_amount ||
                        data?.booking_timelines?.[8]?.quote_amount ||
                        "N/A"}

                      {/* {data?.booking_items[0]?.service?.estimated_cost
                        ? `${data?.booking_items[0]?.service?.estimated_cost}BHD`
                        : "N/A"} */}
                    </Paragraph>
                    {/* before comment */}
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
