"use server";

import { revalidatePath } from "next/cache";
import {  Customer, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, city, country, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      city,
      country,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, city, country, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      country,
      city,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};


//customer

export const addCustomer = async (formData) => {
  const { name, email, phone, city, country, account, isActive } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const newCustomer = new Customer({
      name,
      email,
      phone,
      city,
      country,
      account,
      isActive: isActive === "true" ? true : false,
    });
    await newCustomer.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create customer!");
  }

  // Revalidate and redirect
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

export const updateCustomer = async (formData) => {
  const { id, name, email, phone, city, country, account, isActive } = Object.fromEntries(formData);

  try {
    await connectToDB();

    const updateFields = {
      name,
      email,
      phone,
      city,
      country,
      account,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );

    await Customer.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update customer!");
  }

  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

export const deleteCustomer = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    await Customer.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete customer!");
  }

  revalidatePath("/dashboard/customers");
};

// The existing authenticate function remains unchanged


export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};