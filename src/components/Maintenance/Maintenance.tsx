import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  User, 
  FileText,
  Plus,
  Filter,
  Download,
  Settings,
  Activity
} from 'lucide-react';

interface MaintenanceTask {
  id: string;
  component: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: Date;
  completedDate?: Date;
  estimatedHours: number;
  actualHours?: number;
  cageId?: string;
  notes?: string;
}

const Maintenance: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed' | 'overdue'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    {
      id: 'MT-001',
      component: 'Red de Contención Jaula A-1',
      description: 'Inspección y reparación de desgarros menores en red',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Carlos Mendoza',
      dueDate: new Date('2024-01-15'),
      completedDate: new Date('2024-01-14'),
      estimatedHours: 4,
      actualHours: 3.5,
      cageId: 'A-1',
      notes: 'Reparación completada sin incidentes'
    },
    {
      id: 'MT-002',
      component: 'Sistema de Anclaje Jaula B-2',
      description: 'Revisión de tensión de líneas de fondeo y estado de grilletes',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Ana Torres',
      dueDate: new Date('2024-02-01'),
      estimatedHours: 6,
      cageId: 'B-2'
    },
    {
      id: 'MT-003',
      component: 'Boyas de Flotación Jaula C-3',
      description: 'Limpieza y verificación de flotabilidad',
      status: 'pending',
      priority: 'low',
      assignedTo: 'Luis Ramírez',
      dueDate: new Date('2024-02-10'),
      estimatedHours: 2,
      cageId: 'C-3'
    },
    {
      id: 'MT-004',
      component: 'Sensores de Oxígeno Disuelto',
      description: 'Calibración y reemplazo de sonda en Jaula A-1',
      status: 'overdue',
      priority: 'critical',
      assignedTo: 'María González',
      dueDate: new Date('2024-01-20'),
      estimatedHours: 3,
      cageId: 'A-1',
      notes: 'Requiere atención inmediata'
    },
    {
      id: 'MT-005',
      component: 'Alimentador Automático Jaula B-1',
      description: 'Mantenimiento preventivo y limpieza de tolva',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Roberto Silva',
      dueDate: new Date('2024-02-15'),
      estimatedHours: 4,
      cageId: 'B-1'
    }
  ]);

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-500" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En Progreso';
      case 'pending':
        return 'Pendiente';
      case 'overdue':
        return 'Vencido';
      default:
        return 'Desconocido';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
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

  const handleAddTask = () => {
    alert('Funcionalidad de agregar nueva tarea en desarrollo');
  };

  const handleExportReport = () => {
    alert('Exportando reporte de mantenimiento...');
  };

  const handleTaskAction = (taskId: string, action: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    switch (action) {
      case 'start':
        setTasks(prev => prev.map(t => 
          t.id === taskId ? { ...t, status: 'in-progress' as const } : t
        ));
        alert(`Tarea ${taskId} iniciada`);
        break;
      case 'complete':
        setTasks(prev => prev.map(t => 
          t.id === taskId ? { 
            ...t, 
            status: 'completed' as const, 
            completedDate: new Date(),
            actualHours: t.estimatedHours + (Math.random() - 0.5) * 2
          } : t
        ));
        alert(`Tarea ${taskId} completada`);
        break;
      case 'edit':
        alert(`Editando tarea: ${task.description}`);
        break;
      case 'delete':
        if (confirm(`¿Está seguro de eliminar la tarea ${taskId}?`)) {
          setTasks(prev => prev.filter(t => t.id !== taskId));
        }
        break;
    }
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Mantenimiento</h1>
          <p className="text-gray-600">Planificación y seguimiento de tareas de mantenimiento preventivo y correctivo</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nueva Tarea</span>
          </button>
          <button
            onClick={handleExportReport}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tareas</p>
              <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
            </div>
            <Wrench className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completadas</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Progreso</p>
              <p className="text-2xl font-bold text-blue-600">{inProgressTasks}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vencidas</p>
              <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="in-progress">En progreso</option>
            <option value="completed">Completadas</option>
            <option value="overdue">Vencidas</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todas las prioridades</option>
            <option value="critical">Crítica</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Tareas de Mantenimiento ({filteredTasks.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} title={`Prioridad ${getPriorityLabel(task.priority)}`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">{task.component}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                        {getStatusLabel(task.status)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{task.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Asignado: {task.assignedTo}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Vence: {task.dueDate.toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Estimado: {task.estimatedHours}h</span>
                        {task.actualHours && <span>| Real: {task.actualHours}h</span>}
                      </div>
                      {task.cageId && (
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Jaula: {task.cageId}</span>
                        </div>
                      )}
                    </div>
                    
                    {task.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Notas:</span>
                        </div>
                        <p className="text-sm text-gray-600">{task.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {task.status === 'pending' && (
                    <button
                      onClick={() => handleTaskAction(task.id, 'start')}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Iniciar
                    </button>
                  )}
                  
                  {task.status === 'in-progress' && (
                    <button
                      onClick={() => handleTaskAction(task.id, 'complete')}
                      className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Completar
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleTaskAction(task.id, 'edit')}
                    className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium">No hay tareas que coincidan con los filtros</p>
              <p className="text-sm mt-2">Ajusta los filtros o agrega una nueva tarea de mantenimiento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;