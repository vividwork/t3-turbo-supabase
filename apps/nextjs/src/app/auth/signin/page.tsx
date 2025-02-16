import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NotebookTextIcon } from "lucide-react";

import { cn } from "@acme/ui";
import { buttonVariants } from "@acme/ui/button";

import { CardWrapper } from "@/app/auth/_components/card-wrapper";
import { SignInForm } from "@/app/auth/_components/sign-in-form";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In to Posts Buddy",
};

export default async function SignInPage() {
  const supabase = createSupabaseServerClient();
  const user = await supabase.auth.getUser();

  if (user.data.user) redirect("/dashboard");
  // implement supabase bucket storing pfps, sidebar navigation for web, shadcn components
  return (
    <>
      <div className="container relative grid min-h-[100dvh] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/auth/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Sign Up
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <Link
            className="relative z-20 flex items-center text-lg font-medium"
            href="/"
          >
            <NotebookTextIcon className="mr-2 h-6 w-6" />
            Notes Buddy
          </Link>
          <div className="relative z-20 mt-auto">
            {/* <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote> */}
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <CardWrapper
              backButtonLabel="No account?"
              backButtonLinkLabel="Sign up"
              backButtonHref="/auth/signup"
              showCredentials
            >
              <SignInForm />
            </CardWrapper>
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/legal/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
