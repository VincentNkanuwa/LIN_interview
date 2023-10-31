const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const db = require('./models')

// create the model
const Facility = db.health_facility
const Districts = db.district
const Owner = db.facility_over


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res, next)=>{
    console.log('CORS enabled')
    res.send({message : 'Hellow from API'})
})


// controllers : add facility function
app.post('/zipatala/create', async(req, res)=>{

  let facilityData = {
    facility_name : req.body.facility_name,
    facility_code : req.body.facility_code,
    districtId : req.body.districtId,
    ownerId : req.body.ownerId
  };

  if(!req.body.facility_name){
    res.status(400).send({ message: "Name cannot be empty" });
    return;
  }
  if(!req.body.facility_code){
    res.status(400).send({ message: "code can not be empty!" });
    return;
  }
  if(!req.body.districtId){
      res.status(400).send({ message: "district can not be empty!" });
      return;
  }
  if(!req.body.ownerId){
    res.status(400).send({ message: "owner can not be empty!" });
    return;
  }else{      
    const facility = await Facility.create(facilityData)
    res.status(201).send(facility) 
  }
  })

  // search by name
  app.post('/zipatala/search/:key', async(req, res)=>{
    let data = await Contact.find(
      {
        "$or":[
          {last_name:{$regex:req.params.key}}
        ]
      }
    )
    res.send(data)
  })



const PORT =  4001

app.listen(PORT, ()=>{
    console.log(`Server is running from ${PORT}`);
})