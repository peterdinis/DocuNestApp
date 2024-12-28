import AuthWrapper from "@/app/_components/auth/AuthWrapper";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<AuthWrapper>
			<SignIn />;
		</AuthWrapper>
	);
}
