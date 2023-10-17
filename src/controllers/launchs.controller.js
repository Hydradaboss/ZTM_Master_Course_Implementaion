import {launchs, CreateNewLaunch, DeleteLaunch, DoesIdExist} from "../models/launchs.model.js"

export const HttpGetAllLauches = async (req, res)=>{
    return res.status(200).json(launchs)
}

export const HttpCreateLaunch = async (req, res) => {
   const Launch =  req.body
   if( !Launch.Mission || !Launch.Rocket || !Launch.LaunchDate || !Launch.Destination){
    return res.status(400).json({
        error: "Missing Required Parameters"
    })
   }
   Launch.LaunchDate = new Date(Launch.LaunchDate)
   if(isNaN(Launch.LaunchDate)){
    return res.status(400).json({
        error:"Date is not correct"
    })
   }
   const createdLauch = CreateNewLaunch(Launch)
   return res.status(201).json(createdLauch)
}

export const HttpDeleteLaunch = async ( req, res) => {
    const LaunchId = req.params.id
    if(!DoesIdExist(LaunchId)){
        return res.status(400).json({
            error:"launch not found"
        })
    }
    const aborted = DeleteLaunch(LaunchId)
    return res.status(200).json(aborted)
}