import Navbar from "@/components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Company_overview from "./components/Company_overview";
import CoreServices from "./components/CoreServices";
import Footer from "@/components/Footer";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="pt-20"> 
        <Jumbotron />
        <Company_overview />
        <Testimonials />
        <CoreServices />
        <Footer />
      </div>
      
    </div>
  );
}
