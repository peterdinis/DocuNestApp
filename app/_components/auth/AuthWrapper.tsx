"use client"

import { FC, ReactNode } from "react"

type AuthWrapperProps = {
    children?: ReactNode;
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
    return (
        <div className="flex justify-center items-center mt-10">
            {children}
        </div>
    )
}

export default AuthWrapper