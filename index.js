const startbtn= document.querySelector('.start-btn');
const popupinfo= document.querySelector('.popup-info');
const exitbtn= document.querySelector('.exit-btn');
const mainb= document.querySelector('.main');
const continuebtn= document.querySelector('.continue-btn');
const quizsection= document.querySelector('.quiz-section');
const quizbox= document.querySelector('.quiz-box');
const resultbox= document.querySelector('.result-box');
const tryagainbtn= document.querySelector('.tryagain-btn');
const gotohomebtn= document.querySelector('.gohome-btn');
startbtn.onclick = () => {
    popupinfo.classList.add('active');
    mainb.classList.add('active');
}
exitbtn.onclick = () => {
    popupinfo.classList.remove('active');
    mainb.classList.remove('active');
}
continuebtn.onclick = () => {
    quizsection.classList.add('active');
    popupinfo.classList.remove('active');
    mainb.classList.remove('active');
    quizbox.classList.add('active');
    showquestions(0);
    questioncounter(1);
    headerscore();
   
}
tryagainbtn.onclick = () => {
   quizbox.classList.add('active');
   nextbutton.classList.remove('active');
   resultbox.classList.remove('active');

   questioncount=0;
     questionnumb=1;
    userscore=0;
    showquestions(questioncount);
    questioncounter(questionnumb);
    headerscore();
}

gotohomebtn.onclick = () => {
    quizsection.classList.remove('active');
    nextbutton.classList.remove('active');
    resultbox.classList.remove('active');
 
    questioncount=0;
      questionnumb=1;
     userscore=0;
     showquestions(questioncount);
     questioncounter(questionnumb);
     headerscore();
 }





let questioncount=0;
let questionnumb=1;
let userscore=0;
const nextbutton= document.querySelector('.next-btn');
nextbutton.onclick = () => {
    if(questioncount<questions.length -1) {
        questioncount++;
        showquestions(questioncount);
        questionnumb++;
        questioncounter(questionnumb);
    }
   
    else {
        console.log('Questions completed');
        showresultbox();
    }
  
   
}

const optionlist= document.querySelector('.option-list');

//getting questions and options from array
function showquestions(index) {
        const questiontext= document.querySelector('.question-text');
        questiontext.textContent= `${questions[index].numb}. ${questions[index].question}`;
        let optiontag= `<div class="option"><span>${questions[index].options[0]}</span></div>
                        <div class="option"><span>${questions[index].options[1]}</span></div>
                        <div class="option"><span>${questions[index].options[2]}</span></div>
                        <div class="option"><span>${questions[index].options[3]}</span></div>`;
                        optionlist.innerHTML=optiontag;
            const option= document.querySelectorAll('.option');
            for(let i=0;i<option.length; i++){
                option[i].setAttribute('onclick', 'optionselected(this)');
            } 
}
function optionselected(answer) {
    let useranswer = answer.textContent;
    let correctanswer= questions[questioncount].answer;
    let alloptions= optionlist.children.length;
    if(useranswer== correctanswer) {
        answer.classList.add('correct');
        userscore += 1;
        headerscore();
    }
    else {
        answer.classList.add('incorrect');

        //if answear incorrect correct is auto selected
        for(let i=0; i<alloptions;i++) {
            if(optionlist.children[i].textContent == correctanswer) {
                optionlist.children[i].setAttribute('class', 'option correct');
            }
        }
        

    }

    for(let i=0; i<alloptions;i++) {
        optionlist.children[i].classList.add('disabled');
    }
}



function questioncounter(index) {
    const questiontotal= document.querySelector('.questions-total');
    questiontotal.textContent= `${index} of ${questions.length} Questions`;

}

function headerscore() {
    const headerscoretext= document.querySelector('.header-score');
    headerscoretext.textContent = `score: ${userscore}/ ${questions.length}`;
}

function showresultbox() {
    quizbox.classList.remove('active');
    resultbox.classList.add('active');
    const scoretext= document.querySelector('.score-text');
    scoretext.textContent= `Your Score ${userscore} out of ${questions.length}`;

    const circularprogress= document.querySelector('.circular-progress');
    const progressvalue= document.querySelector('.progress-value');
    let progressstartvalue= -1;
    let progressendvalue= (userscore / questions.length) * 100;
    let speed= 20;
    let progress = setInterval(() => {
            progressstartvalue++;
            progressvalue.textContent = `${progressstartvalue}%`;
            circularprogress.style.background = `conic-gradient(#c40094 ${progressstartvalue * 3.6}deg, rgba(255,255,255, .1) 0deg)`;
            if(progressstartvalue == progressendvalue) {
                clearInterval(progress);
            }
    }, speed);

}
