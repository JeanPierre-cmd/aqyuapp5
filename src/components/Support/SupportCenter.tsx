import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  Video, 
  Search,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Send,
  Download,
  ExternalLink
} from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'training' | 'feature-request';
  createdDate: Date;
  lastUpdate: Date;
  assignedTo?: string;
  responses: number;
}

interface KnowledgeBaseItem {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  views: number;
  helpful: number;
  lastUpdated: Date;
}

const SupportCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'knowledge' | 'contact' | 'training'>('tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTicket, setShowNewTicket] = useState(false);

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TK-001',
      title: 'Error en sincronización de sensores IoT',
      description: 'Los sensores de oxígeno en la Jaula A-1 no están enviando datos al dashboard',
      status: 'in-progress',
      priority: 'high',
      category: 'technical',
      createdDate: new Date('2024-01-20'),
      lastUpdate: new Date('2024-01-22'),
      assignedTo: 'Soporte Técnico L2',
      responses: 3
    },
    {
      id: 'TK-002',
      title: 'Solicitud de capacitación en módulo de reportes',
      description: 'Necesitamos capacitación para el equipo en la generación de reportes automáticos',
      status: 'open',
      priority: 'medium',
      category: 'training',
      createdDate: new Date('2024-01-18'),
      lastUpdate: new Date('2024-01-18'),
      responses: 1
    },
    {
      id: 'TK-003',
      title: 'Integración con sistema ERP existente',
      description: 'Consulta sobre posibilidades de integración con nuestro sistema SAP',
      status: 'resolved',
      priority: 'medium',
      category: 'feature-request',
      createdDate: new Date('2024-01-15'),
      lastUpdate: new Date('2024-01-21'),
      assignedTo: 'Arquitecto de Soluciones',
      responses: 5
    }
  ]);

  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseItem[]>([
    {
      id: 'KB-001',
      title: 'Configuración inicial de sensores de calidad de agua',
      category: 'Configuración',
      description: 'Guía paso a paso para configurar y calibrar sensores de pH, oxígeno y temperatura',
      content: 'Procedimiento detallado de configuración...',
      views: 245,
      helpful: 38,
      lastUpdated: new Date('2024-01-10')
    },
    {
      id: 'KB-002',
      title: 'Interpretación de alertas ambientales',
      category: 'Monitoreo',
      description: 'Cómo interpretar y responder a las diferentes alertas del sistema',
      content: 'Guía de interpretación de alertas...',
      views: 189,
      helpful: 42,
      lastUpdated: new Date('2024-01-12')
    },
    {
      id: 'KB-003',
      title: 'Generación de reportes de cumplimiento RES EX 1821',
      category: 'Reportes',
      description: 'Proceso para generar reportes automáticos según normativa SERNAPESCA',
      content: 'Procedimiento de generación de reportes...',
      views: 156,
      helpful: 29,
      lastUpdated: new Date('2024-01-08')
    },
    {
      id: 'KB-004',
      title: 'Mantenimiento preventivo de equipos IoT',
      category: 'Mantenimiento',
      description: 'Cronograma y procedimientos de mantenimiento para sensores y equipos',
      content: 'Guía de mantenimiento preventivo...',
      views: 98,
      helpful: 15,
      lastUpdated: new Date('2024-01-05')
    }
  ]);

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredKnowledge = knowledgeBase.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
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
      case 'open':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in-progress':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleCreateTicket = () => {
    setShowNewTicket(true);
  };

  const handleViewKnowledgeItem = (item: KnowledgeBaseItem) => {
    alert(`Abriendo artículo: ${item.title}\n\nCategoría: ${item.category}\nVistas: ${item.views}\nÚtil para: ${item.helpful} usuarios`);
  };

  const handleContactSupport = (method: string) => {
    switch (method) {
      case 'phone':
        alert('📞 Contacto Telefónico\n\nTeléfono: +56 2 2345 6789\nHorario: Lunes a Viernes, 9:00 - 18:00\nTiempo promedio de espera: 2 minutos');
        break;
      case 'email':
        alert('📧 Soporte por Email\n\nEmail: soporte@aquapp.cl\nTiempo de respuesta: 4-6 horas\nDisponible 24/7');
        break;
      case 'chat':
        alert('💬 Chat en Vivo\n\nDisponible: Lunes a Viernes, 9:00 - 18:00\nTiempo promedio de respuesta: 30 segundos\n\nIniciando chat...');
        break;
      case 'video':
        alert('🎥 Sesión de Video\n\nProgramar sesión con especialista\nDuración: 30-60 minutos\nIncluye grabación para referencia futura');
        break;
    }
  };

  const handleScheduleTraining = (type: string) => {
    alert(`📚 Programando capacitación: ${type}\n\nModalidad: Online/Presencial\nDuración: 2-4 horas\nIncluye certificado de participación\n\nUn especialista se contactará contigo para coordinar fechas.`);
  };

  // Calculate statistics
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Centro de Soporte</h1>
          <p className="text-gray-600">Obtén ayuda, documentación y capacitación para AquApp</p>
        </div>
        <button
          onClick={handleCreateTicket}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Nuevo Ticket</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tickets Abiertos</p>
              <p className="text-2xl font-bold text-blue-600">{openTickets}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Progreso</p>
              <p className="text-2xl font-bold text-yellow-600">{inProgressTickets}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resueltos</p>
              <p className="text-2xl font-bold text-green-600">{resolvedTickets}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tiempo Respuesta</p>
              <p className="text-2xl font-bold text-purple-600">2.3h</p>
              <p className="text-sm text-gray-500">Promedio</p>
            </div>
            <MessageSquare className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'tickets', name: 'Mis Tickets', icon: MessageSquare },
              { id: 'knowledge', name: 'Base de Conocimiento', icon: FileText },
              { id: 'contact', name: 'Contactar Soporte', icon: Phone },
              { id: 'training', name: 'Capacitación', icon: Video }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Search Bar */}
          {(activeTab === 'tickets' || activeTab === 'knowledge') && (
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'tickets' ? 'Buscar tickets...' : 'Buscar en base de conocimiento...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === 'tickets' && (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(ticket.status)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{ticket.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`} title={`Prioridad ${ticket.priority}`}></div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status === 'open' ? 'Abierto' :
                         ticket.status === 'in-progress' ? 'En Progreso' :
                         ticket.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>ID: {ticket.id}</span>
                      <span>Creado: {ticket.createdDate.toLocaleDateString('es-ES')}</span>
                      <span>Respuestas: {ticket.responses}</span>
                      {ticket.assignedTo && <span>Asignado: {ticket.assignedTo}</span>}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Ver Detalles →
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredTickets.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-medium">No se encontraron tickets</p>
                  <p className="text-sm mt-2">Crea un nuevo ticket o ajusta tu búsqueda</p>
                </div>
              )}
            </div>
          )}

          {/* Knowledge Base Tab */}
          {activeTab === 'knowledge' && (
            <div className="space-y-4">
              {filteredKnowledge.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewKnowledgeItem(item)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>{item.views} vistas</span>
                      <span>👍 {item.helpful} útil</span>
                      <span>Actualizado: {item.lastUpdated.toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredKnowledge.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-medium">No se encontraron artículos</p>
                  <p className="text-sm mt-2">Ajusta tu búsqueda o contacta soporte</p>
                </div>
              )}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Canales de Contacto</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleContactSupport('chat')}
                    className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-3"
                  >
                    <MessageSquare className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-semibold">Chat en Vivo</div>
                      <div className="text-sm text-blue-100">Respuesta inmediata • 9:00 - 18:00</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleContactSupport('phone')}
                    className="w-full border border-gray-300 text-gray-700 p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <Phone className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-semibold">Teléfono</div>
                      <div className="text-sm text-gray-500">+56 2 2345 6789 • Lun-Vie 9:00-18:00</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleContactSupport('email')}
                    className="w-full border border-gray-300 text-gray-700 p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <Mail className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-semibold">Email</div>
                      <div className="text-sm text-gray-500">soporte@aquapp.cl • 24/7</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleContactSupport('video')}
                    className="w-full border border-gray-300 text-gray-700 p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <Video className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-semibold">Sesión de Video</div>
                      <div className="text-sm text-gray-500">Programar con especialista</div>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Información de Contacto</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Empresa:</span>
                    <p className="text-gray-600">AquApp Technologies SpA</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dirección:</span>
                    <p className="text-gray-600">Av. Providencia 1234, Santiago, Chile</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Horario de Atención:</span>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00 CLT</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Soporte de Emergencia:</span>
                    <p className="text-gray-600">24/7 para clientes Premium</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Training Tab */}
          {activeTab === 'training' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Programas de Capacitación</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Introducción a AquApp',
                    description: 'Curso básico para nuevos usuarios',
                    duration: '2 horas',
                    level: 'Básico',
                    topics: ['Navegación', 'Dashboard', 'Configuración inicial']
                  },
                  {
                    title: 'Monitoreo Avanzado',
                    description: 'Uso avanzado de sensores y alertas',
                    duration: '3 horas',
                    level: 'Intermedio',
                    topics: ['Sensores IoT', 'Configuración de alertas', 'Análisis de datos']
                  },
                  {
                    title: 'Reportes y Cumplimiento',
                    description: 'Generación de reportes normativos',
                    duration: '2.5 horas',
                    level: 'Intermedio',
                    topics: ['RES EX 1821', 'Reportes automáticos', 'Auditorías']
                  },
                  {
                    title: 'Administración del Sistema',
                    description: 'Gestión completa para administradores',
                    duration: '4 horas',
                    level: 'Avanzado',
                    topics: ['Gestión de usuarios', 'Configuración avanzada', 'Integraciones']
                  }
                ].map((course, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>⏱️ {course.duration}</span>
                          <span>📊 {course.level}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-700 mb-2 block">Temas incluidos:</span>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((topic, topicIndex) => (
                          <span key={topicIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleScheduleTraining(course.title)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Programar Capacitación
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Nuevo Ticket de Soporte</h3>
              <button
                onClick={() => setShowNewTicket(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título del Problema</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Describe brevemente el problema"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option value="technical">Técnico</option>
                    <option value="billing">Facturación</option>
                    <option value="training">Capacitación</option>
                    <option value="feature-request">Solicitud de Funcionalidad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={6}
                  placeholder="Describe el problema en detalle, incluyendo pasos para reproducirlo si aplica"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Archivos Adjuntos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Arrastra archivos aquí o haz clic para seleccionar</p>
                  <p className="text-xs text-gray-500 mt-1">Máximo 10MB por archivo</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewTicket(false)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowNewTicket(false);
                  alert('✅ Ticket creado exitosamente\n\nID: TK-004\nTiempo estimado de respuesta: 2-4 horas\n\nRecibirás notificaciones por email sobre el progreso.');
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Crear Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportCenter;