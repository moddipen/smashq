const nodemailer = require("nodemailer")
const path = require("path")
const EmailTemplates = require("swig-email-templates")
const templatesDir = path.join(__dirname, "../templates")

send_response = (data, is_error, message, status_code) => {
  var json = { data: data, is_error: is_error, message: message }
  if (is_error === undefined) {
    json.is_error = false
  }
  if (message === undefined) {
    json.message = ""
  }

  return json
}

makeSuccess = (message = "", data = []) => {
  var json = { success: true, message: message, data: data }
  return json
}

makeError = (message = "", data = []) => {
  var json = { success: false, message: message, data: data }
  return json
}

uploadImageFromBase64 = async (base64, model) => {
  let base64Image = base64.split(";base64,").pop()
  let fileName = "public/uploads/" + model + "/" + Date.now() + ".png"
  var filepath = path.join(fileName)
  await require("fs").writeFile(
    filepath,
    base64Image,
    { encoding: "base64" },
    err => {
      console.log("File created")
    }
  )
  return fileName
}

send_mail = (fileName, replace_var, toEmail, subject) => {
  let mailer = nodemailer.createTransport(process.env.MAIL_DETAIL)
  var templates = new EmailTemplates()
  templates.render(
    templatesDir + "/" + fileName,
    replace_var,
    async (err, html, text) => {
      var mailOptions = {
        from:
          '"' +
          process.env.MAIL_PROJECT_NAME +
          '" <' +
          process.env.SENDER_MAIL +
          ">", // sender address
        to: toEmail, // list of receivers
        subject: subject, // Subject line
        html: html // html body
      }
      // send mail with defined bitech object
      await mailer.sendMail(mailOptions)
      return true
    }
  )
}
