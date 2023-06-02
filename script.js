const output = document.querySelector('.main__output-text')

let a = '';
let b = '';
let operator = '';
let finish = false;

const numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
const operators = ['+','-','*','/','AC'];

function clearAll() {
    a = '';
    b = '';
    operator = '';
    finish = false;
    output.textContent = '0'
}

document.querySelector('.main__btns-all').addEventListener('click' , e => {
    if(!e.target.classList.contains('main__btn-number') && !e.target.classList.contains('main__btn-operator')) return
    if(e.target.classList.contains('btn-ac')) {
        clearAll()
        return;
    }

    output.textContent = '';

    const key = e.target.textContent;
    //нажата цифра 0 - 9
    if(numbers.includes(key)) {
        if(b === '' && operator === '') {
            // исключение повторного нажатие точки
            if(key === '.') {
                if(a.includes('.')) {
                    a = a + ''
                } else {
                    a += key;
                }
            }
            if(key !== '.') a += key;
            console.log(`a: ${a},b; ${b},operator: ${operator}`)
            output.textContent = a;
        }
        else if(a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            output.textContent = b;
        }
        else {
            // исключение повторного нажатие точки
            if(key === '.') {
                if(b.includes('.')) {
                    b = b + ''
                } else {
                    b += key;
                }
            }
            if(key !== '.') b += key;
            output.textContent = b;
            console.log(a,b,operator)
        }
        return;
    }
    
    if(operators.includes(key)) {
        operator = key;
        console.log(a,b,operator)
        output.textContent = operator;
        return;
    }

    // нажата =
    if(key === '=') {
        if(b === '') b = a;
        switch(operator) {
            case '+': 
                a = (+a) + (+b)
                break;
            case '-':
                a = a - b;
                break;
            case '*':
                a = a * b;
                break;
            case '/':
                if(b === '0'){
                    output.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    operator = '';
                    console.log(`a:${a},b:${b},op: ${operator}`)
                    return;
                }
                a = a / b;
                console.log(a)
                break;
        }
        finish = true;
        output.textContent = a.toFixed(4);
    }
})
