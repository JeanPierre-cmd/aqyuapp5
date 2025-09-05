import React, { useState } from 'react';
import { Waves, Home, Bell, Settings, User, LogOut } from 'lucide-react';
import { NotificationBell } from '../../modules/notifications/components/Bell';
import UserMenu from '../../modules/topbar/UserMenu';
import SettingsPanel from '../../modules/topbar/SettingsPanel';

interface HeaderProps {
  onBackToHome: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBackToHome, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleUserAction = (action: 'profile' | 'logout') => {
    setShowUserMenu(false);
    if (action === 'logout') {
      onLogout();
    } else if (action === 'profile') {
      alert('Funcionalidad de perfil en desarrollo');
    }
  };

  const handleHomeClick = () => {
    onBackToHome();
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <Waves className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">AquApp</h1>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-2">
          {/* Inicio */}
          <button
            onClick={handleHomeClick}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
            title="Inicio"
          >
            <Home className="h-5 w-5" />
            <span className="text-sm font-medium">Inicio</span>
          </button>

          {/* Notificaciones */}
          <div className="relative">
            <NotificationBell theme="light" />
          </div>

          {/* Configuración */}
          <div className="relative">
            <button
              onClick={handleSettingsClick}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Configuración"
            >
              <Settings className="h-5 w-5" />
            </button>
            {showSettings && (
              <SettingsPanel onClose={() => setShowSettings(false)} />
            )}
          </div>

          {/* Usuario */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Perfil de usuario"
            >
              <User className="h-5 w-5" />
            </button>
            {showUserMenu && (
              <UserMenu
                user={{ name: 'Jean Toledo', email: 'jean.toledo@pucv.cl' }}
                onClose={() => setShowUserMenu(false)}
                onAction={handleUserAction}
              />
            )}
          </div>

          {/* Salir */}
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;