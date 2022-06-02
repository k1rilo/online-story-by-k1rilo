const uuid = require('uuid')
const path = require('path');
const { Devise, DeviseInfo } = require('../models/models');
const ApiError = require('../error/ApiError')

class DeviseController {
    async create (req, res, next) {

        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName ))
            const devise = await Devise.create({name, price, brandId, typeId, img: fileName})

            if(info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    DeviseInfo.create({
                        title: i.title,
                        description: i.description,
                        deviseId: devise.is 
                    })
                )
            }

            

            return res.json(devise)

        } catch (e) {

            next(ApiError.badRequest(e.message))

        }
        
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devises;
        if (!brandId && !typeId) {
            devises = await Devise.findAndCountAll({limit, offset})

        }
        if (brandId && !typeId) {
            devises = await Devise.findAndCountAll({where: {brandId}, limit, offset})
        }

        if (!brandId && typeId) {
            devises = await Devise.findAndCountAll({where: {typeId},  limit, offset})
        }
        
        if (brandId && typeId) {
            devises = await Devise.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(devises) 
    }

    async getOne(req, res) {
        const {id} = req.params
        const devise = await Devise.findOne(
            {
                where: {id},
                include: [{model: DeviseInfo, as: 'info'}]
            },

        )
        return res.json(devise)
    }


}

module.exports = new DeviseController()