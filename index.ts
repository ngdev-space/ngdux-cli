#!/usr/bin/env node

const vorpal = require('vorpal')();
const fsAutocomplete = require('vorpal-autocomplete-fs');
const chalk = vorpal.chalk;
const originalPath = process.cwd();
const ls = require('node-ls');
import { Config } from './lib/config';
import { Manager } from './lib/manager';
import { currentDirectory, parseDirOpts, cleanPath } from './lib/utils';
const manager =  new Manager(vorpal);


vorpal
    .command('init [name] [path]', 'Creates a "redux" directory that contains reducers and effects folders')
    .alias('i')
    .option('-d, --default', 'Use defaults for folder structure')
    .autocomplete(fsAutocomplete({ directory: true }))
    .action((args, callback) => {
        if (!args.name && !args.options.default) {
            vorpal.activeCommand.log(chalk.yellow('Please provide the [name] param or -d flag'));
            return callback();
        }

        if (!args.options.default) {
	        vorpal.activeCommand.prompt([
	            {
				      type: 'input',
				      name: 'effect',
				      message: `Pick a name for your "effects" folder (default: ${Config.getItem('effect')})`,
		    	},
	            {
				      type: 'input',
				      name: 'model',
				      message: `Pick a name for your "models" folder (default: ${Config.getItem('model')})`,
		    	},
	            {
				      type: 'input',
				      name: 'reducer',
				      message: `Pick a name for your "reducers" folder (default: ${Config.getItem('reducer')})`,
		    	},
	            {
				      type: 'input',
				      name: 'middleware',
				      message: `Pick a name for your "middlewares" folder (default: ${Config.getItem('middleware')})`,
		    	}
	        ], (result) => {
                result.rootFolder = args.name;
                let path = parseDirOpts(args, originalPath);
	            manager.createDir(args.name, path, result, originalPath);
		      	callback();
		    });
    	} else {
            manager.createDir(args.name, args.path || originalPath, {}, originalPath);
            callback();
        }
    });

vorpal
    .command('ls', 'List current dir files')
    .option('--all', 'List all files.')
    .action((args, callback) => {
        let opt = '';
        if (args.options && args.options.all) {
			opt = '--all';
        }
        ls(process.cwd(), opt, (err, list) => {
		  	// here you could get a files list of the current directory 
          	list.map((item) => vorpal.log(item));
        	callback();
		});
    });

vorpal
    .command('cd [path]', 'Creates a "middleware" file ')
  	.autocomplete(fsAutocomplete({ directory: false }))
    .action((args, callback) => {
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
    .action((args, callback) => {
        manager.writeBundle(args.name, args.path || originalPath)
        callback();
    });

vorpal
    .command('duck [name] [path]', 'Creates a "duck" file with CRUD')
    .alias('d')
    .autocomplete(fsAutocomplete({ directory: true }))
    .option('-d, --default', 'default path')
    .action((args, callback) => {
        let path = parseDirOpts(args, originalPath);
        manager.write('reducer', args.name, path, args.options.d);
        callback();
    });

vorpal
    .command('effect [name] [path]', 'Creates an "effects" file with CRUD')
    .alias('e')
    .autocomplete(fsAutocomplete({ directory: true }))
    .option('-d, --default', 'default path')
    .action((args, callback) => {
        let path = parseDirOpts(args, originalPath);
        manager.write('effect', args.name, path, args.options.d);
        callback();
    });

vorpal
    .command('model [name] [path]', 'Creates a model file')
    .alias('m')
    .autocomplete(fsAutocomplete({ directory: true }))
    .option('-d, --default', 'default path')
    .action((args, callback) => {
        let path = parseDirOpts(args, originalPath);
        manager.write('model', args.name, path, args.options.d);
        callback();
    });

vorpal
    .command('middleware [name] [path]', 'Creates a "middleware" file ')
    .alias('mw')
    .autocomplete(fsAutocomplete({ directory: true }))
    .option('-d, --default', 'default path')
    .action((args, callback) => {
        let path = parseDirOpts(args, originalPath);
        manager.write('middleware', args.name, path, !!(args.options.default));
        callback();
    });

vorpal
    .delimiter(chalk.magenta(`ngdux@${currentDirectory(process.cwd())}$`))
    .show();
