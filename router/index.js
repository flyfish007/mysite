const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
  res.send('Hello Express123!')
})

module.exports = router
