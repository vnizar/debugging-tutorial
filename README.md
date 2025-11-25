# Debugging Tutorial (JavaScript)

A minimal Node.js project with intentional beginner-level bugs to train debugging skills. It prints PASS/FAIL for synchronous and asynchronous checks so interns can iterate and verify their fixes quickly.

## Requirements
- Node.js installed (no external dependencies)

## Run
- All checks: `npm start`
- Only sync: `node src/index.js sync`
- Only async: `node src/index.js async`

## Project Structure
- `src/index.js` — runner that executes checks and reports results
- `src/mathUtils.js` — array math and parity functions
- `src/stringUtils.js` — string helpers
- `src/counter.js` — simple mutable counter
- `src/objectUtils.js` — shallow/deep clone and nested setters
- `src/asyncUtils.js` — timers, promises, and callback race
