import { SignUp } from "@clerk/clerk-react";
export default function SignUpPage() {
  return <SignUp path="/auth/sign-up" routing="path" signInURL="/auth/sign-in" />;
}