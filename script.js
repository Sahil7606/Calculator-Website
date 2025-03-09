// Takes a mathematical expression in string form and returns the result
// - parseExpression('5 * 5') -> 25
function parseExpression(expression)
{
    expression = expression.split(' ')
    for (let i = 0; i < expression.length; i++)
    {
        // Checks if it is a letter
        if (expression[i].toLowerCase() !== expression[i].toUpperCase())
        {
            return "Error - expression contains letter"
        }
    }

    switch (expression[1])
    {
        case '+': return expression[0] + expression[2]; break;
        case '-': return expression[0] - expression[2]; break;
        case '*': return expression[0] * expression[2]; break;
        case '/': return expression[0] / expression[2]; break;
    }
}


console.log(parseExpression('5 * 5'))