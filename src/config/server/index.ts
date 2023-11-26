import { ConfigProps } from "src/interfaces/config";

export const config = ():ConfigProps => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    api: {
      apiUrl: process.env.API_URL,
      httpTimeout: 1000,
    },
   
   });