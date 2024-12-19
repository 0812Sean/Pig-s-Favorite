import React from 'react';

const LunchPage = ({ addItem, searchQuery  }) => {
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
    { name: '蜜汁鸡腿', image: '/images/蜜汁鸡腿.jpeg' },
    { name: '雪碧鸡翅', image: '/images/雪碧鸡翅.jpeg' },
    { name: '可乐鸡翅', image: '/images/可乐鸡翅.jpeg' },
    { name: '奥尔良烤翅', image: '/images/奥尔良烤翅.jpeg' },
    { name: '葱烧鸡腿', image: '/images/葱烧鸡腿.jpeg' },
    { name: '香菇滑鸡', image: '/images/香菇滑鸡.jpeg' },
    { name: '肉末豆腐', image: '/images/肉末豆腐.jpeg' },
    { name: '辣椒炒肉', image: '/images/辣椒炒肉.jpeg' },
    { name: '土豆红烧肉', image: '/images/土豆红烧肉.jpeg' },
    { name: '咸橄榄焖鱼', image: '/images/咸橄榄焖鱼.jpeg' },
    { name: '酸菜炒鱿鱼', image: '/images/酸菜炒鱿鱼.jpeg' },
    { name: '白斩鸡', image: '/images/白斩鸡.jpeg' },
    { name: '西红柿炒蛋', image: '/images/西红柿炒蛋.jpeg' },
    { name: '胡萝卜炒肉', image: '/images/胡萝卜炒肉.jpeg' },
    { name: '萝卜缨炒红螺', image: '/images/萝卜缨炒红螺.jpeg' },
    { name: '莴笋炒肉', image: '/images/莴笋炒肉.jpeg' },
    { name: '水煮鱼', image: '/images/水煮鱼.jpeg' },
    { name: '炒鸡胗', image: '/images/炒鸡胗.jpeg' },
    { name: '炒空心菜', image: '/images/炒空心菜.jpeg' },
    { name: '炒豆苗', image: '/images/炒豆苗.jpeg' },
    { name: '炒豆芽', image: '/images/炒豆芽.jpeg' },
    { name: '炒土豆丝', image: '/images/炒土豆丝.jpeg' },
    { name: '山药炒木耳', image: '/images/山药炒木耳.jpeg' },
    { name: '炒莲藕', image: '/images/炒莲藕.jpeg' },
    { name: '炒玉米', image: '/images/炒玉米.jpeg' },
  ];

  const filteredItems = foodItems.filter((item) =>
    item.name.includes(searchQuery)
  );

  return (
    <div>
      <h2>午餐</h2>
      <div className="food-list">
        {filteredItems.map((item) => (
          <div key={item.name} className="food-item">
            <img src={item.image} alt={item.name} />
            <div className="food-info">
              <p>{item.name}</p>
              <button onClick={() => addItem({ ...item, category: '午餐' })}>+</button> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LunchPage;
