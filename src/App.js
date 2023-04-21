import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    date: '',
    category: ''
  });

  const [editExpense, setEditExpense] = useState({
    name: '',
    amount: '',
    date: '',
    category: '',
    index: -1
  });

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    console.log(storedExpenses); // add this line
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!newExpense.name || !newExpense.amount || !newExpense.date || !newExpense.category) {
      setShowError(true);
      return;
    }

    setExpenses([...expenses, {...newExpense}])
    setNewExpense({ name: '', amount: '', date: '', category: '' });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditExpense({ ...editExpense, [name]: value });
  };

  const handleEditExpense = (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!editExpense.name || !editExpense.amount || !editExpense.date || !editExpense.category) {
      setShowError(true);
      return;
    }

    const updatedExpenses = [...expenses];
    updatedExpenses[editExpense.index] = {...editExpense}

    setExpenses(updatedExpenses);
    setEditExpense({ name: '', amount: '', date: '', category: '', index: -1 });
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleEditClick = (index) => {
    const expenseToEdit = expenses[index];
    setEditExpense({
      name: expenseToEdit.name,
      amount: expenseToEdit.amount,
      date: expenseToEdit.date,
      category: expenseToEdit.category,
      index
    });
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <form className="new-expense-form" onSubmit={editExpense.index !== -1 ? handleEditExpense : handleAddExpense}>
          <h2>{editExpense.index !== -1 ? 'Edit Expense' : 'Add New Expense'}</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={editExpense.index !== -1 ? editExpense.name : newExpense.name} onChange={editExpense.index !== -1 ? handleEditInputChange : handleInputChange} />
          </div>
          {showError && !editExpense.name && !newExpense.name && <div className="error-message">Please enter a name</div>}

<div className="form-group">
  <label htmlFor="amount">Amount:</label>
  <input type="number" id="amount" name="amount" value={editExpense.index !== -1 ? editExpense.amount : newExpense.amount} onChange={editExpense.index !== -1 ? handleEditInputChange : handleInputChange} />
</div>
{showError && !newExpense.amount && <div className="error-message">Please enter an amount</div>}

<div className="form-group">
  <label htmlFor="date">Date:</label>
  <input type="date" id="date" name="date" value={newExpense.date} onChange={handleInputChange} />
</div>
{showError && !newExpense.date && <div className="error-message">Please enter a date</div>}

<div className="form-group">
  <label htmlFor="category">Category:</label>
  <input type="text" id="category" name="category" value={newExpense.category} onChange={handleInputChange} />
</div>
{showError && !newExpense.category && <div className="error-message">Please enter a category</div>}
          <button type="submit">Add Expense</button>
        </form>
        <div className="expense-list">
          <h2>All Expenses</h2>
          <ul>
  {expenses.length > 0 ? (
    expenses.map((expense, index) => (
      <li key={index}>
        <strong>{expense.name}</strong> - ₹{expense.amount} - {expense.date} - {expense.category}
        <button onClick={() => handleEditClick(index)}>Edit</button>
        <button onClick={() => handleDeleteExpense(index)}>Delete</button>
      </li>
    ))
  ) : (
    <li>No expenses yet</li>
  )}
</ul>

        </div>
      </main>
    </div>
  );
}

export default App;
