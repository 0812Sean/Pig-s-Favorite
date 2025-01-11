import React, { useState } from 'react';

const BreakfastPage = ({ addItem, searchQuery, itemCounts, removeItem }) => {
  const [customFoodItems, setCustomFoodItems] = useState(() => {
    const storedItems = localStorage.getItem('customFoodItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodImage, setNewFoodImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

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
    ...customFoodItems, 
  ];

  const filteredItems = foodItems.filter((item) =>
    item.name.includes(searchQuery)
  );

  const handleAddFood = (e) => {
    e.preventDefault();
    if (newFoodName && newFoodImage) {
      const newFood = { name: newFoodName, image: newFoodImage };
      const updatedItems = [...customFoodItems, newFood];
      setCustomFoodItems(updatedItems);
      setNewFoodName('');
      setNewFoodImage(null);
      setShowForm(false);
      localStorage.setItem('customFoodItems', JSON.stringify(updatedItems));
    } else {
      alert('请输入完整的菜品名称和上传图片');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewFoodImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCustomFood = (foodName) => {
    const updatedItems = customFoodItems.filter((item) => item.name !== foodName);
    setCustomFoodItems(updatedItems);
    localStorage.setItem('customFoodItems', JSON.stringify(updatedItems));
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const createHeart = (e) => {
    const heart = document.createElement('div');
    heart.className = 'heart';

    const x = e.pageX; 
    const y = e.pageY; 

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove(); 
    }, 1000); 
  };

  const handleAddItem = (item, e) => {
    createHeart(e); 
    addItem({ ...item, category: '早餐' });
  };

  return (
    <div>
      <h2>早餐</h2>
      <div className="food-list">
        {filteredItems.map((item) => {
          const count = itemCounts[item.name] || 0;
          const isCustom = customFoodItems.some(
            (customItem) => customItem.name === item.name
          );

          return (
            <div key={item.name} className="food-item">
              <img src={item.image} alt={item.name} />
              <div className="food-info">
                <p>{item.name}</p>
                <div className="button-group">
                  {!isDeleteMode && (
                    <>
                      <button
                        className="add-button"
                        onClick={(e) => handleAddItem(item, e)} 
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
                    </>
                  )}
                  {isCustom && isDeleteMode && (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCustomFood(item.name)}
                    >
                      -
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className="actions">
          <div
            className="food-item add-food-item"
            onClick={() => setShowForm(true)}
          >
            <div className="add-food-icon">+</div>
            <p>添加菜品</p>
          </div>
          <div
            className="food-item delete-food-item"
            onClick={toggleDeleteMode}
          >
            <div className="add-food-icon">-</div>
            <p>{isDeleteMode ? '取消' : '删除菜品'}</p>
          </div>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddFood} className="add-food-form">
          <input
            type="text"
            placeholder="菜名"
            value={newFoodName}
            onChange={(e) => setNewFoodName(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {newFoodImage && (
            <div>
              <img
                src={newFoodImage}
                alt="预览"
                style={{ width: '100px', height: '100px', borderRadius: '50px' }}
              />
            </div>
          )}
          <button type="submit">保存</button>
          <button type="button" onClick={() => setShowForm(false)}>
            取消
          </button>
        </form>
      )}
    </div>
  );
};

export default BreakfastPage;
