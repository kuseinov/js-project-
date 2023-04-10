const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
  {
    question: "Какие виды функций существуют в JS?",
    answers: ["declaration", "void", "main", "arrow"],
    correct: [1, 4],
  },
];

const headerContaier = document.querySelector("#header");
const listContaier = document.querySelector("#list");
const submitButton = document.querySelector("#submit");

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitButton.onclick = checAnswer;
function clearPage() {
  headerContaier.innerHTML = "";
  listContaier.innerHTML = "";
}

// submitButton.onclick = () => {
//   clearPage();
// };

function showQuestion() {
  console.log("showQuestion");
  // вопрос

  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );

  headerContaier.innerHTML = title;
  // вариаанты ответы}
  let answerNumber = 1;
  for (answerText of questions[questionIndex]["answers"]) {
    const questionTemplate = `
	<li>
				<label>
					<input value="${answerNumber}" type="${
      Array.isArray(questions[questionIndex].correct) ? "checkbox" : "radio"
    }" class="answer" name="answer" />
					<span>${answerText}</span>
				</label>
			</li>
	`;
    listContaier.innerHTML += questionTemplate;
    answerNumber++;
  }
}
function checAnswer() {
  if (Array.isArray(questions[questionIndex].correct)) {
    const checkedCheckboxes = listContaier.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const isCorrect = Array.from(checkedCheckboxes).every(
      (checkbox, i) =>
        Number(checkbox.value) === questions[questionIndex].correct[i]
    );
    if (isCorrect) {
      score++;
    }
  } else {
    const chekrdRadio = listContaier.querySelector(
      'input[type="radio"]:checked'
    );

    if (!chekrdRadio) {
      submitButton.blur();
      return;
    }

    const userAnswer = parseInt(chekrdRadio.value);

    if (userAnswer === questions[questionIndex]["correct"]) {
      score++;
    }
  }

  console.log("score =", score);
  if (questionIndex !== questions.length - 1) {
    console.log("Это НЕ последний вопрос");
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    console.log("Это последний вопрос");
    clearPage();
    showResults();
  }
}

function showResults() {
  console.log("showResults start");

  const resultsTemplate = `<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`;
  let title, massage;

  if (score === questions.length) {
    title = "Поздравляем🪄";
    massage = "Вы ответили верно на все вопросы";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой резултат";
    massage = "Вы ответили правильно на половину всех ответов";
  } else {
    title = "abai";
    massage = "abai";
  }

  let result = `${score} из ${questions.length}`;
  console.log(resultsTemplate);
  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", massage)
    .replace("%result%", result);
  headerContaier.innerHTML = finalMessage;

  submitButton.blur();
  submitButton.innerText = "Начать заново";
  submitButton.onclick = () => {
    history.go();
  };
  // console.log(submitBtn);
}

// let user=`<h2>#title#</h2>`
//  let user1=user.replace('%title#','abai')

// console.log(user1);
