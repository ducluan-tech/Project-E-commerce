const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            // if user have role = 1 ->> admin
            // only admin cor create. delete and update category
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "Danh mục đã tồn tại !"})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Thêm mới danh mục thành công !"})
            
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) =>{
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Vui lòng xóa tất cả các sản phẩm có mối quan hệ"
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Xóa Danh mục thành công"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id} , {name})

            res.json({msg: "Cập nhật danh mục"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl