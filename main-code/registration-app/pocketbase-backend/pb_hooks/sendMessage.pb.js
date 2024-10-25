/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />
routerAdd("POST", "/contact-us", (c) => {
    console.log('yes')
    console.log('c')
    const data = $apis.requestInfo(c).data
    console.log(JSON.stringify(data))
    const message = new MailerMessage({
        from: {
            address: data.email,
            name: data.name
        },
        to: [{address: $app.settings().meta.senderAddress}],
        subject: `Contact form submission from ${data.name} of ${data.school}`,
        html: data.message
    })
    console.log('worked')

    $app.newMailClient().send(message)

    console.log('still works')

    return c.json(200, {message: 'Email sent sucessfully'})
}) 
