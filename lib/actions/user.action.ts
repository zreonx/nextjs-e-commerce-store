"use server";

import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

// Sign user out
export async function signOutUser() {
  await signOut();
}

// Sign up user
export async function signUpUser(prev: unknown, formData: FormData) {
  try {

    console.log(Object.fromEntries(formData.entries()))
    // const {
    //   success,
    //   data: user,
    //   error,
    // } = signUpFormSchema.safeParse({
    //   name: formData.get("name"),
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    //   confirmPassword: formData.get("confirmPassword"),
    // });

    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // if (!success) {
    //   console.log(error)
    //   return { success: false, message: JSON.stringify(error, null, 2) };
    // }

    const hashedPassword = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {

    console.log("error", error)
    if (isRedirectError(error)) {
      throw error;

    }
    

    return { success: false, message: formatError(error) };
  }
}
