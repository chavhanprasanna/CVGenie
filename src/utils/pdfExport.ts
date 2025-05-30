import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Options for exporting resume to PDF
 */
interface ExportPdfOptions {
  filename?: string;
  quality?: number; // 0.0 to 1.0
  scale?: number;
  onProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
  onSuccess?: (url: string) => void;
}

/**
 * Export resume to PDF with high quality and proper A4 sizing
 * 
 * @param elementId DOM ID of the element to export (typically 'resume-preview')
 * @param options Configuration options for the export
 */
export const exportResumeToPdf = async (
  elementId: string, 
  options: ExportPdfOptions = {}
): Promise<string> => {
  try {
    const {
      filename = 'resume.pdf',
      quality = 1.0,
      scale = 2, // Higher scale = better quality
      onProgress,
      onError,
      onSuccess
    } = options;
    
    // Find the target element
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }
    
    // Prepare element for capturing by applying print-specific styling
    const originalTransform = element.style.transform;
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;
    
    // Temporarily apply styles that ensure what we capture is exactly what will be in the PDF
    element.style.transform = 'none';
    element.style.width = '210mm';
    element.style.height = '297mm';
    
    // Progress update
    if (onProgress) onProgress(0.1);
    
    // Create a canvas from the element with high resolution
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      // Ensure consistent text rendering across browsers
      letterRendering: true,
      // Improve quality of canvas capture
      imageTimeout: 0,
      removeContainer: true
    });
    
    // Progress update
    if (onProgress) onProgress(0.6);
    
    // Restore original styling after capture
    element.style.transform = originalTransform;
    element.style.width = originalWidth;
    element.style.height = originalHeight;
    
    // A4 dimensions in mm and converted to points for jsPDF
    const a4WidthMm = 210;
    const a4HeightMm = 297;
    
    // Create a PDF of A4 size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Calculate the ratio of canvas to ensure it fits perfectly on A4
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Add the image to the PDF maintaining A4 proportions
    const imgData = canvas.toDataURL('image/jpeg', quality);
    pdf.addImage(imgData, 'JPEG', 0, 0, a4WidthMm, a4HeightMm);
    
    // Progress update
    if (onProgress) onProgress(0.9);
    
    // Generate the PDF as a blob URL for preview or download
    const pdfOutput = pdf.output('bloburl');
    
    // Call success callback if provided
    if (onSuccess) onSuccess(pdfOutput);
    
    // Progress update
    if (onProgress) onProgress(1.0);
    
    return pdfOutput;
    
  } catch (error) {
    // Handle errors
    console.error('Error exporting PDF:', error);
    if (options.onError) options.onError(error as Error);
    throw error;
  }
};

/**
 * Print the resume using browser's print functionality with 
 * enhanced print styling
 * 
 * @param elementId DOM ID of the element to print
 */
export const printResume = (elementId: string): void => {
  try {
    // Add 'printing' class to body to trigger specific print styles
    document.body.classList.add('printing');
    
    // Focus on the resume preview element for printing
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }
    
    // Use browser print functionality
    window.print();
    
    // Remove 'printing' class after print dialog closes
    // (browsers typically return to the page after print dialog)
    setTimeout(() => {
      document.body.classList.remove('printing');
    }, 1000);
    
  } catch (error) {
    console.error('Error printing resume:', error);
    document.body.classList.remove('printing');
  }
};
