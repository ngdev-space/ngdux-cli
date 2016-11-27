export function Config(name?: string): string | Object {
	const conf = {
        rootFolder: 'redux',
        effect: 'effects',
        model: 'models',
        reducer: 'reducers',
        middleware: 'middlewares'
    }

    if (!name) {
        return conf;
    }
	return conf[name] || '';
}

export function PrivateConfig(name?: string): string | Object {

    const conf = {
        fileExtension: 'ts',
        configFileName: '.ngdux'
    }

   	if (!name) {
        return conf;
    }
	return conf[name] || '';
}