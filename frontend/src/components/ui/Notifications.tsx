import React, { useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useUI } from '../../store/ui';
import { cn } from '../../utils';

const iconMap = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const colorMap = {
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-200',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-200',
};

const iconColorMap = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
};

export const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useUI();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {notifications.map((notification) => {
        const Icon = iconMap[notification.type];
        
        return (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
            Icon={Icon}
          />
        );
      })}
    </div>
  );
};

interface NotificationItemProps {
  notification: any;
  onRemove: () => void;
  Icon: React.ComponentType<{ className?: string }>;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRemove,
  Icon,
}) => {
  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        onRemove();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration, onRemove]);

  return (
    <div
      className={cn(
        'max-w-sm w-full pointer-events-auto transform transition-all duration-300 ease-in-out',
        'translate-x-0 opacity-100',
        'shadow-lg rounded-lg border p-4',
        colorMap[notification.type]
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={cn('w-5 h-5', iconColorMap[notification.type])} />
        </div>
        
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">
            {notification.title}
          </p>
          {notification.message && (
            <p className="mt-1 text-sm opacity-90">
              {notification.message}
            </p>
          )}
        </div>
        
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onRemove}
            className={cn(
              'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
              'hover:bg-black/5 dark:hover:bg-white/5',
              'focus:ring-gray-500'
            )}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast notification hook
export const useNotification = () => {
  const { addNotification } = useUI();

  const notify = {
    success: (title: string, message?: string, duration = 5000) => {
      addNotification({ type: 'success', title, message, duration });
    },
    error: (title: string, message?: string, duration = 0) => {
      addNotification({ type: 'error', title, message, duration });
    },
    warning: (title: string, message?: string, duration = 7000) => {
      addNotification({ type: 'warning', title, message, duration });
    },
    info: (title: string, message?: string, duration = 5000) => {
      addNotification({ type: 'info', title, message, duration });
    },
  };

  return notify;
};

export default Notifications;
