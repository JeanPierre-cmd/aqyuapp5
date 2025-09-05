import React from 'react';
import { X, Trash2, Check, Undo, ExternalLink } from 'lucide-react';
import { Notif } from '../types';

interface NotificationItemProps {
  notification: Notif;
  onMarkRead?: (id: string) => void;
  onMarkUnread?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onItemClick?: (notif: Notif) => void;
  navigate?: (path: string) => void;
}

const kindStyles = {
  info: { icon: 'text-secondary', bg: 'bg-secondary/10' },
  success: { icon: 'text-success', bg: 'bg-success/10' },
  warning: { icon: 'text-warning', bg: 'bg-warning/10' },
  error: { icon: 'text-error', bg: 'bg-error/10' },
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkRead,
  onMarkUnread,
  onDismiss,
  onItemClick,
  navigate
}) => {
  const handleItemClick = () => {
    if (onMarkRead) {
      onMarkRead(notification.id);
    }
    if (onItemClick) {
      onItemClick(notification);
    }
    if (navigate && typeof notification.data?.route === 'string') {
      navigate(notification.data.route);
    }
  };

  const handleMarkRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMarkRead) {
      onMarkRead(notification.id);
    }
  };

  const handleMarkUnread = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMarkUnread) {
      onMarkUnread(notification.id);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDismiss) {
      onDismiss(notification.id);
    }
  };

  return (
    <div className={`p-4 ${kindStyles[notification.kind].bg} hover:bg-border/50 transition-colors group cursor-pointer`}>
      <div className="flex items-start gap-3">
        <div 
          className={`flex-shrink-0 w-2 h-2 mt-1.5 rounded-full ${
            notification.read ? 'bg-gray-500' : 'bg-primary animate-pulse'
          }`} 
          title={notification.read ? 'Leída' : 'No leída'}
        />
        <div className="flex-1" onClick={handleItemClick}>
          <p className="font-semibold text-text">{notification.title}</p>
          {notification.message && (
            <p className="text-sm text-textSecondary mt-1">{notification.message}</p>
          )}
          <div className="flex items-center gap-4 mt-3 text-xs text-textSecondary">
            <button 
              onClick={notification.read ? handleMarkUnread : handleMarkRead}
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              {notification.read ? <Undo size={14} /> : <Check size={14} />}
              {notification.read ? 'No leído' : 'Leído'}
            </button>
            {notification.data?.route && (
              <button 
                onClick={handleItemClick}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <ExternalLink size={14} /> Abrir
              </button>
            )}
            <button 
              onClick={handleDismiss}
              className="hover:text-error transition-colors flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={14} /> Descartar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;