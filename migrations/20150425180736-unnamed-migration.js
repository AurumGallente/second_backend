"use strict";
module.exports = {
    up: function (migration, DataTypes, done) {
        migration.changeColumn(
                'Users',
                'username',
                {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                    validate: {
                        min: 4,
                        max: 60
                    }
                }
        ).done(done);
    },
    down: function (migration, DataTypes, done) {
        migration.changeColumn(
                'Users',
                'username',
                {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        min: 4,
                        max: 60
                    }
                }
        ).done(done);
    }
};