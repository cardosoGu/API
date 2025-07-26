import Foto from '../models/foto';
import Aluno from '../models/aluno';

const store = async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const { aluno_id } = req.body;

    // Check if student exists
    const aluno = await Aluno.findByPk(aluno_id);
    if (!aluno) {
      return res.status(404).json({ errors: ['No student found with this ID in the database'] });
    }

    // Check if student already has a photo
    const fotoAluno = await Foto.findOne({ where: { aluno_id } });
    if (fotoAluno) {
      return res.status(409).json({ errors: ['Student already has a photo'] });
    }

    // Add photo
    const foto = await Foto.create({ aluno_id, originalname, filename });
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
    const aluno = await Aluno.findByPk(aluno_id);
    if (!aluno) {
      return res.status(404).json({ errors: ['No student found with this ID in the database'] });
    }

    // Check if student has a photo to update
    const fotoAluno = await Foto.findOne({ where: { aluno_id } });
    if (!fotoAluno) {
      const foto = await Foto.create({ aluno_id, originalname, filename });
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
    const aluno = await Aluno.findByPk(aluno_id);
    if (!aluno) {
      return res.status(404).json({ errors: ['No student found with this ID in the database'] });
    }

    // Check if student has a photo to delete
    const fotoAluno = await Foto.findOne({ where: { aluno_id } });
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

export default { store, update, Delete };
