class Budget {
    constructor(formDOM, budgetDOM, incomeDOM, expenseDOM, incomeTabDOM, expenseTabDOM) {
        this.formDOM = formDOM
        this.budgetDOM = budgetDOM
        this.incomeDOM = incomeDOM
        this.expenseDOM = expenseDOM
        this.incomeTabDOM = incomeTabDOM
        this.expenseTabDOM = expenseTabDOM
        this.totalIncome = 0
        this.totalExpenses = 0
        this.budget = 0
        this.income = []
        this.expenses = []

        this.formDOM.addEventListener('submit', this.onSubmit);
    }
    onSubmit = (e) => {
        e.preventDefault();
        let description = e.target.description.value;
        let amount = parseInt(e.target.amount.value);

        this.option = e.target.optionValue.value

        if (this.option === '+') {
            this.income.push({
                description,
                amount,
            })
            this.addToBudget();
        } else {
            this.expenses.push({
                description,
                amount,
            });
            this.addToExpense()
        }
        
        e.target.description.value = '';
        e.target.amount.value = '';


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
        this.calcBudget();

    };
    calcBudget = () => {
    
        this.budget = this.totalIncome - this.totalExpenses;
        this.renderBudget();
    };
    renderBudget = () => {
        this.incomeDOM.textContent = this.totalIncome;
        this.expenseDOM.textContent = this.totalExpenses
        this.budgetDOM.textContent = this.budget;

        this.income.map((income) => {
            const div = document.createElement('div');
            const para = document.createElement('p');

            para.textContent = income.description;
            this.incomeTabDOM.appendChild(para);

            const para2 = document.createElement('p');
            para2.textContent = income.amount;
            div.appendChild(para);
            div.appendChild(para2)
            this.incomeTabDOM.appendChild(div);
        })




    };
};


const formDOM = document.querySelector('.form');
const budgetDOM = document.querySelector('.budget-amount');
const incomeDOM = document.querySelector('.income');
const expenseDOM = document.querySelector('.expenses');
const incomeList = document.querySelector('.income-list');
const expenseList = document.querySelector('.expense-list');

const userBudget = new Budget(formDOM, budgetDOM, incomeDOM, expenseDOM, incomeList, expenseList);