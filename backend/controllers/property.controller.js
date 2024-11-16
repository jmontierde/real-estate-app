import prisma from "../lib/prisma.js";

export const newProperty = async (req, res) => {
  try {
    const { address, propertyType, price, bedroom } = req.body;

    const property = await prisma.property.create({
      data: {
        address: address,
        propertyType: propertyType,
        price: price,
        bedroom: bedroom,
      },
    });

    res.status(200).json({ message: "Added Property Successfully", property });
  } catch (error) {
    console.log(error);
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany();

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
