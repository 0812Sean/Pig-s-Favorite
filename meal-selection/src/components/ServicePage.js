import React from 'react';

const ServicePage = ({ toggleServiceItem, clickedStatus }) => {
  const texts = [
    { id: 1, text: '按摩' },
    { id: 2, text: '做美甲' },
    { id: 3, text: '玩游戏' },
    { id: 4, text: '陪逛街' },
    { id: 5, text: '旅游' },
  ];

  return (
    <div className="text-page">
      {texts.map((item) => (
        <div key={item.id} className="text-box">
          <p>{item.text}</p>
          <button
            className="add-button"
            onClick={() => toggleServiceItem({ ...item, category: '特殊服务' })}
          >
            {clickedStatus[item.id] ? 'x' : '+'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ServicePage;
