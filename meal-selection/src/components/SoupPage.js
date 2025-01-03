import React from 'react';

const SoupPage = ({ addItem, searchQuery, itemCounts, removeItem }) => {
  const foodItems = [
    { name: '乌鸡海参汤', image: '/images/乌鸡海参汤.jpeg' },
    { name: '清补凉鸡汤', image: '/images/清补凉鸡汤.jpeg' },
    { name: '冬瓜排骨汤', image: '/images/冬瓜排骨汤.jpeg' },
    { name: '山药排骨汤', image: '/images/山药排骨汤.jpeg' },
    { name: '莲藕排骨汤', image: '/images/莲藕排骨汤.jpeg' },
    { name: '霸王花排骨汤', image: '/images/霸王花排骨汤.jpeg' },
    { name: '黑豆排骨汤', image: '/images/黑豆排骨汤.jpeg' },
    { name: '紫菜蛋花汤', image: '/images/紫菜蛋花汤.jpeg' },
  ];

  const filteredItems = foodItems.filter((item) =>
    item.name.includes(searchQuery)
  );

  return (
    <div>
      <h2>汤</h2>
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
                    onClick={() => addItem({ ...item, category: '汤' })}
                  >
                    {count === 0 ? '+' : count}
                  </button>
                  {count > 0 && (
                    <button
                      className="remove-button1"
                      onClick={() =>
                        removeItem({ ...item, category: '汤' })
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

export default SoupPage;
