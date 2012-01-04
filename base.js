var User = function(template) {
	// Ensure context
	if (this === window) {
		return new User(template);
	}


	return this;
};
