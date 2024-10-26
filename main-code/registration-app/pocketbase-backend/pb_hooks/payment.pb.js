/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />
routerAdd('POST', '/pay', (c) => {
    
    const tokenRes = $http.send({
        url: 'https://sandbox.shurjopayment.com/api/get_token',
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            username: 'sp_sandbox',
            password: 'pyyk97hu&6u6'
        })
    })
    const userID = c.get('authRecord').id
    const user = $app.dao().findRecordById('Participant', userID)
    const paymentRes = $http.send({
        url: 'https://sandbox.shurjopayment.com/api/secret-pay',
        method: 'POST',
        headers: {
            authorization: `${tokenRes.json.token_type} ${tokenRes.json.token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            prefix: 'sp',
            token: tokenRes.json.token,
            store_id: tokenRes.json.store_id,
            return_url: `http://127.0.0.1:8090/sucessful-pay`,
            cancel_url: 'http://127.0.0.1:5173',
            amount: 2000,
            order_id: userID,
            currency: 'BDT',
            customer_name: user.get('First_Name') + ' ' + user.get('Last_Name'),
            customer_address: 'dhaka',
            customer_email: user.get('email'),
            customer_phone: user.get('Phone_Number'),
            customer_city: 'Dhaka',
            client_ip: 'http://127.0.0.1'
        })

    })

    const paymentRecord = new Record($app.dao().findCollectionByNameOrId('Payment_Info'), {
        Participant: userID,
        Order_ID: paymentRes.json.sp_order_id,
        Token: tokenRes.json.token
    })

    $app.dao().saveRecord(paymentRecord)

    return c.json(200, {'url': paymentRes.json.checkout_url})
}, $apis.activityLogger())

routerAdd('GET', '/sucessful-pay', (c) => {
    const order = c.queryParam('order_id')
    const paymentInfo = $app.dao().findFirstRecordByData('Payment_Info', 'Order_ID', order)
    const verify = $http.send({
        url: 'https://sandbox.shurjopayment.com/api/verification',
        method: 'POST',
        headers: {
            authorization: `Bearer ${paymentInfo.get('Token')}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({order_id: paymentInfo.get('Order_ID')})

    })

    console.log(JSON.stringify(verify))

    if (verify.json[0].sp_code == 1000) {
        console.log('reached')
        const user = $app.dao().findRecordById('Participant', paymentInfo.get('Participant'))
        console.log('worked')
        user.set('Paid', true)
        console.log('worked')
        $app.dao().saveRecord(user)
        console.log('worked')
        
    } else {
        $app.dao().deleteRecord(paymentInfo)
    }
    paymentInfo.set('Token', '')
    $app.dao().saveRecord(paymentInfo)

    return c.redirect(302, 'http://127.0.0.1:5173')
})