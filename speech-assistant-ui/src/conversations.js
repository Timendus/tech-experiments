module.exports = [

  {
    meta: {
      start: -3000,
      end: 134350
    },
    client: {
      name: "Roald Dijkstra",
      tags: [
        {
          name: "herhaalrecept",
          timestamp: 5000
        },
        {
          name: "paniek",
          timestamp: 20000
        }
      ]
    },
    transcript: [
      {
        timestamp: 0,
        text: "U bent verbonden met Huisartsenpraktijk Grolle. Toets 1 voor spoed of spreek kort in waar u voor belt.",
        caller: false
      },
      {
        timestamp: 2000,
        text: "Mijn Valsartan is op, voor mijn hoge bloeddruk",
        caller: true
      },
      {
        timestamp: 4000,
        text: "Er zijn momenteel vijf wachtenden voor u. Mogelijk kan ik u in de tussentijd alvast verder helpen. Klopt het dat u een herhaalrecept wilt aanvragen?",
        caller: false
      },
      {
        timestamp: 6000,
        text: "Ja, voor Valsartan",
        caller: true
      },
      {
        timestamp: 8000,
        text: "Voor wie is dit herhaalrecept?",
        caller: false
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
      tags: [
        {
          name: "wachtrij",
          timestamp: 20000
        }
      ]
    },
    transcript: [
      {
        timestamp: 500,
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
      tags: [
        {
          name: "labuitslagen",
          timestamp: 10000
        }
      ]
    },
    transcript: [
      {
        timestamp: 2000,
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
      tags: [
        {
          name: "afspraak",
          timestamp: 5000
        }
      ]
    },
    transcript: [
      {
        timestamp: 2000,
        text: "Hello world"
      }
    ]
  },

];
