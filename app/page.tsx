import Hero from './components/Hero';
import Categories from './components/sections/Categories';
import BestSelling from './components/sections/BestSelling';
import Featured from './components/sections/Featured';
import Trending from './components/sections/Trending';
import RecentlyPurchased from './components/sections/RecentlyPurchased';
import Reviews from './components/sections/Reviews';
import SupportSection from './components/sections/SupportSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <BestSelling />
      <Featured />
      <Trending />
      <RecentlyPurchased />
      <Reviews />
      <SupportSection />
    </main>
  );
}