import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//Create a new Property
export const createResidency = asyncHandler(async (req, res) => {
  //   console.log("Endpoint created");
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        //   userEmail field will be connected with the user schema email.
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code == "P2002") {
      //if the condition of unique field is violated the error code is P2002
      throw new Error("A residency with the same address already exists");
    }
    throw new Error(err.message);
  }
});

//Get all the Properties
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

//Get specific property
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (error) {
    throw new Error(error.message);
  }
});
