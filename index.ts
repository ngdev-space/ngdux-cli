#!/usr/bin/env node

const vorpal = require('vorpal')();
const fsAutocomplete = require('vorpal-autocomplete-fs');
const chalk = vorpal.chalk;
const originalPath = process.cwd();
const ls = require('node-ls');
import { Config } from './lib/config';
import { Writer } from './lib/writer';
const writer =  new Writer(vorpal, Config);

function currentDirectory(currentDir: string) {
	const splittedPath = currentDir.split('/');
	return splittedPath[splittedPath.length - 1];
}

function parseDirOpts(args) {
    let path = '';
	if (args.options.default || !args.path) {
        path = originalPath;
    } else {
        path = args.path;
        if (path.charAt(path.length-1) === '/') {
            path = path.slice(0, path.length - 1);
        }
    }
    return path;
}

vorpal
    .command('init [name] [path]', 'Creates a "redux" directory that contains reducers and effects folders')
    .alias('i')
    .autocomplete(fsAutocomplete({ directory: true }))
    .action(function(args, callback) {
        writer.createDir(args.name, args.path || originalPath);
        callback();
    });

vorpal
    .command('ls', 'List current dir files')
    .option('--all', 'List all files.')
    .action(function(args, callback) {
        let opt = '';
        if (args.options && args.options.all) {
			opt = '--all';
        }
        ls(process.cwd(), opt, function(err, list) {
		  	// here you could get a files list of the current directory 
          	list.map((item) => vorpal.log(item));
        	callback();
		});
    });

vorpal
    .command('cd [path]', 'Creates a "middleware" file ')
  	.autocomplete(fsAutocomplete({ directory: false }))
    .action(function(args, callback) {
        try {
        	process.chdir(`${process.cwd()}/${args.path}/`);
        } catch (e) {
            if (e.code === 'ENOTDIR') {
                vorpal.log('Not a directory');
            } else {
                vorpal.log('Directory doesn\'t exist');
            }
        }
        const dir = process.cwd();
        let currentDir = chalk.magenta(`ngdux@${currentDirectory(dir)}$`);
        vorpal.delimiter(currentDir);
        callback();
    });

vorpal
    .command('bundle [name] [path]', 'Creates a bundle')
    .alias('b')
    .autocomplete(fsAutocomplete({ directory: true }))
    .action(function(args, callback) {
        writer.writeBundle(args.name, args.path || originalPath)
        callback();
    });

vorpal
    .command('duck [name] [path]', 'Creates a "duck" file with CRUD')
    .alias('d')
    .autocomplete(fsAutocomplete({ directory: true }))
    .option('-d, --default', 'default path')
    .action(function(args, callback) {
        let path = parseDirOpts(args);
        writer.write('reducer', args.name, path, args.options.d);
        callback();
    });

vorpal
    .command('effect [name] [path]', 'Creates an "effects" file with CRUD')
    .alias('e')
    .autocomplete(fsAutocomplete({ directory: true }))
    .option('-d, --default', 'default path')
    .action(function(args, callback) {
        let path = parseDirOpts(args);
        writer.write('effect', args.name, path, args.options.d);
        callback();
    });

vorpal
    .command('model [name] [path]', 'Creates a model file')
    .alias('m')
    .autocomplete(fsAutocomplete({ directory: true }))
    .option('-d, --default', 'default path')
    .action(function(args, callback) {
        let path = parseDirOpts(args);
        writer.write('model', args.name, path, args.options.d);
        callback();
    });

vorpal
    .command('middleware [name] [path]', 'Creates a "middleware" file ')
    .alias('mw')
    .autocomplete(fsAutocomplete({ directory: true }))
    .option('-d, --default', 'default path')
    .action(function(args, callback) {
        let path = parseDirOpts(args);
        writer.write('middleware', args.name, path, !!(args.options.default));
        callback();
    });

vorpal
    .delimiter(chalk.magenta(`ngdux@${currentDirectory(process.cwd())}$`))
    .show();
