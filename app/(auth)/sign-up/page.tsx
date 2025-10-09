import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams; // used to access search params on server component

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex-center'>
            <Image
              src='/images/logo.svg'
              width={100}
              height={100}
              alt={`${APP_NAME} priority`}
            />
          </Link>
          <CardTitle className='text-center'>Create Account</CardTitle>
          <CardDescription className='text-center'>
            Enter your information below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* FORM HERE */}
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
