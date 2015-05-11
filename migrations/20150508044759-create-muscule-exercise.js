////"use strict";
////module.exports = {
////  up: function(migration, DataTypes, done) {
////    migration.createTable("MusculeExercises", {      
////      test: {
////        type: DataTypes.STRING
////      },
////      createdAt: {
////        allowNull: false,
////        type: DataTypes.DATE
////      },
////      updatedAt: {
////        allowNull: false,
////        type: DataTypes.DATE
////      }
////    }).done(done);
////  },
////  down: function(migration, DataTypes, done) {
////    migration.dropTable("MusculeExercises").done(done);
////  }
////};
//
//"use strict";
//module.exports = {
//    up: function (migration, DataTypes, done) {
//        migration.createTable("MusculeExercise", {
//            
//            ExerciseId: {
//                type: DataTypes.INTEGER
//            },
//            MusculeId: {
//                type: DataTypes.INTEGER
//            }
//        })
//                
//                .done(done);
//    },
//    down: function (migration, DataTypes, done) {
//        migration.dropTable("MusculeExercise").done(done);
//    }
//};