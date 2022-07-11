const loadTime = new Date();
const selected = 0;
const conversations = [
  {
    meta: {
      start: -3000,
      end: 134350
    },
    client: {
      name: "Roald Dijkstra",
      tags: ["medicatie", "paniek"]
    },
    transcript: [
      {
        timestamp: -2000,
        text: "Hallo",
        caller: true
      },
      {
        timestamp: -1000,
        text: "Ik wil graag een herhaalrecept aanvragen",
        caller: true
      },
      {
        timestamp: 3000,
        text: "Mijn valsartan is op",
        caller: true
      },
      {
        timestamp: 8000,
        text: "Mag ik daar een nieuwe van?",
        caller: true
      }
    ]
  },
  {
    meta: {
      start: -167000,
      end: 134350
    },
    client: {
      name: "Bob van der Linden",
      tags: ["medicatie", "paniek"]
    },
    transcript: [
      {
        timestamp: new Date(),
        text: "Hello world"
      }
    ]
  },
  {
    meta: {
      start: -279000,
      end: 134350
    },
    client: {
      name: "Yannick Donners",
      tags: ["medicatie", "paniek"]
    },
    transcript: [
      {
        timestamp: new Date(),
        text: "Hello world"
      }
    ]
  },
  {
    meta: {
      start: 2000,
      end: 134350
    },
    client: {
      name: "Tim Franssen",
      tags: ["medicatie", "paniek"]
    },
    transcript: [
      {
        timestamp: new Date(),
        text: "Hello world"
      }
    ]
  },
];

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
        ${conv.client.name}
        <span class="timer">${Math.floor(time/60)}:${Math.floor(time%60)}</span>
      </a>`;
    entry.addEventListener('click', () => selected = i);
    list.appendChild(entry);
  });
}

function renderTranscript() {
  const conv = document.querySelector('.conversation');
  conv.innerHTML = '';
  const now = new Date() - loadTime;
  conversations[selected].transcript.filter(msg => msg.timestamp < now)
                                    .forEach(entry => {
    const message = document.createElement('div');
    const time = new Date(loadTime + entry.timestamp);
    message.classList.add('message')
    message.classList.add(entry.caller ? 'caller' : 'computer')
    message.innerHTML = `<span class='text'>${entry.text}</span><span class='time'>${time.toLocaleTimeString()}</span>`;
    conv.appendChild(message);
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
