const bookshelf = require('../../bookshelf');
const Rol = require('./Roles').Rol;

var User,
    Users;

User = bookshelf.Model.extend({
    tableName: 'Usuarios',
    idAttribute: 'idUsuarios',
    rol: function () {
        return this.hasOne(Rol, 'rol');
    }
});

Users = bookshelf.Collection.extend({
    model: User
});

module.exports = {
    User: bookshelf.model('User', User),
    Users: bookshelf.collection('Users', Users)
};
