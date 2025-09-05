import React from 'react';
import { X, CheckCheck } from 'lucide-react';
import { useNotificationStore } from '../hooks/useNotificationStore';
import { useNotifications } from '../useNotifications';
import NotificationItem from './NotificationItem';

const NotificationPanel: React.FC = () => {
  const { items, markRead, markUnread, dismiss, toast } = useNotifications();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    items.forEach(item => {
      if (!item.read) {
        markRead(item.id);
      }
    });
    toast('Todas las notificaciones marcadas como leídas.', 'success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50" onClick={handleClose}>
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-600 hover:underline flex items-center space-x-1"
              title="Marcar todas como leídas"
            >
              <CheckCheck className="h-4 w-4" />
              <span>Marcar todas</span>
            </button>
            <button 
              onClick={handleClose} 
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
              title="Cerrar panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No tienes notificaciones.</p>
          ) : (
            <div>
              {items.map(notif => (
                <NotificationItem 
                  key={notif.id} 
                  notification={notif}
                  onMarkRead={markRead}
                  onMarkUnread={markUnread}
                  onDismiss={dismiss}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
