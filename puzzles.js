
// 퍼즐 1: 1~8의 숫자 조합으로 주어진 숫자의 합을 만드는 함수
function solvePuzzle1() {
    let target = parseInt(document.getElementById("puzzle-input").value);
    let result = findSumCombinations(target, [1, 2, 3, 4, 5, 6, 7, 8]);
    displayResult(result);
}

// 퍼즐 2: 1~8의 숫자 조합으로 주어진 숫자의 곱을 만드는 함수
function solvePuzzle2() {
    let target = parseInt(document.getElementById("puzzle-input").value);
    let result = findProductCombinations(target, [1, 2, 3, 4, 5, 6, 7, 8]);
    displayResult(result);
}

// 퍼즐 3: 두 블록으로 나누어 곱이 타겟 숫자가 되는 블록을 찾는 함수
function solvePuzzle3() {
    let target = parseInt(document.getElementById("puzzle-input").value);
    let result = findTwoBlockProduct(target, [1, 2, 3, 4, 5, 6, 7, 8]);
    displayResult(result);
}

// 퍼즐 1 계산 로직 (재귀적 조합 탐색)
function findSumCombinations(target, numbers, current = [], index = 0) {
    if (target === 0) return [current];
    if (target < 0 || index >= numbers.length) return [];

    // 현재 숫자를 선택하지 않은 경우와 선택한 경우 모두 탐색
    let withoutCurrent = findSumCombinations(target, numbers, current, index + 1);
    let withCurrent = findSumCombinations(target - numbers[index], numbers, [...current, numbers[index]], index + 1);

    return [...withoutCurrent, ...withCurrent];
}

// 퍼즐 2 계산 로직 (재귀적 조합 탐색)
function findProductCombinations(target, numbers, current = [], index = 0) {
    if (target === 1 && current.length > 0) return [current];
    if (target < 1 || index >= numbers.length) return [];

    let withoutCurrent = findProductCombinations(target, numbers, current, index + 1);
    let withCurrent = (target % numbers[index] === 0)
        ? findProductCombinations(target / numbers[index], numbers, [...current, numbers[index]], index + 1)
        : [];

    return [...withoutCurrent, ...withCurrent];
}

// 퍼즐 3 계산 로직 (두 블럭 조합 탐색)
function findTwoBlockProduct(target, numbers) {
    let combinations = findSumCombinations(target, numbers);
    for (let combo1 of combinations) {
        let remaining = numbers.filter(n => !combo1.includes(n));
        let combo2s = findSumCombinations(target / combo1.reduce((a, b) => a * b), remaining);
        for (let combo2 of combo2s) {
            return [combo1, combo2];
        }
    }
    return "해결할 수 없음";
}

// 결과 표시 함수
function displayResult(result) {
    document.getElementById("result").innerText = JSON.stringify(result);
}
