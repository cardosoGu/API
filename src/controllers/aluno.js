import Aluno from '../models/aluno';
import Foto from '../models/foto';

const index = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['filename', 'url'],
      },
    });

    if (alunos.length === 0) {
      return res.status(404).json({ errors: ['No students registered in the database'] });
    }

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

  try {
    const aluno = await Aluno.create(req.body);
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
    const aluno = await Aluno.findByPk(req.params.id, {
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      include: {
        model: Foto,
        attributes: ['filename', 'url'],
      },
    });

    if (!aluno) {
      return res.status(400).json({ errors: ['Student not found in the database'] });
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
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(400).json({ errors: ['Student not found in the database'] });
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
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(400).json({ errors: ['Invalid student ID'] });
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

export default {
  index,
  show,
  update,
  store,
  Delete,
};
