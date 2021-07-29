import { SignIn } from "@clerk/clerk-react";
export default function SignInPage() {
  return <SignIn path="/auth/sign-in" routing="path" signUpURL="/auth/sign-up" />;
}