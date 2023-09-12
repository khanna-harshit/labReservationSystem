
// import jwt from "jsonwebtoken"
var jwt = require("jsonwebtoken")
const express= require('express')
const bodyparser = require('body-parser')
const cors= require('cors')
const app = express()
app.use(cors())
const bcrypt = require('bcryptjs')
const mysql = require('mysql2')
const { check } = require("express-validator")
var async = require('async');
var _ = require('lodash');
app.use(bodyparser.json())
app.use(express.static('./dist/frontend'))

//    var mysqlHost = process.env.MYSQL_HOST || 'localhost'
//    var mysqlPort = process.env.MYSQL_PORT || '3306'
//    var mysqlUser = process.env.MYSQL_USER || 'root'
//    var mysqlPass = process.env.MYSQL_PASS || 'password'
//    var mysqlDB   = process.env.MYSQL_DB   || 'labreservationsystem'
   var mysqlHost = process.env.MYSQL_HOST 
   var mysqlPort = process.env.MYSQL_PORT 
   var mysqlUser = process.env.MYSQL_USER
   var mysqlPass = process.env.MYSQL_PASS 
   var mysqlDB   = process.env.MYSQL_DB  
   var connectionOptions = {
     host: mysqlHost,
     port: mysqlPort,
     user: mysqlUser,
     password: mysqlPass,
     database: mysqlDB
   }

 var db = mysql.createPool(connectionOptions)
 db.getConnection(err=>{
	if(err) {console.log(err)}
	console.log('database connected successfully')
})


 SECRET_KEY=`b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
 NhAAAAAwEAAQAAAYEA0pyWy1+5NCJrHH0N240D1PoTH0rPKb6wpH0T3+ZYn+aV+hHdhLkX
 bY4+k7Lg4urA8pLZntnj3JTB6fqgm8+t8v9VfFCTbIPkGEY9frsE28trPOknLlnJp3hhee
 aLLOLXRdy3lg6s0PGf5jf8wGrcP6zqx1GSEAGTOB7LzYZKHjgQxU+HNJOvWTizhJaD/MEU
 Kh9y9p/9n4NKaCxEwNxXKQsvGiHHvEIXYJhqlC1V3epC6VAnzyJn++ruSZn17ZaQt0jp7/
 r+MFlM2kOcPOb4MxVf7kk859CHvHFyCBXCLputwMIWgQV7KbndP1daws29wEmZewlDLdOa
 +pjSiwkRZ4RjIHN32Wxj3KUBnly9TN7CH54XqUHSZDQu5yYxl2lLFQ90/iGrwGQzsjauq+
 0O4LL+hMh7UeEjQIR2hm2jsEt8ZR+MzD05AgLx0f8M7SNLmHBIGtPYBUvXpGW8EE3Cxf+B
 zBW0/PLVr6iebrvxbCk1BbjFq9a1pUXM6ddqZ3SXAAAFiOKP+/Dij/vwAAAAB3NzaC1yc2
 EAAAGBANKclstfuTQiaxx9DduNA9T6Ex9Kzym+sKR9E9/mWJ/mlfoR3YS5F22OPpOy4OLq
 wPKS2Z7Z49yUwen6oJvPrfL/VXxQk2yD5BhGPX67BNvLazzpJy5Zyad4YXnmiyzi10Xct5
 YOrNDxn+Y3/MBq3D+s6sdRkhABkzgey82GSh44EMVPhzSTr1k4s4SWg/zBFCofcvaf/Z+D
 SmgsRMDcVykLLxohx7xCF2CYapQtVd3qQulQJ88iZ/vq7kmZ9e2WkLdI6e/6/jBZTNpDnD
 zm+DMVX+5JPOfQh7xxcggVwi6brcDCFoEFeym53T9XWsLNvcBJmXsJQy3TmvqY0osJEWeE
 YyBzd9lsY9ylAZ5cvUzewh+eF6lB0mQ0LucmMZdpSxUPdP4hq8BkM7I2rqvtDuCy/oTIe1
 HhI0CEdoZto7BLfGUfjMw9OQIC8dH/DO0jS5hwSBrT2AVL16RlvBBNwsX/gcwVtPzy1a+o
 nm678WwpNQW4xavWtaVFzOnXamd0lwAAAAMBAAEAAAGBAIm3hws5brtefjfEthkIXqcXVw
 WxP0GGxa7pcuOHlhAJEazRnc450c37o4OlBlSbOMvlppOu2sbUJvC+x+LarF4nBFkjvyLI
 I5CT7YY++HBY1aigtNQkNi5iEytIy1zwf9/Y8dsXgX2nYe2CUq3nslmY0nS/LAl3XjLmQF
 IGK9USyDSdSkXhBFoNL6XVXj0aa/sXUW9fMtLpYPA5ckPCUOQvwf8Oc7LwbKTnRVnbQzi3
 BEXX+hAB6YjbGDHckOlo98xsWouA5DNZLRYXwNeZlroxHhcQKGZZaxTdLejmtqH/Fa0mP9
 WqOfgobQ21wHbP7SYHunE1qcx9/M9Qr7UPM11VZX0fVFiQ45Hcn6gu7BO2opcdgqcynGut
 W2hljdxmp/XW6knyY936+WxLqroGaKW8mCLKpXZvcidCC2bE7kFsNrT4+zonmYG7myFQ76
 +K3VrYurM2/XGh+46S4B+ynGbHixLSnnTIiJwIgXzeAsS7NAxCnc9DCq7tQpzUtqquoQAA
 AMB/4/uKa/S25PJ+q4CLafY0AoC+Ui+8oGRnFqrB+Ei526rGojc6YD3y4NdsQ6s2nrdQFU
 Gtin8WoRXYIQ70qkZqKR2qdOwdDqBLsffSlmkGuxKizHKVEk29D8PutQutd130BvqVMsqo
 pclxc0oczWwGCun+fLuwUbEVMo6DLYSYo+XBJAZrjKiceRNhUluhJU/F2lFddNBw2y5w/Y
 1YK8APrghJdawfXy7+JrDFl/jvTxctKRGA0P2sCcQYZyk74iMAAADBAO/wSS12zT4dT/xX
 mWK9UcTv9EpWO9JtKhywH84FaDd+SsOY4wqVNl6f1LO6b84x3SPcRXXY2NxDKRaHBy57mg
 9oHDiAFNo0icXlSw2SAlTD6k7VSLmqULNgmQ7QknymyIrxQCqs0qxRTbLcTkgDRpR2edDT
 g5C+43KssfmqJ0q7CkZUoClOkpSOdcIcKJ3WbRsD/ww4yt4nFTed91Ytqg8ExGGNwmfVtP
 T/WXSJRHyM6eS0IzYAgwgjg1b2MDzHyQAAAMEA4LW9yADv8C7d5CpcGq1GNMBIZ/J7U+kl
 UEdO6rdtu/bVexanDj5gwqDm5ngeSmz+1q2USt3W/haJTOBZbmikLhw8eQZc0hjMp8RaBu
 z+jXgCFmPjios9Hz88+ABsCn8BD6Bl4KFp1SctTgVmRTOExPiJoQb+v81bwdKK8iYC3T1u
 +JMIVgVdSeeIx9qqexWwoxG2uVBjIrn3GSs6Q3hN/hRhVZCgNS5ZDvTXK9S/AhfyJZocIo
 Jr/3+WqKPqWUlfAAAAEWFyYXZpbmRzQENJTk4wMDQ4AQ==`
 
app.get("/login",(req,res)=>{
	
 let query="select id,name,accesslevel,teamname ,password from users where name=\""+req.query.email+"\""
 console.log(query)
 db.query(query,async (err,rows,fields)=>{
	 if(!err){
		 if(rows && rows.length>0){
			const isEqual = await bcrypt.compare(req.query.password,rows[0].password)
		if(isEqual){
			 const data=rows[0]
			 const token=jwt.sign({name:data['name'],accesslevel:data['accesslevel'],id:data['id'], teamname:data['teamname']},SECRET_KEY)
		 console.log("sending data")
		 console.log({'accesstoken':token,user_found:true})
			 res.send({'accesstoken':token,user_found:true})
		}
		else{
			console.log("not found")
			res.send({user_found:false})
		}
		 }else{
		 console.log("not found")
			 res.send({user_found:false})
		 }

	 }else{
		 console.log(err)
	 }
 })

})
app.get('/userdeviceinfo/:name', (req, res)=>{
	// console.log('Get all users')
	let name= req.params.name
	let ISToffSet = 330 //IST is 5:30 i.e. 60*5+30 = 330 in minutes 
    let offset= ISToffSet*60*1000
    let date=new Date()
    let startTime=new Date(date.getTime()+offset)
   
    // startTime=startTime.toISOString().substring(0,16)
   
    startTime.setDate(startTime.getDate())
    let extendedTime= startTime.toISOString()
	
	let qrr = `select DISTINCT userdeviceinfo.time,  userdeviceinfo.endtime, userdeviceinfo.name, userdeviceinfo.timeid from userdeviceinfo INNER JOIN topology ON userdeviceinfo.deviceid= topology.deviceid where topology.topologyname='${name}' and  endtime>='${extendedTime}' `
	// console.log(dId)
	db.query(qrr, async (err, rows)=> {
	if(!err){
		res.send(rows)
	}
	else{
		console.log(err)
	}
	})
	
})

app.get('/topology', (req, res)=>{
	// console.log('Get all users')
	let teamName = req.query.teamname
	console.log(teamName)
	// console.log(teamName)
	let query = `select topology.id, topology.deviceid, topology.usedFor, topology.topologyname, topology.teamname, devices.powercycleip, devices.TG, devices.powercycleport,topology.type, devices.rack, devices.unit, devices.consoleip, devices.consoleport, devices.devicename, devices.managementip, devices.projectname from topology INNER JOIN devices ON topology.teamname=devices.teamname where topology.deviceid=devices.id and topology.teamname='${teamName}'`
	db.query(query,async (err,rows,fields)=>{
		if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
	})
	
})

app.get('/devices/:id', (req, res)=>{
	// console.log(req.params.id)
	let qrId= req.params.id
	let qrr = `SELECT * FROM devices  where id ='${qrId}'`
	db.query(qrr, async (err, rows,fields)=> {
		if(!err){
			res.send(rows)
		}
		else{
			console.log(err)
		}

	})
	
})

app.get('/devices/:id/get/information', (req, res)=>{
	// console.log(req.params.id)
	// let qrName= req.params.name
	// console.log(qrName)\
	let id= req.params.id
	let deleted='deleted'
	let ISToffSet = 330 //IST is 5:30 i.e. 60*5+30 = 330 in minutes 
    let offset= ISToffSet*60*1000
    let date=new Date()
    let startTime=new Date(date.getTime()+offset)
   
    // startTime=startTime.toISOString().substring(0,16)
   
    startTime.setDate(startTime.getDate() )
    let extendedTime= startTime.toISOString()
	//SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate FROM Orders INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID
	let qrr = `select time, endtime, name  FROM userdeviceinfo where deviceid='${id}' and status!='${deleted}'  and endtime>='${extendedTime}'`
	db.query(qrr, (err, rows,fields)=> {
		if(!err){
			res.send(rows)
		}
		else{
			console.log(err)
		}
	})
	
})
app.get('/devices', (req, res)=>{
	// console.log('Get all users')
	// console.log(teamName)
	let query = `select * from devices`
	db.query(query,async (err,rows,fields)=>{
		if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
	})
	
})

app.get('/userdeviceinfo', (req, res)=>{
	// console.log('Get all users')
	let ISToffSet = 330 //IST is 5:30 i.e. 60*5+30 = 330 in minutes 
    let offset= ISToffSet*60*1000
    let date=new Date()
    startTime=new Date(date.getTime()+offset)
    startTime=startTime.toISOString().substring(0,16)
	let deleted= 'deleted'
	let qrr = `select deviceid , time, endtime, name from userdeviceinfo where time<= '${startTime}' and endtime >='${startTime}' and status != '${deleted}'`
	db.query(qrr, async (err, rows,fields)=> {
		if(!err){
			res.send(rows)
		}
		else{
			console.log(err)
		}
	})
	
})

app.get('/project', (req, res)=>{
	// console.log('Get all users')
	let ISToffSet = 330 //IST is 5:30 i.e. 60*5+30 = 330 in minutes 
    let offset= ISToffSet*60*1000
    let date=new Date()
    startTime=new Date(date.getTime()+offset)
    startTime=startTime.toISOString().substring(0,16)
	let deleted= 'deleted'
	let qrr = `select deviceid , time, endtime, name from userdeviceinfo where time<= '${startTime}' and endtime >='${startTime}' and status != '${deleted}'`
	db.query(qrr, async (err, rows,fields)=> {
		if(!err){
			res.send(rows)

		}
		else{
			console.log(err)
		}
	})
	
})

app.get("/projects",(req,res)=>{
	
	let query="select * from project"
	console.log(query)
	db.query(query,async (err,rows,fields)=>{
		if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
	})
   
})


app.get("/users",(req,res)=>{
	
	let query="select id, accesslevel, teamname, name from users"
	console.log(query)
	db.query(query,async (err,rows,fields)=>{
		if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
	})
   
})

app.delete('/project/:name', (req, res)=> {
	let ProjectName= req.params.name
	
	let qrr = `delete from project where projectname='${ProjectName}'`

	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err)
	}
	else{
	// console.log("ububeubu")
	res.send({
		message: 'data deleted successfully',
		data:rows
			
			
	})
}
	})
})

app.put('/userdeviceinfo/:userdeviceinfoid', (req, res)=> {
	
	
	let currentTime= req.body.Time
	let udId = req.params.userdeviceinfoid
	let status = req.body.status
	let qrr = `update userdeviceinfo set endtime='${currentTime}' ,status = '${status}' where id='${udId}'`

	// console.log("harah")
	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err)
	}
	
	res.send({
		message: 'data updated userdeviceinfo wrt time status'

			
	})
	
})
})
app.delete('/userdeviceinfo/:userdeviceinfoid', (req, res)=> {
	let udId= req.params.userdeviceinfoid
	// console.log('yes'+ udId)
	let qrr = `delete from userdeviceinfo where id='${udId}'`

	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err)
	}
	// console.log("ububeubu")
	res.send({
		message: 'data deleted successfully',
		data:rows
			
			
	})

	
	
})
})
app.put('/userdeviceinfo/:userdeviceinfoid/:name/:time', (req, res)=> {
	
	
	let currentTime= req.body.Time
	let udId = req.params.userdeviceinfoid
	let status = req.body.status
	let ISToffSet = 330 //IST is 5:30 i.e. 60*5+30 = 330 in minutes 
	let offset= ISToffSet*60*1000
	let date=new Date()
	let Curtime=new Date(date.getTime()+offset)
   
	
	let time=Curtime.toISOString().substring(0,16)
	// let date = new Date()

	let name= req.params.name
	let qrr = `update userdeviceinfo INNER JOIN topology on topology.deviceid= userdeviceinfo.deviceid set endtime='${time}' ,status = '${status}' where topology.topologyname='${name}' and userdeviceinfo.time LIKE '${currentTime}'`

	// console.log("harah")
	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err)
	}
	
	res.send({
		message: 'data updated userdeviceinfo wrt time status'	
	})
})
})
app.delete('/userdeviceinfo/:userdeviceinfoid/:name/:time', (req, res)=> {
	let udId= req.params.userdeviceinfoid
	let name = req.params.name
	let time= req.params.time
	let updatedTime=time.replace(/_/g, '-') 
	let qrr = `delete userdeviceinfo from userdeviceinfo JOIN topology ON  userdeviceinfo.deviceid=topology.deviceid where topology.topologyname='${name}' and userdeviceinfo.time LIKE '${updatedTime}'`
	// console.log(updatedTime, "updated time")

	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err)
	}
	// console.log("ububeubu")
	res.send({
		message: 'data deleted successfully',
		data:rows
			
			
	})

	
	
})
})
	

app.get('/userdeviceinfo/:userid/:dateTime/history', (req, res)=>{
	// console.log('Get all users')
	let uId = req.params.userid
	let currentDate= req.params.dateTime.replace(/_/g, '-')
	let deleted= 'deleted'
	let date= currentDate.substring(0, 13)+':'+ currentDate.substring(14, 16)
	// console.log(date, uId)
	let qrr = `select userdeviceinfo.id, userdeviceinfo.time, userdeviceinfo.endtime, devices.teamname,  devices.devicename from userdeviceinfo INNER JOIN devices ON userdeviceinfo.deviceid=devices.id where userdeviceinfo.userid='${uId}' and (userdeviceinfo.endtime<='${date}' or userdeviceinfo.status='${deleted}') and devices.id NOT in (select deviceid from topology)`
	db.query(qrr, async(err, rows,fields)=> {
		if(err){
			console.log(err)
		}
		else{
			res.send(rows)
		}
	})
	
})

app.get('/topology/:userid/:dateTime/history/device', (req, res)=>{
	// console.log('Get all users')
	let uId = req.params.userid
	let currentDate= req.params.dateTime.replace(/_/g, '-')
	let deleted= 'deleted'
	let date= currentDate.substring(0, 13)+':'+ currentDate.substring(14, 16)
	// console.log(date, uId)
	let qrr = `select  DISTINCT userdeviceinfo.time, userdeviceinfo.id, userdeviceinfo.endtime, userdeviceinfo.team,  topology.topologyname from userdeviceinfo INNER JOIN topology ON userdeviceinfo.deviceid=topology.deviceid where userdeviceinfo.userid='${uId}' and  (userdeviceinfo.endtime<='${date}' or userdeviceinfo.status='${deleted}') group by topology.topologyname , userdeviceinfo.time`

	// let qrr = `select userdeviceinfo.id, userdeviceinfo.time, userdeviceinfo.endtime, devices.teamname,  devices.devicename from userdeviceinfo INNER JOIN devices ON userdeviceinfo.deviceid=devices.id where userdeviceinfo.userid='${uId}' and (userdeviceinfo.endtime<='${date}' or userdeviceinfo.status='${deleted}') and devices.id NOT in (select deviceid from topology)`
	db.query(qrr,async (err, rows,fields)=> {
	if(err){
		console.log(err)
	}
	else{
		res.send(rows)
	}
	})
	
})


app.get('/userdeviceinfo/:userid/:dateTime/current/device/status', (req, res)=>{
	// console.log('Get all users')
	let uId = req.params.userid
	let currentDate= req.params.dateTime.replace(/_/g, '-')
	let status= 'deleted'
	let date= currentDate.substring(0, 13)+':'+ currentDate.substring(14, 16)
	// console.log(date)
	let deleted= 'deleted'
	let qrr = `select userdeviceinfo.time, userdeviceinfo.id, userdeviceinfo.endtime, userdeviceinfo.team,  devices.devicename from userdeviceinfo INNER JOIN devices ON userdeviceinfo.deviceid=devices.id  where userdeviceinfo.userid='${uId}' and  userdeviceinfo.endtime>='${date}' and userdeviceinfo.time<='${date}' and userdeviceinfo.status!='${deleted}' and devices.id NOT In (select deviceid from topology)`

	// let qrr = `select  userdeviceinfo.id, devices.rack, devices.unit, userdeviceinfo.time, userdeviceinfo.endtime, devices.teamname, devices.projectname, devices.devicename from userdeviceinfo INNER JOIN devices ON userdeviceinfo.deviceid=devices.id where userdeviceinfo.userid='${uId}' and userdeviceinfo.endtime>='${date}' and userdeviceinfo.time<='${date}' and userdeviceinfo.status!='${status}'`
	db.query(qrr, async (err, rows,fields)=> {
		if(err){
			console.log(err)
		}
		else{
			res.send(rows)
		}
	})
	
})



app.get('/userdeviceinfo/:userid/:dateTime/schedule/device', (req, res)=>{
	// console.log('Get all users')
	let uId = req.params.userid
	let currentDate= req.params.dateTime.replace(/_/g, '-')
	let date= currentDate.substring(0, 13)+':'+ currentDate.substring(14, 16)
	// console.log(date)
	let qrr = `select  DISTINCT userdeviceinfo.time, userdeviceinfo.id, userdeviceinfo.endtime, userdeviceinfo.team,  topology.topologyname from userdeviceinfo INNER JOIN topology ON userdeviceinfo.deviceid=topology.deviceid where userdeviceinfo.userid='${uId}' and userdeviceinfo.time>'${date}' group by topology.topologyname , userdeviceinfo.time`
	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err)
	}
	else{
		res.send(rows)
	}
	})
	
})

app.get('/topology/:userid/:dateTime/current', (req, res)=>{
	// console.log('Get all users')
	let uId = req.params.userid
	let deleted= 'deleted'
	let currentDate= req.params.dateTime.replace(/_/g, '-')
	let date= currentDate.substring(0, 13)+':'+ currentDate.substring(14, 16)
	// console.log(date)
	let qrr = `select  DISTINCT userdeviceinfo.time, userdeviceinfo.id, userdeviceinfo.endtime, userdeviceinfo.team,  topology.topologyname from userdeviceinfo INNER JOIN topology ON userdeviceinfo.deviceid=topology.deviceid where userdeviceinfo.userid='${uId}' and userdeviceinfo.endtime>='${date}' and userdeviceinfo.time<='${date}' and userdeviceinfo.status != '${deleted}' group by topology.topologyname , userdeviceinfo.time`
	db.query(qrr, async (err, rows,fields)=> {
		if(err){
			console.log(err)
		}
		else{
			res.send(rows)
		}
	})
	
})

app.put('/topology', (req, res)=> {
	
	
	let devices=req.body.devices;
	let name= req.body.name;
	let teamname= req.body.teamname;
	let type=req.body.type;
	let qrr = `select * from topology where topologyname = '${name}'`;

	// console.log("harah");
	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err);
	}
	if(rows.length>0){
		res.status(663).json({
			message: 'Topology name already present :('
		})
		return;

	}
	else{
		let data= [];
		for(let i=0;i<devices.length;i++){
			let temp = [];
			temp.push(name);
			temp.push(devices[i]);
			temp.push(teamname);
			temp.push(type);
			data.push(temp);

		}
		let query= `INSERT INTO topology (topologyname, deviceid, teamname, type) VALUES ?`
		let values= data;
		db.query(query, [values], (err, rows)=>{
			res.send({
				message:'Added '
					
			})
		})
		
	}
	
})
})

app.put('/project',  (req, res)=>{
	
	let projectname= req.body.projectname;
	let teamname= req.body.teamname;
	let type= req.body.type;
	
	let tempQrr=`select * from project where projectname= '${projectname}'`;
	db.query(tempQrr, async (err, rows,fields)=> {
		if(err){
			return req.status(663).json({
				message:'something went wrong !'
			})
		}
		if(rows.length==0){
			    let qrr = `insert into project (projectname, teamname, type) values ('${projectname}', '${teamname}', '${type}') ` ;
				db.query(qrr,  (err, rows)=> {
				if(err){
					return req.status(663).json({
						message:'something went wrong !'
					})
				}
				
					res.send({
						message: 'Project Registered !',
					});
				
			});
		}
		else{
			
				res.status(663).json({
					message: 'Project name already present !'
				})
		}
		
	})
})
app.delete('/userdeviceinfo/:name/delete', (req, res)=> {
	let topologyName= req.params.name;
	
	let qrr = `delete userdeviceinfo from userdeviceinfo INNER JOIN topology ON topology.deviceid=userdeviceinfo.deviceid where topology.topologyname='${topologyName}'`;

	db.query(qrr,async (err, rows,fields)=> {
	if(err){
		console.log(err);
	}
	// console.log("ububeubu")
	res.send({
		message: 'data deleted successfully',
		data:rows
			
			
	});

	
	
});
});
app.put('/topology/:id', (req, res)=> {
	let timeId= req.body.timeid;
	let name=req.body.name;
	let teamname= req.body.team;
	let startTime= req.body.startTime;
	let endTime= req.body.endTime;
	let uId= req.body.uId;
	let values= [];
	let deleted= 'deleted';
	for(let i=0;i<req.body.DeviceId.length;i++){
		let temp = [];
		temp.push(name);
		temp.push(teamname);
		temp.push(startTime);
		temp.push(endTime);
		temp.push(req.body.DeviceId[i]);
		temp.push(uId);
		temp.push(timeId);
		values.push(temp);
	}
	// console.log(values+"huhu");
	let qrr=`select * from userdeviceinfo where time='${startTime}' and endtime='${endTime}' and status != '${deleted}' and deviceid='${req.body.DeviceId[0]}'`;
	db.query(qrr, async (err, rows,fields)=>{
		if(rows.length>0){
			res.status(663).json({
				message: 'Time slot not available, please refresh the page to see latest available time slots'
			})
			return;
		}
		else{
			let tempQuery = `insert into userdeviceinfo (name, team , time, endtime, deviceid, userid, timeid) values ?`;
			db.query(tempQuery, [values], (err, rows)=> {
				
				
				
					res.status(200).json({
						message: 'updated'
					})
					return;
				
			

			
		})
		}
	})
	
})

app.post('/userdeviceinfo', (req, res)=>{
	let name= req.body.name;
	let startDate= req.body.sDate;
	let endDate= req.body.eDate;
	// console.log(dId);
	let deleted= 'deleted';

	let qrr= `select  userdeviceinfo.time, userdeviceinfo.endtime from userdeviceinfo INNER JOIN topology ON topology.deviceid= userdeviceinfo.deviceid where topology.topologyname= '${name}' and !(endtime<='${startDate}' or time >= '${endDate}') and userdeviceinfo.status!='${deleted}' `
	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err);
	}
	if(rows.length==0){
		// console.log(rows);
		res.send({
			message: 'date and time information',
			data:rows
		});
	};
	if(rows.length>0){
		// console.log(rows);
		res.status(663).json({
			message: 'not available',
			data:rows
		});
	};
	});

})
app.get('/userdeviceinfo/:deviceid/:dateTime', (req, res)=>{
	// console.log('Get all users');
	let dId = req.params.deviceid;
	let currentDate= req.params.dateTime;
	let date= currentDate.substring(0, 11)+"_____";
	let qrr = `select * from userdeviceinfo where deviceid=${dId} and time LIKE '${date}' `;
	// console.log(dId);
	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err);
	}
	else{
		res.send(rows);
	}
	});
	
});
app.put('/topology/:id/:extended/:update', (req, res)=> {

	let name=req.body.name;
	let teamname= req.body.team;
	
	let uId= req.body.uId;
	let start= req.body.startDate;
	let end= req.body.endDate;
	
	// console.log(new Date(start), new Date(end));
	// let arr= []

	// 	for(let dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
	// 		let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
	// 		let offset= ISToffSet*60*1000;
	// 		let date=new Date(dt);
			
	// 		let startTime=new Date(date.getTime()+offset);
			
			
	// 		startTime=startTime.toISOString().substring(0,11);
	// 		arr.push(startTime);
	// 	}
	// 	// console.log(arr);

	let values= [];
	for(let i=0;i<req.body.DeviceId.length;i++){
	
			let temp = [];
			temp.push(name);
			temp.push(teamname);
			temp.push(start);
			temp.push(end);
			temp.push(req.body.DeviceId[i]);
			temp.push(uId);
			values.push(temp);
		
	}
	let deleted= 'deleted';
	// console.log(values+"huhu");

	// let qrr=`select * from userdeviceinfo where time='${values[0][2]}' and endtime='${values[0][3]}' and deviceid='${values[0][4]}' and status!='${deleted}'`;
	// db.query(qrr, (err, rows)=>{
	// 	if(rows.length>0){
	// 		res.status(663).json({
	// 			message: 'Time slot not available, please refresh the page to see latest available time slots'
	// 		})
	// 		return;
	// 	}
	// 	else{
			let tempQuery = `insert into userdeviceinfo (name, team , time, endtime, deviceid, userid) values ?`;
			db.query(tempQuery, [values],async (err, rows,fields)=> {
		
			
			
				res.send({
					message: 'added to userdeviceinfo table for the topology'

				})
			
			

	
		})
	// }
})
app.put('/topology/:id/:name', (req, res)=>{
	// console.log('Get all users');
	let uId = req.params.id;
	let name= req.params.name;
	let datetime= req.body.datetime+'_____';
	let status = 'deleted';
	let qrr = `select * from userdeviceinfo INNER JOIN topology ON userdeviceinfo.deviceid=topology.deviceid where topologyname='${name}' and time LIKE '${datetime}' and userdeviceinfo.status != '${status}'`;
	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err);
	}
	else{
		res.send(rows);
	};
	})
	
});

app.delete('/topology/:name', (req, res)=> {
	let name= req.params.name;
	
	let qrr = `delete from topology where topologyname='${name}'`;

	db.query(qrr,async (err, rows,fields)=> {
	if(err){
		console.log(err);
	}
	// console.log("ububeubu")
	res.send({
		message: 'data deleted successfully from topology',
		data:rows
	});


	
	
});
});
app.delete('/userdeviceinfo/:userdeviceinfoid/delete/data/userdevice', (req, res)=> {
	let udId= req.params.userdeviceinfoid;
	// console.log('yes'+ udId)
	let qrr = `delete from userdeviceinfo where deviceid='${udId}'`;

	db.query(qrr,async (err, rows,fields)=> {
	if(err){
		console.log(err);
	}
	// console.log("ububeubu")
	res.send({
		message: 'data deleted successfully',
		data:rows
			
			
	});

	
	
});
});
app.get('/topology/:userid/:dateTime', (req, res)=>{
	// console.log('Get all users')
	let uId = req.params.userid
	let currentDate= req.params.dateTime.replace(/_/g, '-')
	let date= currentDate.substring(0, 13)+':'+ currentDate.substring(14, 16)
	// console.log(date)
	let qrr = `select   userdeviceinfo.time, userdeviceinfo.id, userdeviceinfo.endtime, userdeviceinfo.team,  devices.devicename from userdeviceinfo INNER JOIN devices ON userdeviceinfo.deviceid=devices.id  where userdeviceinfo.userid='${uId}' and userdeviceinfo.time>'${date}' and devices.id NOT In (select deviceid from topology)`
	db.query(qrr, async (err, rows,fields)=> {
	if(err){
		console.log(err)
	}
	else{
		res.send(rows)
	}
	})
	
})
app.put('/users/:uploadData',  async (req, res)=> {
	
	let data = req.body;
	// console.log(data);
	let checkRedundency=[];
	let redundency= false;
	let ans = [];
	let valid = true;
	for(let i=0;i<data.length;i++){
		let temp = [];
		if(data[i].name == undefined || data[i].password == undefined || data[i].teamname == undefined || data[i].accesslevel == undefined ){
			valid=false;
		}
		else{
			temp.push(data[i].name);
			if(checkRedundency.includes(data[i].name)){
				redundency=true;
			}
			else{
				checkRedundency.push(data[i].name);
			}
			const hashedPassword = await bcrypt.hash(data[i].password, 12);
			temp.push(hashedPassword);
			temp.push(data[i].teamname);
			temp.push(data[i].accesslevel);


		}
		
		
		
		ans.push(temp);
	
	}
	
	// console.log(ans);
	
	// console.log(data[0].length,  valid);
    if(valid && !redundency){
		let deviceArray=[];
	for(let i=0;i<ans.length;i++){
		
		let tempQuery= `select * from users where name='${ans[i][0]}'`
		// let values=ans[i];
		db.query(tempQuery,async (err, results,fields)=> {
			if(err){
				return res.status(663).json({
					message: 'dublicate key'
				})
			}
		
	if(results.length==0){
			// console.log("nsucnu")
			deviceArray.push(ans[i]);
		
	}
	if(i==ans.length-1){
		if(deviceArray.length>0){
			let qrr = `insert into users (name, password, teamname, accesslevel) VALUES ? `;
	
			db.query(qrr, [deviceArray], async(err, results,fields)=> {
				if(err){
					return res.status(663).json({
						message: 'dublicate key'
					})
				}
			res.send({
				message: 'data updated successfully'
		})
			
		})
		}
		else{
			res.status(404).json({
				message:'No new user present'
			})
		}
		
	}
		
	})
	
}
}
else if(!valid){
	return res.status(663).json({
		message: 'wrong file chosen'
	})

}
else{
	return res.status(401).json({
		message: 'Redundency present'
	})
}
})

app.put('/devices', (req, res)=> {
	
	let rack = req.body.rack;
	let unit = req.body.unit;
	let devicename = req.body.devicename;
	let consoleip = req.body.consoleip;
	let consoleport = req.body.consoleport;
	let managementip = req.body.managementip;
	let powercycleip = req.body.powercycleip;
	let powercycleport = req.body.powercycleport;
	let teamname = req.body.teamname;
	let projectname = req.body.projectname;
	let serialNumber= req.body.serialnumber;
	let Mac= req.body.mac;
	let tg = req.body.tg;
	let status= 'Unreserved'
	let tempQuery= `select * from devices where rack='${rack}' and unit='${unit}' and devicename='${devicename}'`;
	db.query(tempQuery,async  (err, results,fields)=> {
		if(results.length>0){
			res.send({
				message: 'data already present'
		
				
		})
		}
		if(results.length==0){
			let qrr = `INSERT INTO devices (rack, unit, devicename, consoleip, consoleport, managementip, powercycleip, powercycleport, teamname, projectname, status, serialnumber, mac, tg) VALUES ('${rack}', '${unit}', '${devicename}', '${consoleip}', '${consoleport}', '${managementip}', '${powercycleip}', '${powercycleport}','${teamname}', '${projectname}', '${status}', '${serialNumber}', '${Mac}', '${tg}')`;

	db.query(qrr, async (err, results,fields)=> {
		if(err){
			res.status(663).json({
				message: 'upload valid input'
			})
			return;
			
	}
	res.send({
		message: 'data updated successfully'

		
})
	})
}
	
		
	})
	
		
	})


app.post('/devices/:deviceData', (req, res)=> {
	let data = req.body;
	// console.log(data);
	let checkRedundency=[];
	let redundency=false;
	let valid = true;
	let ans = [];
	for(let i=0;i<data.length;i++){
		let temp = [];
		if(data[i].rack==undefined || data[i].unit==undefined || data[i].devicename==undefined || data[i].consoleip==undefined || data[i].consoleport==undefined || data[i].managementip==undefined || data[i].powercycleip==undefined || data[i].powercycleport==undefined || data[i].teamname==undefined || data[i].projectname==undefined ||  data[i].serialnumber==undefined || data[i].mac==undefined){
			valid=false;
		}
		else{
			temp.push(data[i].rack);
			temp.push(data[i].unit);
			temp.push(data[i].devicename);
			let str=data[i].rack +'||' +data[i].unit+'||'+data[i].devicename;
			if(checkRedundency.includes(str)){
				redundency=true;
			}
			else{
				checkRedundency.push(str);
			}
			temp.push(data[i].consoleip);
			temp.push(data[i].consoleport);
			temp.push(data[i].managementip);
			temp.push(data[i].powercycleip);
			temp.push(data[i].powercycleport);
			temp.push(data[i].teamname);
			temp.push(data[i].projectname);
		
			temp.push(data[i].serialnumber);
			temp.push(data[i].mac);
			temp.push(data[i].tg);
		}
		ans.push(temp);
	}

	let deviceArray=[];

	if(valid && !redundency){
		for(let i=0;i<ans.length;i++){
			
			let tempQuery= `select * from devices where rack='${ans[i][0]}' and unit='${ans[i][1]}' and devicename='${ans[i][2]}'`;
			// let values=ans[i];
			db.query(tempQuery,async (err, results,fields)=> {
				if(err){
					 res.status(663).json({
						message: 'wrong file chosen'
					})
				
			}
			
		if(results.length==0){
		
				deviceArray.push(ans[i]);
			
		}
		if(i==ans.length-1){
			if(deviceArray.length>0){

				let qrr = `INSERT INTO devices (rack, unit, devicename, consoleip, consoleport, managementip, powercycleip, powercycleport, teamname, projectname, serialnumber, mac, tg) VALUES ?`;
				let values = deviceArray;
		
				db.query(qrr, [deviceArray], async (err, results,fields)=> {
				if(err){
					 res.status(663).json({
						message: 'wrong file chosen'
					})
			
				}
				
				res.send({
					message: 'data updated successfully'
			
						
				})
				
			})
			}
			else{
				return res.status(404).json({
					message:'no new device present!'
				})
			}
			
		}
			
		})
		
	}
}
	else if(!valid){
		return res.status(663).json({
			message: 'wrong file chosen'
		})
	
	}
	else{
		return res.status(401).json({
			message: 'redundency present!'
		})
	}

})

app.post('/userdeviceinfo/data', (req, res)=>{
	let dId= req.body.deviceId;
	let startDate= req.body.sDate;
	let endDate= req.body.eDate;
	// console.log(dId);
	let deleted= 'deleted';

	let qrr= `select time, endtime from userdeviceinfo  where deviceid='${dId}' and !(endtime<='${startDate}' or time >= '${endDate}') and status!='${deleted}' `
	// FROM `userdeviceinfo` WHERE 2023-03-15T12:24>='2023-03-15T12:41' and 2023-03-15T13:59 <= '2023-03-15T12:45';
	db.query(qrr, async(err, results,fields)=> {
		// console.log(qrr)
	
	
		// console.log(results);
		if(results.length==0){
			return res.send({
				message:'yes'
			})
		}
		if(results.length>0){
			return res.status(663).json({
				message: 'not available'
			})
		}
		
	
	});

})
app.put('/users', async (req, res)=> {
	
	let fullName = req.body.fullname;
	let password = req.body.password;
	let team = req.body.teamname;
	let accesslevel = req.body.accesslevel;
	const hashedPassword = await bcrypt.hash(password, 12);

	let tempQuery=`select * from users where name='${fullName}'`
	db.query(tempQuery, async (err, results,fields)=> {
		if(results.length>0){
			res.send({
				message: 'username already exists'
			})
		}
		if(results.length==0){
		let qrr = `INSERT INTO users (name, password, teamname, accesslevel) VALUES ('${fullName}', '${hashedPassword}', '${team}', '${accesslevel}')`;
		db.query(qrr,async(err, results,fields)=> {
			if(err){
				if(err){
					res.status(663).json({
						message: 'check your excel file'
					})
					return;
				}
			}
			
			res.send({
				message: 'user added successfully'
		
					
			})
			
		})

		}
		
		
	})


	
})


app.post('/topology/:id', (req, res)=> {
	
	let name=req.body.name;
	let teamname= req.body.team;
	let sTime=req.body.sTime;
	let eTime= req.body.eTime;

	let uId= req.body.uId;
	let deviceId= req.body.deviceId;
	let start= req.body.startDate;
	let end= req.body.endDate;
	
	// console.log(new Date(start), new Date(end));
	// let arr= []

	// 	for(let dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
			// let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
			// let offset= ISToffSet*60*1000;
			// let date=new Date(start);
			
			// let startTime=new Date(date.getTime()+offset);
			
			
			// startTime=startTime.toISOString().substring(0,11);
			// let dateend=new Date(end);
			
			// let endTime=new Date(dateend.getTime()+offset);
			
			
			// endTime=endTime.toISOString().substring(0,11);
	// 		arr.push(startTime);
	// 	}
	// 	// console.log(arr);

	// let values= [];
	// // for(let i=0;i<req.body.DeviceId.length;i++){
	// 	for(j=0;j<arr.length;j++){
	// 		let temp = [];
	// 		temp.push(name);
	// 		temp.push(teamname);
	// 		temp.push(arr[j].substring(0, 11)+startTime);
	// 		temp.push(arr[j].substring(0, 11)+endTime);
	// 		temp.push(req.body.DeviceId);
	// 		temp.push(uId);
	// 		temp.push(timeId);
	// 		values.push(temp);
	// 	}
	// // }
	// let deleted= 'deleted';

	// startTime=startTime+sTime;
	// endTime=endTime+eTime;
	// let deviceId= req.params.id;
	// console.log(values+"huhu");
	
	
	
			let tempQuery = `insert into userdeviceinfo (name, team , time, endtime, deviceid, userid) values ('${name}', '${teamname}', '${start}', '${end}', '${deviceId}', '${uId}')`;
			db.query(tempQuery, async (err, results,fields)=> {
				
				
				
					res.send({
						message: 'added to userdeviceinfo table for the topology'

					})
				
			

			
		})
		
	

})
app.post('/topology/usedFor/update', (req, res)=> {
	console.log(req)
	let name=req.body.topologyName;
	let update= req.body.update;
	
	
	
	
	
			let tempQuery = `update topology set usedFor='${update}' where topologyname='${name}'` ;
			db.query(tempQuery, async (err, results,fields)=> {
				
				
				
					res.send({
						message: 'added to userdeviceinfo table for the topology'

					})
				
			

			
		})
		
	

})
app.put('/userdeviceinfo/:user/:device', (req, res)=> {
	

	let name = req.body.name;
	
	let teamname= req.body.teamname;
	let deviceId= req.params.device;
	let userId= req.params.user;
	let time = req.body.starttime;
	let endTime= req.body.endtime;
	let timeid= req.body.timeid;
	let deleted= 'deleted';
	let qrr=`select * from userdeviceinfo where time='${time}' and endtime='${endTime}' and status != '${deleted}' and deviceid='${deviceId}'`;
	db.query(qrr, (err, results)=>{
		if(results.length>0){
			res.status(663).json({
				message: 'Time slot not available, please refresh the page to see latest available time slots'
			})
			return;
		}
		else{

			let qrr = `insert into userdeviceinfo (name, team, deviceid, userid, time, endtime, timeid) VALUES ('${name}','${teamname}', '${deviceId}', '${userId}', '${time}', '${endTime}', '${timeid}')`;
			// console.log("harah");
			db.query(qrr, async (err, results,fields)=> {
			if(err){
				console.log(err);
			}
			
			res.send({
				message: 'data updated userdeviceinfo'
			})
			
		})

	}
})
})
app.post('/users/:changepassword', async (req, res)=>{
	
	let password = req.body.password;
	let uId= req.body.userId;
	const hashedPassword = await bcrypt.hash(password, 12);

	let qrr = `update users set password='${hashedPassword}' where id=${uId}` ;
	db.query(qrr, async (err, results,fields)=> {
	if(err){
		return re.status(663).json({
			message:'something went wrong !'
		})
	}
	if(results.length>0){
		
	

		  res.send({
			message: 'chnaged',
			
		});
		// res.status(200).json({ token: token, userId: results[0].id });

	}

});
})

app.listen(3006, ()=>{
    // nodemon 127.0.0.1
  
	console.log('port 3000')
})


















