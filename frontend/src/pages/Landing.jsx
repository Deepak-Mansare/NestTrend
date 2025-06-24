import { Link } from "react-router-dom";
import bgImg from "../assets/landing-bg.jpg";

function Landing() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 text-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-3xl max-h-full overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow">
          Welcome to <span className="text-rose-700 font-bold">NestTrend</span>
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 leading-relaxed drop-shadow">
          Discover the latest fashion trends for Men, Women and Kids
          <br />
          From everyday essentials to standout pieces, we bring you comfort and
          style
          <br />
          Shop now and redefine your wardrobe with NestTrend
        </p>
        <Link
          to="/products"
          className="inline-block bg-rose-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition"
        >
          Explore products
        </Link>
      </div>
    </div>
  );
}
export default Landing;
