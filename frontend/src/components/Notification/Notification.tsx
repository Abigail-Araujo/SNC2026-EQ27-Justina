import type { FC } from 'react';

export interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  show: boolean;
}

const Notification: FC<NotificationProps> = ({ message, type = 'success', show }) => {
  if (!show) return null;

  const bgColors = {
    success: 'bg-green-100 border-green-200 text-green-800',
    error: 'bg-red-100 border-red-200 text-red-800',
    info: 'bg-cyan-100 border-cyan-200 text-cyan-800',
  };

  const icons = {
    success: (
      <svg className="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 mr-3 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
  };

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center w-full max-w-sm p-4 mb-4 text-sm font-medium rounded-2xl shadow-xl border ${bgColors[type]}`} role="alert">
      {icons[type]}
      <span>{message}</span>
    </div>
  );
};

export default Notification;
