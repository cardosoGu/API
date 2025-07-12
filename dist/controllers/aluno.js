"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _aluno = require('../models/aluno'); var _aluno2 = _interopRequireDefault(_aluno);
var _foto = require('../models/foto'); var _foto2 = _interopRequireDefault(_foto);

const index = async (req, res) => {
  try {
    const alunos = await _aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC']], // ordem ASC crescente DESC decrescente
      include: {
        model: _foto2.default,
        attributes: ['filename', 'url'],
      },
    });
    if (alunos.length === 0) {
      return res.status(404).json({ errors: 'nunhum aluno registrado na base de dados' });
    }

    return res.json(alunos);
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};
const store = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ errors: 'Por favor, corrigir informações' });
  }

  try {
    const alunos = await _aluno2.default.create(req.body);
    return res.json(alunos);
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};

const show = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ errors: 'Id de aluno invalido' });
  }

  try {
    const aluno = await _aluno2.default.findByPk(req.params.id, {
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], // quais chaves show
      include: { // inclusos == outras models ligadas por ex fotos
        model: _foto2.default, // model que quero ligar
        attributes: ['filename'], // quais chave show
      },
    });
    if (!aluno) {
      return res.status(400).json({ errors: 'Aluno nao encontrado na base de dados' });
    }

    const {
      id, nome, sobrenome, email, idade, peso, altura,
    } = aluno;

    return res.json({
      id, nome, sobrenome, email, idade, peso, altura,
    });
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ errors: ['Por favor, corrigir informações'] });
  }
  try {
    const aluno = await _aluno2.default.findByPk(id);
    if (!aluno) {
      return res.status(400).json({ errors: ['Aluno nao encontrado na base de dados'] });
    }

    const alunoAtualizado = await aluno.update(req.body);
    return res.json(alunoAtualizado);
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ errors: 'Id inválido' });
  }
  try {
    const aluno = await _aluno2.default.findByPk(id);
    if (!aluno) {
      return res.status(400).json({ errors: 'Id inválido' });
    }
    await aluno.destroy();
    return res.json({ errors: ['Aluno deletado do BD'] });
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};

exports. default = {
  index, show, update, store, Delete,
};
