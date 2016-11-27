import * as fs from 'fs';
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import { template as effectTpl } from '../blueprints/effect/effect';
import { template as duckTpl } from '../blueprints/reducer/duck';
import { template as middlewareTpl } from '../blueprints/middleware/middleware';
import { template as modelTpl } from '../blueprints/model/model';
import { template as ngduxTpl } from '../blueprints/ngdux/config';
import { PrivateConfig, Config } from './config';

export class Manager {

	constructor(private vorpal: any) {
		const confFile = PrivateConfig.getItem('configFileName');
		this.loadConfigFile(confFile);
	}

	private reducer = (name: string, model: boolean): string => duckTpl(name, model, Config.getConfig());
	private model = (name: string): string => modelTpl(name);
	private middleware = (name: string): string => middlewareTpl(name);
	private effect = (name: string, model: boolean): string => effectTpl(name, model, Config.getConfig());
	private path = (template: string, path: string, name: string, def: boolean): string => 
		(def) ?
		`${path}/${Config.getItem('rootFolder')}/${Config.getConfig()[template]}/${name}.${PrivateConfig.getItem('fileExtension')}`:
		`${path}/${name}.${PrivateConfig.getItem('fileExtension')}`;
	private writeConfig = (path: string, config: Object) => this.writeFile(path, ngduxTpl(config));

	private writeFile(filepath: string, text: string) {	
		fs.writeFile(filepath, text, (err) => {
		    if (err) { this.vorpal.log(err); }
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

	private loadConfigFile(path: string) {
		fs.readFile(path, 'utf8', (err, data) => {
		  	if (err) {
			  	if (err.code === 'ENOENT') {
					this.vorpal.log(
						this.vorpal.chalk.yellow(`Couldn't find existing ${PrivateConfig.getItem('configFileName')} file.`)
					);
			  	}
			} else {
				console.log(JSON.parse(data));
				Config.extendConf(JSON.parse(data));
			}
		});
	}

	public createDir(dirname: string = Config.getItem('rootFolder'), path: string, opts: Object) {
		Config.extendConf(opts);
		this.writeConfig(`${path}/.ngdux`, opts);
		const dirPath = `${path}/${dirname}`;
		this.makeDir(dirPath, () => {
			this.makeDir(`${dirPath}/${Config.getItem('reducer')}`);
			this.makeDir(`${dirPath}/${Config.getItem('model')}`);
			this.makeDir(`${dirPath}/${Config.getItem('middleware')}`);
			this.makeDir(`${dirPath}/${Config.getItem('effect')}`);
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