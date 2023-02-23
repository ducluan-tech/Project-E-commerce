const Products = require('../models/productModel')

//filter, sorting and paginating

class APIfeature {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}//queryString = req.query

        const excludedFields = ['page', 'sort' , 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' +match)


        //gte = greater than or equal
        //lte = lesser than or euqal
        //lt = lesser than
        //gt = greater than



        this.query.find(JSON.parse(queryStr))


        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createAt')
        }

        return this;
    }
    paginating(){
        const page = this.queryString.page *1 || 1
        const limit = this.queryString.limit *1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProducts: async(req, res) => {
        try {
            const features = new APIfeature(Products.find(), req.query)
            .filtering().sorting().paginating()
            const products = await features.query
            

            res.json({
                status: 'Thành Công',
                result: products.length,
                products: products
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Không có hình ảnh tải lên"})

            const product = await Products.findOne({product_id})
            if(product) 
                return res.status(400).json({msg: "Sản phẩm này đã tồn tại"})

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })

            await newProduct.save()

            res.json({msg: "Tạo một sản phẩm"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Xóa sản phẩm "})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) => {
        try {
            const { title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Không có hình ảnh tải lên"})

            await Products.findOneAndUpdate({_id: req.params.id},{
                title: title.toLowerCase(), price, description,content,images,category
            })

            res.json({msg: "Cập nhật hình ảnh"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

}


module.exports = productCtrl