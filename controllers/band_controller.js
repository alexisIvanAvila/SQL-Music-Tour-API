// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db
const { Op } = require('sequelize')

// INDEX ROUTE
// FIND ALL BANDS
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ ['available_start_time', 'ASC'] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// SHOW ROUTE
// FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
    console.log(req.params.name)
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [ 
                { 
                    model: MeetGreet,
                    as: "meet_greets", 
                    include: { 
                        model: Event,
                        as: "event", 
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    } 
                },
                { 
                    model: SetTime,
                    as: "set_times",
                    include: { 
                        model: Event,
                        as: "event", 
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                }
            ]
        })  
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE ROUTE
// CREATE A BAND
bands.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// UPDATE ROUTE
// UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE ROUTE
// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})





// EXPORT
module.exports = bands