import AuthWrapper from "@/app/_components/auth/AuthWrapper";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<AuthWrapper>
			<SignUp />;
		</AuthWrapper>
	);
}
