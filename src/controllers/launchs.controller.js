import {launchs} from "../models/launchs.model.js"

export const HttpGetAllLauches = (req, res)=>{
    return res.status().json(launchs)
}
