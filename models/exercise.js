"use strict";

module.exports = function (sequelize, DataTypes) {
    var Exercise = sequelize.define("Exercise", {
        name: {
            type: DataTypes.STRING,
                    validate: {
                        min: 5,
                        notEmpty: true
                    }
        },
        description: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Exercise.belongsToMany(models.Muscule, {through: 'muscule_exercise'});

            }
        }
    });
    return Exercise;
};

//"use strict";
//module.exports = {
//  up: function(migration, DataTypes, done) {
//    migration.createTable("MusculeExercise", {      
//      ExerciseId: {
//        type: DataTypes.INTEGER
//      },
//      MusculeId: {
//        type: DataTypes.INTEGER
//      }   
//    }).done(done);
//  },
//  down: function(migration, DataTypes, done) {
//    migration.dropTable("MusculeExercise").done(done);
//  }
//};
