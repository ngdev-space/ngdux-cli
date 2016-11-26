export function Config(name?: string): string | Object {
	const conf = {
        fileExtension: 'ts',
        rootFolder: 'redux',
        effect: 'effects',
        model: 'models',
        reducer: 'reducers',
        middleware: 'middlewares'
    }

    if (!name) {
        return conf;
    }

    return conf[name];
}