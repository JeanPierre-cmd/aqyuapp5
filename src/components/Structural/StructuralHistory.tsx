import React, { useState } from 'react';
import { 
  History, 
  Calendar, 
  FileText, 
  Download, 
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  Eye,
  TrendingUp,
  Activity
} from 'lucide-react';

interface StructuralEvent {
  id: string;
  date: Date;
  component: string;
  eventType: 'inspection' | 'maintenance' | 'repair' | 'replacement' | 'installation';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'completed' | 'in-progress' | 'scheduled';
  technician: string;
  cageId?: string;
  cost?: number;
  documents?: string[];
  nextAction?: string;
  nextActionDate?: Date;
}

const StructuralHistory: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'inspection' | 'maintenance' | 'repair' | 'replacement' | 'installation'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [selectedComponent, setSelectedComponent] = useState<string>('all');

  const [events, setEvents] = useState<StructuralEvent[]>([
    {
      id: 'SH-001',
      date: new Date('2024-01-15'),
      component: 'Red de Contención Jaula A-1',
      eventType: 'inspection',
      description: 'Inspección rutinaria de integridad estructural. Se detectaron desgarros menores en sector norte.',
      severity: 'medium',
      status: 'completed',
      technician: 'Carlos Mendoza',
      cageId: 'A-1',
      cost: 150,
      documents: ['Reporte_Inspeccion_A1_20240115.pdf'],
      nextAction: 'Reparación programada',
      nextActionDate: new Date('2024-01-25')
    },
    {
      id: 'SH-002',
      date: new Date('2024-01-20'),
      component: 'Sistema de Anclaje Jaula B-2',
      eventType: 'maintenance',
      description: 'Mantenimiento preventivo de grilletes y líneas de fondeo. Reemplazo de 2 grilletes por desgaste.',
      severity: 'high',
      status: 'completed',
      technician: 'Ana Torres',
      cageId: 'B-2',
      cost: 850,
      documents: ['Mantenimiento_B2_20240120.pdf', 'Certificado_Grilletes.pdf']
    },
    {
      id: 'SH-003',
      date: new Date('2024-01-25'),
      component: 'Red de Contención Jaula A-1',
      eventType: 'repair',
      description: 'Reparación de desgarros detectados en inspección previa. Aplicación de parches reforzados.',
      severity: 'medium',
      status: 'completed',
      technician: 'Luis Ramírez',
      cageId: 'A-1',
      cost: 320,
      documents: ['Reparacion_A1_20240125.pdf']
    },
    {
      id: 'SH-004',
      date: new Date('2024-02-01'),
      component: 'Boyas de Flotación Jaula C-3',
      eventType: 'replacement',
      description: 'Reemplazo de 4 boyas por pérdida de flotabilidad. Instalación de nuevas boyas certificadas.',
      severity: 'high',
      status: 'in-progress',
      technician: 'María González',
      cageId: 'C-3',
      cost: 1200,
      nextAction: 'Verificación final de flotabilidad',
      nextActionDate: new Date('2024-02-05')
    },
    {
      id: 'SH-005',
      date: new Date('2024-02-10'),
      component: 'Sensores Estructurales Jaula A-2',
      eventType: 'installation',
      description: 'Instalación de nuevos sensores de tensión y deformación para monitoreo continuo.',
      severity: 'low',
      status: 'scheduled',
      technician: 'Roberto Silva',
      cageId: 'A-2',
      cost: 2500,
      nextAction: 'Calibración de sensores',
      nextActionDate: new Date('2024-02-12')
    }
  ]);

  const components = ['all', ...Array.from(new Set(events.map(e => e.component)))];

  const filteredEvents = events.filter(event => {
    const typeMatch = filterType === 'all' || event.eventType === filterType;
    const severityMatch = filterSeverity === 'all' || event.severity === filterSeverity;
    const componentMatch = selectedComponent === 'all' || event.component === selectedComponent;
    return typeMatch && severityMatch && componentMatch;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'inspection':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'repair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'replacement':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'installation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Activity className="h-5 w-5 text-blue-500" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'inspection':
        return <Eye className="h-5 w-5" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5" />;
      case 'repair':
        return <AlertTriangle className="h-5 w-5" />;
      case 'replacement':
        return <TrendingUp className="h-5 w-5" />;
      case 'installation':
        return <Activity className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'inspection':
        return 'Inspección';
      case 'maintenance':
        return 'Mantenimiento';
      case 'repair':
        return 'Reparación';
      case 'replacement':
        return 'Reemplazo';
      case 'installation':
        return 'Instalación';
      default:
        return 'Evento';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En Progreso';
      case 'scheduled':
        return 'Programado';
      default:
        return 'Desconocido';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'Crítica';
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return 'Desconocida';
    }
  };

  const handleExportHistory = () => {
    alert('Exportando historial estructural en PDF...');
  };

  const handleViewDocument = (document: string) => {
    alert(`Abriendo documento: ${document}`);
  };

  const handleScheduleAction = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event && event.nextAction) {
      alert(`Programando: ${event.nextAction}\nFecha: ${event.nextActionDate?.toLocaleDateString('es-ES')}`);
    }
  };

  // Calculate statistics
  const totalEvents = events.length;
  const completedEvents = events.filter(e => e.status === 'completed').length;
  const inProgressEvents = events.filter(e => e.status === 'in-progress').length;
  const scheduledEvents = events.filter(e => e.status === 'scheduled').length;
  const totalCost = events.reduce((sum, e) => sum + (e.cost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historial Estructural</h1>
          <p className="text-gray-600">Registro completo de eventos de mantenimiento e inspecciones estructurales</p>
        </div>
        <button
          onClick={handleExportHistory}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Exportar Historial</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Eventos</p>
              <p className="text-2xl font-bold text-gray-900">{totalEvents}</p>
            </div>
            <History className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completados</p>
              <p className="text-2xl font-bold text-green-600">{completedEvents}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Progreso</p>
              <p className="text-2xl font-bold text-blue-600">{inProgressEvents}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Programados</p>
              <p className="text-2xl font-bold text-purple-600">{scheduledEvents}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Costo Total</p>
              <p className="text-2xl font-bold text-orange-600">${totalCost.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center space-x-4 space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todos los tipos</option>
            <option value="inspection">Inspecciones</option>
            <option value="maintenance">Mantenimiento</option>
            <option value="repair">Reparaciones</option>
            <option value="replacement">Reemplazos</option>
            <option value="installation">Instalaciones</option>
          </select>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todas las severidades</option>
            <option value="critical">Crítica</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>

          <select
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todos los componentes</option>
            {components.slice(1).map((component) => (
              <option key={component} value={component}>{component}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Línea de Tiempo Estructural ({filteredEvents.length} eventos)
          </h3>
        </div>
        
        <div className="p-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            <div className="space-y-8">
              {filteredEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start space-x-6">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-white shadow-lg ${
                    event.status === 'completed' ? 'bg-green-500' :
                    event.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}>
                    {getEventTypeIcon(event.eventType)}
                  </div>
                  
                  {/* Event content */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{event.component}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.eventType)}`}>
                              {getEventTypeLabel(event.eventType)}
                            </span>
                            <div className={`w-3 h-3 rounded-full ${getSeverityColor(event.severity)}`} title={`Severidad ${getSeverityLabel(event.severity)}`}></div>
                            {getStatusIcon(event.status)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date.toLocaleDateString('es-ES')}</span>
                        </div>
                        {event.cageId && (
                          <div className="mt-1">Jaula: {event.cageId}</div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Técnico:</span>
                        <span>{event.technician}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Estado:</span>
                        <span>{getStatusLabel(event.status)}</span>
                      </div>
                      {event.cost && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Costo:</span>
                          <span>${event.cost.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {event.documents && event.documents.length > 0 && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-700 mb-2 block">Documentos:</span>
                        <div className="flex flex-wrap gap-2">
                          {event.documents.map((doc, docIndex) => (
                            <button
                              key={docIndex}
                              onClick={() => handleViewDocument(doc)}
                              className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                            >
                              <FileText className="h-3 w-3" />
                              <span>{doc}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {event.nextAction && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-blue-800">Próxima acción:</span>
                            <p className="text-sm text-blue-700">{event.nextAction}</p>
                            {event.nextActionDate && (
                              <p className="text-xs text-blue-600">
                                Programada para: {event.nextActionDate.toLocaleDateString('es-ES')}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleScheduleAction(event.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Programar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium">No se encontraron eventos</p>
              <p className="text-sm mt-2">Ajusta los filtros para ver más resultados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StructuralHistory;