const bands = require('express').Router();
const db = require('../models')
const { Band, Meet_Greet, Event, Set_Time } = db
const { Op } = require('sequelize');

// GET ALL
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [
                ['available_start_time', 'ASC']
            ],
            where: {
                name: {
                    [Op.like]: `%${req.query.name ? req.query.name : ''}%`
                }
            }
        });
        res.status(200).json(foundBands);
    } catch (error) {
        res.status(500).json(error)
    }
});

// GET BY ID
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: {
                name: req.params.name
            },
            include: [
                {
                    model: Meet_Greet,
                    as: 'meet_greets',
                    include: {
                        model: Event,
                        as: 'event',
                        where: {
                            name: {
                                [Op.like]: `%${req.query.name ? req.query.name : ''}%`
                            }
                        }
                    }
                },
                {
                    model: Set_Time,
                    as: 'set_times',
                    include: {
                        model: Event,
                        as: 'event',
                        where: {
                            name: {
                                [Op.like]: `%${req.query.name ? req.query.name : ''}%`
                            }
                        }
                    }
                }
            ]
        })

        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})


// NEW BAND
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body);
        res.status(200).json({
            message: 'Successfully created a new band',
            data: newBand
        })
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND 
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBand = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully deleted ${deletedBand} band(s)`
        })
    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports = bands;