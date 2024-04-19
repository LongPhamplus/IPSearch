const searchData = require('/Code/Web/SearchIP/src/config/db/seachData')

class SearchController {

    async index (req, res) {
        try {
            var output = await searchData.getData(req.body)
            // Đợi cho đến khi kết nối cơ sở dữ liệu hoàn tất
            await res.render('product', 
            {
                numFound: output.numberFound,
                dataSearched: output.html,
                data: output.data
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
}

module.exports = new SearchController

