const allQuestions = [
      { q: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
      { q: "Which planet is known as the Red Planet?", options: ["Venus", "Saturn", "Mars", "Earth"], answer: "Mars" },
      { q: "Who wrote 'Hamlet'?", options: ["Keats", "Shakespeare", "Hemingway", "Plato"], answer: "Shakespeare" },
      { q: "H2O is the chemical formula of?", options: ["Hydrogen", "Oxygen", "Water", "Salt"], answer: "Water" },
      { q: "Which is the largest continent?", options: ["Africa", "Asia", "Australia", "Europe"], answer: "Asia" },
      { q: "Which animal is known as the Ship of the Desert?", options: ["Camel", "Horse", "Elephant", "Lion"], answer: "Camel" },
      { q: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
      { q: "How many players in a football team?", options: ["9", "10", "11", "12"], answer: "11" },
      { q: "The Sun rises in the?", options: ["North", "South", "East", "West"], answer: "East" },
      { q: "Which is the fastest land animal?", options: ["Tiger", "Leopard", "Cheetah", "Lion"], answer: "Cheetah" },
      { q: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
      { q: "Which metal is liquid at room temperature?", options: ["Mercury", "Iron", "Gold", "Copper"], answer: "Mercury" },
      { q: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: "12" },
      { q: "How many legs does a spider have?", options: ["6", "8", "10", "12"], answer: "8" },
      { q: "Which country is known as the Land of Rising Sun?", options: ["China", "Japan", "Thailand", "South Korea"], answer: "Japan" },
      { q: "Which is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
      { q: "Which is the longest river in the world?", options: ["Amazon", "Yangtze", "Nile", "Ganga"], answer: "Nile" },
      { q: "What is the main gas found in the air we breathe?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Nitrogen" },
      { q: "How many colours are there in a rainbow?", options: ["6", "7", "8", "9"], answer: "7" },
      { q: "Which organ pumps blood in our body?", options: ["Lungs", "Liver", "Heart", "Kidney"], answer: "Heart" },
      { q: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: "Newton" },
      { q: "Which is the largest mammal?", options: ["Elephant", "Whale", "Giraffe", "Shark"], answer: "Whale" },
      { q: "What is 15 + 6?", options: ["20", "21", "22", "23"], answer: "21" },
      { q: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: "Mercury" },
      { q: "How many hours in two days?", options: ["24", "36", "48", "60"], answer: "48" }
    ];

    let quiz = [];
    let currentIndex = 0;
    let score = 0;
    let usedQuestions = [];

    function startQuiz(force = false) {
      if (force || usedQuestions.length >= allQuestions.length) {
        usedQuestions = [];
      }
      const available = allQuestions.filter(q => !usedQuestions.includes(q.q));
      quiz = shuffle([...available]).slice(0, 5);
      usedQuestions.push(...quiz.map(q => q.q));
      currentIndex = 0;
      score = 0;
      document.getElementById("result-box").classList.add("hidden");
      document.getElementById("quiz-box").classList.remove("hidden");
      loadQuestion();
    }

    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    function loadQuestion() {
      const q = quiz[currentIndex];
      document.getElementById("question-number").textContent = `Question ${currentIndex + 1} of ${quiz.length}`;
      document.getElementById("question-text").textContent = q.q;

      const container = document.getElementById("options-container");
      container.innerHTML = "";

      q.options.forEach(opt => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = opt;
        div.onclick = () => selectOption(div, opt);
        container.appendChild(div);
      });
    }

    function selectOption(div, selectedOption) {
      const options = document.querySelectorAll(".option");
      options.forEach(opt => opt.classList.remove("selected"));
      div.classList.add("selected");
      quiz[currentIndex].selected = selectedOption;
    }

    function nextQuestion() {
      const selected = quiz[currentIndex].selected;
      if (!selected) {
        alert("Please select an answer!");
        return;
      }

      if (selected === quiz[currentIndex].answer) {
        score++;
      }

      currentIndex++;

      if (currentIndex < quiz.length) {
        loadQuestion();
      } else {
        document.getElementById("quiz-box").classList.add("hidden");
        document.getElementById("result-box").classList.remove("hidden");
        document.getElementById("score").textContent = score;
      }
    }

    window.onload = () => startQuiz();