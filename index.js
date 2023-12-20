require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

Blog.sync();

app.use(express.json());

app.get('/api/blogs', async (req, res) => {
  const notes = await Blog.findAll();
  res.json(notes);
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    blog.destroy();
    return res.status(204).end();
  } else {
    return res.status(404).json({ error: 'Blog not found' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
