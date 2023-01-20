# posto

```
const EmailHandler = require('@27Works/posto')

const emailConfig = {
  apiKey: sendgrid.apiKey,
  fromAddress,
  fromName,
  sendEmail,
  templatePath: path.join(process.cwd(), templatePath)
}

const emailHandler = new EmailHandler(emailConfig)

const data = {
  to,
  cc,
  template,
  action_url: '/go',
  baseUrl: config.get('global.baseUrl'),
  membership,
  user
}

const emailResponse = await emailHandler.send(data)

const { bcc, cc, from, subject } = emailResponse.originalMessage
```
