require("dotenv").config();
const app = require("./src/app")
const connectToDB = require("./src/config/database")

async function startServer() {
    await connectToDB()

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

startServer().catch((error) => {
    console.error("Unable to start server:", error.message)
    process.exit(1)
})
