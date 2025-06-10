import React from "react";
import { utils } from "../utils/functionUtils";
import { useTheme } from "@mui/material/styles";

const Timeline = (props) => {
  console.log('new props', props);

  const theme = useTheme();
  const isRtl = theme.direction === "rtl"; // Check if the theme direction is RTL

  // Timeline Styles
  const styles = {
    timeline: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      paddingLeft: "20px",
      margin: "20px 0",
    },
    timelineLine: {
      content: '""',
      position: "absolute",
      top: "5px",
      bottom: 0,
      width: "2px",
      backgroundColor: "#dcdcdc",
      marginRight: isRtl ? "10px" : "0px",
    },
    timelineItem: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "20px",
      position: "relative",
    },
    timelineCircle: {
      width: "14px",
      height: "12px",
      maxWidth: "12px",
      border: "2px solid #7e7e7e",
      borderRadius: "50%",
      backgroundColor: "white",
      position: "relative",
      top: "5px",
      left: "-5px",
      marginLeft: isRtl ? "16px" : "0px",
    },
    timelineContent: {
      marginLeft: "15px",
    },
    title: {
      fontSize: "16px",
      margin: "0",
      color: "#333",
    },
    time: {
      fontSize: "14px",
      color: "#888",
    },
  };

  // Sort timeline data by updated_at in descending order
  const sortedTimeline = props?.timeline?.sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  // Custom stage order
  const stageOrder = [
    "Placed order",
    "Pickup by truck driver",
    "Drop off by truck driver",
    "Reached at workshop",
    "Issue One",
    "Payment done",
    "Finalized",
  ];

  // Rearranging sorted timeline based on the custom stage order
  const reorderedTimeline = stageOrder
    .map((stage) => sortedTimeline.find((item) => item.stage === stage))
    .filter(Boolean);

  // If both "Issue One" and "Finalized" are found, ensure they're at the correct positions
  const issueOneIndex = reorderedTimeline.findIndex(item => item.stage === "Issue One");
  const finalizedIndex = reorderedTimeline.findIndex(item => item.stage === "Finalized");

  if (issueOneIndex > -1 && finalizedIndex > -1) {
    const issueOneItem = reorderedTimeline.splice(issueOneIndex, 1)[0];
    const finalizedItem = reorderedTimeline.splice(finalizedIndex - (issueOneIndex < finalizedIndex ? 1 : 0), 1)[0];
    
    reorderedTimeline.push(finalizedItem); // "Finalized" at the end
    reorderedTimeline.splice(reorderedTimeline.length - 1, 0, issueOneItem); // "Issue One" second-to-last
  }

  return (
    <>
      <div style={styles.timeline}>
        {reorderedTimeline.length > 0 ? (
          <>
            <div style={styles.timelineLine}></div>
            {reorderedTimeline.map((item, index) => (
              <div style={styles.timelineItem} key={index}>
                <div style={styles.timelineCircle}></div>
                <div style={styles.timelineContent}>
                  <h3 style={styles.title}>
                    {isRtl ? `${item?.translation || ""}` : `${item?.stage || ""}`}
                  </h3>
                  {item?.quote_amount && (
                    <>
                      <span style={styles.title}>{item?.quote_amount}</span>
                      <br />
                    </>
                  )}
                  {props?.booking?.quote_description && item?.stage === "Issue One" && (
                    <>
                      <span style={styles.title}>
                        {props?.booking?.quote_description || ""}
                      </span>
                      <br />
                    </>
                  )}
                  <span style={styles.time}>
                    {utils.formatDateTime(item?.updated_at) || "Invalid date"}
                  </span>
                  <div style={styles.description}>
                    {item?.status
                      ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                      : "No Status Available"}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No timeline data available.</p>
        )}
      </div>
    </>
  );
};

export default Timeline;
