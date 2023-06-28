const commandLine = document.querySelector("main");

let questions = [];

class Question {
  constructor(question, answers, correctAns) {
    let [_ansA, _ansB, _ansC, _ansD] = [...answers];

    this.ansA = _ansA;
    this.ansB = _ansB;
    this.ansC = _ansC;
    this.ansD = _ansD;
    this.question = question;
    this.correctAns = correctAns;

    if (Question.count === undefined) Question.count = 0;
    Question.count++;
  }

  getQuestionCount() {
    return Question.count;
  }

  checkAnswer(ans) {
    if (this.correctAns === ans) return true;
    else return false;
  }

  showQuestion(num) {
    if ("content" in document.createElement("template")) {
      const template = document.querySelector("#questionLine");
      const clone = template.content.cloneNode(true);

      const header = clone.querySelector(".header");
      const question = clone.querySelector(".question");
      const ansA = clone.querySelector(".ansA");
      const ansB = clone.querySelector(".ansB");
      const ansC = clone.querySelector(".ansC");
      const ansD = clone.querySelector(".ansD");

      const number = parseInt(num) + 1;

      header.innerHTML = "question-" + number;
      question.innerHTML = this.question;
      ansA.innerHTML += this.ansA;
      ansB.innerHTML += this.ansB;
      ansC.innerHTML += this.ansC;
      ansD.innerHTML += this.ansD;

      commandLine.append(clone);
    }
  }
}

let showCommonLine = (h, c, isError = false) => {
  if ("content" in document.createElement("template")) {
    const template = document.querySelector("#commonLine");
    const clone = template.content.cloneNode(true);

    const header = clone.querySelector(".header");
    const content = clone.querySelector(".line");

    header.innerText += h;
    content.innerHTML += c;

    if (isError) content.style.color = "var(--errorFontColor)";

    commandLine.append(clone);
  }
};

function getAnswer(h, trueValues) {
  if ("content" in document.createElement("template")) {
    const template = document.querySelector("#answerLine");
    const clone = template.content.cloneNode(true);

    const header = clone.querySelector(".header");
    header.innerText += h;

    commandLine.append(clone);
  }

  const answerFields = document.querySelectorAll(".answer");
  let lastAnswerField = answerFields[answerFields.length - 1];
  lastAnswerField.innerHTML = "";
  lastAnswerField.focus();

  lastAnswerField.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      let value = lastAnswerField.innerHTML;
      value = lastAnswerField.innerHTML;
      e.target.contentEditable = "false";

      // if (value.toLowerCase() in trueValues) {
      //   window.currentAnswer = value;
      //   validFlag = true;
      // } else {
      //   showCommonLine("error", "Incorrect data value", true);
      // }

      // validation
      
      var validFlag = false;
      do {
        for (let element of trueValues) {
          if (value.toLowerCase() == element) {
            window.currentAnswer = value;
            validFlag = true;
          } else {
            showCommonLine("error", "Incorrect data value", true);
          }
        }
      } while(!validFlag);
    }
  });
}

// adding questions
questions.push(
  new Question(
    "Which of the following languages is not used for frontend development?",
    ["HTML", "Java", "CSS", "JavaScript"],
    "Java"
  )
);

questions.push(
  new Question(
    "What does CSS stand for?",
    [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Sheets",
      "Colorful Style Symbols",
    ],
    "Cascading Style Sheets"
  )
);

questions.push(
  new Question(
    "Which HTML tag is used to define an unordered list?",
    ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;list&gt;"],
    "&lt;ul&gt;"
  )
);

questions.push(
  new Question(
    "What is the purpose of the JavaScript function `querySelector()`?",
    [
      "To select an HTML element by its class or ID",
      "To perform mathematical calculations",
      "To add event listeners",
      "To change the page URL",
    ],
    "To select an HTML element by its class or ID"
  )
);

questions.push(
  new Question(
    "Which of the following is a valid way to declare a CSS class?",
    [".my-class", "#my-class", "class.my-class", "&lt;my-class&gt;"],
    ".my-class"
  )
);

questions.push(
  new Question(
    "What is the correct syntax for a JavaScript `for` loop?",
    [
      "for (i = 0; i < 5; i++)",
      "for (var i = 0; i < 5; i++)",
      "for (i < 5; i++)",
      "for (i = 0; i++)",
    ],
    "for (i = 0; i < 5; i++)"
  )
);

questions.push(
  new Question(
    "What does the acronym API stand for in web development?",
    [
      "Advanced Programming Interface",
      "Application Programming Interface",
      "Automated Programming Interface",
      "Associated Program Interface",
    ],
    "Application Programming Interface"
  )
);

questions.push(
  new Question(
    "Which of the following is used to make a webpage responsive to different screen sizes?",
    ["Media queries", "JavaScript", "CSS selectors", "HTML forms"],
    "Media queries"
  )
);

questions.push(
  new Question(
    "What is the purpose of the HTML &lt;canvas&gt; element?",
    [
      "To display images",
      "To create animations and graphics",
      "To embed videos",
      "To style text",
    ],
    "To create animations and graphics"
  )
);

questions.push(
  new Question(
    "What does the CSS property `display: none;` do?",
    [
      "Increases the font size",
      "Changes the background color",
      "Makes an element visible on hover",
      "Hides an element from the webpage",
    ],
    "Hides an element from the webpage"
  )
);

window.onload = function () {
  showCommonLine(
    "start",
    `Hi! Do you think you're a good programmer? Let's check this. Type <span class="marked">GO</span> to start the quiz...`
  );

  getAnswer("start", ["go"]);
};

//   for (let q in questions) {
//     questions[q].showQuestion(q);
//   }
