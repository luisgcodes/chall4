function revealHighScores() {
    var hScores = JSON.parse(window.localStorage.getItem('hScores')) || [];
};

hScores.forEach(function (score) {
    var tag = document.createElement('li');
    tag.textContent = score.initials+ ' . ' + score.score;

    var olEl = document.querySelector('hScores');
    window.location.reload();
})

function clearScores() {
    window.localStorage.removeItem('hScores');
    window.location.reload();
}
document.querySelector('#clear').onClick = clearScores;

revealHighScores();