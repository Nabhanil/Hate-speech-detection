import { useState } from 'react';
import './App.css';

const url = 'https://api.api-ninjas.com/v1/profanityfilter?text=';
const url2 = 'https://api.api-ninjas.com/v1/sentiment?text=';
const apiKey = 'dMolIWcWQDFmhzxSZLUTsg==XAwJJJdqVhexmLgr';

function App() {
  const [data, setData] = useState({});
  const [inputText, setInputText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [hasProfanity, setHasProfanity] = useState(null);
  const [sentiment,setSentiment] = useState('')
  const [score , setScore] = useState(1)
 

  const filter = () => {
    if (!inputText.trim()) {
      return;
    }

    fetch(url + encodeURIComponent(inputText), {
      headers: {
        'X-Api-Key': apiKey
      }
    })
    .then(res => res.json())
    .then(data => {
      setData(data);
      setShowResult(true);
      console.log(data);
      setHasProfanity(data.has_profanity ? 'contains' : 'does not contain'); // Set state based on API response
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    
    fetch(url2 + encodeURIComponent(inputText), {
      headers: {
        'X-Api-Key': apiKey
      }
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);
      setSentiment(data.sentiment)
      setScore(data.score)
    })
    .catch(error => {
      console.error('Error fetching sentiment data:', error);
    });
  }

  return (
    <div className="fixed h-[100vh] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="mx-auto my-10 h-auto w-[50%] rounded-3xl border-2 border-orange-500 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-2 py-2">
        <h1 className="my-2 text-center font-serif font-bold text-white">Welcome to the hate speech detection project</h1>
        <p className="mx-2 my-2 text-wrap text-center text-white"><span className="text-lg font-bold text-red-800">*Note: </span>Here is an input box where you can give your speech to censor it and detect the tone of the speech</p>
        <div className="mx-3 flex h-auto w-full px-1">
          <input 
            type="text"
            placeholder="Enter your text here"
            className="mx-2 my-5 h-auto w-[70%] rounded-xl border-none px-2 py-2 outline-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button 
            className="my-5 h-10 w-24 rounded-2xl border-2 border-orange-500 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 active:border-red-600"
            onClick={filter}
          >
            Filter
          </button>
        </div>
        {showResult && (
          <div className="mx-3 h-auto w-full px-1">
            <p className="mx-2 my-2 text-wrap text-left text-white"><span className="text-lg font-bold text-red-800">Note:</span> This text is censored</p>
            <input 
              type="text" 
              placeholder="Enter your text here" 
              className="mx-2 my-5 h-auto w-[70%] rounded-xl border-none px-2 py-2 outline-none" 
              value={data.censored}
              readOnly 
            />
            <h3 className='my-2 text-center font-serif font-bold text-white'>This text {hasProfanity} hate speech</h3>
            <h3 className='my-2 text-center font-serif font-bold text-white'>This text is <span className='text-black bg-green-700 px-2 py-1'>{sentiment}</span> with <span className='text-black bg-green-700 px-2 py-1'>{score}</span></h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
