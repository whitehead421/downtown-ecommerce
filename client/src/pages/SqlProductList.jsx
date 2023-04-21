import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import SqlProducts from "../components/SqlProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const SqlProductList = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <SqlProducts />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default SqlProductList;
