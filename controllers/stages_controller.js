const stages = require('express').Router();
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

// GET ALL 
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll();
        res.status(200).json(foundStages);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET BY ID
stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: {
                stage_id: req.params.id
            }
        });
        res.status(200).json(foundStage);
    } catch (error) {
        res.status(500).json(error);
    }
})

// NEW STAGE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Successfully created a new stage',
            data: newStage
        })
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// UPDATE A STAGE
stages.put('/:id', async (req, res) => {
    try {
        const updatedstages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${ updatedstages } stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A STAGE
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        });
        res.status(200).json ({
            message: `Successfully deleted ${ deletedStage } stage(s)`
        })
    } catch (error) {
        res.status(500).json(error);
    }
    
})


module.exports = stages