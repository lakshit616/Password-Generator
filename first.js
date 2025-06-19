const inputslider= document.querySelector("[data-lengthSlider]");
const lengthdisplay = document.querySelector("[data-lengthnumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercheck = document.querySelector("#uppercase");
const lowerCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicater]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength=10;
let checkcount=0;
const symbols = `!@#$%^&*()_+-=[]{};':"\\|,.<>/?`;
handleSlider();
// set password length
function handleSlider(){
inputslider.value=passwordLength;
lengthdisplay.innerText=passwordLength;
}

function setindicator(color){
     indicator.style.backgroundColor=color;
     indicator.style.boxShadow="5px 5px 10px color"
}
function getRndInteger(min,max){
  return Math.floor(Math.random() * (max-min)) + min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
// using ascii value 
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    // const randomIndex= Math.floor(Math.random() * specialChars.Length);
    // const randomSymbol= specialChars[randomIndex];
    // return randomSymbol;
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasupper = false;
    let haslower = false;
    let hassymbol= false;
    let hasnumber=false;
    if(uppercheck.checked) hasupper=true;
    if(lowerCheck.checked) haslower=true;
    if(symbolsCheck.checked) hassymbol=true;
    if(numberCheck.checked) hasnumber=true;

    if(hasupper && haslower && (hassymbol || hasnumber) && passwordLength>=8){
       setindicator("#0f0");
    }
    else if(
        (haslower||hasupper) && (hassymbol||hasnumber) && passwordLength<6

        
    ){
     setindicator("#ff0")
    }
    else{
        setindicator("#f00")
    }
}
 async function copyContent(){
    try{
await navigator.clipboard.writeText(passwordDisplay.value) ;
copyMsg.innerText="copied";
    }
    catch(e){
     copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");
    setTimeout(
        ()=> { 
            copyMsg.classList.remove("active");
        },2000 );
}
function handleCheckBoxChange(){
    checkcount=0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkcount++;
        }
    });
    if(passwordLength<checkcount){
        if(passwordLength===checkcount)
        handleSlider();
    }
}
    allCheckBox.forEach((checkbox) =>{
        checkbox.addEventListener('change',handleCheckBoxChange);
    })
    inputslider.addEventListener('input',(e) =>{
passwordLength = parseInt(e.target.value);
        handleSlider();
    })

    copyBtn.addEventListener('click',()=>{
        if(passwordDisplay.value){
              copyContent();
        }
    })
generateBtn.addEventListener('click', ()=>{
    if(checkcount<=0){
        return;
    }
    if(passwordLength<checkcount){
        passwordLength=checkcount;
        handleSlider();
    }

    function shufflePassword(array){
  for (let i=array.length-1;i>0;i--){
    const j =Math.floor(Math.random()*(i+1));
    const temp = array[i];
    array[i]=array[j];
    array[j]=temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
    } 

    password="";
    // if(uppercheck.checked){
    //     password+=generateUpperCase();
    // }
    // if(lowerCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numberCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    let funcArr=[];
    if(uppercheck.checked)
        funcArr.push(generateUpperCase);

    if(lowerCheck.checked)
        funcArr.push(generateLowerCase);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    if(numberCheck.checked)
        funcArr.push(generateRandomNumber);

    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }

    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    password = shufflePassword(Array.from(password));

    passwordDisplay.value=password;
    calcStrength();
})