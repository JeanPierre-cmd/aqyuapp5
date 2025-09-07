import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const menuItems = [
  {
    section: 'General',
    items: [
      { path: '/app/dashboard', name: 'Dashboard', icon: BarChart3 },
    ]
  },
  {
    section: 'Gestión de Centros',
    items: [
      // This section can be populated with more items later
    ]
  },
  {
    section: 'Operaciones',
    items: [
      { path: '/app/management/cages', name: 'Infraestructura', icon: Building2 },
      { path: '/app/viewer/local', name: 'Visor 3D/2D', icon: Box },
      { path: '/app/analysis/water-quality', name: 'Calidad del Agua', icon: Droplets },
      { path: '/app/management/maintenance', name: 'Mantenimiento', icon: Wrench },
    ]
  },
  {
    section: 'Análisis',
    items: [
      { path: '/app/analysis/reports', name: 'Reportes', icon: FileText },
    ]
  },
  {
    section: 'Admin',
    items: [
      { path: '/app/admin/import', name: 'Importar', icon: Upload },
    ]
  }
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto z-40">
      <div className="p-4">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            CONCESIÓN ACTIVA
          </h3>
          <div className="text-sm text-gray-600">
            Ninguna seleccionada
          </div>
        </div>
        
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {section.section}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;