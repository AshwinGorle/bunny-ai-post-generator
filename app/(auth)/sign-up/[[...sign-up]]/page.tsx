import { SignUp } from "@clerk/nextjs";
import {dark} from "@clerk/themes";
export default function Page() {
 
  return (
     <div className="flex items-center justify-center h-screen bg-black">
         <SignUp appearance={{baseTheme: dark}}  routing="hash" />
    </div>
    );
}