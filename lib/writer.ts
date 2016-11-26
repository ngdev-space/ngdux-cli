import * as fs from 'fs';
import * as _ from 'lodash';
import { template as effectTpl } from '../blueprints/effects/effects';
import { template as duckTpl } from '../blueprints/reducers/duck';

const extension = 'ts';

export class Writer {
	private static writeFile(filepath: string, text: string) {
		
		fs .writeFile(filepath, text, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		
		    console.log("The file was saved!");
		});
	}

	static writeEffect(name: string) {
	    const innerName = name.toLocaleLowerCase();
		const text: string = effectTpl(name);
		let filepath = `./generated/${innerName}.${extension}`;
	    this.writeFile(filepath, text);
	}

	static writeDuck(name: string) {
	    const innerName = name.toLocaleLowerCase();
	    const text: string = duckTpl(name);
		let filepath = `./generated/${innerName}.${extension}`;
	    this.writeFile(filepath, text);
	}
}