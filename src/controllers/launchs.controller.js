import {launchs} from "../models/launchs.model"

export const HttpGetAllLauches = (req, res)=>{
    return res.status().json(launchs)
}
