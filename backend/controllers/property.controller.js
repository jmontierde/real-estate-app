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
      images, // Array of image paths or URLs
      status,
    } = req.body;

    if (!Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ message: "Images should be a non-empty array" });
    }

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const uploadResult = await cloudinary.uploader.upload(image, {
          folder: "real-estate",
        });
        return uploadResult.url;
      })
    );

    console.log("Uploaded Images:", uploadedImages);

    const property = await prisma.property.create({
      data: {
        title,
        description,
        location,
        propertyType,
        price,
        bedroom,
        images: uploadedImages,
        status,
      },
    });

    res.status(200).json({ message: "Added Property Successfully", property });
  } catch (error) {
    console.error("Error adding property:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const { location, propertyType, price, bedroom } = req.query;

    let filter = {};

    if (location) filter.location = location;
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
