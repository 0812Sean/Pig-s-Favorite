import React, { useState } from 'react';

const SoupPage = ({ addItem, searchQuery, itemCounts, removeItem }) => {
  const [customFoodItems, setCustomFoodItems] = useState(() => {
    const storedItems = localStorage.getItem('customSoupItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodImage, setNewFoodImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const foodItems = [
    { name: '乌鸡海参汤', image: '/images/乌鸡海参汤.jpeg' },
    { name: '清补凉鸡汤', image: '/images/清补凉鸡汤.jpeg' },
    { name: '冬瓜排骨汤', image: '/images/冬瓜排骨汤.jpeg' },
    { name: '山药排骨汤', image: '/images/山药排骨汤.jpeg' },
    { name: '莲藕排骨汤', image: '/images/莲藕排骨汤.jpeg' },
    { name: '霸王花排骨汤', image: '/images/霸王花排骨汤.jpeg' },
    { name: '黑豆排骨汤', image: '/images/黑豆排骨汤.jpeg' },
    { name: '紫菜蛋花汤', image: '/images/紫菜蛋花汤.jpeg' },
    { name: '西红柿鸡蛋汤', image: '/images/西红柿鸡蛋汤.jpeg' },
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
      localStorage.setItem('customSoupItems', JSON.stringify(updatedItems));
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
    localStorage.setItem('customSoupItems', JSON.stringify(updatedItems));
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
    addItem({ ...item, category: '汤' });
  };

  return (
    <div>
      <h2>汤</h2>
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
                            removeItem({ ...item, category: '汤' })
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

export default SoupPage;
