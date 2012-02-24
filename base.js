var lib;
(function setup() {
	lib = {
		sha1: require('./sha1')(100),
	};
}());

var config = {
	dir: 'users',
	cache: 100,
	write: true,
};

exports.config = config;

exports.configure = function(prop, val) {
	switch (prop) {
		case 'cache':
			lib.sha1 = require('./sha1')(val);
			config.cache = val;
			break;
		case 'dir':
			config.dir = val;
			break;
		default:
			console.log("'" + prop + "'" + ' is not a configurable property.');
			break;
	}
};

var userCache = {};

var User = function(identifier) {
	var user;
	if (config.cache) {
		user = userCache[identifier];
	}

	return this;
};

var loadedExtensions = [];

var Extension = function(name, template) {
	// Ensure context.
	if (this === global) {
		return new Extension(name, template);
	}
	// For Namespacing witin the user object.
	this.name = name;
	// Properties.
	var properties = (function collectProperties(base) {
		var props = [];
		for (var prop in base) {
			if (base.hasOwnProperty(prop)) {
				props.push(prop);
			}
		}
		return props;
	}(template));
	this.properties = properties;
	return this;
};
exports.Extension = Extension;

var addExtension = function(extension) {
	if (extension instanceof Extension) {
		// Ensure no namespace collisions.
		if (loadedExtensions.indexOf(module.name) !== -1) {
			throw "DuplicateModule";
		} else {
			loadedExtensions.push(module.name);
		}
	}
};

User.prototype = {
	extend: addExtension,
};

