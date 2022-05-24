import Category from '../models/category'
import Product from '../models/product'

export const create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Khong them duoc danh muc"
            })
        }
        res.json(data)
    });
}

export const list = (req, res) => {
    Category.find((err, category) => {
        if (err) {
            return res.status(400).json({
                err: "Danh muc khong co san"
            })
        }
        res.json(category)
    })
}


export const categoryByid = (req, res, next, id) => {

    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: "Không Tìm Thấy Sản Phẩm Nào"
            })
        }
        req.category = category;
        next()
    })
}
export const read = (req, res) => {
    return res.json(req.category)
}


export const update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err || !category) {
            res.status(400).json({
                error: "Danh muc khong ton tai"
            })
        }
        res.json(data)
    })
}

export const remove = (req, res, id) => {
    const category = req.category;
    category.remove((err, deleteCate) => {
        if (err || !category) {
            res.status(400).json({
                error: "Danh muc khong ton tai"
            })
        }

        // Product.find({ category: id }).remove();
        res.json({
            deleteCate,
            message: "delete successfully"
        })


    })


}



