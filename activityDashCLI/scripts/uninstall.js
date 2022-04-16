import path from "path"
import { Service } from 'node-windows'

const dir = path.join(process.cwd(), "../activityDash.js")

// Create a new service object
const svc = new Service({
	name: 'activityDash',
	script: dir
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', () => {
	console.log('Uninstall complete.');
	console.log('The service exists: ', svc.exists);
})

// Uninstall the service.
svc.uninstall();