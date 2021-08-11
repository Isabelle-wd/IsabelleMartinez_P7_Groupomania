module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {     
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    });

    return Comments;
}; 