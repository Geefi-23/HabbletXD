/**
 * @author Milton R.
 * 
 * @description Módulo responsável pelo tratamento geral das notificações
 */
const notif = () => {

  const container = document.querySelector('.notifications');

  const createNotification = function(type) {
    let notification = document.createElement('div');
    let title = document.createElement('h5');
    let description = document.createElement('span');

    notification.className = `notification alert alert-${type}`;
    notification.append(title, description);
    
    notification.setTitle = (t) => {
      title.innerText = t;
    };

    notification.setDescription = (d) => {
      description.innerText = d;
    };

    return notification;
  };

  const dispatch = function(type, title, description) {
    let notification = createNotification(type);
    notification.setTitle(title);
    notification.setDescription(description);

    container.append(notification);
    notification.classList.add('notification--active');
    setTimeout(() => {
      notification.classList.remove('notification--active');
      setTimeout(() => {
        notification.remove();
      }, 1000);
      
    }, 5000);
  };

  return {
    dispatch
  };
};

export default notif();