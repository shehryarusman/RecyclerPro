import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "../Center.css";

function Center() {
  const [stockSubmitted, setStockSubmitted] = useState(false);
  const [clothesStock, setClothesStock] = useState({});
  const [foodStock, setFoodStock] = useState({});
  const [clothesDonations, setClothesDonations] = useState({});
  const [foodDonations, setFoodDonations] = useState({});

  useEffect(() => {
    // Load state from localStorage on component mount
    const storedState = JSON.parse(localStorage.getItem("donationPageState"));
    if (storedState) {
      setStockSubmitted(storedState.stockSubmitted);
      setClothesStock(storedState.clothesStock);
      setFoodStock(storedState.foodStock);
      setClothesDonations(storedState.clothesDonations);
      setFoodDonations(storedState.foodDonations);
    }
  }, []);

  useEffect(() => {
    // Save state to localStorage on state update
    const stateToStore = {
      stockSubmitted,
      clothesStock,
      foodStock,
      clothesDonations,
      foodDonations,
    };
    localStorage.setItem("donationPageState", JSON.stringify(stateToStore));
  }, [
    stockSubmitted,
    clothesStock,
    foodStock,
    clothesDonations,
    foodDonations,
  ]);

  function handleStockSubmit(event) {
    event.preventDefault();
    setStockSubmitted(true);
  }

  function handleDonationsSubmit(event) {
    event.preventDefault();
    // do something with the donations data
  }

  function handleClothesStockChange(event) {
    const { name, value } = event.target;
    setClothesStock({ ...clothesStock, [name]: value });
  }

  function handleFoodStockChange(event) {
    const { name, value } = event.target;
    setFoodStock({ ...foodStock, [name]: value });
  }

  function handleClothesDonationsChange(event) {
    const { name, value } = event.target;
    setClothesDonations((prevDonations) => ({
      ...prevDonations,
      [name]: parseInt(prevDonations[name] || 0) + parseInt(value),
    }));
  }

  function handleFoodDonationsChange(event) {
    const { name, value } = event.target;
    setFoodDonations((prevDonations) => ({
      ...prevDonations,
      [name]: parseInt(prevDonations[name] || 0) + parseInt(value),
    }));
  }

  return (
    <div>
      <h1 className="Center-Name">A New Life Recovery & Education Center</h1>
      <div className="form-container">
        {!stockSubmitted && (
          <form onSubmit={handleStockSubmit}>
            <h2 className="Center-Stock">What's your stock today?</h2>
            <div className="column">
              <h3>Clothes</h3>
              <label>
                Jeans
                <input
                  type="number"
                  name="jeans"
                  onChange={handleClothesStockChange}
                />
              </label>
              <label>
                Pants
                <input
                  type="number"
                  name="pants"
                  onChange={handleClothesStockChange}
                />
              </label>
              <label>
                Shirts
                <input
                  type="number"
                  name="shirts"
                  onChange={handleClothesStockChange}
                />
              </label>
            </div>
            <div className="column">
              <h3>Food</h3>
              <label>
                Dairy
                <input
                  type="number"
                  name="dairy"
                  onChange={handleFoodStockChange}
                />
              </label>
              <label>
                Produce
                <input
                  type="number"
                  name="produce"
                  onChange={handleFoodStockChange}
                />
              </label>
            </div>
            <button type="submit">Submit Stock</button>
          </form>
        )}
        {stockSubmitted && (
          <form onSubmit={handleDonationsSubmit}>
            <h2 className="Center-Stock">Enter received donations</h2>
            <div className="column">
              <h3>Clothes</h3>
              <label>
                Jeans
                <input
                  type="number"
                  name="jeans"
                  onChange={handleClothesDonationsChange}
                />
              </label>
              <label>
                Pants
                <input
                  type="number"
                  name="pants"
                  onChange={handleClothesDonationsChange}
                />
              </label>
              <label>
                Shirts
                <input
                  type="number"
                  name="shirts"
                  onChange={handleClothesDonationsChange}
                />
              </label>
            </div>
            <div className="column">
              <h3>Food</h3>
              <label>
                Dairy
                <input
                  type="number"
                  name="dairy"
                  onChange={handleFoodDonationsChange}
                />
              </label>
              <label>
                Produce
                <input
                  type="number"
                  name="produce"
                  onChange={handleFoodDonationsChange}
                />
              </label>
            </div>
            <button type="submit">Submit Donations</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Center;