export const formatDateRange = (startDate: string, endDate: string, current: boolean): string => {
  if (!startDate) return '';
  
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };
  
  const formattedStartDate = formatDate(startDate);
  
  if (current) {
    return `${formattedStartDate} - Present`;
  }
  
  const formattedEndDate = formatDate(endDate);
  return `${formattedStartDate} - ${formattedEndDate}`;
};

export const formatDateToISOString = (dateStr: string): string => {
  if (!dateStr) return '';
  
  try {
    const date = new Date(dateStr);
    return date.toISOString().substring(0, 7); // YYYY-MM format
  } catch (error) {
    return '';
  }
};