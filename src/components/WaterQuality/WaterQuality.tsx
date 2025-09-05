import React, { useState, useEffect } from 'react';
import { Droplets, Thermometer, Activity, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface WaterParameter {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  range: { min: number; max: number; optimal: { min: number; max: number } };
}

const WaterQuality: React.FC = () => {
  const [parameters, setParameters] = useState<WaterParameter[]>([
    {
      id: 'temperature',
      name: 'Temperatura',
      value: 18.5,
      unit: '°C',
      status: 'good',
      trend: 'stable',
      icon: Thermometer,
      range: { min: 10, max: 25, optimal: { min: 16, max: 20 } }
    },
    {
      id: 'oxygen',
      name: 'Oxígeno Disuelto',
      value: 7.2,
      unit: 'mg/L',
      status: 'good',
      trend: 'up',
      icon: Activity,
      range: { min: 5, max: 12, optimal: { min: 6, max: 9 } }
    },
    {
      id: 'ph',
      name: 'pH',
      value: 7.8,
      unit: '',
      status: 'warning',
      trend: 'up',
      icon: Droplets,
      range: { min: 6.5, max: 8.5, optimal: { min: 7.0, max: 8.0 } }
    },
    {
      id: 'salinity',
      name: 'Salinidad',
      value: 34.2,
      unit: 'ppt',
      status: 'good',
      trend: 'stable',
      icon: Droplets,
      range: { min: 30, max: 36, optimal: { min: 32, max: 35 } }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Calidad del Agua</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="w-4 h-4" />
          <span>Última actualización: hace 5 minutos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {parameters.map((param) => {
          const Icon = param.icon;
          return (
            <div key={param.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(param.status)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{param.name}</h3>
                    <p className="text-sm text-gray-500">
                      Óptimo: {param.range.optimal.min}-{param.range.optimal.max} {param.unit}
                    </p>
                  </div>
                </div>
                {getTrendIcon(param.trend)}
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {param.value}
                  </span>
                  <span className="text-sm text-gray-500">{param.unit}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{param.range.min}</span>
                  <span>{param.range.max}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      param.status === 'good' ? 'bg-green-500' :
                      param.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{
                      width: `${((param.value - param.range.min) / (param.range.max - param.range.min)) * 100}%`
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(param.status)}`}>
                  {param.status === 'good' && 'Óptimo'}
                  {param.status === 'warning' && 'Precaución'}
                  {param.status === 'critical' && 'Crítico'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Historial de Parámetros</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Activity className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>Gráfico de tendencias en desarrollo</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertas Recientes</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">pH elevado detectado</p>
              <p className="text-sm text-yellow-600">Valor actual: 7.8 - Recomendado: 7.0-8.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterQuality;