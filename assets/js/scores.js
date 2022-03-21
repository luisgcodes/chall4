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

function clearScores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}
document.querySelector('#clear').onClick = clearScores;

revealHighScores();