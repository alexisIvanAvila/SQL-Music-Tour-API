// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event, Stage } = db 

// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ ['date', 'ASC'] ]
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// SHOW ROUTE
// FIND A SPECIFIC EVENT
events.get('/:name', async (req, res) => {
    try {
        const foundEvents = await Event.findOne({
            where: { name: req.params.name },
            include: [
                {
                  model: MeetGreet,
                  order: [['available_start_time', 'ASC']],
                  include: {
                    model: Band,
                    attributes: ['id', 'name', 'genre', 'available_start_time', 'end_time'],
                  },
                  attributes: ['id', 'meet_start_time', 'meet_end_time'],
                },
                {
                  model: SetTime,
                  attributes: ['id', 'startTime', 'endTime'],
                  order: [['startTime', 'ASC']],
                  include: [
                    {
                      model: Band,
                      attributes: ['id', 'name', 'genre', 'available_start_time', 'end_time'],
                    },
                    {
                      model: Stage,
                      attributes: ['id', 'name'],
                    }
                  ]
                },
                {
                  model: Stage,
                  attributes: ['id', 'name'],
                  through: {
                    attributes: []
                  },
                },
              ],
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
 })

// CREATE AN EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// UPDATE AN EVENT
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// DELETE AN EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events