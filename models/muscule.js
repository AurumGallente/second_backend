"use strict";
module.exports = function (sequelize, DataTypes) {
    var Muscule = sequelize.define("Muscule", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 5,
                notEmpty: true
            }
        },
        description: DataTypes.TEXT,
        video: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                //Muscule.belongsToMany(models.Exercise, {through: 'MusculeExercise'});
                Muscule.belongsToMany(models.Exercise, {through: 'muscule_exercise'});

            }
        }
    });
    return Muscule;
};