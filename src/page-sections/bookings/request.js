import axios from "axios";

export const getBookings = async (
  perPage,
  page,
  filterObj,
  sortField,
  sortOrder
) => {
  try {

// If unsort is required (no sortField or sortOrder), reset them
if (!sortField || !sortOrder) {
  sortField = null;
  sortOrder = null;
}



    const response = await axios.get("/bookings", 
      
      {
      params: {
        sortField: "created_at",
  perPage: perPage,
        page: page + 1,
        sortOrder: "Desc",
 status: filterObj.status,
        service_id: filterObj.service_id,
        created_at: filterObj.created_at,
      },
    });
    // console.log({ response }, "getBookietBooking");
    // console.log(response.data.meta.total, "response.data.meta.total");
    if (response.data.success) {
      return {
        data: response.data.data,
        success: true,
        totalRecords: response?.data?.meta?.total,
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error fetching services:", error.message);
    throw error;
  }
};



export const sortBookings = async (sortOrder) => {
  try {
   
    const response = await getBookings("normal", 10, 1, sortOrder);

     console.log({ response });
    return response;
  } catch (error) {
    console.error("Error sorting Booking:", error.message);
    throw error;
  }
};


export const unsortBookings = async () => {
  try {
    
    const response = await getBookings("normal", 10, 1, null);

    console.log({ response });
    return response;
  } catch (error) {
    console.error("Error unsorting booking:", error.message);
    throw error;
  }
};


export const getBooking = async (id) => {
  try {
    const response = await axios.get(`/bookings/${id}`);
    console.log({ response }, "getBooking getBooking");
    if (response.data.success) {
      return { data: response.data.data, success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error fetching services:", error.message);
    throw error;
  }
};
