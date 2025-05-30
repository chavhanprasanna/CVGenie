import html2pdf from 'html2pdf.js';

export const generatePDF = (elementId: string, filename: string = 'resume.pdf'): Promise<void> => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    return Promise.reject('Element not found');
  }

  const options = {
    margin: [10, 10],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  return html2pdf().set(options).from(element).save();
};