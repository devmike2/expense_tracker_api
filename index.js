const { port, db_connect } = require('./config')
const app = require('./src/app')

db_connect().then(() =>{
    app.listen(port, () =>{
    console.log(`APP is live and connected to DB and listening to request on http://localhost:${port}`)
})
})

