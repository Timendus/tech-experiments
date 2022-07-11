module.exports = [

  {
    meta: {
      start: -3000,
      end: 120000
    },
    client: {
      name: "Tim Franssen",
      tags: [
        {
          name: "herhaalrecept",
          timestamp: 6000
        },
        {
          name: "hulp gewenst",
          class: "intervention",
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
      },
      {
        timestamp: 11000,
        text: "Voor mijzelf",
        caller: true
      },
      {
        timestamp: 13000,
        text: "Ok! Als ik het goed begrijp wilt u Valsartan voor meneer Tim Franssen aanvragen.",
        caller: false
      },
      {
        timestamp: 15000,
        text: "Dat klopt",
        caller: true
      },
      {
        timestamp: 18000,
        text: "Dan ga ik dat regelen voor u! Mochten er nog vragen zijn, dan belt de assistente u nog even terug. Vanmiddag kunt u uw recept ophalen bij apotheek De Vooruitgang aan de Parallelstraat 12 in Groenlo.",
        caller: false
      },
      {
        timestamp: 20000,
        text: "Heeft u nog verdere vragen?",
        caller: false
      },
      {
        timestamp: 23000,
        text: "Nee, dat was het.",
        caller: true
      },
      {
        timestamp: 25000,
        text: "Dan wens ik u nog een hele fijne dag!",
        caller: false
      },
      {
        timestamp: 25000,
        choice: [ "Recept doorzetten naar HIS", "Patiënt terugbellen" ]
      }
    ]
  },

  {
    meta: {
      start: -20000,
      end: 30000
    },
    client: {
      name: "Remy Bruijnzeels",
      tags: [
        {
          name: "afspraak maken",
          timestamp: 2000
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
        text: "Ik wil graag een afspraak maken",
        caller: true
      },
      {
        timestamp: 5000,
        text: "Er zijn momenteel vijf wachtenden voor u. Mogelijk kan ik u in de tussentijd alvast verder helpen. Klopt het dat u een afspraak wilt maken? Mag ik dan alvast uw naam?",
        caller: false
      },
      {
        timestamp: 8000,
        text: "Mijn naam is Remy Bruijnzeels",
        caller: true
      },
      {
        timestamp: 11000,
        text: "Ok, meneer Bruijnzeels. Kunt u een korte omschrijving geven van uw klachten?",
        caller: false
      },
      {
        timestamp: 13000,
        text: "Ik heb last van mijn enkel. Ik heb moeite met lopen en hij ziet er wat blauw uit.",
        caller: true
      },
      {
        timestamp: 15000,
        text: "Even kijken... Ik heb vrijdag om tien over 9 nog een plekje. Komt dat ook uit voor u?",
        caller: false
      },
      {
        timestamp: 18000,
        text: "Nee, dan moet ik naar de fysiotherapeut",
        caller: true
      },
      {
        timestamp: 20000,
        text: "Ok, dan heb ik vrijdag om 1 uur ook nog een plekje. Past u dat?",
        caller: false
      },
      {
        timestamp: 23000,
        text: "Ja, dan kan ik wel.",
        caller: true
      },
      {
        timestamp: 26000,
        text: "Dan schiet ik de afspraak in bij Huistarts Berker-Eskens op vrijdag om 1 uur.",
        caller: false
      },
      {
        timestamp: 29000,
        text: "Heeft u verder nog vragen?",
        caller: false
      },
      {
        timestamp: 31000,
        text: "Nee",
        caller: true
      },
      {
        timestamp: 33000,
        text: "Dan wens ik u nog een hele fijne dag en zien we u gauw. Mocht u toch niet kunnen, laat het ons dan nog even weten.",
        caller: false
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
        timestamp: 0,
        text: "U bent verbonden met Huisartsenpraktijk Grolle. Toets 1 voor spoed of spreek kort in waar u voor belt.",
        caller: false
      },
      {
        timestamp: 2000,
        text: "Ik wil even weten of de uitslag van mijn bloedtest al binnen is.",
        caller: true
      },
      {
        timestamp: 5000,
        text: "Er zijn momenteel vijf wachtenden voor u. Mogelijk kan ik u in de tussentijd alvast verder helpen. Klopt het dat u uw labuitslag wilt opvragen?",
        caller: false
      },
      {
        timestamp: 8000,
        text: "Ja, van mijn bloedtest",
        caller: true
      },
      {
        timestamp: 11000,
        text: "Ok, mag ik dan uw naam?",
        caller: false
      },
      {
        timestamp: 13000,
        text: "Yannick Donners",
        caller: true
      },
      {
        timestamp: 15000,
        text: "Even kijken... De uitslag is binnen! Zal ik voor u inplannen dat de assistente u nog even belt?",
        caller: false
      },
      {
        timestamp: 18000,
        text: "Nee, ik wil graag weten wat de uitslag is",
        caller: true
      },
      {
        timestamp: 20000,
        text: "De assistente licht graag de uitslag even voor u toe. Bent u tussen 2 en 4 bereikbaar?",
        caller: false
      },
      {
        timestamp: 23000,
        text: "Ja",
        caller: true
      },
      {
        timestamp: 26000,
        text: "Dan belt de assistente u vanmiddag tussen 2 en 4 met uitleg over uw uitslag.",
        caller: false
      },
      {
        timestamp: 29000,
        text: "Heeft u verder nog vragen?",
        caller: false
      },
      {
        timestamp: 31000,
        text: "Nee",
        caller: true
      },
      {
        timestamp: 33000,
        text: "Dan wens ik u nog een hele fijne dag!",
        caller: false
      }
    ]
  },

  {
    meta: {
      start: 2000,
      end: 134350
    },
    client: {
      name: "Anne Wieskamp - te Linde",
      tags: [
        {
          name: "ontevreden",
          timestamp: 14000
        },
        {
          name: "hulp gewenst",
          class: "intervention",
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
        text: "Ik wil de dokter spreken",
        caller: true
      },
      {
        timestamp: 5000,
        text: "Er zijn momenteel vijf wachtenden voor u. Mogelijk kan ik u in de tussentijd alvast verder helpen. Klopt het dat u een afspraak wilt maken? Mag ik dan alvast uw naam?",
        caller: false
      },
      {
        timestamp: 8000,
        text: "Nee, ik wil nu gewoon de dokter spreken",
        caller: true
      },
      {
        timestamp: 11000,
        text: "Kunt u mij dan kort vertellen waar u voor belt?",
        caller: false
      },
      {
        timestamp: 13000,
        text: "Dat zei ik toch, ik wil de huisarts spreken.",
        caller: true
      },
      {
        timestamp: 15000,
        text: "Klopt het dat u een afspraak wilt maken? Mag ik dan alvast uw naam?",
        caller: false
      },
      {
        timestamp: 18000,
        text: "Nee! Verbind mij nou toch gewoon door!",
        caller: true
      },
      {
        timestamp: 20000,
        text: "De assistente kan u op dit moment het beste verder helpen. Er zijn momenteel nog vier wachtenden voor u. Een ogenblik geduld alstublieft.",
        caller: false
      }
    ]
  },

];
