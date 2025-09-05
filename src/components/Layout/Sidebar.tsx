import React from 'react';
import { 
  BarChart3, 
  Droplets, 
  Fish, 
  Box, 
  FileText, 
  Wrench, 
  Bell, 
  Utensils,
  Building2,
  History,
  Layers,
  GitCompare,
  HelpCircle,
  Gift,
  Settings,
  Upload,
  MapPin
} from 'lucide-react';
import { MODULES, ModuleId } from '../../constants/modules';

interface SidebarProps {
  activeModule: ModuleId;
  onModuleChange: (module: ModuleId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const menuItems = [
    // GENERAL
    { id: MODULES.DASHBOARD, name: 'Dashboard', icon: BarChart3 },
    
    // GESTIÓN DE CENTROS
    { id: MODULES.CONCESIONES, name: 'Concesiones', icon: Building2 },
    
    // OPERACIONES
    { id: MODULES.CAGES, name: 'Infraestructura', icon: Building2 },
    { id: MODULES.VISUALIZATION_3D, name: 'Visor 3D/2D', icon: Box },
    { id: MODULES.WATER_QUALITY, name: 'Calidad del Agua', icon: Droplets },
    { id: MODULES.FISH_HEALTH, name: 'Salud de Peces', icon: Fish },
    { id: MODULES.FEEDING, name: 'Alimentación', icon: Utensils },
    { id: MODULES.MAINTENANCE, name: 'Mantenimiento', icon: Wrench },
    
    // ANÁLISIS
    { id: MODULES.REPORTS, name: 'Reportes', icon: FileText },
    { id: MODULES.ALERTS, name: 'Alertas', icon: Bell },
    { id: MODULES.STRUCTURAL_HISTORY, name: 'Historial Estructural', icon: History },
    { id: MODULES.MODELS, name: 'Modelos', icon: Layers },
    { id: MODULES.CENTER_COMPARISON, name: 'Comparación', icon: GitCompare },
    { id: MODULES.SUPPORT, name: 'Soporte', icon: HelpCircle },
    { id: MODULES.LOYALTY, name: 'Programa Lealtad', icon: Gift },
    { id: MODULES.NOTIFICATIONS, name: 'Notificaciones', icon: Settings },
    { id: MODULES.IMPORTAR, name: 'Importar', icon: Upload },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto z-40">
      <div className="p-4">
        {/* Sección de Concesión Activa */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            CONCESIÓN ACTIVA
          </h3>
          <div className="text-sm text-gray-600">
            Ninguna seleccionada
          </div>
        </div>
        
        {/* Sección General */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            GENERAL
          </h3>
          <nav className="space-y-1">
            <button
              onClick={() => onModuleChange(MODULES.DASHBOARD)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeModule === MODULES.DASHBOARD
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </button>
          </nav>
        </div>
        
        {/* Sección Gestión de Centros */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            GESTIÓN DE CENTROS
          </h3>
          <nav className="space-y-1">
            <button
              onClick={() => onModuleChange(MODULES.CONCESIONES)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeModule === MODULES.CONCESIONES
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Concesiones</span>
            </button>
          </nav>
        </div>
        
        {/* Sección Operaciones */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            OPERACIONES
          </h3>
          <nav className="space-y-1">
            {[
              { id: MODULES.CAGES, name: 'Infraestructura', icon: Building2 },
              { id: MODULES.VISUALIZATION_3D, name: 'Visor 3D/2D', icon: Box },
              { id: MODULES.WATER_QUALITY, name: 'Calidad del Agua', icon: Droplets },
              { id: MODULES.FISH_HEALTH, name: 'Salud de Peces', icon: Fish },
              { id: MODULES.FEEDING, name: 'Alimentación', icon: Utensils },
              { id: MODULES.MAINTENANCE, name: 'Mantenimiento', icon: Wrench },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onModuleChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Sección Análisis */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            ANÁLISIS
          </h3>
          <nav className="space-y-1">
            {[
              { id: MODULES.REPORTS, name: 'Reportes', icon: FileText },
              { id: MODULES.ALERTS, name: 'Alertas', icon: Bell },
              { id: MODULES.STRUCTURAL_HISTORY, name: 'Historial Estructural', icon: History },
              { id: MODULES.MODELS, name: 'Modelos', icon: Layers },
              { id: MODULES.CENTER_COMPARISON, name: 'Comparación', icon: GitCompare },
              { id: MODULES.SUPPORT, name: 'Soporte', icon: HelpCircle },
              { id: MODULES.LOYALTY, name: 'Programa Lealtad', icon: Gift },
              { id: MODULES.NOTIFICATIONS, name: 'Notificaciones', icon: Settings },
              { id: MODULES.IMPORTAR, name: 'Importar', icon: Upload },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onModuleChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;