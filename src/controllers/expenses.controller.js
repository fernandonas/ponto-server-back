const expensesService = require('../services/expenses.service');

async function create(req, res, next) {
    try {
        const expense = await expensesService.createExpense(req);
        return res.status(201).json(expense);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    create,
};