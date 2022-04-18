import activeWindow from "active-win"
// import fs from "fs"
// import path from "path"

const { REFRESH_WINDOW_CHECK_SECONDS = 5, PUSH_USER_DATA_INTERVAL_SECONDS = 300 } = process.env

async function watchActivity() {
	// eslint-disable-next-line no-constant-condition
	let currentActiveWindow
	let lastActiveWindowChangeTs = Date.now()
	const activeWindowHistory = []

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const now = new Date()

		const {
			owner: { name }
		} = await activeWindow()
		if (currentActiveWindow != name) {
			const activeWindowChangeTs = now.getTime()
			const lastActiveWindowSummary = {
				program: name,
				startTime: lastActiveWindowChangeTs,
				endTime: activeWindowChangeTs,
				duration: (lastActiveWindowChangeTs - activeWindowChangeTs) / 1000
			}
			lastActiveWindowChangeTs = now.getTime()
			console.log(`Last active window summary: ${JSON.stringify(lastActiveWindowSummary)}`)
			console.log(`Window change: from ${currentActiveWindow} to  ${name} `)
			currentActiveWindow = name
			activeWindowHistory.push(lastActiveWindowSummary)
		}
		await sleep(REFRESH_WINDOW_CHECK_SECONDS)
	}
}

watchActivity()

// function appendToFile(fileName, message) {
// 	const filePath = path.join(process.cwd(), fileName)
// 	fs.appendFileSync(filePath, `${message}\n`)
// }

// function logActivity() {}

const sleep = (sleepSeconds) => {
	return new Promise((resolve) => setTimeout(resolve, sleepSeconds * 1000))
}
