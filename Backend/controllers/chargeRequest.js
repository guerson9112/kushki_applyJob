const { response } = require('express');
require('dotenv').config(); 
const axios = require('axios')


const chargeRequest = async (req, res = response) => {



    const { token, products, subtotalIva0 } = req.body;

    let body = {

        'token': token,
        'amount': {
            'subtotalIva': 0,
            'subtotalIva0': subtotalIva0,
            'ice': 0,
            'iva': 0,
            'currency': "USD"
        },
        "metadata": {
            "contractID": "157AB"
        },
        "contactDetails": {
            "documentType": "CC",
            "documentNumber": "1009283738",
            "email": "test@test.com",
            "firstName": "Diego",
            "lastName": "Cadena",
            "phoneNumber": "+593988734644"
        },
        "orderDetails": {
            "siteDomain": "tuebook.com",
            "shippingDetails": {
                "name": "Diego Cadena",
                "phone": "+593988734644",
                "address": "Eloy Alfaro 139 y Catalina Aldaz",
                "city": "Quito",
                "region": "Pichincha",
                "country": "Ecuador",
                "zipCode": "170402"
            },
            "billingDetails": {
                "name": "Diego Cadena",
                "phone": "+593988734644",
                "address": "Eloy Alfaro 139 y Catalina Aldaz",
                "city": "Quito",
                "region": "Pichincha",
                "country": "Ecuador",
                "zipCode": "170402"
            }
        },
        "productDetails": {
            "product": products
        },
        "fullResponse": true

    }


    const response = await axios.post(process.env.KUSHKI_CHARGE_REQUEST_URL, body, {
        headers: {
            'content-type': 'application/json',
            'Private-Merchant-Id': process.env.KUSHKI_PRIVATE_MERCHANT_ID
        }
    }).then(response => {
        return res.status(response.status).json({
            ok: true,
            data: response.data

        })
    })
        .catch(err => {
            console.log(err.response.data)
            return res.status(err.response.status).json({

                ok: false,
                data: err.response.data

            })
        })

    return response;

}





module.exports = { chargeRequest }