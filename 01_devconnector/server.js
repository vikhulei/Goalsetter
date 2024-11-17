const express = require('express')
const connectDB = require('./config/db')

// const cors = require('cors')

const app = express ()

// app.use(cors())

connectDB()

//Initialize middleWare
// app.use(express.json({ extended: false}))

const PORT = process.env.PORT || 6000

// app.get('/', (req, res) => res.send('API running'))

// app.use('/api/auth', require('./routes/api/auth'))
// app.use('/api/users', require('./routes/api/users'))
// app.use('/api/profile', require('./routes/api/profile'))
// app.use('/api/post', require('./routes/api/post'))

app.listen(PORT, () => console.log(`server started on ${PORT}`))