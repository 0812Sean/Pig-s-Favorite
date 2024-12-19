import React, { useState } from 'react';

const SelectedItemsPage = ({ selectedItems, removeItem }) => {
  const [message, setMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const groupedItems = selectedItems.reduce((groups, item) => {
    const category = item.category || '未分类';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  const confirmOrder = () => {
    const orderDetails = {
      items: selectedItems.map((item) => ({
        name: item.name,
        category: item.category,
      })),
      message,
    };

    fetch(`${API_URL}/api/send-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error || '未知错误');
          });
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        setMessage('');
        selectedItems.length = 0;
      })
      .catch((error) => console.error('发送订单时出错:', error));
  };

  return (
    <div className="selected-items">
      <h2>已选</h2>
      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="category-group">
          <h3>{category}:</h3>
          <div className="food-list">
            {groupedItems[category].map((item) => {
              const globalIndex = selectedItems.findIndex(
                (selectedItem) =>
                  selectedItem.name === item.name &&
                  selectedItem.category === item.category
              );
              return (
                <div key={globalIndex} className="food-item">
                  <img src={item.image} alt={item.name} />
                  <div className="food-info">
                    <p>{item.name}</p>
                    <button onClick={() => removeItem(globalIndex)}>-</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="message-board">
        <h3>公主有话说：</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          cols="50"
        ></textarea>
      </div>
      {selectedItems.length > 0 && (
        <button onClick={confirmOrder} className="confirm-button">
          确定发送
        </button>
      )}
    </div>
  );
};

export default SelectedItemsPage;
