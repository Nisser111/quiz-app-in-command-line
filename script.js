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

  checkAnswer(ans) {
    if (this.correctAns === ans) return true;
    else return false;
  }

  showQuestion(num) {
    if ("content" in document.createElement("template")) {
      const commandLine = document.querySelector("main");

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
    } else {
      alert("Your browswere doesn't support taplate.");
    }
  }
}

let questions = [];

function showError(lineHeader, content) {
  // Create element
  const commandLine = document.querySelector("main");

  let line = document.createElement("div");
  line.classList.add("line");
  line.style.color = "var(--errorFontColor)";

  let span = document.createElement("span");
  span.innerText = "programmer-quiz\\";

  let header = document.createElement("span");
  header.classList.add("header");
  header.innerText = lineHeader;

  span.appendChild(header);
  span.innerHTML += "> ";

  line.appendChild(span);

  line.innerText += content;

  commandLine.appendChild(line);
}

function getAnswer(lineHeader) {
  return new Promise((resolve) => {
    // Create element
    const commandLine = document.querySelector("main");

    let line = document.createElement("div");
    line.classList.add("line", "has-answer");

    let span = document.createElement("span");
    span.innerText = "programmer-quiz\\";

    let header = document.createElement("span");
    header.classList.add("header");
    header.innerText = lineHeader;

    span.appendChild(header);
    span.innerHTML += ">&nbsp;";

    line.appendChild(span);

    let answerField = document.createElement("input");
    answerField.classList.add("answer");
    answerField.setAttribute("type", "text");
    line.appendChild(answerField);

    commandLine.appendChild(line);

    // Set complementing width to answer field
    answerField.style.width = line.offsetWidth - span.offsetWidth - 10 + "px";

    // Focus div
    const answerFields = document.querySelectorAll(".answer");
    let lastAnswerField = answerFields[answerFields.length - 1];

    lastAnswerField.focus();

    // Submit answer
    lastAnswerField.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        e.target.setAttribute("contenteditable", "false");
        resolve(e.target.value.toLowerCase().trim());
      }
    });
  });
}

function validateAnswer(value, avaibleAsnwers) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(avaibleAsnwers)) {
      resolve(avaibleAsnwers.includes(value));
    } else {
      reject(
        "Sorry! We have some problems. We will fix them as soon as possible."
      );
    }
  });
}

async function getUserAnswer(lineHeader, avaibleAsnwers) {
  let userEnteredCorrectly = false;

  while (!userEnteredCorrectly) {
    const userAns = await getAnswer(lineHeader);

    if (await validateAnswer(userAns, avaibleAsnwers)) {
      userEnteredCorrectly = true;
      return new Promise((resolve) => {
        resolve(userAns);
      });
    } else {
      showError(lineHeader, "We don't have that answer. Please type again...");
    }
  }
}

async function startQuiz(userAns) {
  if (userAns === "go") {
    let score = 0;
    for (let q in questions) {
      const currentQuestion = questions[q];
      const questionNum = parseInt(q) + 1;

      await currentQuestion.showQuestion(q);
      let userAns = await getUserAnswer(`question-${questionNum}`, [
        "a",
        "b",
        "c",
        "d",
      ]);

      if (await currentQuestion.checkAnswer(userAns)) score++;
    }

    return new Promise((resolve) => {
      resolve(score);
    });
  }
}

function showCommonLine(lineHeader, content) {
  // Create element
  const commandLine = document.querySelector("main");

  let line = document.createElement("div");
  line.classList.add("line");

  let span = document.createElement("span");
  span.innerText = "programmer-quiz\\";

  let header = document.createElement("span");
  header.classList.add("header");
  header.innerText = lineHeader;

  span.appendChild(header);
  span.innerHTML += "> ";

  line.appendChild(span);

  line.innerHTML += content;

  commandLine.appendChild(line);
}

async function showSummary(userScore) {
  switch (userScore) {
    case 0:
    case 1:
    case 2:
    case 3:
      showCommonLine(
        "summary",
        "It could be better but, your score is " +
          userScore +
          " points. We think you could use some more learning."
      );
      break;

    case 4:
    case 5:
    case 6:
    case 7:
      showCommonLine(
        "summary",
        "Good, your score is " +
          userScore +
          " points. So a little study more and you will be a great programmer."
      );
      break;

    case 8:
    case 9:
      showCommonLine(
        "summary",
        "Congratulation! Your score is " +
          userScore +
          " points. A few mistake isn't tragedy. You are a good programmer."
      );
      break;

    case 10:
      showCommonLine(
        "summary",
        "Perfect! Your score is " +
          userScore +
          " points, that is to say, you're a awesome programmer."
      );
      break;

    default:
      showError(
        "summary",
        "Sorry! We have some problems. We will fix them as soon as possible."
      );
      break;
  }

  showCommonLine(
    "summary",
    'If you want to repeat type <span class="marked">RESTART</span>...'
  );
  return await getUserAnswer("summary", ["restart"]);
}

async function repeat() {
  const userScore = await startQuiz("go");
  const summary = await showSummary(userScore);
  if (summary === "restart") {
    repeat();
  }
}

async function quiz() {
  const appStart = await getUserAnswer("start", ["go"]);
  const userScore = await startQuiz(appStart);
  const summary = await showSummary(userScore);
  if (summary === "restart") repeat();
}

window.onload = function () {
  // adding questions
  questions.push(
    new Question(
      "Which of the following languages is not used for frontend development?",
      ["HTML", "Java", "CSS", "JavaScript"],
      "b"
    )
  );

  questions.push(
    new Question(
      "What does CSS stand for?",
      [
        "Creative Style System",
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Symbols",
      ],
      "c"
    )
  );

  questions.push(
    new Question(
      "Which HTML tag is used to define an unordered list?",
      ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;list&gt;"],
      "a"
    )
  );

  questions.push(
    new Question(
      "What is the purpose of the JavaScript function `querySelector()`?",
      [
        "To perform mathematical calculations",
        "To add event listeners",
        "To change the page URL",
        "To select an HTML element by its class or ID",
      ],
      "d"
    )
  );

  questions.push(
    new Question(
      "Which of the following is a valid way to declare a CSS class?",
      ["#my-class", ".my-class", "class.my-class", "&lt;my-class&gt;"],
      "b"
    )
  );

  questions.push(
    new Question(
      "What is the correct syntax for a JavaScript `for` loop?",
      [
        "for (i = 0; i < 5; i++)",
        "for (i < 5; i++)",
        "for (i = 0; i++)",
        "for (var i = 0; i < 5; i++)",
      ],
      "d"
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
      "b"
    )
  );

  questions.push(
    new Question(
      "Which of the following is used to make a webpage responsive to different screen sizes?",
      ["Media queries", "JavaScript", "CSS selectors", "HTML forms"],
      "a"
    )
  );

  questions.push(
    new Question(
      "What is the purpose of the HTML &lt;canvas&gt; element?",
      [
        "To display images",
        "To embed videos",
        "To create animations and graphics",
        "To style text",
      ],
      "c"
    )
  );

  questions.push(
    new Question(
      "What does the CSS property `display: none;` do?",
      [
        "Increases the font size",
        "Changes the background color",
        "Hides an element from the webpage",
        "Makes an element visible on hover",
      ],
      "c"
    )
  );

  showCommonLine(
    "start",
    `Hi! Do you think you're a good programmer? Let's check this. Type <span class="marked">GO</span> to start the quiz...`
  );
  quiz();
};
