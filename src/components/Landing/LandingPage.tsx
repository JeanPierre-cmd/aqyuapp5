import React, { useState } from 'react';
import { Waves, Play, CheckCircle, Star, ArrowRight, Users, Shield, BarChart3 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white">
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <Waves className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AquApp</h1>
              <p className="text-blue-200 text-sm">Plataforma de Gestión Acuícola</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-blue-200 hover:text-white transition-colors">Características</a>
            <a href="#benefits" className="text-blue-200 hover:text-white transition-colors">Beneficios</a>
            <a href="#contact" className="text-blue-200 hover:text-white transition-colors">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Revoluciona tu
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Gestión Acuícola
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Plataforma integral con IA para monitoreo, análisis predictivo y cumplimiento normativo 
              en centros de cultivo de salmones
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <button
              onClick={handleEnter}
              disabled={isLoading}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Iniciando plataforma...</span>
                </>
              ) : (
                <>
                  <Play className="h-6 w-6" />
                  <span>Comenzar Ahora</span>
                </>
              )}
            </button>
            
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
              Ver Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center space-x-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Cumplimiento RES EX 1821</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">+50 Centros de Cultivo</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">Análisis Predictivo IA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Tecnología de Vanguardia para Acuicultura
            </h3>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Integra sensores IoT, inteligencia artificial y visualización 3D para optimizar 
              cada aspecto de tu operación acuícola
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Waves,
                title: "Monitoreo en Tiempo Real",
                description: "Sensores IoT para calidad de agua, comportamiento de peces y condiciones ambientales"
              },
              {
                icon: BarChart3,
                title: "Análisis Predictivo",
                description: "IA para predicción de mortalidad, optimización de alimentación y detección temprana de problemas"
              },
              {
                icon: Shield,
                title: "Cumplimiento Normativo",
                description: "Generación automática de reportes según RES EX 1821 y otras regulaciones chilenas"
              },
              {
                icon: CheckCircle,
                title: "Gestión de Infraestructura",
                description: "Visualización 3D de balsas jaulas, seguimiento de mantenimiento y análisis estructural"
              },
              {
                icon: Star,
                title: "Alertas Inteligentes",
                description: "Sistema de notificaciones proactivas basado en umbrales personalizables"
              },
              {
                icon: Users,
                title: "Colaboración en Equipo",
                description: "Herramientas para coordinación entre veterinarios, técnicos y administradores"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all">
                <div className="bg-white/20 rounded-lg p-3 w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-blue-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Resultados Comprobados en la Industria
              </h3>
              <div className="space-y-6">
                {[
                  { metric: "25%", description: "Reducción en mortalidad promedio" },
                  { metric: "18%", description: "Mejora en eficiencia de alimentación" },
                  { metric: "40%", description: "Reducción en tiempo de reportes" },
                  { metric: "99.8%", description: "Disponibilidad del sistema" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg p-3">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">{benefit.metric}</div>
                      <div className="text-blue-200">{benefit.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-center">
                <h4 className="text-2xl font-bold mb-4">¿Listo para transformar tu operación?</h4>
                <p className="text-blue-100 mb-6">
                  Únete a los líderes de la industria acuícola que ya confían en AquApp
                </p>
                <button
                  onClick={handleEnter}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <span>Acceder a la Plataforma</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Waves className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold">AquApp</span>
          </div>
          <p className="text-blue-200 mb-4">
            Plataforma líder para la gestión integral de centros de cultivo acuícola
          </p>
          <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-blue-300">
            <span>© 2025 AquApp. Todos los derechos reservados.</span>
            <span>•</span>
            <span>Desarrollado en Chile</span>
            <span>•</span>
            <span>Cumplimiento normativo garantizado</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;