export const launchs = new Map()
const launch = {
    FlightNumber: 100,
    Mission: "Kepler Space Exploration",
    Rocket:"Explorer IS1",
    LaunchDate: new Date("December  22, 2050"),
    Destination:"Kepler-422 b",
    Customers:["ZTM", "NASA"],
    Upcoming:true,
    Sucess:true
}
launchs.set(launch.FlightNumber, launch)
export const getAllLauches = () =>{
    return Array.from(launchs.values())
}
 