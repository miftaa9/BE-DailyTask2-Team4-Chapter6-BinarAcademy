const Op = require('sequelize').Op;
const { product } = require("../models/");

async function createProduct(req, res) {
  try {
    const {category, title, color, size, price, stock} = req.body;
    // if (!category || !title || !color || !size || !price || !stock) {
    //   throw new Error('All fields are required');
    // }
    const newProduct = await product.create({
      category,
      title,
      color,
      size,
      price,
      stock,
    });
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function getProduct(req, res) {
  try {
    const data = await product.findAll();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function searchProduct(req, res) {
  try {
    const { s } = req.query;
    const data = await product.findAll({
      where: {
        [Op.or]: [{ title: s }, { color: s }]
      }
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function editProduct(req, res) {
  try {
    const { price, stock } = req.body;
    const { id } = req.params;

    await product.update(
      {
        price,
        stock,
      },
      {
        where: { id },
      }
    );

    res.status(200).json({
      status: "success",
      message: `Success`,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await product.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      message: `Success`,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  createProduct,
  getProduct,
  searchProduct,
  editProduct,
  deleteProduct,
};