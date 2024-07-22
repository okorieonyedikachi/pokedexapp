import "../styles/heroSection.css";
import background from '../assets/_.jpeg'

const HeroSection = () => {
  return (
    <div className="container">
      <img src={background} className="hero-image" />
    </div>
  );
};

export default HeroSection;
