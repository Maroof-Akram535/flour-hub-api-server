const BaseUrl = '/flourhub/admin';
var AdminDAO = require('../services/adminServices');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage })
module.exports = (router) => {
    router.post(BaseUrl + '/addProduct', upload.single('image'), async (req, res) => {
        await AdminDAO.createProduct(req).then(product => {
            res.send("added");
        })
    }),
        router.get(BaseUrl + '/showAllProducts', async (req, res) => {
            await AdminDAO.showAllProducts().then(products => {
                res.send(products);
            })
        }),
        router.delete(BaseUrl + '/deleteProduct', async (req, res) => {
            await AdminDAO.deleteProduct(req.body.pId).then(results => {
                return results;
            })
        }),
        router.put(BaseUrl + '/updateProduct', async (req, res) => {
            await AdminDAO.updateProduct(req.body).then(results => {
                return results;
            })
        })
}