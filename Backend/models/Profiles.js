module.exports = (sequelize, DataTypes) => {
    const Profiles = sequelize.define("Profiles", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull: true,
        },  
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 

    });
        return Profiles;
}; 
