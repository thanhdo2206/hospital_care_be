const authorize = (arrType) => {
  return (req, res, next) => {
    const { user } = req;
    const indexAuthorize = arrType.findIndex((item) => item === user.role);
    if (indexAuthorize > -1) next();
    else
      return res
        .status(403)
        .send(
          "You are logged in but you are not allowed to access this function"
        );
  };
};

module.exports = { authorize };
