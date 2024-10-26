/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />
routerAdd("POST", "/contact-us", (c) => {
    const data = $apis.requestInfo(c).data
    const message = new MailerMessage({
        from: {
            address: data.email,
            name: data.name
        },
        to: [{address: $app.settings().meta.senderAddress}],
        subject: `Contact form submission from ${data.name} of ${data.school}`,
        html: data.message
    })

    $app.newMailClient().send(message)


    return c.json(200, {message: 'Email sent sucessfully'})
}) 
