let w;
let maxAttempts = 5;
let attempts = 5;

let input = document.getElementById('get');
let result = document.getElementById('result');
let attemptDisplay = document.getElementById('attempt');

function updateDisplay(){
  let dots = "";
  for(let i=0; i<maxAttempts; i++){
    if(i < attempts){
      dots += `<span class="dot-active">🟩</span>`;
    } else {
      dots += `<span class="dot-used">🟥</span>`;
    }
  }
  attemptDisplay.innerHTML = dots + ` <span style="font-size:16px;color:white"> ${attempts}/${maxAttempts} left</span>`;
}

function resetAll(){
  w = undefined;
  attempts = maxAttempts;
  input.value = "";
  updateDisplay();
  result.innerText = "Click Generate Number to start";
  result.style.color = "white";
}

document.getElementById('btn').onclick = function(){
  w = Math.floor(Math.random()*100)+1;
  attempts = maxAttempts;
  input.value = "";
  updateDisplay();
  result.innerText = "Number generated! Start guessing";
  result.style.color = "White";
  console.log("Answer:", w);
}

document.getElementById('check').onclick = function(){
  if(!w){
    result.innerText = "Click Generate first!";
    return;
  }
  if(input.value === ""){
    result.innerText = "Type a number first!";
    return;
  }

  let guess = Number(input.value);

  if(guess === w){
    result.innerText = `Correct! ✅ Answer was ${w}`;
    result.style.color = "green";
    setTimeout(resetAll, 2000);
    return;
  }

  attempts--;
  updateDisplay();

  if(attempts > 0){

    if(guess > w){
      result.innerText = `Too High! ▲ ${guess} > answer. ${attempts} left`;
    } 

    else if(guess < w){
      result.innerText = `Too Low! ▼ ${guess} < answer. ${attempts} left`;
    }

    result.style.color = "red";
    input.value = "";

  } else {

    result.innerText = `Game Over! ❌ Answer was ${w}. You guessed ${guess}`;
    result.style.color = "red";
    setTimeout(resetAll, 3000);
  }
}