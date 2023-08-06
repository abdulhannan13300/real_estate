import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating User");

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else {
    res.status(201).json({ message: "User already registered" });
  }
});

//To book a visit ot the property
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This property is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("Your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//To get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

//To cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      //This will delete an entry found in index.
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("Booking Cancelled Succesfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

//Add or delete a property to or from the favourite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { resID } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    //If the resID is present then it will delete it or if not then it will add it to the favourite list
    if (user.favResidenciesID.includes(resID)) {
      const updateUser = await prisma.user.update({
        where: { email: email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== resID),
          },
        },
      });
      res.send({ message: "Removed from favourites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: resID,
          },
        },
      });
      res.send({ message: "Updated favourites", user: updateUser });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

//Get all the fovourite properties
export const favouriteList = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favList = await prisma.user.findUnique({
      where: { email: email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favList);
  } catch (error) {
    throw new Error(error.message);
  }
});
