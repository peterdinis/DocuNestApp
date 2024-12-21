import { NextPage } from "next";
import HomeWrapper from "./components/home/HomeWrapper";
import HomeServices from "./components/home/HomeServices";
import Footer from "./components/shared/Footer";

const Homepage: NextPage = () => {
  return (
    <>
       <HomeWrapper />
       <HomeServices />
       <Footer />
    </>
  )
}

export default Homepage