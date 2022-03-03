export default class SpeechRecognitionHelper {
  constructor(language) {
    this._recorderDataAvailable = this._recorderDataAvailable.bind(this);
    this._recorderStop = this._recorderStop.bind(this);
    this.listening = false;
    this._firstStart = true;
    this._language = language;
    this.available =
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
    this._recordedChunks = [];
    this._resetText();
    this._createSpeechRecognizer();
  }

  async start() {
    this._resetText();
    this.listening = true;
    await this._recognizer.start();

    // this._stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // this._recorder = new MediaRecorder(this._stream);
    // this._recorder.addEventListener(
    //   "dataavailable",
    //   this._recorderDataAvailable
    // );
    // this._recorder.addEventListener("stop", this._recorderStop);
    // this._recorder.start();
  }

  _recorderDataAvailable(e) {
    this._recordedChunks.push(e.data);
  }

  _recorderStop(e) {
    // This is the end of the recording.
    const blob = new Blob(this._recordedChunks, {
      type: "audio/ogg; codecs=opus",
    });
    this._recordedChunks = [];
    const audioURL = window.URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.onerror = (e) => {
      console.error("audio error", e);
    };
    audio.src = audioURL;
    audio.controls = true;
    audio.addEventListener(
      "canplaythrough",
      () => {
        console.log({ duration: audio.duration });
      },
      false
    );
    document.body.appendChild(audio);
  }

  async stop() {
    this._recognizer.stop();
    // this._recorder.stop();
    this.listening = false;
    return this._text.final + this._text.probable + this._text.interim;
  }

  setSpeechHandler(func) {
    this._callback = func;
  }

  _resetText() {
    this._text = {
      final: "",
      probable: "",
      interim: "",
    };
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

  _createSpeechRecognizer() {
    this._recognizer = this._newSpeechRecognizer();
    this._recognizer.continuous = true;
    this._recognizer.interimResults = true;
    this._recognizer.lang = this._language;
    // this._recognizer.maxAlternatives = 5;  // Cool if we want to have a human pick the best recognition / translation

    // This (audioend) keeps happening after a while, for unknown reasons.
    // Maybe just kick off a new SpeechRecognition when it happens..?
    this._recognizer.addEventListener("audioend", (e) =>
      console.log(`Audio capture stopped`, e)
    );
    this._recognizer.addEventListener("end", (e) =>
      console.log(`Speech recognition stopped`, e)
    );
    this._recognizer.addEventListener("error", (e) =>
      console.error(`Speech recognition errored!`, e)
    );

    this._recognizer.addEventListener("result", (e) => {
      let interimTranscript = "";
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        if (e.results[i].isFinal) {
          this._text.final += e.results[i][0].transcript;
          this._text.probable = "";
          this._text.interim = "";
          if (this.listening) this._callback(this._text);
        } else if (e.results[i][0].confidence > 0.7) {
          this._text.probable = e.results[i][0].transcript;
          this._text.interim = "";
          if (this.listening) this._callback(this._text);
        } else {
          interimTranscript += e.results[i][0].transcript;
          this._text.interim = interimTranscript;
          if (this.listening) this._callback(this._text);
        }
      }
    });
  }

  _newSpeechRecognizer() {
    if ("SpeechRecognition" in window)
      return new SpeechRecognition.SpeechRecognition();
    if ("webkitSpeechRecognition" in window)
      return new webkitSpeechRecognition();
    throw new Error("No SpeechRecognizer available");
  }
}
