async function roll(req, res) {
  return res.json({
    value: Math.floor(Math.random() * 6) + 1,
    user: req.user,
  });
}

module.exports = {
  roll,
};
