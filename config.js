exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://jeffszajner:oliver71@ds049456.mlab.com:49456/shopping-list2' :
                            'mongodb://localhost/shopping-list-2');
exports.PORT = process.env.PORT || 8080;