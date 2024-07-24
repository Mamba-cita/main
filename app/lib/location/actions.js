"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../utils";
import { Location } from "../models"; 

export const addLocation = async (formData) => {
  const { country, city, depo_name } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const newLocation = new Location({
      country,
      city,
      depo_name,
    });
    await newLocation.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create location!");
  }

  revalidatePath("/dashboard/location");
  redirect("/dashboard/location");
};

export const updateLocation = async (formData) => {
  const { id, country, city, depo_name } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const updateFields = { country, city, depo_name };
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );
    await Location.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update location!");
  }

  revalidatePath("/dashboard/location");
  redirect("/dashboard/location");
};

export const deleteLocation = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    await Location.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete location!");
  }

  revalidatePath("/dashboard/location");
};
