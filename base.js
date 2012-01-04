var User = function(identifier) {

	return this;
};

var loadedModules = [];

var Module = function(name, template) {
	// Ensure context.
	if (this === window) {
		return new Module(name, template);
	}
	// Ensure no namespace collisions.
	if (loadedModules.indexOf(name) !== -1) {
		throw "DuplicateModule";
	} else {
		loadedModules.push(name);
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


User.prototype = {
	addModule: function(module) {

	},
	newModule: Module,
};

