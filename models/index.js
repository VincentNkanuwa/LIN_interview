const dbConfig = require('./dBConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host : dbConfig.HOST,
        dialect : dbConfig.dialect,
        operatorsAliases : false,

        pool : {
            max : dbConfig.pool.max,
            min : dbConfig.pool.min,
            acquire : dbConfig.acquire, 
            idle : dbConfig.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('Conected')
})
.catch(err =>{
    console.log('Error ' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.district = require('./district.js')(sequelize, DataTypes)
db.owner = require('./facility_owner.js')(sequelize, DataTypes)
db.health_facility = require('./health_facility.js')(sequelize, DataTypes)

db.sequelize.sync({force:false})
.then(()=>{
    console.log('re-sync done')
})

// district/facility one to many relationship
db.district.hasMany(db.health_facility, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db.health_facility.belongsTo(db.district)

// owner/facility one to many relationship
db.owner.hasMany(db.health_facility, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db.health_facility.belongsTo(db.owner)

module.exports = db