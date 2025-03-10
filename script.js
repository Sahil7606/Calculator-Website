const operators = ['+', '-', '*', '/', '^'];
const operatorPrecendence = {
    '+': 1, '-': 1,
    '*': 2, '/': 2,
    '^': 3
}

function evaluateExpression(expression)
{
    /*
    Takes a mathematical expression in postfix notation and computes the result
    
    This function evaluates postfix expressions using a stack-based approach:
    1. Scan each token in the postfix expression from left to right
    2. If the token is an operand (number), push it onto the stack
    3. If the token is an operator, pop the required number of operands from the stack,
       apply the operator, and push the result back onto the stack
    4. When all tokens are processed, the result will be the only value on the stack
    
    Args:
        expression (lst): A mathematical expression in postfix notation
        
    Returns:
        (number): The computed result of the expression
        
    Examples:
        evaluateExpression(['3', '4', '+']) -> 7
        evaluateExpression(['3', '4', '2', '*', '+']) -> 11
        evaluateExpression(['5', '3', '2', '+', '*']) -> 25
        evaluateExpression(['2', '3', '^', '1', '+']) -> 9
    */

    let evalStack = [];
    for (let i = 0; i < expression.length; i++)
    {
        if (!isNaN(expression[i]))
        {
            evalStack.push(Number(expression[i]));
        }
        else if (isOperator(expression[i]))
        {
            let num1 = evalStack.pop();
            let num2 = evalStack.pop();

            switch(expression[i])
            {
                case '+': evalStack.push(num2 + num1); break;
                case '-': evalStack.push(num2 - num1); break;
                case '*': evalStack.push(num2 * num1); break;
                case '/': evalStack.push(num2 / num1); break;
                case '^': evalStack.push(num2 ** num1); break;
            }
        }
    }

    return evalStack[0];
}

function toPostfix(expression)
{   /*
    Converts expression to postfix notation using the Shunting Yard Algorithm
    
    The Shunting Yard Algorithm uses two main data structures:
    - An output queue for the result
    - An operator stack to manage operators based on precedence
    
    Args:
        expression (lst): A mathematical expression represented by a list

    Returns:
        (lst): The expression converted to postfix notation
        
    Examples:
        toPostfix(['3', '+', '4']) -> ['3', '4', '+']
        toPostfix(['3', '+', '4', '*', '2']) -> ['3', '4', '2', '*', '+']
        toPostfix(['(', '3', '+', '4', ')', '*', '2']) -> ['3', '4', '+', '2', '*']
        toPostfix(['5', '*', '(', '3', '+', '2', ')']) -> ['5', '3', '2', '+', '*']
        toPostfix(['1', '+', '2', '-', '3']) -> ['1', '2', '+', '3', '-']
    */
    
    let operationStack = [];
    let outputQueue = [];

    while (expression.length > 0)
    {
        let token = expression.shift(); // Read token from expression

        if (!isNaN(token)) // If token is a number add to the output queue
        {
            // Numbers go directly to the output queue in postfix notation
            outputQueue.push(token);
        }   
        else if (token == '(')
        {
            // Opening parentheses are pushed to the stack to establish a new scope
            operationStack.push(token);
        }
        else if (token == ')')
        {
            // When closing parenthesis is found, pop operators until the matching opening parenthesis
            // This implements the grouping defined by the parentheses
            currentOperator = operationStack.pop()
            while (currentOperator != '(')
            {
                outputQueue.push(currentOperator);
                currentOperator = operationStack.pop();
            }
            // Note: The opening parenthesis is discarded and not added to the output
        }
        else if (isOperator(token))
        {
            // For operators, we need to handle precedence correctly
            // Higher precedence operators are evaluated first in postfix notation
            if (operationStack.length > 0)
            {
                let currentOperator = operationStack[operationStack.length - 1];
                // While there's an operator at the top of the stack with higher or equal precedence,
                // pop it to the output queue before pushing the current operator
                while (operationStack.length > 0 && operatorPrecendence[currentOperator] >= operatorPrecendence[token])
                {
                    outputQueue.push(operationStack.pop());
                    // Update current operator after popping
                    if (operationStack.length > 0) 
                    {
                        currentOperator = operationStack[operationStack.length - 1];
                    }
                    else
                    {
                        break;
                    }
                }
            }

            operationStack.push(token);
        }
    }

    // After processing all tokens, pop any remaining operators from the stack to the output queue
    while (operationStack.length > 0)
    {
        outputQueue.push(operationStack.pop());
    }

    return outputQueue;
}

function tokenizeExpression(expression)
{   
    /*
    Converts string expression into list

    Args:
        expression (str): A string representing a mathematical expression

    Returns:
        (lst): The string expression converted to a list
    
    Examples:
        tokenizeExpression("3 + 4") -> ["3", "+", "4"]
        tokenizeExpression("5 * (3 + 2)") -> ["5", "*", "(", "3", "+", "2", ")"]
        tokenizeExpression("1+2-3") -> ["1", "+", "2", "-", "3"]
    */

    // TODO: Checks for invalid characters in expression

    // Ensure spaces around operators and parentheses for easier splitting
    expression = expression.replace(/([+\-*^\/()])/g, ' $1 ');
    
    // Split by spaces and filter out empty strings
    let tokens = expression.split(' ').filter(token => token.trim() !== '');
    
    return tokens;
}

function isOperator(char)
{
    /*
    Checks if a character is a mathematical operator

    Args:
        char (str): The character to check

    Returns:
        (boolean): True if the character is an operator (+, -, *, /), False otherwise
    
    Examples:
        isOperator('+') -> true
        isOperator('5') -> false
    */
    
    return operators.includes(char);
}
