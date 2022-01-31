/**
 *  host  +  /api/token
 */

const {Router}= require('express');
const router = Router();
const { check } = require('express-validator');
const { chargeRequest } = require('../controllers/chargeRequest');
const { validateFields } = require( '../middleware/validate-fields' )

router.post(
    '/', 
    [
    //middlewares
        check('token', 'Token is required').not().isEmpty(),
        check('products', 'products are required').not().isEmpty(),
        check('subtotalIva0', 'subtotalIva0 is required').not().isEmpty(),
        validateFields
    ]
    ,chargeRequest)


module.exports =  router;