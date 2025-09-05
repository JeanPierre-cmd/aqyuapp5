// TODO: Este es un stub para desbloquear el build
// Implementar funcionalidad completa del programa de lealtad

import React from 'react';
import { Gift, Star, Trophy, Award } from 'lucide-react';

const LoyaltyProgram: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programa de Lealtad</h1>
          <p className="text-gray-600">Sistema de recompensas y beneficios para usuarios AquApp</p>
        </div>
        <div className="flex items-center space-x-2">
          <Gift className="h-6 w-6 text-purple-500" />
          <span className="text-sm text-gray-500">Próximamente</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="bg-purple-100 rounded-full p-6 w-fit mx-auto mb-4">
          <Trophy className="h-16 w-16 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Programa de Lealtad</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Gana puntos por usar AquApp, completa desafíos y desbloquea beneficios exclusivos 
          para optimizar tu operación acuícola.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Puntos por Actividad</h3>
            <p className="text-sm text-gray-600">Gana puntos por usar las funcionalidades</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Desafíos Mensuales</h3>
            <p className="text-sm text-gray-600">Completa objetivos y gana recompensas</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <Gift className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Beneficios Exclusivos</h3>
            <p className="text-sm text-gray-600">Acceso a funciones premium y descuentos</p>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-purple-800 font-medium">
            🚧 Módulo en desarrollo - Próximamente disponible
          </p>
          <p className="text-purple-600 text-sm mt-1">
            Estamos trabajando en un sistema completo de gamificación para mejorar tu experiencia
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;