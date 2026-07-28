const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true
}))

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((error, req, res, next) => {
    console.error(error)

    if (error.name === "MulterError") {
        const message = error.code === "LIMIT_FILE_SIZE"
            ? "Upload a PDF resume no larger than 5MB."
            : "Upload a PDF resume."
        return res.status(400).json({ message })
    }

    if (error.name === "ZodError") {
        return res.status(502).json({ message: "The AI returned an incomplete response. Please try again." })
    }

    res.status(500).json({ message: "Unable to complete this request. Please try again." })
})



module.exports = app
