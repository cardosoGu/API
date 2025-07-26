"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _foto = require('../models/foto'); var _foto2 = _interopRequireDefault(_foto);
var _aluno = require('../models/aluno'); var _aluno2 = _interopRequireDefault(_aluno);

const store = async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const { aluno_id } = req.body;

    // Check if student exists
    const aluno = await _aluno2.default.findByPk(aluno_id);
    if (!aluno) {
      return res.status(404).json({ errors: ['No student found with this ID in the database'] });
    }

    // Check if student already has a photo
    const fotoAluno = await _foto2.default.findOne({ where: { aluno_id } });
    if (fotoAluno) {
      return res.status(409).json({ errors: ['Student already has a photo'] });
    }

    // Add photo
    const foto = await _foto2.default.create({ aluno_id, originalname, filename });
    return res.json(foto);
  } catch (e) {
    return res.status(400).json({ errors: [e.message || 'Error uploading the photo'] });
  }
};

const update = async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const { aluno_id } = req.body;

    // Check if student exists
    const aluno = await _aluno2.default.findByPk(aluno_id);
    if (!aluno) {
      return res.status(404).json({ errors: ['No student found with this ID in the database'] });
    }

    // Check if student has a photo to update
    const fotoAluno = await _foto2.default.findOne({ where: { aluno_id } });
    if (!fotoAluno) {
      const foto = await _foto2.default.create({ aluno_id, originalname, filename });
      return res.json(foto);
    }

    // Update photo
    const foto = await fotoAluno.update({ aluno_id, originalname, filename });
    return res.json(foto);
  } catch (e) {
    return res.status(400).json({ errors: [e.message || 'Error updating the photo'] });
  }
};

const Delete = async (req, res) => {
  try {
    const { aluno_id } = req.body;

    // Check if student exists
    const aluno = await _aluno2.default.findByPk(aluno_id);
    if (!aluno) {
      return res.status(404).json({ errors: ['No student found with this ID in the database'] });
    }

    // Check if student has a photo to delete
    const fotoAluno = await _foto2.default.findOne({ where: { aluno_id } });
    if (!fotoAluno) {
      return res.status(404).json({ errors: ['Student does not have a photo to delete'] });
    }

    // Delete photo
    await fotoAluno.destroy();
    return res.json({ message: 'Photo deleted successfully' });
  } catch (e) {
    return res.status(400).json({ errors: [e.message || 'Error deleting the photo'] });
  }
};

exports. default = { store, update, Delete };
