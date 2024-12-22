import type { NextPage } from "next";
import HomeServices from "./components/home/HomeServices";
import HomeWrapper from "./components/home/HomeWrapper";
import Footer from "./components/shared/Footer";

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
