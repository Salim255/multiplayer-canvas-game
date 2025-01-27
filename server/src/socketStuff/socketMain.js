// Where all our socketStuff will go
const io = require('../../server').io;
// oh... we need express, get app, but only put what we need to inside 
// of our socket stuff
const app  = require('../../server').app;