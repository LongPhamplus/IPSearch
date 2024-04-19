const productData = require('/Code/Web/SearchIP/src/config/db/detailData')
const searchData = require('/Code/Web/SearchIP/src/config/db/seachData')

class ProductController {

    async index (req, res) {
        try {
            var detail = await productData.getDetail(req.query)
            // Đợi cho đến khi kết nối cơ sở dữ liệu hoàn tất
            await res.render('product', {
                productDetail: detail.html,
                don_cung_chu: detail.subhtml,
                subNumFound: detail.num_found
            })
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ProductController
