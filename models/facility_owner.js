module.exports = (sequelize, DataTypes) =>{
    const Owner = sequelize.define('owner', {
        id : {
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        distric_name : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })
    return Owner;
}