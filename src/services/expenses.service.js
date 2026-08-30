const expenseRepository = require('../repositories/expenses.repository');

async function createExpense(data) {
    validateExpense(data.body);
    return expenseRepository.create({
        value: data.body.value,
        created_by: data.user.id
    });
}

function validateExpense(data) {
  if (data.value === undefined || data.value === null || data.value < 0) {
    const error = new Error('Valor inválido .');
    error.status = 400;
    throw error;
  }
}

module.exports = {
    createExpense,
};