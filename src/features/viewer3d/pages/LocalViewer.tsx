import { useState, useRef } from 'react';
import LargeFileWarning from '../components/LargeFileWarning';
import DropArea from '../../../components/DropArea/DropArea';
import Visualization3D from '../components/Visualization3D'; // This exports ModelViewer
import DocumentViewer from '../components/DocumentViewer'; // New component
import { ModelData } from '../../../components/ModelViewer/ModelViewer'; // Import ModelData interface
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FileText, Upload } from 'lucide-react'; // Import icons for buttons

 const LARGE_STEP_THRESHOLD_MB = 15;

 export default function LocalViewer() {
   const [largeFile, setLargeFile] = useState<{
     name: string;
     sizeMB: number;
   } | null>(null);
   const [modelData, setModelData] = useState<ModelData | null>(null); // For 3D models
   const [documentFile, setDocumentFile] = useState<File | null>(null); // For PDF/JPG

   const navigate = useNavigate(); // Initialize useNavigate
   const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden file input

   const handleDrop = async (file: File) => {
     // Clear previous views
     setModelData(null);
     setDocumentFile(null);
     setLargeFile(null);

     const fileName = file.name.toLowerCase();
     const fileExtension = fileName.split('.').pop();

     if (['pdf', 'jpg', 'jpeg', 'png'].includes(fileExtension || '')) {
       setDocumentFile(file);
     } else if (['stp', 'step', 'dwg'].includes(fileExtension || '')) {
       const sizeMB = file.size / (1024 * 1024);
       if (sizeMB > LARGE_STEP_THRESHOLD_MB) {
         setLargeFile({ name: file.name, sizeMB });
       }
       // Simulate processing for 3D viewer. In a real app, this would involve
       // uploading to Forge, getting a URN, etc.
       setModelData({
         urn: `urn:local:${file.name}`, // Dummy URN for local file
         name: file.name,
         status: 'ready',
         metadata: fileExtension === 'dwg' ? { software: 'AutoCAD', version: '2024', units: 'meters', layers: ['Layer1', 'Layer2'] } : undefined
       });
     } else {
       alert('Tipo de archivo no soportado. Por favor, sube un archivo STP, STEP, DWG, PDF, JPG o PNG.');
     }
     // lógica actual para leer el fichero, mandar al worker, etc.
   };

   const handleCloseDocumentViewer = () => {
     setDocumentFile(null);
   };

   const handleImportClick = () => {
     navigate('/import/infra'); // Navigate to the import wizard for 3D data
   };

   // Handler for the new "Importar JPG o PDF" button click
   const handleImportDocumentClick = () => {
     fileInputRef.current?.click(); // Trigger the hidden file input
   };

   // Handler for when a file is selected via the hidden input
   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
     const selectedFile = event.target.files?.[0];
     if (selectedFile) {
       handleDrop(selectedFile); // Reuse the existing file handling logic
     }
     // Reset the input value to allow selecting the same file again
     event.target.value = ''; // Important for re-selecting the same file
   };

   return (
     <>
       <div className="p-6 bg-background min-h-screen">
         <div className="flex justify-between items-center mb-6">
           <h1 className="text-3xl font-bold text-text">Visor de Infraestructura 3D/2D</h1>
           <div className="flex space-x-4"> {/* Group buttons for better layout */}
             {/* New button for importing JPG or PDF */}
             <button
               onClick={handleImportDocumentClick}
               className="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-md flex items-center space-x-2"
             >
               <FileText className="h-5 w-5" />
               <span>Importar JPG o PDF</span>
             </button>
             {/* Existing button, now clarified for 3D data */}
             <button
               onClick={handleImportClick}
               className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 shadow-md flex items-center space-x-2"
             >
               <Upload className="h-5 w-5" />
               <span>Importar Datos 3D</span>
             </button>
           </div>
         </div>

         <div className="bg-surface rounded-xl shadow-lg border border-border p-6 mb-6">
           <p className="text-textSecondary mb-4">
             Arrastra y suelta aquí tus archivos de modelos 3D (STP, STEP, DWG) o documentos 2D (PDF, JPG, PNG) para visualizarlos.
           </p>
           <DropArea onFile={handleDrop} />
         </div>

       {/* Hidden file input for "Importar JPG o PDF" */}
       <input
         type="file"
         ref={fileInputRef}
         onChange={handleFileSelect}
         accept=".pdf,.jpg,.jpeg,.png" // Specify accepted file types
         className="hidden"
       />

       {largeFile && (
         <LargeFileWarning
           fileName={largeFile.name}
           fileSizeMB={largeFile.sizeMB}
           onClose={() => setLargeFile(null)}
         />
       )}

       {documentFile ? (
         <DocumentViewer file={documentFile} onClose={handleCloseDocumentViewer} />
       ) : modelData ? (
         <Visualization3D modelData={modelData} />
       ) : (
         <div className="bg-surface rounded-xl shadow-lg border border-border p-12 text-center text-textSecondary">
           <p className="text-lg">Esperando un archivo para visualizar...</p>
           <p className="text-sm mt-2">Arrastra un modelo 3D o un documento 2D, o usa los botones de importación.</p>
         </div>
       )}
       </div>
     </>
   );
 }
