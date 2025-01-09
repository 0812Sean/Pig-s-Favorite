import React from 'react';

const BreakfastPage = ({ addItem, searchQuery, itemCounts, removeItem }) => {
  const foodItems = [
    { name: '黑豆浆', image: '/images/黑豆浆.jpeg' },
    { name: '红豆浆', image: '/images/红豆浆.jpeg' },
    { name: '紫薯豆浆', image: '/images/紫薯.jpeg' },
    { name: '黄豆浆', image: '/images/豆浆.jpeg' },
    { name: '八宝粥', image: '/images/八宝粥.jpeg' },
    { name: '罐装八宝粥', image: '/images/罐装八宝粥.jpeg' },
    { name: '小米粥', image: '/images/小米粥.jpeg' },
    { name: '皮蛋瘦肉粥', image: '/images/皮蛋瘦肉粥.jpeg' },
    { name: '黑米粥', image: '/images/黑米粥.jpeg' },
    { name: '稀饭', image: '/images/稀饭.jpeg' },
    { name: '地瓜稀饭', image: '/images/地瓜稀饭.jpeg' },
    { name: '紫薯稀饭', image: '/images/紫薯稀饭.jpeg' },
    { name: '煮蛋', image: '/images/煮鸡蛋.jpeg' },
    { name: '煎蛋（全熟）', image: '/images/煎蛋.jpeg' },
    { name: '溏心荷包蛋', image: '/images/溏心荷包蛋.jpeg' },
    { name: '蒸鸡蛋', image: '/images/蒸鸡蛋.jpeg' },
    { name: '馒头', image: '/images/馒头.jpeg' },
    { name: '红糖馒头1', image: '/images/红糖馒头1.jpeg' },
    { name: '红糖馒头2', image: '/images/红糖馒头2.jpeg' },
    { name: '小白馒头', image: '/images/小白馒头.jpeg' },
    { name: '包子', image: '/images/包子.jpeg' },
    { name: '小笼包', image: '/images/小笼包.jpeg' },
    { name: '煮番薯', image: '/images/煮番薯.jpeg' },
    { name: '煮芋头', image: '/images/煮芋头.jpeg' },
    { name: '煮玉米', image: '/images/煮玉米.jpeg' },
    { name: '咸菜', image: '/images/咸菜.jpeg' },
  ];

  const filteredItems = foodItems.filter((item) =>
    item.name.includes(searchQuery)
  );

  return (
    <div>
      <h2>早餐</h2>
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
                    onClick={() => addItem({ ...item, category: '早餐' })}
                  >
                    {count === 0 ? '+' : count}
                  </button>
                  {count > 0 && (
                    <button
                      className="remove-button1"
                      onClick={() =>
                        removeItem({ ...item, category: '早餐' })
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

export default BreakfastPage;
