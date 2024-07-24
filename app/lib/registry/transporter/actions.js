"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../../utils";
import Transporter from '../../models';
import { redirect } from "next/navigation"; 



export const addTransporter = async (formData) => {
  const { name, email, tel, country, city, account, isActive } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const newTransporter = new Transporter({
      name,
      email,
      tel,
      country,
      city,
      account,
      isActive,
    });
    await newTransporter.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create transporter!");
  }

  revalidatePath("/dashboard/transporters");
  redirect("/dashboard/transporters");
};

export const updateTransporter = async (formData) => {
  const { id, name, email, tel, country, city, account, isActive } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const updateFields = { name, email, tel, country, city, account, isActive };
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );
    await Transporter.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update transporter!");
  }

  revalidatePath("/dashboard/transporters");
  redirect("/dashboard/transporters");
};

export const deleteTransporter = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    await Transporter.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete transporter!");
  }

  revalidatePath("/dashboard/transporters");
};
