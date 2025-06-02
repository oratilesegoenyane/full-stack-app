const express = require("express")
const Employee = require("../models/employee")
const router = express.Router()

// Get all employees or filter by department
router.get("/", async (req, res) => {
  try {
    const { department } = req.query
    const filter = {}

    if (department) {
      filter.department = new RegExp(department, "i") // Case-insensitive search
    }

    const employees = await Employee.find(filter)
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }
    res.status(200).json(employee)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add a new employee
router.post("/", async (req, res) => {
  try {
    const { name, surname, department, salary } = req.body

    const employee = new Employee({
      name,
      surname,
      department,
      salary,
    })

    const savedEmployee = await employee.save()
    res.status(201).json(savedEmployee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update an existing employee
router.put("/:id", async (req, res) => {
  try {
    const { name, surname, department, salary } = req.body

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, surname, department, salary },
      { new: true, runValidators: true },
    )

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }

    res.status(200).json(employee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id)

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }

    res.status(200).json({ message: "Employee deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
