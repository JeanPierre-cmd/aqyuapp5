import React, { useState } from 'react';
import { 
  Box, 
  Upload, 
  Eye, 
  Download, 
  Layers, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Settings,
  FileText,
  Trash2,
  Edit,
  Search
} from 'lucide-react';

interface Model3D {
  id: string;
  name: string;
  type: 'dwg' | 'step' | 'glb' | 'gltf' | 'stl';
  size: number;
  uploadDate: Date;
  description?: string;
  category: 'structural' | 'equipment' | 'cage' | 'infrastructure';
  status: 'processing' | 'ready' | 'error';
  thumbnailUrl?: string;
  metadata?: {
    software?: string;
    version?: string;
    units?: string;
    complexity?: 'low' | 'medium' | 'high';
  };
}

const ModelsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'structural' | 'equipment' | 'cage' | 'infrastructure'>('all');
  const [selectedModel, setSelectedModel] = useState<Model3D | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [models, setModels] = useState<Model3D[]>([
    {
      id: 'model-1',
      name: 'Balsa Jaula Tipo A',
      type: 'dwg',
      size: 2.5 * 1024 * 1024, // 2.5 MB
      uploadDate: new Date('2024-01-15'),
      description: 'Diseño estándar de balsa jaula circular de 25m de diámetro',
      category: 'cage',
      status: 'ready',
      metadata: {
        software: 'AutoCAD',
        version: '2024',
        units: 'meters',
        complexity: 'medium'
      }
    },
    {
      id: 'model-2',
      name: 'Sistema de Anclaje MPM',
      type: 'step',
      size: 15.8 * 1024 * 1024, // 15.8 MB
      uploadDate: new Date('2024-01-20'),
      description: 'Modelo 3D completo del sistema de fondeo multi-punto',
      category: 'structural',
      status: 'ready',
      metadata: {
        software: 'SolidWorks',
        version: '2023',
        units: 'meters',
        complexity: 'high'
      }
    },
    {
      id: 'model-3',
      name: 'Alimentador Automático',
      type: 'glb',
      size: 8.2 * 1024 * 1024, // 8.2 MB
      uploadDate: new Date('2024-01-22'),
      description: 'Modelo optimizado de alimentador con sistema de control',
      category: 'equipment',
      status: 'ready',
      metadata: {
        software: 'Blender',
        version: '4.0',
        units: 'meters',
        complexity: 'low'
      }
    },
    {
      id: 'model-4',
      name: 'Plataforma de Trabajo',
      type: 'step',
      size: 22.1 * 1024 * 1024, // 22.1 MB
      uploadDate: new Date('2024-01-25'),
      description: 'Estructura completa de plataforma flotante con pasarelas',
      category: 'infrastructure',
      status: 'processing',
      metadata: {
        software: 'Inventor',
        version: '2024',
        units: 'meters',
        complexity: 'high'
      }
    }
  ]);

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'dwg':
        return 'bg-blue-100 text-blue-800';
      case 'step':
        return 'bg-green-100 text-green-800';
      case 'glb':
        return 'bg-purple-100 text-purple-800';
      case 'gltf':
        return 'bg-purple-100 text-purple-800';
      case 'stl':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'structural':
        return 'bg-red-100 text-red-800';
      case 'equipment':
        return 'bg-blue-100 text-blue-800';
      case 'cage':
        return 'bg-green-100 text-green-800';
      case 'infrastructure':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const handleViewModel = (model: Model3D) => {
    setSelectedModel(model);
    alert(`Abriendo visor 3D para: ${model.name}\n\nTipo: ${model.type.toUpperCase()}\nTamaño: ${formatFileSize(model.size)}\nEstado: ${model.status}`);
  };

  const handleDownloadModel = (model: Model3D) => {
    alert(`Descargando modelo: ${model.name}\n\nArchivo: ${model.name}.${model.type}\nTamaño: ${formatFileSize(model.size)}`);
  };

  const handleEditModel = (model: Model3D) => {
    alert(`Editando metadatos de: ${model.name}\n\nEsta funcionalidad abrirá el editor de propiedades del modelo.`);
  };

  const handleDeleteModel = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (model && confirm(`¿Está seguro de eliminar el modelo "${model.name}"?\n\nEsta acción no se puede deshacer.`)) {
      setModels(prev => prev.filter(m => m.id !== modelId));
      alert(`Modelo "${model.name}" eliminado exitosamente.`);
    }
  };

  const handleUploadModel = () => {
    alert('Funcionalidad de carga de modelos 3D en desarrollo.\n\nFormatos soportados: DWG, STEP, GLB, GLTF, STL');
  };

  // Calculate statistics
  const totalModels = models.length;
  const readyModels = models.filter(m => m.status === 'ready').length;
  const processingModels = models.filter(m => m.status === 'processing').length;
  const totalSize = models.reduce((sum, m) => sum + m.size, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Biblioteca de Modelos 3D</h1>
          <p className="text-gray-600">Gestión y visualización de modelos estructurales y de equipamiento</p>
        </div>
        <button
          onClick={handleUploadModel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Subir Modelo</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Modelos</p>
              <p className="text-2xl font-bold text-gray-900">{totalModels}</p>
            </div>
            <Box className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Listos</p>
              <p className="text-2xl font-bold text-green-600">{readyModels}</p>
            </div>
            <Eye className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Procesando</p>
              <p className="text-2xl font-bold text-yellow-600">{processingModels}</p>
            </div>
            <Settings className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tamaño Total</p>
              <p className="text-2xl font-bold text-purple-600">{formatFileSize(totalSize)}</p>
            </div>
            <Layers className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar modelos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Todas las categorías</option>
              <option value="structural">Estructural</option>
              <option value="equipment">Equipamiento</option>
              <option value="cage">Jaulas</option>
              <option value="infrastructure">Infraestructura</option>
            </select>
          </div>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Layers className="h-4 w-4 inline mr-2" />
              Cuadrícula
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Lista
            </button>
          </div>
        </div>
      </div>

      {/* Models Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <div key={model.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {model.thumbnailUrl ? (
                  <img src={model.thumbnailUrl} alt={model.name} className="w-full h-full object-cover" />
                ) : (
                  <Box className="h-16 w-16 text-gray-400" />
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{model.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                    {model.status === 'ready' ? 'Listo' : 
                     model.status === 'processing' ? 'Procesando' : 'Error'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(model.type)}`}>
                    {model.type.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(model.category)}`}>
                    {model.category}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{model.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{formatFileSize(model.size)}</span>
                  <span>{model.uploadDate.toLocaleDateString('es-ES')}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewModel(model)}
                    disabled={model.status !== 'ready'}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Ver</span>
                  </button>
                  <button
                    onClick={() => handleDownloadModel(model)}
                    className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Descargar"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEditModel(model)}
                    className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Modelos 3D ({filteredModels.length})
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredModels.map((model) => (
              <div key={model.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Box className="h-8 w-8 text-gray-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-lg text-gray-900">{model.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(model.type)}`}>
                          {model.type.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(model.category)}`}>
                          {model.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                          {model.status === 'ready' ? 'Listo' : 
                           model.status === 'processing' ? 'Procesando' : 'Error'}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-2">{model.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Tamaño:</span> {formatFileSize(model.size)}
                        </div>
                        <div>
                          <span className="font-medium">Subido:</span> {model.uploadDate.toLocaleDateString('es-ES')}
                        </div>
                        {model.metadata?.software && (
                          <div>
                            <span className="font-medium">Software:</span> {model.metadata.software}
                          </div>
                        )}
                        {model.metadata?.complexity && (
                          <div>
                            <span className="font-medium">Complejidad:</span> {model.metadata.complexity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewModel(model)}
                      disabled={model.status !== 'ready'}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Ver 3D</span>
                    </button>
                    <button
                      onClick={() => handleDownloadModel(model)}
                      className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1"
                    >
                      <Download className="h-4 w-4" />
                      <span>Descargar</span>
                    </button>
                    <button
                      onClick={() => handleEditModel(model)}
                      className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Editar metadatos"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteModel(model.id)}
                      className="border border-red-300 text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Eliminar modelo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredModels.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Box className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium">No se encontraron modelos</p>
              <p className="text-sm mt-2">Ajusta los filtros o sube un nuevo modelo 3D</p>
            </div>
          )}
        </div>
      )}

      {/* 3D Viewer Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedModel.name}</h3>
                <p className="text-sm text-gray-600">{selectedModel.type.toUpperCase()} • {formatFileSize(selectedModel.size)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Resetear vista">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Acercar">
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Alejar">
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setSelectedModel(null)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Cerrar"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="h-[600px] bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <Box className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Visor 3D</h4>
                <p className="text-gray-600">Visualización del modelo: {selectedModel.name}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Software: {selectedModel.metadata?.software} • 
                  Unidades: {selectedModel.metadata?.units}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelsPage;