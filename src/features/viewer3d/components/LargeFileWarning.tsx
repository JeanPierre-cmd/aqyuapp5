import React from 'react';

interface Props {
  fileName: string;
  fileSizeMB: number;
  onClose(): void;
}

export function LargeFileWarning({ fileName, fileSizeMB, onClose }: Props) {
  return (
    <div
      role="alert"
      className="fixed bottom-4 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2
                 rounded-lg border border-warning bg-surface p-4 shadow-lg"
    >
      <h3 className="mb-1 text-lg font-semibold text-warning">
        Archivo grande detectado
      </h3>
      <p className="text-sm text-textSecondary">
        {fileName} pesa&nbsp;
        <strong>{fileSizeMB.toFixed(1)} MB</strong>. Los archivos STEP muy
        grandes pueden ralentizar tu navegador. Considera convertirlo a&nbsp;
        <em>GLB</em> (binario optimizado) para una carga y visualización mucho
        más rápida.
      </p>
      <button
        onClick={onClose}
        className="mt-3 rounded-md bg-warning px-3 py-1.5 text-sm font-medium text-surface hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning"
      >
        Entendido
      </button>
    </div>
  );
}
export default LargeFileWarning;
