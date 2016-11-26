import * as fs from 'fs';
import * as _ from 'lodash';
import { template as effectTpl } from '../blueprints/effects/effects';
import { template as duckTpl } from '../blueprints/reducers/duck';

const extension = 'ts';

function writeFile(filepath: string, text: string) {
	
	fs .writeFile(filepath, text, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	
	    console.log("The file was saved!");
	});
}

function writeEffect(name: string) {
    const innerName = name.toLocaleLowerCase();
	const text: string = effectTpl(name);
	let filepath = `./generated/${innerName}.${extension}`;
    writeFile(filepath, text);
}

function writeDuck(name: string) {
    const innerName = name.toLocaleLowerCase();
    const text: string = duckTpl(name);
	let filepath = `./generated/${innerName}.${extension}`;
    writeFile(filepath, text);
}


export { 
    writeEffect,
    writeDuck
}; 