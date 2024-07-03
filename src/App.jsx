import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  // useState hooks
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hooks
  const passwordRef = useRef(null);

  // useCallback hooks
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numbersAllowed, charAllowed, setPassword])

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  // useEffect hooks
  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charAllowed, passwordGenerator])

  return (
    <div className='h-screen w-full bg-black flex flex-col flex-wrap items-center justify-center'>

      <div className='text-white bg-slate-600 mb-28 p-4 rounded-xl'>

        {/* heading-------------------------------- */}
        <h1 className='text-white text-center pt-4 text-3xl font-bold'>PASSWORD GENERATOR</h1>

        {/* input box and copy--------------------- */}
        <div className='flex justify-center items-center gap-2'>
          <input className="mt-6 p-2 w-96 rounded-lg text-orange-800" type='text' readOnly placeholder='Password..'
            value={password} ref={passwordRef}></input>
          <button className='bg-blue-700 mt-6 p-2 rounded-lg'
            onClick={copyToClipboard}>copy</button>
        </div>

        {/* length , number , characters----------- */}
        <div className='flex flex-wrap mt-4 gap-2'>

          <input type='range' min={8} max={50} value={length} onChange={(e) => setLength(e.target.value)}></input>
          <p>Length: {length}</p>

          <input type='checkbox' defaultChecked={numbersAllowed} onChange={() => setNumbersAllowed((prev) => !prev)}></input>
          <p>Numbers</p>

          <input type='checkbox' defaultChecked={numbersAllowed} onChange={() => setCharAllowed((prev) => !prev)}></input>
          <p>Characters</p>
        </div>

      </div>

    </div>
  )
}

export default App
