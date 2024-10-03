import Skill from "../models/skill.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const createSkill = async (req, res) => {
  try {
    const { name, yearsExperience, description, rating, projectUrl } = req.body;

    // Parse projectUrl if it's a string (coming from the client as JSON)
    let parsedProjectUrl = [];
    if (projectUrl) {
      parsedProjectUrl = JSON.parse(projectUrl); // Parse the string into an array of objects
    }

    const skillExists = await Skill.findOne({ name });
    if (skillExists) {
      return res.status(400).json({ message: 'Skill already exists.' });
    }

    let logoLocalPath = null;
    if (req.files && req.files.logo && req.files.logo.length > 0) {
      logoLocalPath = req.files.logo[0].path;
    }

    if (!logoLocalPath) {
      return res.status(400).send("Logo file is required");
    }

    const Newlogo = await uploadOnCloudinary(logoLocalPath);

    // Create a new skill instance
    const skill = new Skill({
      name,
      yearsExperience,
      description,
      rating,
      logo: Newlogo.url,
      projectUrl: parsedProjectUrl // Set parsed project URLs
    });

    // Save the skill to the database
    await skill.save();

    res.status(201).json({
      message: 'Skill created successfully!',
      skill
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};