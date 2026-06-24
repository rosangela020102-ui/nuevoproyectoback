export const formatDate = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date().toLocaleDateString('es-ES', options);
};


export const formatApiResponse = (success, data, message = "") => {
    return {
    success: success,               
    timestamp: formatDate(),  
    message: message,       
    data: data                     
  };
};
export { formatApiResponse as formatResponse };