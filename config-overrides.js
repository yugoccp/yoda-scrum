module.exports = {
	devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);
			
			config.proxy = config.proxy ? config.proxy : {}

			config.proxy['/api/*'] = {
				target: 'http://localhost:3001'
			}

			config.proxy['/socket.io/*'] = {
				target: 'ws://localhost:3001',
				ws: true
			}

      // Return your customised Webpack Development Server config.
      return config;
    }
  }
}