"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../../utils";
import Truck from '../../models';
import { revalidatePath } from "next/cache";


export const addTruck = async (formData) => {
  const { truck_reg, make, year, transporter } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const newTruck = new Truck({
      truck_reg,
      make,
      year,
      transporter,
    });
    await newTruck.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create truck!");
  }

  revalidatePath("/dashboard/trucks");
  redirect("/dashboard/trucks");
};

export const updateTruck = async (formData) => {
  const { id, truck_reg, make, year, transporter } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const updateFields = { truck_reg, make, year, transporter };
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );
    await Truck.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update truck!");
  }

  revalidatePath("/dashboard/trucks");
  redirect("/dashboard/trucks");
};

export const deleteTruck = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    await Truck.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete truck!");
  }

  revalidatePath("/dashboard/trucks");
};
