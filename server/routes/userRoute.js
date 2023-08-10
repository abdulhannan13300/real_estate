import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  favouriteList,
  getAllBookings,
  toFav,
} from "../controllers/userControllers.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookvisit/:id", bookVisit);
router.get("/allbookings", getAllBookings);
router.post("/removebooking/:id", cancelBooking);
router.post("/tofav/:resID", toFav);
router.get("/favlist", favouriteList);

export { router as userRoute };
