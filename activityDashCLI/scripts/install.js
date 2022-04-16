import path from "path"
import { Service } from "node-windows"

const dir = path.join(process.cwd(), "../activityDash.js")

// Create a new service object
const svc = new Service({
	name: "activityDash",
	description: "Service for collecting and sending usage data",
	script: dir
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", () => {
	svc.start()
})

// Just in case this file is run twice.
svc.on("alreadyinstalled", () => {
	console.log("This service is already installed.")
})

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on("start", () => {
	console.log(svc.name + " started!\nVisit http://localhost:3000 to see it in action.")
})

// Install the script as a service.
console.log("Installing to", dir)
svc.install()
