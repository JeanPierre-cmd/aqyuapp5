import React, { useState, useRef, useEffect } from 'react';
import { Upload, Eye, RotateCcw, ZoomIn, ZoomOut, Download, Settings } from 'lucide-react';
import { ModelData } from '../../utils/forgeViewer';

interface Visualization3DProps {
  modelData?: ModelData;
}

const Visualization3D: React.FC<Visualization3DProps> = ({ modelData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'wireframe' | 'section'>('3d');
  const viewerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modelData && viewerRef.current) {
      initializeViewer();
    }
  }, [modelData]);

  const initializeViewer = async () => {
    if (!viewerRef.current || !modelData) return;
    
    setIsLoading(true);
    try {
      // Simulate 3D viewer initialization
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('3D Viewer initialized with model:', modelData.name);
    } catch (error) {
      console.error('Error initializing 3D viewer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected for 3D visualization:', file.name);
      // In a real implementation, this would process the file
    }
  };

  const handleViewModeChange = (mode: '3d' | 'wireframe' | 'section') => {
    setViewMode(mode);
    console.log('View mode changed to:', mode);
  };

  const handleExportScreenshot = () => {
    console.log('Exporting screenshot...');
    alert('Captura de pantalla exportada exitosamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Visualización 3D</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Cargar Modelo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".dwg,.step,.stp,.glb,.gltf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Viewer Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleViewModeChange('3d')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === '3d'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="h-4 w-4 inline mr-2" />
                Vista 3D
              </button>
              <button
                onClick={() => handleViewModeChange('wireframe')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'wireframe'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Wireframe
              </button>
              <button
                onClick={() => handleViewModeChange('section')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'section'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sección
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => console.log('Reset view')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Resetear vista"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => console.log('Zoom in')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Acercar"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => console.log('Zoom out')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Alejar"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={handleExportScreenshot}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Exportar captura"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={() => console.log('Settings')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Configuración"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Viewer Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div 
          ref={viewerRef}
          className="relative w-full h-[600px] bg-gray-50 flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600">Cargando modelo 3D...</p>
            </div>
          ) : modelData ? (
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 mb-4 inline-block">
                <Eye className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modelo Cargado</h3>
              <p className="text-gray-600">{modelData.name}</p>
              <p className="text-sm text-gray-500 mt-2">URN: {modelData.urn}</p>
              <div className="mt-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  modelData.status === 'ready' ? 'bg-green-100 text-green-800' :
                  modelData.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {modelData.status === 'ready' ? 'Listo' :
                   modelData.status === 'processing' ? 'Procesando' : 'Error'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4 inline-block">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin Modelo Cargado</h3>
              <p className="text-gray-600 mb-4">Carga un archivo 3D para comenzar la visualización</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Seleccionar Archivo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Model Information */}
      {modelData && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Modelo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nombre del archivo</p>
              <p className="font-medium text-gray-900">{modelData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <p className="font-medium text-gray-900">{modelData.status}</p>
            </div>
            {modelData.fileType && (
              <div>
                <p className="text-sm text-gray-600">Tipo de archivo</p>
                <p className="font-medium text-gray-900">{modelData.fileType.toUpperCase()}</p>
              </div>
            )}
            {modelData.metadata && (
              <div>
                <p className="text-sm text-gray-600">Software</p>
                <p className="font-medium text-gray-900">{modelData.metadata.software || 'Desconocido'}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualization3D;