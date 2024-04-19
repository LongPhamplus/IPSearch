const searchRouter = require('./search.routes')
const homeRouter = require('./home.routes')
const productController = require('./product.routes')

function route(app) {

  app.use('/productDetail', productController)
  app.use('/searchPage', searchRouter)
  app.use('/', homeRouter)
    
    


}

module.exports = route

