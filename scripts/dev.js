import { spawn } from 'node:child_process'
import http from 'node:http'

const isWindows = process.platform === 'win32'
const npmCommand = isWindows ? 'npm' : 'npm'
const children = []

function runScript(scriptName) {
  const child = spawn(npmCommand, ['run', scriptName], {
    stdio: 'inherit',
    shell: isWindows,
  })

  children.push(child)
  child.on('exit', (code) => {
    if (code && code !== 0) {
      process.exitCode = code
      shutdown()
    }
  })

  return child
}

function shutdown() {
  children.forEach((child) => {
    if (!child.killed) {
      child.kill('SIGTERM')
    }
  })
}

async function waitForApi(url, attempts = 40, delayMs = 300) {
  for (let index = 0; index < attempts; index += 1) {
    const ready = await new Promise((resolve) => {
      const request = http.get(url, (response) => {
        response.resume()
        resolve(response.statusCode === 200)
      })

      request.on('error', () => resolve(false))
      request.setTimeout(delayMs, () => {
        request.destroy()
        resolve(false)
      })
    })

    if (ready) {
      return true
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }

  return false
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
process.on('exit', shutdown)

runScript('dev:server')

const apiReady = await waitForApi('http://127.0.0.1:3001/api/health')

if (!apiReady) {
  console.error('La API no respondio en http://127.0.0.1:3001/api/health')
  process.exit(1)
}

runScript('dev:web')
