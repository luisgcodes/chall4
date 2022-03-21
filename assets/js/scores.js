function revealHighScores() {
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    highscores.sort(function (B, A) {
        return A.score - B.score;
      });

highscores.forEach(function (score) {
    var tag = document.createElement("li");
    tag.textContent = score.initials + ' - ' + score.score;

    var olEl = document.querySelector('#highscores');
    olEl.appendChild(tag);
});
}


var clearEl = document.querySelector('#clear');
clearEl.addEventListener('click', function() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
});


revealHighScores();