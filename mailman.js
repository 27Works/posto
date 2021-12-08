const env = process.env.NODE_ENV || 'development'
const mailTransport = require('nodemailer-sendgrid-transport')
const nodemailer = require('nodemailer')
const NodemailerBrowser = require('@dadi/nodemailer-browser-transport')

module.exports = ({ apiKey, sendEmail }) => {
  if (env === 'production' || sendEmail === true) {
    const options = {
      auth: {
        api_key: apiKey
      }
    }

    return nodemailer.createTransport(mailTransport(options))
  } else {
    const tmpdir = require('path').join(process.cwd(), 'tmp', 'nodemailer')

    const transport = new NodemailerBrowser({
      dir: tmpdir,
      browser: true
    })

    return nodemailer.createTransport(transport)
  }
}
