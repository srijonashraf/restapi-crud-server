const moongose = require('mongoose');

const DataSchema = moongose.Schema({
        ProductName: {type: String, required: true},
        ProductCode: {type: String, unique: true, required: true},
        Img: {type: String},
        UnitPrice: {type: Number},
        Qty: {type: Number, default: 0},
        TotalPrice: {type: Number, required: true},
        CreatedDate: {type: Date, default: Date.now()}
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const ProductsModel = moongose.model('products', DataSchema); //Here products is database's collection name
module.exports = ProductsModel

