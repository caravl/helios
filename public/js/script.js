// invoke an instance of SpeechRecognition(the controller interface of the Web Speech API for voice recognition)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.lang = 'en-US'
recognition.interimResults = false

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

  // sockets here
})
