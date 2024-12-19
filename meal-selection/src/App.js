import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BreakfastPage from './components/BreakfastPage';
import LunchPage from './components/LunchPage';
import DinnerPage from './components/DinnerPage';
import SoupPage from './components/SoupPage';
import DessertPage from './components/DessertPage';
import SelectedItemsPage from './components/SelectedItemsPage';
import Home from './components/HomePage/HomePage'

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  const addItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const removeItem = (index) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const confirmOrder = () => {
    alert(`Your order: ${selectedItems.map((i) => i.name).join(', ')}`);
    setSelectedItems([]); 
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Routes>     
        <Route path="/" element={<Home />} />
        <Route
          path="/breakfast"
          element={<BreakfastPage addItem={addItem} searchQuery={searchQuery} />}
        />
        <Route
          path="/lunch"
          element={<LunchPage addItem={addItem} searchQuery={searchQuery} />}
        />
        <Route
          path="/dinner"
          element={<DinnerPage addItem={addItem} searchQuery={searchQuery} />}
        />
        <Route
          path="/soup"
          element={<SoupPage addItem={addItem} searchQuery={searchQuery} />}
        />
        <Route
          path="/dessert"
          element={<DessertPage addItem={addItem} searchQuery={searchQuery} />}
        />
        <Route
          path="/selected-items"
          element={
            <SelectedItemsPage
              selectedItems={selectedItems}
              removeItem={removeItem}
              confirmOrder={confirmOrder}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
