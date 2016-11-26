export function Config(name: string) {
	const conf = {
        fileExtension: 'ts',
        rootFolder: 'redux',
        effectsFolder: 'effects',
        modelsFolder: 'models',
        reducersFolder: 'reducers',
        middlewaresFolder: 'middlewares'
    }

    return conf[name];
}