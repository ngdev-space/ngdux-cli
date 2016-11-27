import * as fs from 'fs';
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import { template as effectTpl } from '../blueprints/effect/effect';
import { template as duckTpl } from '../blueprints/reducer/duck';
import { template as middlewareTpl } from '../blueprints/middleware/middleware';
import { template as modelTpl } from '../blueprints/model/model';
import { template as ngduxTpl } from '../blueprints/ngdux/config';

export class Writer {

	constructor(private vorpal: any, private config: Function) {
		this.loadConfigFile();
	}

	private reducer = (name: string, model: boolean): string => duckTpl(name, model, this.config());
	private model = (name: string): string => modelTpl(name);
	private middleware = (name: string): string => middlewareTpl(name);
	private effect = (name: string, model: boolean): string => effectTpl(name, model, this.config());
	private path = (template: string, path: string, name: string, def: boolean): string => 
		(def) ?
		`${path}/${this.config('rootFolder')}/${this.config()[template]}/${name}.${this.config('fileExtension')}`:
		`${path}/${name}.${this.config('fileExtension')}`;
	private writeConfig = (path: string, config: Object) => this.writeFile(path, ngduxTpl(config));

	private writeFile(filepath: string, text: string) {	
		fs.writeFile(filepath, text, (err) => {
		    if (err) { return this.vorpal.log(err); }
			this.vorpal.log(this.vorpal.chalk.green(`Created ${filepath} file.`));
		});
	}

	private makeDir(path: string, cb?: Function) {
		mkdirp(path, (err) => {
		    if (err) { return this.vorpal.log(err); }
			this.vorpal.log(this.vorpal.chalk.green(`Created ${path} dir.`));
			if (cb) { cb(true); }
		});
	}

	private loadConfigFile() {
		
	}

	public createDir(dirname: string = this.config('rootFolder'), path: string) {
		this.writeConfig(`${path}/.ngdux`, {});
		const dirPath = `${path}/${dirname}`;
		this.makeDir(dirPath, () => {
			this.makeDir(`${dirPath}/${this.config('reducer')}`);
			this.makeDir(`${dirPath}/${this.config('model')}`);
			this.makeDir(`${dirPath}/${this.config('middleware')}`);
			this.makeDir(`${dirPath}/${this.config('effect')}`);
		});
	}

	public writeBundle(name: string, path: string) {
		this.write('model', name, path, true, true);
		this.write('reducer', name, path, true, true);
		this.write('effect', name, path, true, true);
	}

	public write(template: string, name: string, path: string, def: boolean, bundle?: boolean) {
		const lname = name.toLocaleLowerCase();
		const compiledTemplate = this[template](lname, bundle);
		const filepath = this.path(template, path, lname, def);
		this.writeFile(filepath, compiledTemplate);
	}
}