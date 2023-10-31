module.exports = (sequelize, DataTypes) =>{
    const Health_facility = sequelize.define('health_facility', {
        id : {
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        facility_name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        facility_code : {
            type : DataTypes.STRING,
            allowNull :false
        },
    })
    return Health_facility;
}