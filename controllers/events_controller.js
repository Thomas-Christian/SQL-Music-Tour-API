const events = require('express').Router();
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

// GET ALL 
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll();
        res.status(200).json(foundEvents);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET BY ID
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {
                event_id: req.params.id
            }
        });
        res.status(200).json(foundEvent);
    } catch (error) {
        res.status(500).json(error);
    }
})

// NEW EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Successfully created a new event',
            data: newEvent
        })
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// UPDATE AN EVENT
events.put('/:id', async (req, res) => {
    try {
        const updatedevents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${ updatedevents } event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE AN EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        });
        res.status(200).json ({
            message: `Successfully deleted ${ deletedEvent } event(s)`
        })
    } catch (error) {
        res.status(500).json(error);
    }
    
})


module.exports = events