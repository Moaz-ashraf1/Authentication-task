exports.sentitizeUser = function (user) {
  return {
    name: user.name,
    email: user.email,
  };
};
