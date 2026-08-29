function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === '23505') {
    return res.status(409).json({ message: 'Email ja cadastrado.' });
  }

  if (error.code === 'ECONNREFUSED') {
    return res.status(503).json({
      message: 'Nao foi possivel conectar ao banco de dados. Verifique se o PostgreSQL esta rodando.',
    });
  }

  return res.status(error.status || 500).json({
    message: error.message || 'Erro interno do servidor.',
  });
}

module.exports = errorHandler;
