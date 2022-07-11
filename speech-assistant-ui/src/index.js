const loadTime = new Date();
let selected = 0;
const conversations = require('./conversations.js');

function renderList() {
  const list = document.querySelector('.conversation-list ul');
  list.innerHTML = '';
  const now = new Date() - loadTime;
  conversations.filter(conv => conv.meta.start < now && conv.meta.end > now)
               .forEach((conv, i) => {
    const entry = document.createElement('li');
    const time = (now - conv.meta.start)/1000;
    entry.innerHTML = `
      <a href="#">
        <span class="name">${conv.client.name}</span>
        <span class="timer">${Math.floor(time/60)}:${Math.floor(time%60)}</span>
        <span class="tags">${
          conv.client.tags.filter(tag => (conv.meta.start + tag.timestamp) < now)
                          .map(tag => `<span class='tag ${tag.class ? tag.class : ''}'>${tag.name}</span>`)
                          .join('')
        }</span>
      </a>`;
    entry.addEventListener('click', () => selected = i);
    list.appendChild(entry);
  });
}

function renderTranscript() {
  const conv = document.querySelector('.conversation');
  conv.innerHTML = '';
  const now = new Date() - loadTime;
  let lastElm;
  conversations[selected].transcript.filter(msg => (conversations[selected].meta.start + msg.timestamp) < now)
                                    .forEach(entry => {
    const message = document.createElement('div');
    const time = new Date(+loadTime + entry.timestamp);
    message.classList.add('message')
    message.classList.add(entry.caller ? 'caller' : 'computer')
    message.innerHTML = `<span class='text'>${entry.text}</span><span class='time'>${time.toLocaleTimeString()}</span>`;
    conv.appendChild(message);
    lastElm = message;
  });
  lastElm.scrollIntoView({
    block: 'end',
    inline: 'nearest',
    behavior: 'smooth'
  });
}

function updateTimers() {
  document.querySelectorAll('.timer').forEach(timer => {
    const time = timer.innerText.split(':');
    time[1] = +time[1] + 1;
    if ( time[1] > 59 ) {
      time[1] = 0;
      time[0] = +time[0] + 1;
    }
    if ( time[1] < 10 ) time[1] = `0${time[1]}`;
    timer.innerText = time.join(':');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setInterval(renderList, 5000);
  renderList();
  setInterval(updateTimers, 1000);
  setInterval(renderTranscript, 100);
  renderTranscript();
});
