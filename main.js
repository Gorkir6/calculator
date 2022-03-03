class Calculator{
    constructor(prev, current){
        // here is where the number will be shown 
        this.prevButton = prev;
        this.currentButton = current;
        this.clear();
    }
    
    clear(){
        // This 2 first variables will be what will be shown in the prevButton, I didn't get it at first and this is what gave me problems, 
        // The prev button is not a button is a text space for the prevOperand to be shown same with current
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }
    delet(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNum(number){
        console.log(`new = ${number}`)
        if(number === '.' && this.currentOperand.includes('.')) return;//this will make impossible to append more than a .
        this.currentOperand = this.currentOperand.toString() + number.toString();//we need the numbers to be appended not to add because if the user press 1 and 1  it should display 11 not 2 :)
    }
    chooseOp(operation){
        if(this.currentOperand === '')return;
        if(this.prevOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = ''
    }
    compute(){
        let computation;
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
        
    }
    getDisplayNum(number){
        return number
    }
    updateDisplay(){
        this.currentButton.innerText = this.getDisplayNum(this.currentOperand)
        if(this.operation != null){
            this.prevButton.innerText = `${this.getDisplayNum(this.prevOperand)} ${this.operation}`
        }else{
            this.prevButton.innerText = ''
        }
        
    }
    
}


// Html variables
const numberButtons = document.querySelectorAll('[data-num]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-del]');
const clearButton = document.querySelector('[data-clear]');
const prevButton = document.querySelector('[data-prev]');
const currentButton = document.querySelector('[data-current]');

const calculator = new Calculator(prevButton,currentButton);


numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOp(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
})
clearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', ()=>{
    calculator.delet();
    calculator.updateDisplay();
})