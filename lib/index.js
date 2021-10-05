const fetch = require('node-fetch')
const express = require('express')
const path = require('path')
const api = express()

api.use(express.json())

const formsId = '1FAIpQLSenWwYlKGQlDN6mAQPx8Fc4e20NvzAb6kAyML5iZ9TOhVX1fQ'

const formBody = ({
  apiDocUrl,
  purpose,
  motivation,
  forWho,
  organization,
  contactName,
  contactInfo,
}) => {
  const fields = {
    'entry.905370717': apiDocUrl,
    'entry.213682673': purpose,
    'entry.1216712726': motivation,
    'entry.1698641718': forWho,
    'entry.1770858663': organization,
    'entry.76585066': contactName,
    'entry.285021065': contactInfo,
  }
  return Object.keys(fields).map(key => `${key}=${encodeURIComponent(fields[key])}`).join('&')
}

const submit = ({
  apiDocUrl,
  purpose,
  motivation,
  forWho,
  organization,
  contactName,
  contactInfo,
}) =>
  fetch(
    `https://docs.google.com/forms/u/0/d/e/${formsId}/formResponse`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody({ apiDocUrl, purpose, motivation, forWho, organization, contactName, contactInfo }),
    }
  )

api.post('/', (req, res) => {
  submit({
    apiDocUrl: req.body.apiDocUrl,
    purpose: req.body.purpose,
    motivation: req.body.motivation,
    forWho: req.body.forWho,
    organization: req.body.organization,
    contactName: req.body.contactName,
    contactInfo: req.body.contactInfo,
  }).then(resp => res.send('tack!'))
})

api.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../doc.html'))
})

api.listen(3000, () => console.log('listening on port 3000'))
