import Project from '../../models/Project.js';

export async function createProject(req, res) {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        ok: false,
        message: 'El título es obligatorio',
      });
    }

    const project = await Project.create({
      title,
      description,
      owner: req.user.id,
    });

    res.status(201).json({
      ok: true,
      message: 'Proyecto creado',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al crear proyecto',
    });
  }
}

export async function getMyProjects(req, res) {
  try {
    const projects = await Project.find({ owner: req.user.id });

    res.json({
      ok: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al obtener proyectos',
    });
  }
}
