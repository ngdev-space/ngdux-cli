import * as _ from 'lodash';

export class Config {
	private static conf: Object = {
        rootFolder: 'redux',
        effect: 'effects',
        model: 'models',
        reducer: 'reducers',
        middleware: 'middlewares'
    }

   	static extendConf(conf: Object) {
		this.conf = _.assign({}, Config.getConfig(), conf);
    }

    static getConfig(): Object {
        return this.conf;
    }

    static getItem(name: string): string {
        return this.conf[name] || '';
    }
}


export class PrivateConfig {
	private static conf: Object = {
        fileExtension: 'ts',
        configFileName: '.ngdux'
    }

   	static extendConf(conf: Object) {
		this.conf = _.assign({}, Config.getConfig(), conf);
    }

    static getConfig(): Object {
        return this.conf;
    }

    static getItem(name: string): string {
        return this.conf[name] || '';
    }
}
