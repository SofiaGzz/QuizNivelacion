//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const nom = document.querySelector(".nom");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart0");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const pueblo = document.querySelector(".pueblo");
const burguesia = document.querySelector(".burguesia");
const nobleza = document.querySelector(".nobleza");
const realeza = document.querySelector(".realeza");
const btn_nobleza = document.querySelector(".nobleza button");
const btn_burgesia = document.querySelector(".burguesia button");
const btn_pueblo = document.querySelector(".pueblo button");
const btn_realeza = document.querySelector(".realeza");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

pueblo.style.display = "none";
burguesia.style.display = "none";
nobleza.style.display = "none";
realeza.style.display = "none";

// if startQuiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show info box
    start_btn.style.display = "none";
    nom.style.display = "none";
};

// if exitQuiz button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
    start_btn.style.display = "block";
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    start_btn.classList.remove("activeBtn");
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let userScoreCont = 0;
let counter;
let counterLine;
let widthValue = 0;
let scoreCat = new Array(0);

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
    console.clear();
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    userScoreCont = 0;
    widthValue = 0;
    scoreCat = new Array(0);
    delete scoreText0;
    delete scoreText1;
    delete scoreText2;
    delete scoreText3;
    delete scoreText4;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(result_box);
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload(); //reload the current window
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
};

// getting questions and options from array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag =
        "<span>" +
        questions[index].numb +
        ". " +
        questions[index].question +
        "</span>";
    let option_tag =
        '<div class="option"><span>' +
        questions[index].options[0] +
        "</span></div>" +
        '<div class="option"><span>' +
        questions[index].options[1] +
        "</span></div>" +
        '<div class="option"><span>' +
        questions[index].options[2] +
        "</span></div>" +
        '<div class="option"><span>' +
        questions[index].options[3] +
        "</span></div>";
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let Ansinicial = questions[que_count].options[0];
    let AnsBasica = questions[que_count].options[1];
    let AnsAvanzado = questions[que_count].options[2];
    let AnsExperto = questions[que_count].options[3];
    const allOptions = option_list.children.length; //getting all option items

    if (userAns == Ansinicial) {
        //if user selected option is equal to array's correct answer
        userScore = "Inicial"; //upgrading score value with 1
        scoreCat.push(userScore);
        userScoreCont += 1;
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Your correct answers = " + userScore);
        console.log("Contador: " + userScoreCont);
    } else if (userAns == AnsBasica) {
        //if user selected option is equal to array's correct answer
        userScore = "Básico"; //upgrading score value with 1
        scoreCat.push(userScore);
        userScoreCont += 2;
        //userScore2 = 2;
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Your correct answers = " + userScore);
        console.log("Contador: " + userScoreCont);
        //console.log("Categoría: " = +userScore2);
    } else if (userAns == AnsAvanzado) {
        //if user selected option is equal to array's correct answer
        userScore = "Avanzado"; //upgrading score value with 1
        scoreCat.push(userScore);
        userScoreCont += 3;
        //userScore3 = 3;
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Your correct answers = " + userScore);
        console.log("Contador: " + userScoreCont);
        //console.log("Categoría: " = +userScore3);
    } else if (userAns == AnsExperto) {
        //if user selected option is equal to array's correct answer
        userScore = "Experto"; //upgrading score value with 1
        scoreCat.push(userScore);
        userScoreCont += 4;
        //userScore4 = 4;
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Your correct answers = " + userScore);
        console.log("Contador: " + userScoreCont);
        //console.log("Categoría: " = +userScore4);
    } else {
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {
                //if there is an option which is matched to an array answer
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option

    for (i = 0; i < allOptions; i++) {
        const cate = [
            "Finanzas",
            "Partes Interesadas",
            "Negociación",
            "Riesgos y Oportunidades",
        ];
        console.log(`Element at index ${scoreCat[i]} is ${cate[i]}`);
    }
}

// Un ejemplo -->
document.getElementById("demo").innerHTML = "Esto es un párrafo de ejemplo";
//Otro ejempplo -->

function showResult() {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    start_btn.classList.remove("activeBtn");
    const scoreText = result_box.querySelector(".score_text");
    const scoreText0 = result_box.querySelector(".score_text0");
    const scoreText1 = result_box.querySelector(".score_text1");
    const scoreText2 = result_box.querySelector(".score_text2");
    const scoreText3 = result_box.querySelector(".score_text3");
    const scoreText4 = result_box.querySelector(".score_text4");
    if (userScoreCont <= 4) {
        pueblo.style.display = "block";
        btn_pueblo.onclick = () => {
            result_box.classList.add("activeResult");
            pueblo.style.display = "none";
            let scoreTag = "<span>\n</p> Score:  <p>" + userScoreCont;
            let scoreTag0 = "<span>\n</p> Desgloce Categorías:  <p>";
            let scoreTag1 = "<span>\n</p> Finanzas:  <p>" + scoreCat[0];
            let scoreTag2 = "<span>\n</p> Partes Interesadas:  <p>" + scoreCat[1];
            let scoreTag3 = "<span>\n</p> Negociación:  <p>" + scoreCat[2];
            let scoreTag4 =
                "<span>\n</p> Riesgos y Oportunidades:  <p>" + scoreCat[3];
            scoreText0.insertAdjacentHTML("beforeend", scoreTag0);
            scoreText1.insertAdjacentHTML("beforeend", scoreTag1);
            scoreText2.insertAdjacentHTML("beforeend", scoreTag2);
            scoreText3.insertAdjacentHTML("beforeend", scoreTag3);
            scoreText4.insertAdjacentHTML("beforeend", scoreTag4);
            scoreText.innerHTML = scoreTag;
            scoreText0.innerHTML = scoreTag0;
            scoreText1.innerHTML = scoreTag1;
            scoreText2.innerHTML = scoreTag2;
            scoreText3.innerHTML = scoreTag3;
            scoreText4.innerHTML = scoreTag4;
        };
        // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
    } else if (userScoreCont >= 5 && userScoreCont <= 8) {
        burguesia.style.display = "block";
        btn_burgesia.onclick = () => {
            result_box.classList.add("activeResult");
            burguesia.style.display = "none";
            let scoreTag = "<span>\n</p> Score:  <p>" + userScoreCont;
            let scoreTag0 = "<span>\n</p> Desgloce Categorías:  <p>";
            let scoreTag1 = "<span>\n</p> Finanzas:  <p>" + scoreCat[0];
            let scoreTag2 = "<span>\n</p> Partes Interesadas:  <p>" + scoreCat[1];
            let scoreTag3 = "<span>\n</p> Negociación:  <p>" + scoreCat[2];
            let scoreTag4 =
                "<span>\n</p> Riesgos y Oportunidades:  <p>" + scoreCat[3];
            scoreText0.insertAdjacentHTML("beforeend", scoreTag0);
            scoreText1.insertAdjacentHTML("beforeend", scoreTag1);
            scoreText2.insertAdjacentHTML("beforeend", scoreTag2);
            scoreText3.insertAdjacentHTML("beforeend", scoreTag3);
            scoreText4.insertAdjacentHTML("beforeend", scoreTag4);
            scoreText.innerHTML = scoreTag;
            scoreText0.innerHTML = scoreTag0;
            scoreText1.innerHTML = scoreTag1;
            scoreText2.innerHTML = scoreTag2;
            scoreText3.innerHTML = scoreTag3;
            scoreText4.innerHTML = scoreTag4;
        };
    } else if (userScoreCont >= 9 && userScoreCont <= 12) {
        nobleza.style.display = "block";
        btn_nobleza.onclick = () => {
            result_box.classList.add("activeResult");
            nobleza.style.display = "none";
            let scoreTag = "<span>\n</p> Score:  <p>" + userScoreCont;
            let scoreTag0 = "<span>\n</p> Desgloce Categorías:  <p>";
            let scoreTag1 = "<span>\n</p> Finanzas:  <p>" + scoreCat[0];
            let scoreTag2 = "<span>\n</p> Partes Interesadas:  <p>" + scoreCat[1];
            let scoreTag3 = "<span>\n</p> Negociación:  <p>" + scoreCat[2];
            let scoreTag4 =
                "<span>\n</p> Riesgos y Oportunidades:  <p>" + scoreCat[3];
            scoreText0.insertAdjacentHTML("beforeend", scoreTag0);
            scoreText1.insertAdjacentHTML("beforeend", scoreTag1);
            scoreText2.insertAdjacentHTML("beforeend", scoreTag2);
            scoreText3.insertAdjacentHTML("beforeend", scoreTag3);
            scoreText4.insertAdjacentHTML("beforeend", scoreTag4);
            scoreText.innerHTML = scoreTag;
            scoreText0.innerHTML = scoreTag0;
            scoreText1.innerHTML = scoreTag1;
            scoreText2.innerHTML = scoreTag2;
            scoreText3.innerHTML = scoreTag3;
            scoreText4.innerHTML = scoreTag4;
        };
    } else if (userScoreCont > 12) {
        realeza.style.display = "block";
        btn_realeza.onclick = () => {
            result_box.classList.add("activeResult");
            realeza.style.display = "none";
            let scoreTag = "<span>\n</p> Score:  <p>" + userScoreCont;
            let scoreTag0 = "<span>\n</p> Desgloce Categorías:  <p>";
            let scoreTag1 = "<span>\n</p> Finanzas:  <p>" + scoreCat[0];
            let scoreTag2 = "<span>\n</p> Partes Interesadas:  <p>" + scoreCat[1];
            let scoreTag3 = "<span>\n</p> Negociación:  <p>" + scoreCat[2];
            let scoreTag4 =
                "<span>\n</p> Riesgos y Oportunidades:  <p>" + scoreCat[3];
            scoreText0.insertAdjacentHTML("beforeend", scoreTag0);
            scoreText1.insertAdjacentHTML("beforeend", scoreTag1);
            scoreText2.insertAdjacentHTML("beforeend", scoreTag2);
            scoreText3.insertAdjacentHTML("beforeend", scoreTag3);
            scoreText4.insertAdjacentHTML("beforeend", scoreTag4);
            scoreText.innerHTML = scoreTag;
            scoreText0.innerHTML = scoreTag0;
            scoreText1.innerHTML = scoreTag1;
            scoreText2.innerHTML = scoreTag2;
            scoreText3.innerHTML = scoreTag3;
            scoreText4.innerHTML = scoreTag4;
        };
    }
}

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag =
        "<span><p>" +
        index +
        "</p> of <p>" +
        questions.length +
        "</p> Questions</span>";
    bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}