import { NextPage } from "next";
import { RegisterForm } from "../_components/auth/RegisterForm";

const SignUpPage: NextPage = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RegisterForm />
            </div>
        </div>
    )
}

export default SignUpPage