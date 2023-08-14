import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
   baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
   try {
      const response = await api.get("/residency/allresd", {
         timeout: 10 * 1000,
      });

      if (response.status === 400 || response.status === 500) {
         throw response.data;
      }
      return response.data;
   } catch (error) {
      toast.error("Something went wrong");
      throw error;
   }
};

export const getProperty = async (id) => {
   try {
      const response = await api.get(`/residency/${id}`, {
         timeout: 10 * 1000,
      });

      if (response.status === 400 || response.status === 500) {
         throw response.data;
      }
      return response.data;
   } catch (error) {
      toast.error("Something went wrong");
      throw error;
   }
};

//user register
export const createUser = async (email, token) => {
   try {
      await api.post(
         `/user/register`,
         { email },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
   } catch (error) {
      toast.error("Something went wrong");
      throw error;
   }
};

//Booking Visit
export const bookVisit = async (date, propertyId, email, token) => {
   try {
      await api.post(
         `/user/bookVisit/${propertyId}`,
         {
            email,
            id: propertyId,
            date: dayjs(date).format("DD/MM/YYYY"),
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
   } catch (error) {
      toast.error("Something went wrong in booking the visit");
      throw error;
   }
};

//Removing the booking
export const removeBooking = async (id, email, token) => {
   try {
      await api.post(
         `/user/removebooking/${id}`,
         {
            email,
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
   } catch (error) {
      toast.error("Something went wrong in cancelling the booked visit");
      throw error;
   }
};

//Add to the Favourite List
export const toFav = async (id, email, token) => {
   try {
      await api.post(
         `/user/tofav/${id}`,
         {
            email,
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
   } catch (error) {
      throw error;
   }
};

// To get the Favourites List of the user
export const getAllFav = async (email, token) => {
   if (!token) return;
   try {
      const res = await api.post(
         `/user/favlist`,
         {
            email,
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      console.log(res);
      return res;
   } catch (error) {
      toast.error("Something went wrong in fetching the favourites list");
      throw error;
   }
};
