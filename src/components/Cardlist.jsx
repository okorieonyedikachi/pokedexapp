import React, { useState, useEffect, useMemo } from "react";
import '../styles/cardWrapper.css'
import Card from "./Card";
import axios from "axios";
import {POKEMON_API_URL} from '../constants/index'

const Cardlist = ({ item }) => {
  const [searchField, setSearchField] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(POKEMON_API_URL);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(currentUrl);
        const data = await response.data.results;
        setPokemon(data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error("Error fetching Pokemon data:", error);
      }
    };
    fetchPokemonData();
  }, [currentUrl]);

  const renderContent = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (error) {
      return <h1>Error loading data: {error.message}</h1>;
    }

    if (!loading && !error) {
      return (
        <div className="mainContainer">
          <input
            id="search-input"
            placeholder="Enter Pokemon name ..."
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <div className="card-wrapper">
            <Card pokemon={filteredPokemon} />
          </div>
          <div className="pagination-wrapper">
            {prevUrl && (
              <button className="button" onClick={() => setCurrentUrl(prevUrl)}>
                Prev
              </button>
            )}
            {nextUrl && (
              <button
                className="button"
                onClick={() => {
                  setCurrentUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      );
    }
  };
  const filteredPokemon = useMemo(() =>
    pokemon.filter((poke) => poke.name.toLowerCase().includes(searchField))
  );

  return <>{renderContent()}</>;
};

export default Cardlist;
