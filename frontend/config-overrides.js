module.exports = {
	devServer: function(configFunction) {
    return function(proxy, allowedHost) {

      const config = configFunction(proxy, allowedHost);
			
			config.proxy = config.proxy ? config.proxy : {}

			config.proxy['/socket.io/*'] = {
				target: 'ws://localhost:8080',
				ws: true
			};

			config.proxy['/api/*'] = {
				target: 'http://localhost:8080'
			};

      return config;
    }
  }
}