import React from 'react';

const DessertPage = ({ addItem, searchQuery, itemCounts, removeItem}) => {
  const foodItems = [
    { name: '紫薯芋头', image: '/images/紫薯芋头西米露.jpeg' },
    { name: '红糖芋圆', image: '/images/红糖芋圆.jpeg' },
    { name: '红豆沙', image: '/images/红豆沙.jpeg' },
    { name: '绿豆沙', image: '/images/绿豆沙.jpeg' },
    { name: '芋头西米露', image: '/images/芋头西米露.jpeg' },
    { name: '杨枝甘露', image: '/images/杨枝甘露.jpeg' },
    { name: '银耳莲子羹', image: '/images/银耳莲子.jpeg' },
    { name: '桂圆鸡蛋糖水', image: '/images/桂圆鸡蛋糖水.jpeg' },
  ];

  const filteredItems = foodItems.filter((item) =>
    item.name.includes(searchQuery)
  );

  return (
    <div>
      <h2>甜品</h2>
      <div className="food-list">
        {filteredItems.map((item) => {
          const count = itemCounts[item.name] || 0; 
          return (
            <div key={item.name} className="food-item">
              <img src={item.image} alt={item.name} />
              <div className="food-info">
                <p>{item.name}</p>
                <div className="button-group">
                  <button
                    className="add-button"
                    onClick={() => addItem({ ...item, category: '甜品' })}
                  >
                    {count === 0 ? '+' : count}
                  </button>
                  {count > 0 && (
                    <button
                      className="remove-button1"
                      onClick={() =>
                        removeItem({ ...item, category: '甜品' })
                      }
                    >
                      -
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DessertPage;
