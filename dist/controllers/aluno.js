"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _aluno = require('../models/aluno'); var _aluno2 = _interopRequireDefault(_aluno);
var _foto = require('../models/foto'); var _foto2 = _interopRequireDefault(_foto);

const index = async (req, res) => {
  try {
    const alunos = await _aluno2.default.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC']],
      include: {
        model: _foto2.default,
        attributes: ['filename', 'url'],
      },
    });

    return res.json(alunos);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

const store = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ errors: ['Please correct the provided information'] });
  }
  if (!req.userId) {
    return res.status(400).json({ errors: ['User ID is missing'] });
  }

  try {
    const aluno = await _aluno2.default.create({ ...req.body, user_id: req.userId });
    return res.json(aluno);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

const show = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ errors: ['Invalid student ID'] });
  }

  try {
    const aluno = await _aluno2.default.findByPk(req.params.id, {
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura', 'user_id'],
      include: {
        model: _foto2.default,
        attributes: ['filename', 'url'],
      },
    });

    if (!aluno) {
      return res.status(400).json({ errors: ['Student not found in the database'] });
    }
    if (aluno.user_id !== req.userId) {
      return res.status(403).json({ errors: ['Access denied'] });
    }

    return res.json(aluno);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ errors: ['Please correct the provided information'] });
  }

  try {
    const aluno = await _aluno2.default.findByPk(id);
    if (!aluno) {
      return res.status(400).json({ errors: ['Student not found in the database'] });
    }
    if (aluno.user_id !== req.userId) {
      return res.status(400).json({ errors: ['You dont have this student'] });
    }

    const updatedAluno = await aluno.update(req.body);
    return res.json(updatedAluno);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ errors: ['Invalid student ID'] });
  }

  try {
    const aluno = await _aluno2.default.findByPk(id);
    if (!aluno) {
      return res.status(400).json({ errors: ['Invalid student ID'] });
    }
    if (aluno.user_id !== req.userId) {
      return res.status(400).json({ errors: ['You dont have this student'] });
    }

    await aluno.destroy();
    return res.json({ message: 'Student deleted successfully' });
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

exports. default = {
  index,
  show,
  update,
  store,
  Delete,
};
