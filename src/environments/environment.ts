let hostName: any = window.location.hostname.includes("localhost")
  ? `http://${ window.location.hostname }`
  : `https://${ window.location.hostname }`;

export const environment = {
  production: true,

  // Comentado até que as APIs tenham um local de publicação fixo
  //  apiUrl: `${hostName}`,
  apiUrl: 'http://localhost:3000'
};
