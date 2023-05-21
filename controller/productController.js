const { products } = require("../models/");

async function createProduct(req, res) {
  try {
    const {category, title, price, stock} = req.body;
    if (!category || !title || !price || !stock) {
      throw new Error('Missing required fields');
    }
    const newProduct = await products.create({
      category,
      title,
      price,
      stock,
    });
    res.status(201).json({
      status: "success",
      data: {
        products: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function getProducts(req, res) {
  try {
    const data = await products.findAll();

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
    const { name } = req.query;
    const data = await products.findAll({
      where: {
        name: {
          [Op.endsWith]: name,
        },
      },
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

    await products.update(
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
      message: `data dari id ${id} nya berhasil berubah`,
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
    await products.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      message: `data ${id} ini berhasil di hapus`,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  createProduct,
  getProducts,
  searchProduct,
  editProduct,
  deleteProduct,
};