const { Box } = require("../models/box");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const {_id: owner} = req.user;
  // const {page = 1, limit = 10} = req.query;
  const result = await Box.find({owner}, "-createdAt -updatedAt").populate("owner", "name email");
  res.json(result);
};

const getById = async (req, res) => {
  const box = await Box.findById(req.params.id);
  if (!box) throw HttpError(404, "Not found");
  res.json(box);
};

const add = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Box.create({...req.body, owner});
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    throw HttpError(400, "missing fields");
  const box = await Box.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!box) throw HttpError(404, "Not found");
  res.json(box);
};

const updateStatusBox = async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    throw HttpError(400, "missing field favorite");
    const box = await Box.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!box) throw HttpError(404, "Not found");
  res.json(box);
};

const deleteById = async (req, res, next) => {
  const box = await Box.findByIdAndRemove(req.params.id);
  if (!box) throw HttpError(404, "Not found");
  res.json({ message: "box deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusBox: ctrlWrapper(updateStatusBox),
  deleteById: ctrlWrapper(deleteById),
};