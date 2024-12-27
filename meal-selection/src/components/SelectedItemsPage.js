import React, { useState } from 'react';

const SelectedItemsPage = ({ selectedItems, removeItem }) => {
  const [message, setMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        name: item.text || item.name,
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
      .then(() => {
        setIsDialogOpen(true);
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
            {groupedItems[category].map((item, index) => (
              <div
                key={index}
                className={
                  item.category === '特殊服务' ? 'text-box1' : 'food-item'
                }
              >
                {item.image && item.category !== '特殊服务' && (
                  <img src={item.image} alt={item.name} />
                )}
                <div className="food-info">
                  <p>{item.text || item.name}</p>
                  <button
                    className={`${
                      item.category === '特殊服务' ? 'remove-button special-service' : 'remove-button'
                    }`}
                    onClick={() => removeItem(item)} // 传递 item 对象
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
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
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h3>旨意已下达！</h3>
            <p>小琛子已接到公主的命令～</p>
            <button onClick={() => setIsDialogOpen(false)}>关闭</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedItemsPage;
