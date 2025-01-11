import React, { useState } from 'react';

const DinnerPage = ({ addItem, searchQuery, itemCounts, removeItem }) => {
  const [customFoodItems, setCustomFoodItems] = useState(() => {
    const storedItems = localStorage.getItem('customDinnerItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodImage, setNewFoodImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const foodItems = [
    { name: '孜然牛', image: '/images/孜然牛.jpeg' },
    { name: '葱爆牛', image: '/images/葱爆牛.jpeg' },
    { name: '蔬菜牛', image: '/images/蔬菜牛.jpeg' },
    { name: '白菜肥牛千层', image: '/images/白菜肥牛千层.jpeg' },
    { name: '土豆炖牛肉', image: '/images/土豆炖牛肉.jpeg' },
    { name: '牛肉豆腐煲', image: '/images/牛肉豆腐煲.jpeg' },
    { name: '水煮牛', image: '/images/水煮牛.jpeg' },
    { name: '辣椒炒牛', image: '/images/辣椒炒牛.jpeg' },
    { name: '番茄炒牛肉', image: '/images/番茄炒牛肉.jpeg' },
    { name: '滑蛋牛肉', image: '/images/滑蛋牛肉.jpeg' },
    { name: '煎牛仔骨', image: '/images/煎牛仔骨.jpeg' },
    { name: '油焖大虾', image: '/images/油焖大虾.jpeg' },
    { name: '香辣虾', image: '/images/香辣虾.jpeg' },
    { name: '虾仁炒蛋', image: '/images/虾仁炒蛋.jpeg' },
    { name: '芥蓝虾', image: '/images/芥蓝虾.jpeg' },
    { name: '什锦虾仁', image: '/images/什锦虾仁.jpeg' },
    { name: '煎三文鱼', image: '/images/煎三文鱼.jpeg' },
    { name: '煮鱼丸 ', image: '/images/煮鱼丸.jpeg' },
    { name: '蜜汁鸡腿', image: '/images/蜜汁鸡腿.jpeg' },
    { name: '雪碧鸡翅', image: '/images/雪碧鸡翅.jpeg' },
    { name: '可乐鸡翅', image: '/images/可乐鸡翅.jpeg' },
    { name: '奥尔良烤翅', image: '/images/奥尔良烤翅.jpeg' },
    { name: '葱烧鸡腿', image: '/images/葱烧鸡腿.jpeg' },
    { name: '香菇滑鸡', image: '/images/香菇滑鸡.jpeg' },
    { name: '肉末豆腐', image: '/images/肉末豆腐.jpeg' },
    { name: '酱油豆腐 ', image: '/images/酱油豆腐.jpeg' },
    { name: '辣椒炒肉', image: '/images/辣椒炒肉.jpeg' },
    { name: '土豆红烧肉', image: '/images/土豆红烧肉.jpeg' },
    { name: '咸橄榄焖鱼', image: '/images/咸橄榄焖鱼.jpeg' },
    { name: '酸菜炒鱿鱼', image: '/images/酸菜炒鱿鱼.jpeg' },
    { name: '青椒鱿鱼', image: '/images/青椒鱿鱼.jpeg' },
    { name: '花菜炒鱿鱼', image: '/images/花菜鱿鱼.jpeg' },
    { name: '白斩鸡', image: '/images/白斩鸡.jpeg' },
    { name: '西红柿炒蛋', image: '/images/西红柿炒蛋.jpeg' },
    { name: '蒸鸡蛋', image: '/images/蒸鸡蛋.jpeg' },
    { name: '胡萝卜炒肉', image: '/images/胡萝卜炒肉.jpeg' },
    { name: '萝卜缨炒红螺', image: '/images/萝卜缨炒红螺.jpeg' },
    { name: '莴笋炒肉', image: '/images/莴笋炒肉.jpeg' },
    { name: '水煮鱼', image: '/images/水煮鱼.jpeg' },
    { name: '炒鸡胗', image: '/images/炒鸡胗.jpeg' },
    { name: '炒空心菜', image: '/images/炒空心菜.jpeg' },
    { name: '炒豆苗', image: '/images/炒豆苗.jpeg' },
    { name: '炒豆芽', image: '/images/炒豆芽.jpeg' },
    { name: '炒土豆丝', image: '/images/炒土豆丝.jpeg' },
    { name: '酸辣土豆丝 ', image: '/images/酸辣土豆丝.jpeg' },
    { name: '山药炒木耳', image: '/images/山药炒木耳.jpeg' },
    { name: '炒莲藕', image: '/images/炒莲藕.jpeg' },
    { name: '炒花菜 ', image: '/images/炒花菜.jpeg' },
    { name: '干锅花菜 ', image: '/images/干锅花菜.jpeg' },
    { name: '炒玉米', image: '/images/炒玉米.jpeg' },
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
      localStorage.setItem('customDinnerItems', JSON.stringify(updatedItems));
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
    localStorage.setItem('customDinnerItems', JSON.stringify(updatedItems));
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
    addItem({ ...item, category: '晚餐' });
  };

  return (
    <div>
      <h2>晚餐</h2>
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
                            removeItem({ ...item, category: '晚餐' })
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

export default DinnerPage;
