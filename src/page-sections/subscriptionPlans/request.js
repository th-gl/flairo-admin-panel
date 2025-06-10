import axios from "axios";

export const getServices = async (
  mode,
  perPage,
  page,
  sortOrder = "Desc",
  sortField = "created_at"
) => {
  try {
// If unsort is required (no sortField or sortOrder), reset them
if (!sortField || !sortOrder) {
  sortField = null;
  sortOrder = null;
}

    const response = await axios.get("/services", {
      params: {
        sortOrder,
        page: mode === "bookingMode" ? "" : page + 1,
        perPage: mode === "bookingMode" ? 100 : perPage,
        sortField,
      },
    });
    // console.log({ response });
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



// Sorting: Same function as earlier
export const sortServices = async (sortOrder) => {
  try {
    // const response = await getServices("/services", 10, 1, sortOrder, sortField);
    const response = await getServices("normal", 10, 1, sortOrder);

    // console.log({ response });
    return response;
  } catch (error) {
    console.error("Error sorting services:", error.message);
    throw error;
  }
};

// Unsorting: Reset the sorting by calling getServices with no sortField and no sortOrder
export const unsortServices = async () => {
  try {
    // const response = await getServices("/services", 10, 1, null, null);
    const response = await getServices("normal", 10, 1, null);

    // console.log({ response });
    return response;
  } catch (error) {
    console.error("Error unsorting services:", error.message);
    throw error;
  }
};


export const createServices = async (data) => {
  // console.log({ data });
  try {
    const response = await axios.post("/services", data);
    // console.log({ response });
    if (response.data.success) {
      return { data: response.data.data, success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error creating service", error.message);
    throw error;
  }
};

export const getService = async (id) => {
  try {
    const response = await axios.get(`/services/${id}`);
    // console.log({ response });
    if (response.data.success) {
      return { data: response.data.data, success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error fetching service", error.message);
    throw error;
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await axios.post(`/services/${id}`, data);
    // console.log({ response });
    if (response.data.success) {
      return { data: response.data.data, success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error updating services:", error.message);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`/services/${id}`);
    // console.log({ response });
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

export const deleteMultipleService = async (ids) => {
  // console.log({ ids });
  const data = {
    service_ids: ids,
  };
  try {
    const response = await axios.post(`/delete-multiple-services`, data);
    // console.log({ response });
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