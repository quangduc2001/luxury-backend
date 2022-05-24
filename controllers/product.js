import Product from '../models/product'
import _ from 'lodash';
export const create = (req, res) => {
    const product = new Product(req.body)
    product.save((err, product) => {
        if (err) {
            return res.status(400).json({
                err: "khong them dc"
            })
        }
        res.json(product)
    })
}
export const list = (req, res) => {
    Product.find()
        .populate('category', '_id name')
        .exec((err, product) => {
            if (err) {
                res.status(400).json({
                    err: "khong co san pham nao"
                })
            }
            res.json(product);
        })
}
export const productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category', '_id name')
        .exec((err, product) => {
            if (err || !product) {
                res.status(400).json({
                    err: "khong tim thay id sp"
                })
            }
            req.product = product
            next()
        })
}
export const read = (req, res) => {
    return res.json(req.product)
}
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Không xoá được sản phẩm!"
            });
        }
        res.json({
            deletedProduct,
            message: "Xoá sản phẩm thành công"
        })
    })
}
export const update = (req, res) => {
    let product = req.product;
    console.log(product);
    product = _.assignIn(product, req.body);
    product.save((err, product) => {
        if (err) {
            res.status(400).json({
                err: "khong tim thay id update"
            })
        }
        res.json(product)
    })
}

export const listLimit = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 3;
    Product.find()
        // .select("-image")
        .populate('category', '_id name')
        // .sort([[order, sortBy]])
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: " not found"
                })
            }
            res.json(data)
        })
}
export const limitHome = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 8;
    Product.find()
        // .select("-image")
        .populate('category', '_id name')
        // .sort([[order, sortBy]])
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: " not found"
                })
            }
            res.json(data)
        })
}

