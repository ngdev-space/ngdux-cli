#!/usr/bin/env node

const vorpal = require('vorpal')();
import * as compiler from './lib/compiler';

vorpal
    .delimiter('ngdux$')
    .show();

vorpal
    .command('g duck [name]', 'Outputs "rabbit"')
    .option('-f, --force', 'Force file overwrite.')
    .action(function(args, callback) {
        compiler.writeDuck(args.name);
        callback();
    });

vorpal
    .command('g effect [name]', 'Outputs "rabbit"')
    .option('-f, --force', 'Force file overwrite.')
    .action(function(args, callback) {
        compiler.writeEffect(args.name);
        callback();
    });