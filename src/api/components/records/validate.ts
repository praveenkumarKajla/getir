
import DateExtension from '@joi/date';
import * as JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

/**
 * Returns Joi objects for different request data for validation
 */
export default {
    get: {
        records: {
            /**
             * startDate & endDate are validated & converted to Date object
             * minCount & maxCount are validated & converted to Number
            */
            payload: Joi.object().keys({
                startDate: Joi.date().format("YYYY-MM-DD").required(),
                endDate: Joi.date().format("YYYY-MM-DD").required().greater(Joi.ref('startDate')),
                minCount: Joi.number().min(0).required(),
                maxCount: Joi.number().min(0).required().greater(Joi.ref('minCount'))
            }),
        },
    },

}