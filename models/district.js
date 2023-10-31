module.exports = (sequelize, DataTypes) =>{
    const District = sequelize.define('district', {
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
    return District;
}