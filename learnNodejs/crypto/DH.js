const crypto = require('crypto');

// p1's keys:
var p1 = crypto.createDiffieHellman(512);
var p1_keys = p1.generateKeys();

var prime = p1.getPrime();
var generator = p1.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// p2's keys:
var p2 = crypto.createDiffieHellman(prime, generator);
var p2_keys = p2.generateKeys();

// exchange and generate secret:
var p1_secret = p1.computeSecret(p2_keys);
var p2_secret = p2.computeSecret(p1_keys);

// print secret:
console.log('Secret of p1: ' + p1_secret.toString('hex'));
console.log('Secret of p2: ' + p2_secret.toString('hex'))