import SpeechRecognitionHelper from './speech-recognition-helper';
import summaryHelper from './openai-summary-helper';

window.addEventListener('load', () => {
  const startButton = document.getElementById('start');
  const inputElement = document.querySelector('.input');
  const speech = new SpeechRecognitionHelper('nl-NL');

  if ( speech.available ) {
    startButton.style.display = 'block';
    startButton.addEventListener('click', async () => {
      if ( speech.listening ) {
        speech.stop();
        startButton.classList.remove('active');
        const inputText = inputElement.innerText;
        document.querySelectorAll('.input .final, .input .probable, .input .interim')
                .forEach(elm => elm.remove());
        inputElement.innerText = inputText;
      } else {
        speech.setSpeechHandler(text => {
          document.querySelector('#input .final').innerHTML = text.final;
          document.querySelector('#input .probable').innerHTML = text.probable;
          document.querySelector('#input .interim').innerHTML = text.interim;
        });

        inputElement.innerHTML += `
          <span class="final"></span>
          <span class="probable"></span>
          <span class="interim"></span>
        `;
        speech.start();
        startButton.classList.add('active');
      }
    });
  }

  const summaryButton = document.getElementById('summarize');
  const summaryOutput = document.getElementById('summary');

  summaryButton.addEventListener('click', async () => {
    const text = inputElement.innerText;
    summaryOutput.innerText = await summaryHelper(text, 100);
  });
});
