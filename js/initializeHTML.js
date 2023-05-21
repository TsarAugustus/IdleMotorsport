function initializeHTML() {
    let body = document.body;

    let gameEnableDiv = document.createElement('div');
    gameEnableDiv.id = 'gameEnableDiv';

    let gameEnableText = document.createElement('p');
    gameEnableText.innerHTML = '<p>Enable Game?</p>';
    gameEnableDiv.appendChild(gameEnableText);

    let gameEnabledButton = document.createElement('input');
    gameEnabledButton.setAttribute('type', 'checkbox');
    gameEnabledButton.id = 'gameEnabledButton';
    gameEnableDiv.appendChild(gameEnabledButton);

    let startButton = document.createElement('button');
    startButton.innerHTML = 'START';
    startButton.addEventListener('click', () => start()); 

    gameEnableDiv.appendChild(startButton);

    body.appendChild(gameEnableDiv);
}

export { initializeHTML }