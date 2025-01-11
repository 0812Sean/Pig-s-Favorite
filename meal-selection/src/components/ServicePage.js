import React, { useState } from 'react';

const ServicePage = ({ toggleServiceItem, clickedStatus }) => {
  const [customServices, setCustomServices] = useState(() => {
    const storedServices = localStorage.getItem('customServices');
    return storedServices ? JSON.parse(storedServices) : [];
  });
  const [newServiceName, setNewServiceName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const texts = [
    { id: 1, text: '按摩' },
    { id: 2, text: '做美甲' },
    { id: 3, text: '玩游戏' },
    { id: 4, text: '陪逛街' },
    { id: 5, text: '旅游' },
    { id: 6, text: '火锅' },
    { id: 7, text: '烧烤' },
    ...customServices,
  ];

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

  const handleAddService = (e) => {
    e.preventDefault();
    if (newServiceName) {
      const newService = { id: Date.now(), text: newServiceName };
      const updatedServices = [...customServices, newService];
      setCustomServices(updatedServices);
      setNewServiceName('');
      setShowForm(false);
      localStorage.setItem('customServices', JSON.stringify(updatedServices));
    } else {
      alert('请输入服务名称');
    }
  };

  const handleDeleteCustomService = (serviceId) => {
    const updatedServices = customServices.filter((item) => item.id !== serviceId);
    setCustomServices(updatedServices);
    localStorage.setItem('customServices', JSON.stringify(updatedServices));
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const handleToggleService = (item, e) => {
    createHeart(e);
    toggleServiceItem({ ...item, category: '特殊服务' });
  };

  return (
    <div>
      <div className="text-page">
        {texts.map((item) => (
          <div key={item.id} className="text-box">
            <p>{item.text}</p>
            <div className="button-group">
              {!isDeleteMode && (
            <button
              className="add-button"
              onClick={(e) => {
                handleToggleService(item, e);
              }}
            >
              {clickedStatus[item.id] ? 'x' : '+'}
            </button>

              )}
              {isDeleteMode && customServices.some((svc) => svc.id === item.id) && (
                <button
                  className="delete-button"
                  onClick={() => handleDeleteCustomService(item.id)}
                >
                  删除
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="text-box" onClick={() => setShowForm(true)}>
          <p>增加服务</p>
          <button className="add-button">+</button>
        </div>
        <div className="text-box" onClick={toggleDeleteMode}>
          <p>{isDeleteMode ? '取消删除' : '删除服务'}</p>
          <button className="add-button">{isDeleteMode ? 'x' : '-'}</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddService} className="add-food-form">
          <input
            type="text"
            placeholder="服务名称"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
          />
          <button type="submit">保存</button>
          <button type="button" onClick={() => setShowForm(false)}>
            取消
          </button>
        </form>
      )}
    </div>
  );
};

export default ServicePage;
