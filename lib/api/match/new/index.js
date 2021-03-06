'use strict';

const Handler = require('./handler'),
    Joi = require('joi'),
    _ = require('lodash');

module.exports = {
    method: 'POST',
    path: '/match/',
    config: {
        validate: {
            payload: {
                coliseum: Joi.number().required(),
                game: Joi.number().required(),
                olympians: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.number().required(),
                        points: Joi.array().items(
                            Joi.object().keys({
                                label: Joi.string().required(),
                                value: Joi.number().required()
                            })
                        ).min(1)
                    })
                ).min(2)
            }
        }
    },
    handler: (request, reply) => {

        Handler.recordMatch(request.payload)
            .then((response) => {
                reply(response);
            });
    }
};
