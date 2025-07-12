"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _foto = require('../models/foto'); var _foto2 = _interopRequireDefault(_foto);
var _aluno = require('../models/aluno'); var _aluno2 = _interopRequireDefault(_aluno);

const store = async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const { aluno_id } = req.body;

    // verifica se user existe
    const aluno = await _aluno2.default.findByPk(aluno_id);
    if (!aluno) {
      return res.status(409).json({ errors: ['Nao foi encontrado um aluno com esse ID na base de dados'] });
    }

    // verifica se ele ja tem foto cadastrada
    const fotoAluno = await _foto2.default.findOne({ where: { aluno_id } });
    if (fotoAluno) {
      return res.status(404).json({ errors: ['Usuario ja tem Foto!'] });
    }

    // adiciona foto
    const foto = await _foto2.default.create({ aluno_id, originalname, filename });

    return res.json(foto);
  } catch (e) {
    return res.status(404).json({ errors: ['erro ao enviar a foto'] });
  }
};

const update = async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const { aluno_id } = req.body;

    // verifica se user existe
    const aluno = await _aluno2.default.findByPk(aluno_id);
    if (!aluno) {
      return res.status(404).json({ errors: ['Nao foi encontrado um aluno com esse ID na base de dados'] });
    }

    // verifica se ele ja tem foto cadastrada para mudar
    const fotoAluno = await _foto2.default.findOne({ where: { aluno_id } });
    if (!fotoAluno) {
      return res.status(404).json({ errors: ['Voce ainda nao tem foto, favor cadastrar uma foto'] });
    }

    // atualiza foto
    const foto = await fotoAluno.update({ aluno_id, originalname, filename });

    return res.json(foto);
  } catch (e) {
    return res.status(404).json({ errors: ['erro ao enviar a foto'] });
  }
};
const Delete = async (req, res) => {
  try {
    const { aluno_id } = req.body;

    // verifica se aluno existe
    const aluno = await _aluno2.default.findByPk(aluno_id);
    if (!aluno) {
      return res.status(404).json({ errors: ['Nao foi encontrado um aluno com esse ID na base de dados'] });
    }

    // verifica se ele ja tem foto cadastrada para mudar
    const fotoAluno = await _foto2.default.findOne({ where: { aluno_id } });
    if (!fotoAluno) {
      return res.status(404).json({ errors: ['Voce ainda nao tem foto, favor cadastrar uma foto'] });
    }

    // atualiza foto
    await fotoAluno.destroy();
    return res.json({ errors: ['Foto deletada! favor cadastrar outra'] });
  } catch (e) {
    return res.status(404).json({ errors: ['erro ao enviar a foto'] });
  }
};

exports. default = { store, update, Delete };
