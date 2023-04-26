const Repair = require('../models/reapir.model');
const catchAsync = require('../helpers/catchAsync');

exports.validExistRepair = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'the repair not found',
      });
    }
    req.repair = repair;
    next();
  }
);

exports.validExistRepairById = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'status'],
          },
        },
      ],
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'the repair not found',
      });
    }
    req.repair = repair;
    next();
  }
);
