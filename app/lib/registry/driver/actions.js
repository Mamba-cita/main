"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../../utils";
import Driver from '../../models';
import { redirect } from "next/navigation";



export const addDriver = async (formData) => {
  const { name, email, phone, id_no, dl_no, emp_yr, transporter } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const newDriver = new Driver({
      name,
      email,
      phone,
      id_no,
      dl_no,
      emp_yr,
      transporter,
    });
    await newDriver.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create driver!");
  }

  revalidatePath("/dashboard/drivers");
  redirect("/dashboard/drivers");
};

export const updateDriver = async (formData) => {
  const { id, name, email, phone, id_no, dl_no, emp_yr, transporter } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const updateFields = { name, email, phone, id_no, dl_no, emp_yr, transporter };
    Object.keys(updateFields).forEach(
      (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );
    await Driver.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update driver!");
  }

  revalidatePath("/dashboard/drivers");
  redirect("/dashboard/drivers");
};

export const deleteDriver = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    await Driver.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete driver!");
  }

  revalidatePath("/dashboard/drivers");
};
