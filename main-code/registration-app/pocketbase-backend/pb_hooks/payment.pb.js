/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />

onRecordUpdateRequest((e) => {
    const oldPaid = $app.findRecordById('Participant', e.record.id).get('Paid')
    if (!oldPaid && e.record.get('Paid')) {
        const soloSegmentsIntermediate = $app.findRecordsByFilter(
            'Solo_Segment_Participant',
            `Participant = "${e.record.id}"`
        )

        $app.expandRecords(soloSegmentsIntermediate, ['Segment'])
        const soloSegments = soloSegmentsIntermediate.map((val) => val.expandedOne('Segment').get('Name'))
        const groupSegmentsIntermediate = $app.findRecordsByFilter(
            'Group_Segment_Group',
            `Group.Members.id ?= "${e.record.id}"`
        )
      
        $app.expandRecords(groupSegmentsIntermediate, ['Segment'])
     
        const groupSegements = groupSegmentsIntermediate.map((val) => val.expandedOne('Segment').get('Name'))

        let list = ''
        for (let segment of soloSegments) {
            list += `<li>${segment}</li>`
        }

        for (let segment of groupSegements) {
            list += `<li>${segment}</li>`
        }

        const paymentConfirmMail = new MailerMessage({
            from: {
                address: $app.settings().meta.senderAddress,
                name: $app.settings().meta.senderName
            },
            to: [{address: e.record.get('email')}],
            subject: 'Payment Confirmation Mail',
            html: `
            <h3>Dear ${e.record.get('Last_Name')}</h3>
            <p>We have sucessfully received your payment. Now you can rest assured: you have a place at our event.</p>
            <p>For your reference, these are the segments you have registered for:</p>
            <ul>
                ${list}
            </ul>
            <p>If you change your mind about any of the segments, don't worry! You can still change them if you want, as long as registration is open.</p>
            <p>We hope you will enjoy our event. See you there soon.</p>
            <h3>Yours sincerely,</h3>
            <h3>Sunnydale Math x Tech Club & Sunnydale Robotics Club</h3>
            `

        })

        $app.newMailClient().send(paymentConfirmMail)
    }

    e.next()
    
}, 'Participant')