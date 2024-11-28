/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />

routerAdd('POST', '/pay', (c) => {
    const env = require(`${__hooks}/env.json`)
    const userID = c.get('authRecord').id
    const user = $app.dao().findRecordById('Participant', userID)

    const paymentData = new FormData();
    paymentData.append('store_id', env.storeID);
    paymentData.append('store_passwd', env.password);
    paymentData.append('total_amount', 2052.00);
    paymentData.append('currency', 'BDT');
    paymentData.append('tran_id', userID);
    paymentData.append('product_category', 'event');
    paymentData.append('success_url', `${env.url}/payment-redirect`);
    paymentData.append('fail_url', `${env.url}/payment-redirect`);
    paymentData.append('cancel_url', `${env.url}/payment-redirect`);
    paymentData.append('ipn_url', `${env.url}/payment-redirect`);
    paymentData.append('emi_option', 0);
    paymentData.append('cus_name', `${user.get('First_Name')} ${user.get('Last_Name')}`);
    paymentData.append('cus_email', user.get('email'));
    paymentData.append('cus_add1', 'Dhaka')
    paymentData.append('cus_phone', user.get('Phone_Number'));
    paymentData.append('cus_city', 'Dhaka');
    paymentData.append('cus_postcode', '1205');
    paymentData.append('cus_country', 'Bangladesh');
    paymentData.append('shipping_method', 'NO');
    paymentData.append('product_name', 'Sunnydale,Event');
    paymentData.append('product_profile', 'non-physical-goods'); 

    const paymentRes = $http.send({
        url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: paymentData
    })
    
    if (paymentRes.json.status == 'SUCCESS') {
        const paymentRecord = new Record($app.dao().findCollectionByNameOrId('Payment_Info'), {
            Participant: userID,
            Session_ID: paymentRes.json.sessionkey,
            Amount: 0,
            Store_Amount: 0
        })
       
        $app.dao().saveRecord(paymentRecord)
        
        return c.json(200, {url: paymentRes.json.GatewayPageURL})
    } else {
        return c.json(400, {message: 'BAD REQUEST'})
    }
    
}, $apis.activityLogger())

routerAdd('POST', '/payment-redirect', (c) => {
    const env = require(`${__hooks}/env.json`)
    const requestData = $apis.requestInfo(c).data
    const paymentInfo = $app.dao().findFirstRecordByData('Payment_Info', 'Participant', requestData.tran_id)


    const verify = $http.send({
        url: `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${requestData.val_id}&store_id=${env.storeID}&store_passwd=${env.password}&format=json`,
        method: 'GET',
    })

    if (verify.json.status == 'VALID' && requestData.status == 'VALID') {
        const user = $app.dao().findRecordById('Participant', requestData.tran_id)

        user.set('Paid', true)
        $app.dao().saveRecord(user)

        paymentInfo.set('Amount', verify.json.amount)
        paymentInfo.set('Store_Amount', verify.json.store_amount)
        $app.dao().saveRecord(paymentInfo)

        const paymentConfirmMail = new MailerMessage({
            from: {
                address: $app.settings().meta.senderAddress,
                name: $app.settings().meta.senderName
            },
            to: [{address: user.get('email')}],
            subject: 'Payment Confirmation Mail',
            html: `<h3>Dear ${user.get('Last_Name')},<h3><p>Your payment has been sucessfully received. You have earned your spot at Sunnydale Math x Tech & Robotics Fest III. We hope you will enjoy the fest. Please keep this mail so that we can authenticate you during event day.</p> <h3>Yours sincerely,<h3> <h3>Sunnydale Math x Tech Club & Sunnydale Robotics Club<h3>`

        })

        $app.newMailClient().send(paymentConfirmMail)

    } else if (!(verify.json.status == 'VALIDATED')) {
        $app.dao().deleteRecord(paymentInfo)
    }

    return c.redirect(302, env.url)
}, $apis.activityLogger())

onRecordBeforeUpdateRequest((e) => {
    const oldPaid = $app.dao().findRecordById('Participant', e.record.id).get('Paid')
    if (!oldPaid && e.record.get('Paid')) {
        const paymentConfirmMail = new MailerMessage({
            from: {
                address: $app.settings().meta.senderAddress,
                name: $app.settings().meta.senderName
            },
            to: [{address: e.record.get('email')}],
            subject: 'Payment Confirmation Mail',
            html: `<h3>Dear ${e.record.get('Last_Name')},<h3><p>Your payment has been sucessfully received. You have earned your spot at Sunnydale Math x Tech & Robotics Fest III. We hope you will enjoy the fest. Please keep this mail so that we can authenticate you during event day.</p> <h3>Yours sincerely,<h3> <h3>Sunnydale Math x Tech Club & Sunnydale Robotics Club<h3>`

        })

        $app.newMailClient().send(paymentConfirmMail)
    }
}, 'Participant')