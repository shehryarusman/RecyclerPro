import { React, useReducer,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DonationContext } from './DonationContext';


import category from '../data';

const initialState = {
  selectedFruit: '-- select category --',
  selectedCategoryItem: [],
  selectedQuantity: 1,
  itemQuantity:{}
};

function reducer(state, action) {
    switch (action.type) {
      case 'SET_SELECTED_FRUIT':
        return { ...state, selectedFruit: action.payload };
      case 'SET_SELECTED_CATEGORY_ITEM':
        return { ...state, selectedCategoryItem: action.payload };
      case 'SET_SELECTED_QUANTITY':
        return { ...state, selectedQuantity: action.payload };
      case 'SET_ITEM_QUANTITY':
        const { item, quantity } = action.payload;
        return { ...state, itemQuantity: { ...state.itemQuantity, [item]: quantity } };
      default:
        return state;
    }
  }
  

function DonatePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedFruit, selectedCategoryItem, selectedQuantity,itemQuantity } = state;
  const categoryData = category;
  const navigate = useNavigate();
  const { setDonationValue } = useContext(DonationContext);

  const getUserDonation = () => {
    let totalItems = 0;
    Object.values(itemQuantity).forEach(quantity => {
      totalItems += Number(quantity);
    });
    let donationValue = [ totalItems ];
    setDonationValue(donationValue);
    navigate('/map');
  }
  

  

  return (
    <div className='donate-page'>
        <div className='donate-page-title-container'>
            <h1 className='donate-page-title'>What are you looking to donate today?</h1>
        </div>

      <label>
        Enter a category to donate to
        <select
          className='select'
          value={selectedFruit}
          onChange={(e) => dispatch({ type: 'SET_SELECTED_FRUIT', payload: e.target.value })}
        >
          <option> -- select category --</option>
          {categoryData.map((category) => {
            const { name, id } = category;
            return (
              <option key={id} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </label>

      {selectedFruit !== '-- select category --' && (
  <div className='intem-in-categor'>
    <label>
      Enter an item for {selectedFruit} category
      <select
        className='select'
        value={selectedCategoryItem}
        multiple={true}
        onChange={(e) =>
          dispatch({ type: 'SET_SELECTED_CATEGORY_ITEM', payload: Array.from(e.target.selectedOptions, (option) => option.value) })
        }
      >
        <option> -- select category --</option>
        {categoryData.map((category) => {
          if (category.name === selectedFruit) {
            const { items } = category;
            return items.map((itemInCategory) => {
              const { name, id } = itemInCategory;
              return (
                <option key={id} value={name}>
                  {name}
                </option>
              );
            });
          }
          return null;
        })}
      </select>
    </label>
  </div>
)}

    {selectedCategoryItem.length > 0 && (
        <div className='title-element-quantity'>
            {selectedCategoryItem.map((item, index) => (
            <div key={index}>
                <label>Enter the quantity for {item}:</label>
                <input type='text' onChange={(e) => dispatch({ type: 'SET_ITEM_QUANTITY', payload: { item, quantity: e.target.value } })} />
            </div>
            ))}
        </div>
    )}


      {selectedCategoryItem !== '-- select category --' && (
        <div className='range-wrapper'>
          <label>Select a distance: </label>
          <input
            type='range'
            min='1'
            max='100'
            value={selectedQuantity}
            onChange={(e) =>
              dispatch({ type: 'SET_SELECTED_QUANTITY', payload: e.target.value })
            }
          />
          <div>
            <h3>
              <span>{selectedQuantity}</span>
            </h3>
          </div>
        </div>

      )}

      <button type='button' onClick={getUserDonation}>Continue</button>
    </div>
  );
}

export default DonatePage;
