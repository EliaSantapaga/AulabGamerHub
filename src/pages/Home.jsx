import HomeHeader from "../components/HomeHeader";
import HomeCards from "../components/HomeCards";
import HomeTrailer from "../components/HomeTrailer";
import AppLayout from "../layout/AppLayout";
// import HomeSlider from "../components/HomeSlider";

function Home() {
  return (
    <AppLayout>
      <HomeHeader />

      <div className="space"></div>
      <div className="space"></div>

      {/* <HomeSlider /> */}

      <HomeCards />

      <HomeTrailer />
    </AppLayout>
  );
}

export default Home;
