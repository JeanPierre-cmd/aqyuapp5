import { useState } from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon, FileText, Filter, Download, BarChart2, LoaderCircle, CheckCircle2, AlertTriangle, BellRing } from "lucide-react"; // Added BellRing for Alerts
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Import default styles for react-day-picker

import { PDFReportGenerator, WaterQualityReportData, HealthReportData, generateSampleHealthReport, FeedingReportData, generateSampleFeedingReport, generateSampleMaintenanceReport, AlertsReportData, generateSampleAlertsReport } from "@/utils/pdfGenerator"; // Import PDF generator and types, added generateSampleMaintenanceReport, AlertsReportData, generateSampleAlertsReport
import { WaterParameter } from "@/types"; // Import WaterParameter type

// A simple, styled card component for local use
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-surface border border-border rounded-xl p-6 space-y-4 shadow-lg", className)}>
    {children}
  </div>
);

const CardTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) => (
  <h3 className="text-2xl font-bold text-text mb-4 flex items-center gap-3">
    {Icon && <Icon className="w-7 h-7 text-primary" />}
    {children}
  </h3>
);

const REPORT_TYPES = [
  { key: "calidad-agua", label: "Reporte de Calidad de Agua" },
  { key: "salud-peces", label: "Informe Sanitario de Peces" },
  { key: "alimentacion", label: "Reporte de Alimentación" },
  { key: "mantenimiento", label: "Reporte de Mantenimiento" },
  { key: "sitios", label: "Reporte de Sitios" },
  { key: "unidades", label: "Reporte de Unidades" },
  { key: "fondeo", label: "Reporte de Fondeo" },
  { key: "activos", label: "Reporte de Activos" },
  { key: "alertas", label: "Reporte de Alertas" }, // Added Alerts Report
] as const;

type ReportTypeKey = typeof REPORT_TYPES[number]["key"];

export default function ReportsModule() {
  const [selectedReportType, setSelectedReportType] = useState<ReportTypeKey | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportStatus, setReportStatus] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // New state for date picker visibility

  // Mock data for Water Quality Report (for demonstration purposes)
  const mockWaterQualityData: WaterQualityReportData = {
    reportDate: new Date(),
    parameters: [
      { id: 'ph', name: 'pH', value: 7.8, unit: '', minRange: 7.5, maxRange: 8.5, timestamp: new Date(), status: 'normal' },
      { id: 'temp', name: 'Temperatura', value: 12.5, unit: '°C', minRange: 10, maxRange: 15, timestamp: new Date(), status: 'normal' },
      { id: 'do', name: 'Oxígeno Disuelto', value: 6.2, unit: 'mg/L', minRange: 5.0, maxRange: 8.0, timestamp: new Date(), status: 'normal' },
      { id: 'sal', name: 'Salinidad', value: 32.0, unit: '‰', minRange: 30.0, maxRange: 35.0, timestamp: new Date(), status: 'normal' },
      { id: 'amm', name: 'Amonio', value: 0.05, unit: 'mg/L', minRange: 0.0, maxRange: 0.1, timestamp: new Date(), status: 'normal' },
      { id: 'nit', name: 'Nitritos', value: 0.01, unit: 'mg/L', minRange: 0.0, maxRange: 0.02, timestamp: new Date(), status: 'normal' },
      { id: 'nitr', name: 'Nitratos', value: 1.5, unit: 'mg/L', minRange: 0.0, maxRange: 5.0, timestamp: new Date(), status: 'normal' },
      { id: 'turb', name: 'Turbidez', value: 15, unit: 'NTU', minRange: 0, maxRange: 20, timestamp: new Date(), status: 'normal' },
      { id: 'chl', name: 'Clorofila a', value: 2.3, unit: 'µg/L', minRange: 0.5, maxRange: 5.0, timestamp: new Date(), status: 'normal' },
    ],
    observations: "Los parámetros de calidad de agua se encuentran dentro de los rangos óptimos para el cultivo de salmónidos, según lo establecido en la normativa vigente. No se observan anomalías significativas que puedan afectar la salud de los peces o el ecosistema acuático. Se recomienda continuar con el monitoreo diario y ajustar las estrategias de alimentación según sea necesario."
  };


  const handleGenerateReport = async () => {
    if (!selectedReportType) {
      setReportStatus("Por favor, selecciona un tipo de reporte.");
      return;
    }
    setIsGenerating(true);
    setReportStatus(null);

    const pdfGenerator = new PDFReportGenerator();

    try {
      switch (selectedReportType) {
        case "calidad-agua":
          // In a real scenario, fetch data based on dateRange. For now, use mock data.
          pdfGenerator.generateWaterQualityReport(mockWaterQualityData);
          setReportStatus(`Reporte de Calidad de Agua generado con éxito.`);
          break;
        case "salud-peces":
          // In a real scenario, fetch data based on dateRange. For now, use sample data.
          pdfGenerator.generateHealthReport(generateSampleHealthReport());
          setReportStatus(`Informe Sanitario de Peces generado con éxito.`);
          break;
        case "alimentacion":
          pdfGenerator.generateFeedingReport(generateSampleFeedingReport());
          setReportStatus(`Reporte de Alimentación generado con éxito.`);
          break;
        case "mantenimiento":
          pdfGenerator.generateMaintenanceReport(generateSampleMaintenanceReport());
          setReportStatus(`Reporte de Mantenimiento generado con éxito.`);
          break;
        case "alertas": // NEW: Alerts Report
          pdfGenerator.generateAlertsReport(generateSampleAlertsReport());
          setReportStatus(`Reporte de Alertas generado con éxito.`);
          break;
        case "sitios":
        case "unidades":
        case "fondeo":
        case "activos":
          // Placeholder for other report types
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate generation time
          setReportStatus(`Reporte de ${REPORT_TYPES.find(r => r.key === selectedReportType)?.label} (próximamente) generado con éxito.`);
          break;
        default:
          setReportStatus("Tipo de reporte no reconocido.");
          break;
      }
    } catch (error) {
      console.error("Error generating report:", error);
      setReportStatus("Error al generar el reporte. Por favor, inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) { // Close picker if both dates are selected
      setShowDatePicker(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6 bg-background text-text">
      <Card className="animate-scale-in">
        <CardTitle icon={BarChart2}>Generador de Reportes</CardTitle>
        <p className="text-textSecondary mb-6">Selecciona el tipo de reporte que deseas generar y aplica los filtros necesarios.</p>

        <div className="space-y-4">
          <label className="font-medium text-textSecondary">Tipo de Reporte</label>
          <div className="flex flex-wrap gap-3">
            {REPORT_TYPES.map(r => (
              <button
                key={r.key}
                onClick={() => setSelectedReportType(r.key)}
                className={cn(
                  "px-5 py-2.5 rounded-lg text-base font-semibold transition-all duration-200 flex items-center gap-2",
                  selectedReportType === r.key
                    ? "bg-primary text-white shadow-lg"
                    : "bg-surface hover:bg-border/50 text-textSecondary border border-border"
                )}
              >
                {r.key === "alertas" ? <BellRing className="w-5 h-5" /> : <FileText className="w-5 h-5" />} {/* Use BellRing for Alerts */}
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {selectedReportType && (
        <Card className="animate-scale-in delay-100">
          <CardTitle icon={Filter}>Filtros para el Reporte</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-medium text-textSecondary block mb-2">Rango de Fechas</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                <input
                  type="text"
                  readOnly
                  value={
                    dateRange?.from
                      ? dateRange.to
                        ? `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`
                        : format(dateRange.from, "PPP")
                      : ""
                  }
                  placeholder="Selecciona un rango de fechas"
                  className="w-full bg-background border border-border rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-text cursor-pointer"
                  onClick={() => setShowDatePicker(!showDatePicker)} // Toggle date picker visibility
                />
              </div>
              {showDatePicker && ( // Conditionally render DayPicker
                <div className="mt-4 bg-background border border-border rounded-lg p-4 shadow-md absolute z-10"> {/* Added absolute and z-10 for layering */}
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateSelect} // Use new handler
                    numberOfMonths={2}
                    className="text-text"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium text-text",
                      nav: "space-x-1 flex items-center",
                      nav_button: cn(
                        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                        "text-text hover:bg-border/50 rounded-md"
                      ),
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-textSecondary rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].range-start)]:rounded-l-md [&:has([aria-selected].range-end)]:rounded-r-md [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected])]:bg-primary/10",
                      day: cn(
                        "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                        "text-text hover:bg-border/50 rounded-md"
                      ),
                      day_range_start: "rounded-l-md",
                      day_range_end: "rounded-r-md",
                      day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
                      day_today: "bg-primary/20 text-primary",
                      day_outside: "text-textSecondary opacity-50",
                      day_disabled: "text-textSecondary opacity-50",
                      day_range_middle: "aria-selected:bg-primary/20 aria-selected:text-text",
                      day_hidden: "invisible",
                    }}
                  />
                </div>
              )}
            </div>
            {/* Future specific filters for each report type can go here */}
            <div className="space-y-2">
              <label className="font-medium text-textSecondary block mb-2">Filtros Adicionales (próximamente)</label>
              <div className="bg-surface border border-border rounded-lg p-4 text-textSecondary text-sm italic h-full flex items-center justify-center">
                <p>Los filtros específicos para cada tipo de reporte se añadirán en futuras actualizaciones.</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {selectedReportType && (
        <Card className="animate-scale-in delay-200">
          <CardTitle icon={Download}>Generar Reporte</CardTitle>
          <div className="flex justify-end pt-4 border-t border-border mt-6">
            <button
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              onClick={handleGenerateReport}
              disabled={isGenerating || !selectedReportType}
            >
              {isGenerating ? <LoaderCircle className="animate-spin w-5 h-5" /> : <Download className="w-5 h-5" />}
              {isGenerating ? "Generando..." : "Generar Reporte PDF"}
            </button>
          </div>
          {reportStatus && (
            <div className={cn(
              "mt-4 p-3 rounded-lg text-sm flex items-center gap-2",
              reportStatus.includes("éxito") ? "bg-success/10 text-success border border-success/50" : "bg-error/10 text-error border border-error/50"
            )}>
              {reportStatus.includes("éxito") ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              <span>{reportStatus}</span>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
