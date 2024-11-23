import prisma from "../lib/prisma.js";
import { v2 as cloudinary } from "cloudinary";

export const newProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      propertyType,
      price,
      bedroom,
      images,
      status,
    } = req.body;

    const uploadProperty = await cloudinary.uploader.upload(images, {
      folder: "real-estate",
    });

    console.log("uploadProperty", uploadProperty);

    const property = await prisma.property.create({
      data: {
        title: title,
        description: description,
        location: location,
        propertyType: propertyType,
        price: price,
        bedroom: bedroom,
        images: uploadProperty.public_id,
        status: status,
      },
    });

    res.status(200).json({ message: "Added Property Successfully", property });
  } catch (error) {
    console.log(error);
  }
};

export const getProperties = async (req, res) => {
  try {
    const { address, propertyType, price, bedroom } = req.query;

    let filter = {};

    if (address) filter.addressF = address;
    if (propertyType) filter.propertyType = propertyType;
    if (price) filter.price = Number(price);
    if (bedroom) filter.bedroom = Number(bedroom);

    const properties = await prisma.property.findMany({ where: filter });

    res.status(200).json({ message: "Get all properties", properties });
  } catch (error) {
    console.log(error);
  }
};

export const getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: { id: id },
    });

    res.status(200).json({ message: "Get property", property });
  } catch (error) {
    console.log(error);
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, propertyType, price, bedroom } = req.body;

    const updatedProperty = await prisma.property.update({
      where: {
        id: id,
      },
      data: {
        address: address,
        propertyType: propertyType,
        price: price,
        bedroom: bedroom,
      },
    });

    res.status(200).json({ message: "Update property", updatedProperty });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.property.delete({ where: { id: id } });

    res.status(201).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
