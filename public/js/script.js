'use strict';

const socket = io();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.lang = 'en-US'
recognition.interimResults = false

document.querySelector('.on-button').addEventListener('click', () => {
  console.log('******** START ********')
  recognition.start()
})

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.')
})

recognition.addEventListener('result', (evt) => {
  let last = evt.results.length - 1
  let text = evt.results[last][0].transcript

  console.log('Confidence: ', evt.results[0][0].confidence)
  console.log('User says: ', text)

  socket.emit('Chat message:', text)
})

recognition.addEventListener('speechend', () => {
  console.log('stop')
  recognition.stop();
});

function syntheticVoice(text) {
  const synth = window.speechSynthesis
  const utterance = new SpeechSynthesisUtterance()
  utterance.text = text
  synth.speak(utterance)
}

socket.on('bot reply', function(replyText) {
  if (replyText.split(' ').includes('timer')) {
    console.log('yes timer')
    syntheticVoice(replyText)
    setTimeout(function () {
      const timerMessage = `Time's up. Great Job.`
      syntheticVoice(timerMessage)
      clearTimeout()
    }, 2000)
    clearTimeout();
  } else {
    syntheticVoice(replyText)
  }

})

document.querySelector('.off-button').addEventListener('click', () => {
  console.log('^^^^^^^^ STOP ^^^^^^^^')
  recognition.stop()
})
