import React from 'react';

const BudgetTracker = ({ totalCost, budgetLimit }) => {
    const percentage = Math.min((totalCost / budgetLimit) * 100, 100);
    const isOverBudget = totalCost > budgetLimit;

    return (
        <div className="budget-tracker">
            <div className="budget-info">
                <div className="b-label">Total Trip Cost</div>
                <div className={`b-amount ${isOverBudget ? 'over-budget' : ''}`}>
                    ${totalCost.toLocaleString()} <span>/ ${budgetLimit.toLocaleString()}</span>
                </div>
            </div>
            
            <div className="budget-bar-container">
                <div 
                    className={`budget-fill ${isOverBudget ? 'danger' : percentage > 80 ? 'warning' : 'safe'}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {isOverBudget && (
                <div className="b-alert">
                    Warning: You've exceeded your trip budget by ${(totalCost - budgetLimit).toLocaleString()}!
                </div>
            )}
            {!isOverBudget && percentage > 0 && (
                <div className="b-safe">
                    You have ${(budgetLimit - totalCost).toLocaleString()} remaining in your budget.
                </div>
            )}
        </div>
    );
};

export default BudgetTracker;
