const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const employeeRoutes = require("./routes/employeeRoutes")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/employee-directory"

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")

    // Seed some sample data if the database is empty
    seedDatabase()
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })

// Seed function to add sample employees
async function seedDatabase() {
  try {
    const Employee = require("./models/employee")
    const count = await Employee.countDocuments()

    if (count === 0) {
      const employeeData = [
        {
          name: "Oratile",
          surname: "Segoenyane",
          department: "Engineering",
          salary: 75000,
        },
        {
          name: "Jane",
          surname: "Smith",
          department: "Marketing",
          salary: 65000,
        },
        {
          name: "Roman",
          surname: "Reigns",
          department: "Engineering",
          salary: 80000,
        },
        {
          name: "Sarah",
          surname: "Williams",
          department: "HR",
          salary: 60000,
        },
        {
          name: "Jacob",
          surname: "Fatu",
          department: "Finance",
          salary: 70000,
        },
        {
          name: "Boitumelo",
          surname: "Jim",
          department: "Engineering",
          salary: 78000,
        },
      ]

      await Employee.insertMany(employeeData)
      console.log("Employee data is inserted successfully!")
    }
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

// Routes
app.use("/api/employees", employeeRoutes)

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Employee Directory API is running!" })
})




// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
