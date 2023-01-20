const fs = require('fs')
const mjml2html = require('mjml')
const path = require('path')
const templater = require('lodash.template')

module.exports = templatePath => (templateName, data) => {
  return new Promise((resolve, reject) => {
    try {
      // Load template.
      const template = fs.readFileSync(`${path.resolve(path.join(templatePath, templateName))}.mjml`)

      // Render.
      const compiledTemplate = templater(template.toString())(data)

      if (data.pretty === false) {
        return resolve(compiledTemplate)
      }

      const mjml = mjml2html(compiledTemplate, { validationLevel: 'strict' })

      return resolve(mjml.html)
    } catch (error) {
      console.log('error :>> ', error.message || error)
      return resolve(null)
    }
  })
}
