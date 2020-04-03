class Budget {
    constructor(form, budgetP, incomeP, expensesP) {
        this.form = form
        this.budgetDOM = budgetP
        this.incomeDOM = incomeP
        this.expenseDOM = expensesP
        this.totalIncome = 0
        this.totalExpenses = 0
        this.budget = 0
        this.income = []
        this.expenses = []

        this.form.addEventListener('submit', this.onSubmit);
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.option = e.target.optionValue.value;
        if (this.option === '+') {
            this.income.push({
                description: e.target.description.value,
                amount: parseFloat(e.target.amount.value),
            })
            this.addToBudget();
        } else {
            this.expenses.push({
                description: e.target.description.value,
                amount: parseFloat(e.target.amount.value),
            });
            this.addToExpense()

        }
        e.target.reset();
    };
    addToBudget = () => {
        this.totalIncome = this.income.reduce((acc, curr) => {
            return acc = acc + curr.amount;
        }, 0);
        this.calcBudget();

    };
    addToExpense = () => {
        this.totalExpenses = this.expenses.reduce((acc, curr) => {
            return acc = acc + curr.amount;
        }, 0);
        console.log(this.totalExpenses)
        this.calcBudget();

    };
    calcBudget = () => {
    
        this.budget = this.totalIncome - this.totalExpenses;
        this.render();
    };
    render = () => {
        this.incomeDOM.textContent = this.totalIncome;
        this.expenseDOM.textContent = this.totalExpenses
        this.budgetDOM.textContent = this.budget;

    };
};

const form = document.querySelector('form');
const budgetP = document.querySelector('.budget-amount');
const incomeP = document.querySelector('.income');
const expensesP = document.querySelector('.expenses');

const userBudget = new Budget(form, budgetP, incomeP, expensesP);