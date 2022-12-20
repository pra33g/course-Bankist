'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Prakhar Gupta',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'ABCD Efg',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};
const account4 = {
  owner: 'Sarah Sarah',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};



const account5 = {
  owner: 'Dinesh Dubey',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 0.1,
  pin: 1234,
};


const accounts = [account5, account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


///
///
let now = new Date();
labelDate.textContent = String(now.getDay()).padStart(2, 0) + '/' + Number.parseInt(now.getMonth() + 1) + '/' + now.getFullYear() ;

const displayMovements = function(movements){
    containerMovements.innerHTML = "";
    movements.forEach(function(mov, i){

	const type = mov > 0 ? "deposit" : "withdrawal";
	const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">2 deposit</div>
          <div class="movements__date">${i + 1} days ago</div>
        <div class="movements__value">${mov} Rs</div>
`;
	containerMovements.insertAdjacentHTML("afterbegin", html);
    });
}


//calc username
const calcUserName = accounts.forEach(function (acc){
    acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join("");
});




let user = account1;
btnLogin.addEventListener("click", function(){

    let un, pw;
    un = inputLoginUsername.value;
    pw = inputLoginPin.value;


    user = accounts.find(acc => un === acc.username && pw == acc.pin);
    console.log(user??"Incorrect");
    if(user){
	inputLoginPin.value = inputLoginUsername.value = "";
	labelWelcome.textContent = "Welcome back, "  + user.owner.split(" ")[0] + "!";

	(containerApp.style.opacity = "100");

	displaySummary(user.movements, user.interestRate);
        displayBal(user.movements);    
	displayMovements(user.movements);
    }
});
//(containerApp.style.opacity = "100");

//calc bal

const displayBal = function(movements){
    let bal = movements.filter(val => val > 0).reduce((acc, val) => acc+val);
    labelBalance.textContent = bal + " Rs";
}



const displaySummary = function (movements, rate){
    let _in = 0, _out = 0;
    _in = movements.filter(val => val > 0).reduce((acc, val) => acc + val, 0);
    _out = movements.filter(val => val < 0).reduce((acc, val) => acc + val, 0);
    _out = Math.abs(_out);
    let ints = _in * rate / 100;
    labelSumInterest.textContent = ints + " Rs";
    labelSumOut.textContent = _out + " Rs";
    labelSumIn.textContent = _in + " Rs";
};

btnClose.addEventListener("click", function(e){
    e.preventDefault();
    let n = inputCloseUsername.value;
    let p = Number(inputClosePin.value);
    if (user.pin === p && user.username === n){
	let index = accounts.findIndex(acc => acc.username === n && acc.pin === p);
	console.log(index);
	accounts.splice(index, 1);
	containerApp.style.opacity = "0";
	labelWelcome.textContent = 'Login to get started'
    } else {
	console.log("NO! >: - ()");
    }
});

btnTransfer.addEventListener("click", function(e){
    const amt = Number(inputTransferAmount.value);
    const tto = inputTransferTo.value;
    let tto_acct = accounts.find(acc => acc.username === tto);
    tto_acct ? (function (_user){
	_user.movements.push(amt);
	inputTransferAmount.value ='';
	inputTransferTo.value = '';
    })(tto_acct) : console.log("Incorrect name");

	displaySummary(user.movements, user.interestRate);
        displayBal(user.movements);    
	displayMovements(user.movements);	
    
    
});
function updateUI(){
    displaySummary(user.movements, user.interestRate);
    displayBal(user.movements);    
    displayMovements(user.movements);    
}
btnLoan.addEventListener("click", function(e){
    e.preventDefault();
    let amt = Number(inputLoanAmount.value);
    let eligible = user.movements.some(val => val > amt  * 0.1);
    console.log(eligible);
    eligible && (user.movements.push(amt) && updateUI()    );
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
accounts.forEach(function(obj){
    console.log(obj.username);
})
