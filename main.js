let screen = document.querySelector('.screen span')
let all_btns = document.querySelectorAll('button')
let numbers_buttons = document.querySelectorAll('button')
let dot_btn = document.querySelector('.dot')
let num = ""
let num1 = ""
let num2 = ""
let op = ""
let operation_exp = ""
for (button of numbers_buttons){
    let unique_buttons = ["=", "C", "MC", "."]
    if (!isNaN(button.textContent)){
        button.classList.add('numbers')
    }
    else if (!unique_buttons.includes(button.textContent))
    {
        button.classList.add('operations')
    }
}
op_state(true)
window.addEventListener('click', (event)=>{
    if (event.target.className == "numbers"){
        num += event.target.textContent
        operation_exp += event.target.textContent
        if (!num1) op_state(false)
    }
    else if (event.target.className == "operations"){
        op = event.target.textContent
        operation_exp += op
        num1 = num
        num = ""
        op_state(true)
    }
    else if (event.target.className == "equal"){
        if (num!="" && num1!=""){
            op_state(false)
            if (num == "0"){
                operation_exp = "seriously BROKIE !"  
                num = num1 = 0
                culc_state(true, "0.5")
                document.body.style.backgroundImage = "url('https://media.tenor.com/F2sjRPWY064AAAAM/andrew-tate-tate.gif')"
                // document.body.style.backgroundSize = "contain"
                // document.body.style.backgroundPosition = "center"
            }
            else{
                let result = apply_operator(Number(num1),op,Number(num))
                operation_exp = result.toFixed(2)
                num = result.toFixed(2)
                num1 = ""
                // operation_exp = num
            }   
        }
    }
    else if (event.target.textContent == "."){
        num += "." 
        operation_exp += "."
    }
    else if (event.target.textContent == "C"){
        num = num1 = op = operation_exp = screen.textContent = ""
        culc_state(false, "1")
        document.body.style.backgroundImage = ""
    }
    if (num!==""|| num1!=="")screen.textContent = operation_exp
})
// functions
function apply_operator(num1,operator,num2){
    if (operator == "+") return num1 + num2
    else if (operator == "-") return num1 - num2
    else if (operator == "x") return num1 * num2
    else if (operator == "/") return num1 / num2
}
function culc_state(disabled,opacity){
    all_btns.forEach(btn => {
        if (btn.className != "clearBtn"){
            btn.disabled = disabled
            btn.style.opacity = opacity
        }
    });
}
function op_state(boolean){
    let operations_btns = document.querySelectorAll('.operations')
    operations_btns.forEach(btn => {
        btn.disabled = boolean
    });
}
all_btns.forEach(btn => {
    btn.addEventListener('click', (event)=>{
        if (event.target.className == "equal" ||
            event.target.className == "dot"){
                dot_btn.disabled = true
            }
        else if (event.target.className == "operations"){
            dot_btn.disabled = false
        }
    })
});
window.addEventListener('keydown', (event)=>{
	if (event.key == "Backspace" && num.toString().length>1){
        let new_num = num.toString().split("") 
        new_num.pop()
        num = new_num.join("")
        screen.textContent = num
        operation_exp = num
    }
    else if (event.key == "Enter"){
        
    }
})