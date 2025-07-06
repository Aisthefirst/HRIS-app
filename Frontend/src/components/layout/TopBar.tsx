import React, { useState } from 'react';
import { Bell, Search, Menu, User, LogOut } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { useClickAway } from '../../hooks/useClickAway';
import { api } from '../../services/api';
import { Button } from '../ui/Button';

interface TopBarProps {
  onMenuClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: api.getNotifications,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const notificationRef = useClickAway<HTMLDivElement>(() => setShowNotifications(false));
  const profileRef = useClickAway<HTMLDivElement>(() => setShowProfileMenu(false));

  const unreadCount = notifications.filter((n: any) => !n.read_at).length;

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await api.markNotificationAsRead(notificationId);
      // Refetch notifications after marking as read
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left section */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
            icon={<Menu className="h-5 w-5" />}
          />
          <div className="hidden md:flex items-center ml-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
              icon={<Bell className="h-5 w-5" />}
            >
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                <div className="p-4 border-b border-neutral-200">
                  <h3 className="text-sm font-semibold text-neutral-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification: any) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer ${
                          !notification.read_at ? 'bg-primary-50' : ''
                        }`}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            !notification.read_at ? 'bg-primary-500' : 'bg-transparent'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-neutral-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-neutral-500 mt-1">
                              {new Date(notification.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-neutral-500">
                      No notifications
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-neutral-200">
                    <button 
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      onClick={() => api.markAllNotificationsAsRead()}
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 hover:bg-neutral-50 rounded-lg p-2 transition-colors"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'}
                  alt={user?.name}
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                  <p className="text-xs text-neutral-500 capitalize">{user?.role}</p>
                </div>
              </button>
            </div>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                <div className="p-2">
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                    onClick={() => {
                      setShowProfileMenu(false);
                      window.location.href = '/profile';
                    }}
                  >
                    <User className="h-4 w-4 mr-3" />
                    My Profile
                  </button>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};