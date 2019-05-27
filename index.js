let questionNumber = 0;
let score = 0;

// Generate html question
function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <form>
    <legend>${STORE[questionNumber].question}</legend>
    <fieldset>
    <label class="answerInput">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span class="answer">${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerInput">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span class="answer">${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerInput">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span class="answer">${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerInput">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span class="answer">${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

// Change question number
function changeQuestionNumber () {
    questionNumber ++;
  $('.questionNumber').text(questionNumber+1);
}

// Increment score
function changeScore () {
  score ++;
}

// On starting the quiz, hide the start div and display the quiz form div
function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

// Render the question in the DOM
function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

// Upon selecting answer, run right or wrong feedback
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

// Feedback for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="img/icon-golden-snitch.svg" alt="golden snitch icon"/></div><p><b>You are correct!</b></p><button type=button class="nextButton">Next</button></div>`);
}

// Feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="img/icon-sorting-hat.svg" alt="sorting hat icon"/></div><p><b>Wrong answer</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

// Update score
function updateScore () {
  changeScore();
  $('.score').text(score);
}

// Html for when quiz is finished
function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You're a wizard Harry!</h3><img src="img/logo-hp-glasses.png" alt="harry potter glasses icon"/><p>You got ${score} / 10</p><p>Your knowledge of the harry potter universe is excellent!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Almost there!</h3><img src="img/icon-golden-snitch.svg" alt="golden snitch icon"/><p>You got ${score} / 10</p><p>Practice a little more and you'll be ready to go to Hogwarts!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You've got work to do</h3><img src="img/icon-sorting-hat.svg" alt="sorting hat icon"/><p>You got ${score} / 10</p><p>With more practice you'll be able to pass this quiz in no time</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

// Clicking next
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

// Restart quiz
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

// Run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
