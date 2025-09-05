import React from 'react';
import { Waves, LogOut, Home } from 'lucide-react';

interface HeaderProps {
  onBackToHome: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBackToHome, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <Waves className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AquApp</h1>
            <p className="text-sm text-gray-600">Plataforma de Gestión Acuícola</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            title="Volver al inicio"
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">Inicio</span>
          </button>
          
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;