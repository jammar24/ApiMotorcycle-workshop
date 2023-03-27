const User = require('../models/users.model');

exports.findAll = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  res.status(200).json({
    message:
      'The query has been done successs ✌️',
    results: users.length,
    users,
  });
};

exports.userById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message:
        'the user not found in the sistem 😉',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'The query has been done success ✌️',
    user,
  });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } =
    req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'succes',
    message: 'The user you created is correct 👌',
    user,
  });
};

exports.upDateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  const { name, email } = req.body;

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message:
        'The user not found in the sistem 🥲',
    });
  }

  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'success',
    message: 'The user update is correct 😊',
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message:
        'the user not found in the sistem 🥲',
    });
  }

  await user.update({
    status: 'disabled',
  });

  res.status(200).json({
    message: 'The user has been deleted💕',
  });
};
