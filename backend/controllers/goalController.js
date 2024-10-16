const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@descr  Get goals
//@route  GET api/goals
//@access Private


const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

//@descr  Set a goal
//@route  POST api/goals
//@access Private


const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)

})

//@descr  Update goals
//@route  PUT api/goals/:id
//@access Private


const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {text: req.body.text}, { new: true })


    res.status(200).json(updatedGoal)
})

//@descr  Delete a goal
//@route  DELETE api/goals
//@access Private


const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    await goal.deleteOne()

    res.status(200).json({ id: req.params.id })
})



module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}