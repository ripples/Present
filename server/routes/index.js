var express = require('express');
var router = express.Router();
var dirToJson = require('dir-to-json');
var path = require('path')
const fs = require('fs')
const util = require('util')
const unzip = require('unzip')
const key = "You/'ll never walk alone"
var encryptor = require('simple-encryptor')(key)

module.exports = router;
