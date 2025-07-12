import Aluno from '../models/aluno';
import Foto from '../models/foto';

const index = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC']], // ordem ASC crescente DESC decrescente
      include: {
        model: Foto,
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
    const alunos = await Aluno.create(req.body);
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
    const aluno = await Aluno.findByPk(req.params.id, {
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], // quais chaves show
      include: { // inclusos == outras models ligadas por ex fotos
        model: Foto, // model que quero ligar
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
    const aluno = await Aluno.findByPk(id);
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
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(400).json({ errors: 'Id inválido' });
    }
    await aluno.destroy();
    return res.json({ errors: ['Aluno deletado do BD'] });
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};

export default {
  index, show, update, store, Delete,
};
