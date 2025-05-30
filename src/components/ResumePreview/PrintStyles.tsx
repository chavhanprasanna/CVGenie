import React from 'react';

/**
 * Component that adds global print styles to ensure consistent
 * PDF export and printing across different browsers
 */
const PrintStyles: React.FC = () => {
  return (
    <style 
      dangerouslySetInnerHTML={{ 
        __html: `
          @media print {
            /* Override browser defaults */
            @page {
              size: A4;
              margin: 0;
            }
            
            html, body {
              width: 210mm;
              height: 297mm;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            /* Hide unnecessary UI elements when printing */
            .no-print, .no-print * {
              display: none !important;
            }
            
            /* Ensure the resume page appears correctly */
            #resume-preview {
              width: 210mm !important;
              height: 297mm !important;
              overflow: hidden !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              margin: 0 !important;
              padding: 20mm 25mm !important;
              box-shadow: none !important;
              transform: scale(1) !important;
              background-color: white !important;
              border: none !important;
              box-sizing: border-box !important;
            }
            
            /* Text and colors */
            #resume-preview * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            /* Fix for Firefox page breaks */
            #resume-preview {
              page-break-inside: avoid;
            }
            
            /* Fix for border rendering in some browsers */
            #resume-preview h2, #resume-preview h3, #resume-preview p {
              page-break-inside: avoid;
            }
            
            /* Fix for Chrome rendering of box shadows */
            #resume-preview div {
              border-color: #e2e8f0 !important;
            }
          }
        `
      }} 
    />
  );
};

export default PrintStyles;
