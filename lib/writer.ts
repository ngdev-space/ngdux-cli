import * as fs from 'fs';
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import { template as effectTpl } from '../blueprints/effect/effect';
import { template as duckTpl } from '../blueprints/reducer/duck';
import { template as middlewareTpl } from '../blueprints/middleware/middleware';
import { template as modelTpl } from '../blueprints/model/model';
import { Config } from './config';

const extension = Config('fileExtension');

export class Writer {
	private static writeFile(filepath: string, text: string) {	
		fs.writeFile(filepath, text, function(err) {
		    if (err) {
		        return console.log(err);
		    }
		});
	}

	private static makeDir(path: string, cb?: Function) {
		mkdirp(path, function (err) {
		    if (err) {
				return console.log(err);
			}
			if (cb) {
				cb(true);
			}
		});
	}

	static createDir(dirname: string = Config('rootFolder'), path: string = './') {
		const dirPath = `${path}/${dirname}`;
		this.makeDir(dirPath, () => {
			this.makeDir(`${dirPath}/${Config('reducersFolder')}`);
			this.makeDir(`${dirPath}/${Config('modelsFolder')}`);
			this.makeDir(`${dirPath}/${Config('middlewaresFolder')}`);
			this.makeDir(`${dirPath}/${Config('effectsFolder')}`);
		});
	}

	static writeBundle(name: string, path: string) {
		this.writeModel(name, path);
		this.writeReducer(name, path);
		this.writeEffect(name, path);
	}

	static writeEffect(name: string, path: string) {
	    const innerName = name.toLocaleLowerCase();
		const text: string = effectTpl(name);
		let filepath = `${path}/${Config('rootFolder')}/${Config('effectsFolder')}/${innerName}.${extension}`;
	    this.writeFile(filepath, text);
	}

	static writeReducer(name: string, path: string) {
	    const innerName = name.toLocaleLowerCase();
	    const text: string = duckTpl(name);
		let filepath = `${path}/${Config('rootFolder')}/${Config('reducersFolder')}/${innerName}.${extension}`;
	    this.writeFile(filepath, text);
	}

	static writeModel(name: string, path: string) {
	    const innerName = name.toLocaleLowerCase();
	    const text: string = modelTpl(name);
		let filepath = `${path}/${Config('rootFolder')}/${Config('modelsFolder')}/${innerName}.${extension}`;
	    this.writeFile(filepath, text);
	}

	static writeMiddleware(name: string, path: string) {
	    const innerName = name.toLocaleLowerCase();
	    const text: string = middlewareTpl(name);
		let filepath = `${path}/${Config('rootFolder')}/${Config('middlewaresFolder')}/${innerName}.${extension}`;
	    this.writeFile(filepath, text);
	}
}