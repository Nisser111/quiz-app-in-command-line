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

function showCommandLine() {}

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
    line.classList.add("line");

    let span = document.createElement("span");
    span.innerText = "programmer-quiz\\";

    let header = document.createElement("span");
    header.classList.add("header");
    header.innerText = lineHeader;

    span.appendChild(header);
    span.innerHTML += "> ";

    line.appendChild(span);

    let answerField = document.createElement("div");
    answerField.classList.add("answer");
    answerField.setAttribute("contenteditable", "true");
    answerField.innerHTML = "";

    line.appendChild(answerField);

    commandLine.appendChild(line);

    // Focus div
    const answerFields = document.querySelectorAll(".answer");
    let lastAnswerField = answerFields[answerFields.length - 1];

    lastAnswerField.innerHTML = null;
    lastAnswerField.focus();

    // Submit answer
    lastAnswerField.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        e.target.setAttribute("contenteditable", "false");
        resolve(e.target.innerText.toLowerCase().trim());
      }
    });
  });
}

function validateAnswer(value, avaibleAsnwers) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(avaibleAsnwers)) resolve(avaibleAsnwers.includes(value));
    else
      reject(
        "Sorry! We have some problems. We will fix them as soon as possible."
      );
  });
}

async function getUserAnswer(lineHeader, avaibleAsnwers) {
  let userEnteredCorrectly = false;

  while (!userEnteredCorrectly) {
      const userAns = await getAnswer(lineHeader);

    if (await validateAnswer(userAns, avaibleAsnwers)) {
      userEnteredCorrectly = true;
      return userAns;
    } else {
      showError(lineHeader, "We don't have that answer. Please type again...");
    }
  }
}

// if(Array.isArray(avaibleAsnwers)) {
//   if (avaibleAsnwers.includes(value)) return value; // replace to return
//   else {
//     showError(lineHeader, "We don't have that answer. Please type again...");
//     return false;
//   };
// } else {
//   alert("Sorry! We have some problems. We will fix them as soon as possible.");
// }

window.onload = async function () {
  let questions = [];
  let userScore = 0;

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

  const appStart = await getUserAnswer("start", ["go"]);

};

