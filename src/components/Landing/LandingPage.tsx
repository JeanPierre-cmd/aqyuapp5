import React, { useState } from 'react';
import { Waves, ArrowRight, CheckCircle, Fish, Droplets, BarChart3, Settings, Wrench, Bell, Database, Lightbulb, Rocket, Cpu } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = () => {
    setIsLoading(true);
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <Waves className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AquApp</h1>
              <p className="text-sm text-gray-600">Plataforma de Gestión Acuícola</p>
            </div>
          </div>
          
          <button
            onClick={handleEnter}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Cargando...</span>
              </>
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4 mr-2" />
            Cumplimiento Normativo Simplificado
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Gestión Inteligente de
            <br />
            <span className="text-blue-600">Cultivos Acuícolas</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            AquApp: Gestión y control total en la acuicultura. Automatizamos reportes normativos, 
            aseguramos trazabilidad y predecimos la vida útil de tus activos con IA.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={handleEnter}
              disabled={isLoading}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              <span>Comenzar Ahora</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <div className="flex items-center text-green-600 text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-2" />
              Sin instalación requerida
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-16">
          <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 ml-4">AquApp Dashboard</span>
          </div>
          
          <div className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Fish className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">528.000</div>
                    <div className="text-sm text-gray-600">Población Total</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Droplets className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">8.2</div>
                    <div className="text-sm text-gray-600">Oxígeno mg/L</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-purple-600">2.3%</div>
                    <div className="text-sm text-gray-600">Crecimiento</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-100 rounded-lg p-4 text-center">
              <p className="text-blue-800 font-medium">Vista previa del dashboard principal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Principales */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Funcionalidades Principales</h2>
          <p className="text-lg text-gray-600">
            Todo lo que necesitas para gestionar tu centro de cultivo de manera eficiente y profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 w-fit mx-auto mb-4">
              <Fish className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Salud de Peces</h3>
            <p className="text-gray-600">
              Monitoreo integral del estado sanitario y bienestar de la población acuícola
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 w-fit mx-auto mb-4">
              <Droplets className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Calidad del Agua</h3>
            <p className="text-gray-600">
              Control en tiempo real de parámetros críticos como temperatura, oxígeno y pH
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 w-fit mx-auto mb-4">
              <Settings className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Gestión de Balsas</h3>
            <p className="text-gray-600">
              Administración completa de balsas jaulas con visualización 3D interactiva
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 w-fit mx-auto mb-4">
              <BarChart3 className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Reportes Técnicos</h3>
            <p className="text-gray-600">
              Generación automática de reportes según las normativas de tu país
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 w-fit mx-auto mb-4">
              <Wrench className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Mantenimiento</h3>
            <p className="text-gray-600">
              Programación y seguimiento de tareas de mantenimiento preventivo
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 w-fit mx-auto mb-4">
              <Bell className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Alertas Inteligentes</h3>
            <p className="text-gray-600">
              Sistema de notificaciones para condiciones ambientales y operacionales
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios Comprobados */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Beneficios Comprobados</h2>
              <p className="text-blue-100 text-lg mb-8">
                Más de 50 centros de cultivo confían en AquApp para optimizar sus 
                operaciones y cumplir con los más altos estándares de calidad.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-lg">Ahorro de 200+ horas anuales en reportes normativos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-lg">Reducción del 30% en costos de mantenimiento correctivo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-lg">Mejora en cumplimiento regulatorio y reducción de riesgo ambiental</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-lg">Visibilidad 360° para una toma de decisiones directiva informada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-lg">Reducción de imprevistos y optimización de ciclos productivos con IA DeepTech</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-lg">Optimización de recursos y máxima eficiencia operacional</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-500/30 backdrop-blur-sm rounded-2xl p-8">
              <div className="bg-white/10 rounded-full p-6 w-fit mx-auto mb-6">
                <Rocket className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Tecnología para un Mercado Global</h3>
              <p className="text-blue-100 text-center mb-6">
                Nuestra plataforma se adapta a las normativas de tu país y está diseñada 
                para escalar en un mercado global de <strong>US$400B</strong>
              </p>
              
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-sm text-blue-200">350+ centros en Chile</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-blue-200">Camarón y Tilapia en LatAm</div>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={handleEnter}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Explorar Plataforma
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IA Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Cpu className="h-4 w-4 mr-2" />
            Innovación con IA
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Acelerar el Futuro de la Acuicultura con IA
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-5xl mx-auto">
            AquApp es más que gestión: es el motor que impulsa el crecimiento inteligente de la 
            industria acuícola. Nuestra visión es darle el control total de su información, 
            transformando datos en decisiones estratégicas con el poder de la inteligencia artificial 
            y permitiéndole escalar su productividad con agentes de IA especializados, 
            directamente en sus centros de cultivo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-blue-100 rounded-lg p-4 w-fit mx-auto mb-4">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Control Total de Datos</h3>
              <p className="text-gray-600 text-sm">
                Centralice y analice toda la información de sus centros de cultivo.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-blue-100 rounded-lg p-4 w-fit mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Decisiones Inteligentes</h3>
              <p className="text-gray-600 text-sm">
                Use IA para anticipar escenarios críticos y optimizar resultados.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-blue-100 rounded-lg p-4 w-fit mx-auto mb-4">
                <Rocket className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Escalamiento Productivo</h3>
              <p className="text-gray-600 text-sm">
                Invierta en infraestructura local que potencie agentes de IA.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-blue-100 rounded-lg p-4 w-fit mx-auto mb-4">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Industria 4.0</h3>
              <p className="text-gray-600 text-sm">
                Transforme la acuicultura en un sector digital, eficiente y sostenible.
              </p>
            </div>
          </div>

          <button
            onClick={handleEnter}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all flex items-center space-x-2 mx-auto"
          >
            <span>Impulsar mi Empresa con IA</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para Optimizar tu Centro de Cultivo?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Únete a los líderes de la industria acuícola que ya utilizan AquApp para maximizar su 
            productividad y rentabilidad.
          </p>
          
          <button
            onClick={handleEnter}
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all flex items-center space-x-2 mx-auto disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Iniciando...</span>
              </>
            ) : (
              <>
                <span>Ingresar a la Plataforma</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
          
          <p className="text-sm text-gray-400 mt-4">
            Acceso inmediato • Sin compromisos • Soporte técnico incluido
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">AquApp</div>
                <div className="text-gray-400 text-sm">Plataforma de Gestión Acuícola</div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-gray-400 text-sm">
                © 2025 AquApp. Desarrollado para la industria acuícola global.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Adaptable a las normativas locales.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;