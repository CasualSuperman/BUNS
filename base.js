var config = {
	dir: 'users',
	cache: 100,
	write: true,
};

var User = function(identifier) {
	
	return this;
};

var loadedModules = [];

var Module = function(name, template) {
	// Ensure context.
	if (this === window) {
		return new Module(name, template);
	}
	// Namespacing.
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

var addModule = function(module) {
	if (module instanceof Module) {
		// Ensure no namespace collisions.
		if (loadedModules.indexOf(module.name) !== -1) {
			throw "DuplicateModule";
		} else {
			loadedModules.push(module.name);
		}
	}
};

User.prototype = {
	addModule: addModule,
	newModule: Module,
};

