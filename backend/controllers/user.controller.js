// userController.js

import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    console.log("hello world");
    const users = await prisma.user.findMany();
    console.log("users", users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await prisma.user.findUnique({ where: { id } });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not authenticated" });
  }

  try {
    const updateUser = await prisma.user.update({
      where: { id },
      data: body,
    });

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const updatePassword = async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid old password" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateUser = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }, // Remove oldPassword from data
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update password" });
  }
};

export const deleteUser = (req, res) => {
  try {
    // Add your delete logic here
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
