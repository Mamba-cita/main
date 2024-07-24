"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../../utils";
import Trailer from '../../models';
import { redirect } from "next/navigation";


export const addTrailer = async (formData) => {
  const { trailer_reg, trailer_type, ton, year, transporter } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const newTrailer = new Trailer({
      trailer_reg,
      trailer_type,
      ton,
      year,
      transporter,
    });
    await newTrailer.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create trailer!");
  }

  revalidatePath("/dashboard/trailers");
  redirect("/dashboard/trailers");
};

export const updateTrailer = async (formData) => {
  const { id, trailer_reg, trailer_type, ton, year, transporter } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const updateFields = { trailer_reg, trailer_type, ton, year, transporter };
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );
    await Trailer.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update trailer!");
  }

  revalidatePath("/dashboard/trailers");
  redirect("/dashboard/trailers");
};

export const deleteTrailer = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    await Trailer.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete trailer!");
  }

  revalidatePath("/dashboard/trailers");
};
