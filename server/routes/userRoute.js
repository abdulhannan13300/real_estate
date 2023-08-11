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

// router.post("/register", createUser);
router.post("/register", jwtCheck, createUser);

router.post("/bookvisit/:id", jwtCheck, bookVisit);
router.get("/allbookings", getAllBookings);
router.post("/removebooking/:id", jwtCheck, cancelBooking);
router.post("/tofav/:resID", jwtCheck, toFav);
router.get("/favlist", jwtCheck, favouriteList);

export { router as userRoute };
