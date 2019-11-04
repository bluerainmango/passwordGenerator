var length;
var option;
var optValidBoolean = true;
    
/*************************
/*   PROMPT VALIDATION
*************************/

// 1. PASSWORD LENGTH PROMPT
    length = prompt("please input a number of the length of the password you want.\n *min: 8 - max: 128\n *default: 8");

    if(length !== null){

        // Length Validator & Reinput prompt
        while(Number.isNaN(Number(length)) === true || length < 8 || length > 128){
            length = prompt("Invalid number! Please enter a number between 8 and 128. \n If you click cancel button, default value 8 will be set.");

            // if cancel button clicked in reprompt, just set to default(8).
            if(length===null){
                length = 8;    
            }
        }
    }
    else{  // if cancel button clicked, set to default(8)
        length = 8;
    }
    
// 2. PASSWORD OPTION PROMPT
    option = prompt("Input first letter of each password type you want to add. You can choose multiple types. \n s : special characters \n n : numeric characters \n l : lowercase characters \n u : uppercase characters \n *default: snlu");

    if(option !== null){

        optionValidator();

        // Option Validator & Reinput prompt
        while(!optValidBoolean){
            option = prompt("Invalid input! Please enter letters among s, n, l, u. \n s : special characters \n n : numeric characters \n l : lowercase characters \n u : uppercase characters \n *example: sl \nIf you click cancel button, default value 'n' will be set.");

            optionValidator();
        }
    }
    else{ // if cancel button clicked, set to default(n: Numeric characters)
        option ='n';
    }

    function optionValidator() {
        if(option === ""){ // If blank is entered
            optValidBoolean = false;
        }
        else if(option === null){ // if cancel button clicked 
            optValidBoolean = true;
            option = "n" // set to default(n)
        }
        else{
            var optionArr = option.split(""); 

            // If the option input includes any invalid letter, return false  
            optValidBoolean = optionArr.every((el)=>{
                return el === 's' || el === 'n' || el === 'l' || el === 'u';
        })
    }
    }
console.log(length, option)
/*************************
/*    PASSWORD POOL  
*************************/
var data = {
    // space(' ') is omitted on purpose for test
    s:['!','"','#','$','%','&',"'",'(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[','\\',']','^','_','`','{','|','}','~' ],
    n:[0,1,2,3,4,5,6,7,8,9],
    l:['a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    u:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
}

var optionArr = Array.from(option);
var pool = optionArr.reduce((acc,el) => { return acc.concat(data[el]) },[]);


/*************************
/*   PASSWORD GENERATOR  
*************************/

var pwdGenerator = () => {
    var pwd = ""; 
    var fullPwd = "";

    for(i=0; i < length; i++){    
        pwd = pool[ Math.floor( Math.random() * pool.length) ];
        fullPwd += pwd; 
    }
    return fullPwd;
}

/*************************
/*      BTN EVENT  
*************************/

document.getElementById('pwdBtn').addEventListener('click',()=>{
   var generatedPwd = pwdGenerator(); 
   document.getElementById('pwd_box').innerHTML = generatedPwd;
});

document.getElementById('copyBtn').addEventListener('click',()=>{
    var copyPwd = document.getElementById('pwd_box')
        copyPwd.select();
        copyPwd.setSelectionRange(0,128);
    
    document.execCommand('copy');
    alert("Copied the text : " + copyPwd.value);
});


// at least one type should be selected. prompt
    // length ( 8 - 128 )
    // special cha
    // Num
    // lowercase cha
    // uppercase cha

// display generator with answered setting
    // 1. generate pwd btn : generated pwd in page
    // 2. copy btn