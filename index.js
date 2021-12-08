const Email = require('email-templates')
const Mailman = require('./mailman')
const path = require('path')

module.exports = function (options) {
  return new Posto(options)
}

function Posto (options) {
  this.options = options
}

Posto.prototype.send = function (data, send = true) {
  const { fromAddress, fromName, sendEmail, templatePath } = this.options

  if (!fromAddress || !fromName || !templatePath) {
    const error = new Error('You must pass a configuration object with properties fromAddress, fromName, sendEmail, templatePath')
    throw error
  }

  const email = new Email({
    juice: true,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        relativeTo: templatePath
      }
    },
    message: {
      from: `${fromName} <${fromAddress}>`
    },
    // When "send" is true (the default) mailman.js takes care of the appropriate transport for the current environment.
    send,
    preview: process.env.NODE_ENV === 'development' && sendEmail === false,
    transport: Mailman(this.options),
    views: {
      root: templatePath,
      options: {
        extension: 'njk'
      }
    }
  })

  const { attachments, bcc, cc, to, template } = data

  return email.send({
    template,
    message: {
      attachments,
      bcc,
      cc,
      to
    },
    locals: data
  })  
    .then(response => {
      return Promise.resolve(response)
    })
    .catch(err => {
      console.log(err)

      err.message = 'EMAIL_FAILED'
      return Promise.reject(err)
    })
}
