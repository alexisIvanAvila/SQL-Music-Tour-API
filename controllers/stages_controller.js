// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db 

// FIND ALL STAGES
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll()
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// SHOW ROUTE
// FIND A SPECIFIC STAGE
stages.get('/:name', async (req, res) => {
    try {
        const foundStages = await Stage.findOne({
            where: { name: req.params.name },
            attributes: ['id', 'name'],
            include: [
                {
                    model: Event,
                    through: {
                    attributes: []
                    },
                    attributes: ['id', 'name', 'date', 'start_time', 'end_time'],
                    order: [['date', 'ASC']],
                },
                ]
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})


// CREATE A STAGE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A STAGE
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})