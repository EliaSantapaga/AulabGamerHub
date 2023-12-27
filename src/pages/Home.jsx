import HomeHeader from '../components/HomeHeader';
import HomeCards from '../components/HomeCards';
import HomeTrailer from '../components/HomeTrailer';
import AppLayout from '../layout/AppLayout';
import Space from '../components/Layout/Space';

function Home() {
  return (
    <AppLayout>
      <HomeHeader />

      <Space />
      <Space />

      <HomeCards />

      <HomeTrailer />
    </AppLayout>
  );
}

export default Home;
