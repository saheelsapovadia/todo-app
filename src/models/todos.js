'use strict';

module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        title: DataTypes.STRING,
        status: DataTypes.ENUM('todo', 'inProgress', 'completed'),
        createdAt: DataTypes.DATE,
        scheduledAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        freezeTableName: true
    });

    // Define the relationship between the Todo and User models
    // Todo.associate = (models) => {
    //     Todo.belongsTo(models.User, {
    //         foreignKey: 'userId',
    //         onDelete: 'CASCADE'
    //     });
    // };

    
    return Todo;
}