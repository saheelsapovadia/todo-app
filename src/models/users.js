'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },{
        freezeTableName: true
    });

    // Define the relationship between the Todo and User models
    User.associate = (models) => {
        User.hasMany(models.Todo, {
            foreignKey: 'userId',
            as: 'todos'
        });
    }

    
    return User;
}