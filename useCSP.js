export const useCSP = () => {
  const isDev = import.meta.env.DEV;
  return `
    default-src 'self';
    connect-src 'self' 
      https://e-commerce-heao.onrender.com
      ${isDev ? "http://localhost:5000 ws://localhost:5000" : ""};
    // ... other directives
  `;
};