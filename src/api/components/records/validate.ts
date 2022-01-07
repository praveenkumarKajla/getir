
import DateExtension from '@joi/date';
import * as JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

export default {
    get: {
        records: {
            payload: Joi.object().keys({
                startDate: Joi.date().format("YYYY-MM-DD").required(),
                endDate: Joi.date().format("YYYY-MM-DD").required().greater(Joi.ref('startDate')),
                minCount: Joi.number().min(0).required(),
                maxCount: Joi.number().min(0).required().greater(Joi.ref('minCount'))
            }),
        },
    },

}