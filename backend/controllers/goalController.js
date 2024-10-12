const asyncHandler = require('express-async-handler')

//@descr  Get goals
//@route  GET api/goals
//@access Private


const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({msg: 'Get goals'})
})

//@descr  Set a goal
//@route  POST api/goals
//@access Private


const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({msg: 'Set goals'})

})

//@descr  Update goals
//@route  PUT api/goals/:id
//@access Private


const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({msg: `Update goal ${req.params.id}`})
})

//@descr  Delete a goal
//@route  DELETE api/goals
//@access Private


const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({msg: `Delete goal ${req.params.id}`})
})



module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}