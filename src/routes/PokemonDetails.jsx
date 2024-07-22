import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { POKEMON_API_URL } from "../constants/index";
import '../styles/pokemonDetails.css'

const PokemonDetails = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPokemonDetail = async () => {
        setLoading(true);
        const response = await axios.get(`${POKEMON_API_URL}${name}`);
        const value = await response.data;
        setPokemon(value);
      };
  
      fetchPokemonDetail();
    }, [name]);
  
  
  
    // to change an object to an array and filter just string
  
    // console.log(Object.values(pokemon?.sprites || {}).filter(item =>typeof item === 'string'))
  
    const spriteFunc = () => {
      return Object.values(pokemon?.sprites || {}).filter(
        (item) => typeof item === "string"
      );
    };
  
    return (
      <div className="main">
        <div className="detail-wrapper">
          <h1>Pokemon "{name}" details </h1>
          <div className="sub-container">
            <div className="mainImage-container">
              <img
                src={pokemon?.sprites?.other?.dream_world?.front_default}
                className="detail-image"
              />
            </div>
            <div className="detail-text">
              <div className="text-wrapper">
                <p>ABILITY:</p>
                <ul className="detail-list">
                  {pokemon.abilities?.map((item, index) => {
                    return <li key={index}>{item?.ability?.name}</li>;
                  })}
                </ul>
              </div>
              <div className="text-wrapper">
                <p>WEIGTH:</p>
                <span>{pokemon?.weight} kg</span>
              </div>
              <div className="text-wrapper">
                <p>HEIGHT:</p>
                <span>{pokemon?.height}</span>
              </div>
              <div className="stat-wrapper">
                <p>STATS:</p>
                <ul className="ul">
                  {pokemon.stats?.map((item, index) => {
                    return (
                      <li key={index} className="list">
                        {item?.stat?.name}: <span className="stat-list">{item?.base_stat} </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="sub-imagesContainer">
            {spriteFunc()?.map((url, index) => {
              return (
                <img
                  key={index}
                  src={url}
                  className="sub-images"
                  alt={`Sprite ${index}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
}

export default PokemonDetails