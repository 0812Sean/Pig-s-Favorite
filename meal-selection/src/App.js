import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BreakfastPage from './components/BreakfastPage';
import LunchPage from './components/LunchPage';
import DinnerPage from './components/DinnerPage';
import SoupPage from './components/SoupPage';
import DessertPage from './components/DessertPage';
import SelectedItemsPage from './components/SelectedItemsPage';
import Home from './components/HomePage/HomePage';
import ServicePage from './components/ServicePage';

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [clickedStatus, setClickedStatus] = useState({}); 
  const [searchQuery, setSearchQuery] = useState('');

  const addItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.name]: (prevCounts[item.name] || 0) + 1,
    }));
  };

  const removeItem = (item) => {
    setItemCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      if (updatedCounts[item.name] > 0) {
        updatedCounts[item.name] -= 1;
      }
      return updatedCounts;
    });
  
    setSelectedItems((prev) => {
      const index = prev.findIndex(
        (selectedItem) =>
          selectedItem.name === item.name && selectedItem.category === item.category
      );
      if (index !== -1) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  };
  
  const toggleServiceItem = (item) => {
    setClickedStatus((prev) => ({
      ...prev,
      [item.id]: !prev[item.id], 
    }));

    if (!clickedStatus[item.id]) {
      addItem(item);
    } else {
      removeItem(item);
    }
  };

  const confirmOrder = () => {
    alert(`Your order: ${selectedItems.map((i) => i.name).join(', ')}`);
    setSelectedItems([]);
    setItemCounts({});
    setClickedStatus({}); 
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
          element={<BreakfastPage addItem={addItem} removeItem={removeItem} searchQuery={searchQuery} itemCounts={itemCounts} />}
        />
        <Route
          path="/lunch"
          element={<LunchPage addItem={addItem} removeItem={removeItem} searchQuery={searchQuery} itemCounts={itemCounts} />}
        />
        <Route
          path="/dinner"
          element={<DinnerPage addItem={addItem} removeItem={removeItem} searchQuery={searchQuery} itemCounts={itemCounts} />}
        />
        <Route
          path="/soup"
          element={<SoupPage addItem={addItem} removeItem={removeItem} searchQuery={searchQuery} itemCounts={itemCounts} />}
        />
        <Route
          path="/dessert"
          element={<DessertPage addItem={addItem} removeItem={removeItem} searchQuery={searchQuery} itemCounts={itemCounts} />}
        />
        <Route
          path="/service"
          element={            <ServicePage
            toggleServiceItem={toggleServiceItem}
            clickedStatus={clickedStatus}
          />}
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
