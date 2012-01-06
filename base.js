var config = {
	dir: 'users',
	cache: 100,
	write: true,
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

var Extention = function(name, template) {
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
	Extension: Extension,
};

