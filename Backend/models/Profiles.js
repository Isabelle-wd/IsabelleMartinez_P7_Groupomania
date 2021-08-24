module.exports = (sequelize, DataTypes) => {
    const Profiles = sequelize.define("Profiles", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
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
