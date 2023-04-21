const Repair = require('../models/reapir.model');
const catchAsync = require('../helpers/catchAsync');

exports.allRepair = catchAsync(
  async (req, res) => {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });

    res.status(200).json({
      message:
        'The query has been completed successfully.💕',
      results: repairs.length,
      repairs,
    });
  }
);

exports.repairById = catchAsync(
  async (req, res) => {
    const { repair } = req;

    res.status(200).json({
      status: 'success',
      message:
        'The query has been completed successfully.💕',
      repair,
    });
  }
);

exports.repairUpDate = catchAsync(
  async (req, res) => {
    const { repair } = req;

    await repair.update({
      status: 'completed',
    });

    res.status(200).json({
      message: 'The repair has been updated.🔥',
    });
  }
);

exports.createRepair = catchAsync(
  async (req, res) => {
    const { sessionUser } = req;
    const { date, description, motorsNumber } =
      req.body;

    const repair = await Repair.create({
      date,
      userId: sessionUser.id,
      description,
      motorsNumber,
    });

    res.status(201).json({
      status: 'success',
      message: 'The repair has been created!✨',
      repair,
    });
  }
);

exports.deleteRepair = catchAsync(
  async (req, res) => {
    const { repair } = req;

    await repair.update({
      status: 'cancelled',
    });

    res.json({
      message: 'The repair has been deleted🤔',
    });
  }
);
