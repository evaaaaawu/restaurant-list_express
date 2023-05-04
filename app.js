// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const port = 3000

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const restaurantList = require('./restaurant.json')
const routes = require('./routes') // 引用路由器

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes) // 將 request 導入路由器

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})