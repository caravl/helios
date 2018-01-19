'use strict';

// initiate sockets
var socket = io();

// invoke an instance of SpeechRecognition(the controller interface of the Web Speech API for voice recognition)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.lang = 'en-US'
recognition.interimResults = false // return results that are final
recognition.continuous = true // continuous results for each recognition
// continues until read through each response 2x


// capture the DOM reference for the button and listen for the click event to initiate speech recognition
// when the button is clicked, speech recognition begins
document.querySelector('button').addEventListener('click', () => {
  recognition.start()
})
/* ----------- speech recognition has started -------------- */

// result event is used to retrieve what is said into text
recognition.addEventListener('result', (evt) => {
  let last = evt.results.length - 1
  let text = evt.results[last][0].transcript
  // returns a SpeechRecognitionResultList {} containing the evt.result and retrieve the text in an array

  console.log('Confidence: ', evt.results[0][0].confidence)
  console.log('text: ', text)

  // sockets emit to server
  socket.emit('chat message', text) // emits to server there's a chat message and pass in what was said
})

/* --------- GENERATE A SYNTHETIC VOICE ------------- */
// to create a synthetic voice for our AI, we'll use `SpeechSynthesis` controller interface of the Web Speech API

// function takes a string as an argument and enables the browser to speak the text
function syntheticVoice(text) {
  // create a reference to the API entry point (the browser window)
  const synth = window.speechSynthesis
  // create a new instance of `SpeechSynthesisUtterance` using its constructor and set the text that will be synthesized when the utterance is spoken
  const utterance = new SpeechSynthesisUtterance()
  // set the new utterance's text to the text passed in
  utterance.text = text
  // use the SpeechSynthesis.speak() to let it speak
  synth.speak(utterance)
}

/* --------- GET RESPONSE FROM SERVER USING SOCKET ------------- */
// browser socket on getting a bot reply, take the reply and pass the reply into the function that generates synthetic voice
socket.on('bot reply', function(replyText) {
  // if response doesn't meet significant recognition
  // recognition.onnomatch()

  // if reply has 'timer' in it, reply with 'Ok I'll set a timer'
  // and setTimeout with a timer up by sythenticVoice('what I want it to say')
  setTimeout(function () {
    console.log('setTimeout') // logs after 5 seconds
    syntheticVoice(replyText)
  }, 5000)
  // syntheticVoice(replyText)
})
