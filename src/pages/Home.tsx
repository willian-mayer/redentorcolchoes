import BannerCTA from "../components/Banner";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import ValoresSection from "../components/ValoresSection";

function Home() {
  return (
    <>
      <Hero />
      <ValoresSection />
      <Testimonials />
      <BannerCTA />
    </>
  );
}

export default Home;
