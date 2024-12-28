import type { NextPage } from "next";
import HomeServices from "./_components/home/HomeServices";
import HomeWrapper from "./_components/home/HomeWrapper";
import Footer from "./_components/shared/Footer";

const Homepage: NextPage = () => {
	return (
		<>
			<HomeWrapper />
			<HomeServices />
			<Footer />
		</>
	);
};

export default Homepage;
