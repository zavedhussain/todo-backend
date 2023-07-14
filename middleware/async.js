const asyncWrapper = (callback) => {
  return async (req, res, next) => {
    //req,res,next avaliable in async wrapper as it is in middleware
    try {
      await callback(req, res, next);
      //provide parameters req,res,next to be used in controller
    } catch (error) {
      //   console.log(error);
      next(error);
      //   res.status(500).json({ msg: error });
    }
  };
};

module.exports = asyncWrapper;
