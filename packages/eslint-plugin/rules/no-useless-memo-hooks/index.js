const isOriginalMemoHook = name => name === 'useCallback' || name === 'useMemo';

const isArrayExpression = node => node.type === 'ArrayExpression';

const isHookCallExpressionArgs = node => node.arguments.length === 2 && isArrayExpression(node.arguments[1]);

const hasMoreDepNode = depNode => depNode.elements.length !== 1;

const findOnlyStatement = node => {
    switch (node.body.type) {
        case 'CallExpression':
        case 'Identifier':
            return node.body;
        case 'BlockStatement': {
            const blockBody = node.body.body;
            if (blockBody.length !== 1) {
                return;
            }
            const onlyStatement = blockBody[0];
            if (onlyStatement.type === 'ReturnStatement') {
                return onlyStatement.argument;
            }
            if (onlyStatement.type === 'ExpressionStatement') {
                return onlyStatement.expression;
            }
        }
    }
};

const isCallExpression = node => node.type === 'CallExpression';
const isIdentifier = node => node.type === 'Identifier';

const isOnlyReturnMemoizedWithHookDeps = (expressionNode, depNode) => {
    switch (expressionNode.type) {
        case 'ArrowFunctionExpression':
        case 'FunctionExpression': {
            const node = findOnlyStatement(expressionNode);
            const firstDepNode = depNode.elements[0];
            if (
                node && firstDepNode
                && (
                    /* The expression contains only its own dependencies without arguments */
                    (isCallExpression(node) && node.callee.name === firstDepNode.name && node.arguments.length === 0)
                    /* The memoized value return without any change */
                    || (isIdentifier(node) && node.name === firstDepNode.name)
                )
            ) {
                return true;
            }
        }
    }
    return false;
};

const ruleCallback = context => node => {
    if (!isOriginalMemoHook(node.callee.name)) {
        return;
    }
    if (hasMoreDepNode(node.arguments[1])) {
        return;
    }
    if (
        isHookCallExpressionArgs(node)
        && isOnlyReturnMemoizedWithHookDeps(node.arguments[0], node.arguments[1])
    ) {
        context.report({
            node,
            loc: node.loc,
            messageId: 'noUselessMemoHooks',
            data: {
                name: node.callee.name,
            },
        });
    }
};

module.exports = {
    meta: {
        type: 'suggestion',
        fixable: 'whitespace',
        docs: {
            description: 'Call to useCallback is useless',
            category: 'reskript',
            recommended: true,
        },
        messages: {
            noUselessMemoHooks: 'Hook {{name}}\'s should be removed',
        },
    },
    create(context) {
        const ruleMethod = ruleCallback(context);
        return {
            'VariableDeclaration VariableDeclarator CallExpression': ruleMethod,
        };
    },
};
