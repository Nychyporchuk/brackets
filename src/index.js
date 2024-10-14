module.exports = function check(str, bracketsConfig) {
    const stack = [];
    const bracketsMap = new Map(bracketsConfig);
    const openBrackets = new Set(bracketsMap.keys());
    const closeBrackets = new Set(bracketsMap.values());

    const sameBrackets = {};
    bracketsConfig.forEach(([open, close]) => {
        if (open === close) sameBrackets[open] = 0;
    });

    for (let char of str) {

        if (openBrackets.has(char)) {

            if (char in sameBrackets) {

                if (sameBrackets[char] % 2 === 0) {
                    stack.push(char);
                } else {

                    if (stack.pop() !== char) return false;
                }
                sameBrackets[char]++;
            } else {

                stack.push(char);
            }
        } else if (closeBrackets.has(char)) {

            const lastOpen = stack.pop();
            if (bracketsMap.get(lastOpen) !== char) return false;
        }
    }


    return stack.length === 0;
}
