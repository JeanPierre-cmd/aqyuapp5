import React, { useEffect, useState } from 'react';
import { XCircle, FileText, Image } from 'lucide-react';

interface DocumentViewerProps {
  file: File | null;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ file, onClose }) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setObjectUrl(null);
      };
    }
  }, [file]);

  if (!file || !objectUrl) {
    return (
      <div className="bg-surface rounded-xl shadow-lg border border-border p-12 text-center text-textSecondary">
        <p className="text-lg">No hay documento para visualizar.</p>
      </div>
    );
  }

  const isPdf = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');

  return (
    <div className="bg-surface rounded-xl shadow-lg border border-border overflow-hidden animate-scale-in">
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center space-x-3">
          {isPdf && <FileText className="h-5 w-5 text-primary" />}
          {isImage && <Image className="h-5 w-5 text-primary" />}
          <h3 className="text-lg font-semibold text-text">{file.name}</h3>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
            {file.type.split('/')[1]?.toUpperCase() || 'DOCUMENTO'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-textSecondary hover:bg-border hover:text-text transition-colors"
          title="Cerrar visor"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="relative w-full h-[700px] bg-background flex items-center justify-center">
        {isPdf && (
          <iframe
            src={objectUrl}
            title={file.name}
            className="w-full h-full border-none"
            style={{ minHeight: '100%' }}
          />
        )}
        {isImage && (
          <img
            src={objectUrl}
            alt={file.name}
            className="max-w-full max-h-full object-contain"
          />
        )}
        {!isPdf && !isImage && (
          <div className="text-center text-textSecondary">
            <p className="text-lg">Tipo de archivo no soportado para visualización directa.</p>
            <p className="text-sm mt-2">Intenta con PDF, JPG o PNG.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
