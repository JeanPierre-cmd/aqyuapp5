import React, { useState } from 'react';
import { Fish, Heart, AlertTriangle, TrendingUp, Activity, Eye, Thermometer } from 'lucide-react';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}

interface FishBatch {
  id: string;
  name: string;
  species: string;
  count: number;
  avgWeight: number;
  healthScore: number;
  lastInspection: string;
}

const FishHealth: React.FC = () => {
  const [healthMetrics] = useState<HealthMetric[]>([
    {
      id: 'mortality',
      name: 'Mortalidad',
      value: 0.8,
      unit: '%',
      status: 'good',
      trend: 'down',
      icon: Heart
    },
    {
      id: 'growth',
      name: 'Tasa de Crecimiento',
      value: 2.3,
      unit: '%/día',
      status: 'good',
      trend: 'up',
      icon: TrendingUp
    },
    {
      id: 'feeding',
      name: 'Conversión Alimenticia',
      value: 1.2,
      unit: 'FCR',
      status: 'good',
      trend: 'stable',
      icon: Activity
    },
    {
      id: 'behavior',
      name: 'Índice Comportamental',
      value: 8.5,
      unit: '/10',
      status: 'good',
      trend: 'stable',
      icon: Eye
    }
  ]);

  const [fishBatches] = useState<FishBatch[]>([
    {
      id: 'batch1',
      name: 'Lote A-2024',
      species: 'Salmón Atlántico',
      count: 15000,
      avgWeight: 2.8,
      healthScore: 92,
      lastInspection: '2024-01-15'
    },
    {
      id: 'batch2',
      name: 'Lote B-2024',
      species: 'Salmón Coho',
      count: 12000,
      avgWeight: 2.1,
      healthScore: 88,
      lastInspection: '2024-01-14'
    },
    {
      id: 'batch3',
      name: 'Lote C-2024',
      species: 'Trucha Arcoíris',
      count: 8000,
      avgWeight: 1.9,
      healthScore: 95,
      lastInspection: '2024-01-15'
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

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Salud de los Peces</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Fish className="w-4 h-4" />
          <span>Última inspección: hace 2 horas</span>
        </div>
      </div>

      {/* Métricas de Salud */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div className="mb-2">
                <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
              </div>

              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                {metric.status === 'good' && 'Óptimo'}
                {metric.status === 'warning' && 'Precaución'}
                {metric.status === 'critical' && 'Crítico'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lotes de Peces */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Estado de los Lotes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lote
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peso Promedio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salud
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Inspección
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fishBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Fish className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="font-medium text-gray-900">{batch.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {batch.species}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {batch.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {batch.avgWeight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getHealthScoreColor(batch.healthScore)}`}>
                      {batch.healthScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {batch.lastInspection}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alertas de Salud */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertas de Salud</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <Heart className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Mortalidad bajo control</p>
              <p className="text-sm text-green-600">Tasa actual: 0.8% - Dentro de parámetros normales</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Crecimiento óptimo</p>
              <p className="text-sm text-blue-600">Tasa de crecimiento: 2.3%/día - Excelente rendimiento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FishHealth;