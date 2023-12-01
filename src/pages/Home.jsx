import HomeHeader from "../components/HomeHeader";
import HomeCards from "../components/HomeCards";
import HomeTrailer from "../components/HomeTrailer";
import AppLayout from "../layout/AppLayout";

function Home() {
  return (
    <AppLayout>
      <HomeHeader />

      <div className="space"></div>
      <div className="space"></div>

      <HomeCards />

      <HomeTrailer />
    </AppLayout>
  );
}

export default Home;
