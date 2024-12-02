/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />

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