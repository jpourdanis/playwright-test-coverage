const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Use environment variable provided by Docker, or default to localhost for host development
  const target = process.env.PROXY_API_URL || 'http://localhost:5001';
  
  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
