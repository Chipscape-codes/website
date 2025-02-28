var modal = document.getElementById('id01');
var learn = document.getElementById('learn');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";

    }
}

window.onclick = function(event) {
    if (event.target == learn) {
        modal.style.display = "none";

    }
}

/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("demo");
        let captionText = document.getElementById("caption");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        captionText.innerHTML = dots[slideIndex - 1].alt;
    }

    let Questions = [];
    const ques = document.getElementById("ques");
    
    async function fetchQuestions() {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
            if (!response.ok) {
                throw new Error(`Something went wrong! Unable to fetch the data`);
            }
            const data = await response.json();
            Questions = data.results;
        } catch (error) {
            console.log(error);
            ques.innerHTML = `##### ${error}`;
        }
    }
    
    fetchQuestions();
    
    let currQuestion = 0;
    let score = 0;
    
    function loadQues() {
        const opt = document.getElementById("opt");
        let currentQuestion = Questions[currQuestion].question;
        ques.innerText = currentQuestion;
        opt.innerHTML = "";
        const correctAnswer = Questions[currQuestion].correct_answer;
        const incorrectAnswers = Questions[currQuestion].incorrect_answers;
        const options = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);
        
        options.forEach((option) => {
            const choicesdiv = document.createElement("div");
            const choice = document.createElement("input");
            const choiceLabel = document.createElement("label");
            choice.type = "radio";
            choice.name = "answer";
            choice.value = option;
            choiceLabel.textContent = option;
            choicesdiv.appendChild(choice);
            choicesdiv.appendChild(choiceLabel);
            opt.appendChild(choicesdiv);
        });
    }
    
    function nextQuestion() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
            if (selectedOption.value === Questions[currQuestion].correct_answer) {
                score++;
            }
            currQuestion++;
            if (currQuestion < Questions.length) {
                loadQues();
            } else {
                loadScore();
            }
        } else {
            alert("Please select an answer!");
        }
    }
    
    function loadScore() {
        const totalScore = document.getElementById("score");
        totalScore.textContent = `You scored ${score} out of ${Questions.length}`;
    }