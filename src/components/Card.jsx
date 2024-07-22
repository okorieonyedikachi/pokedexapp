import { useNavigate } from "react-router-dom";
import '../styles/card.css'
import pokemonphoto  from '../assets/Eevee _ Pokemon.jpeg'

const Card = ({pokemon}) => {
    const navigate = useNavigate();
  
    const navigateToDetailsPage = (name) => {
       navigate(`/pokemon/${name}`);
      };
        
    return (
      <>
        {pokemon.map((item, index) => {
          return (
            <div
              key={index}
              className="card-container"
              onClick={() => navigateToDetailsPage(item?.name)}
            >
              <div className="text">
                <span className="number">{item?.name ?? " "}</span>
              </div>
              <div className="image-container">
                <img src={pokemonphoto} className="pokemon-image" />
              </div>
            </div>
          );
        })}
      </>
    );
  };
  
  export default Card;