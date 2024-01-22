import React, { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(6);
  const [addNum, setAddNum] = useState(false);
  const [addChar, setAddChar] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (addNum) string += '0123456789';
    if (addChar) string += '!@#$%^&*(){}[]|\?/><~`';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * string.length + 1)
      pass += string.charAt(char);
    }
    setPassword(pass)

  }, [length, addChar, addNum, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, addNum, addChar, passwordGenerator]);

  return (
    <div className="min-w-full bg-gray-500 min-h-screen grid place-content-center text-center">
      <div>
        <h1 className="text-2xl md:text-4xl text-orange-400 font-bold tracking-wider mb-8">Password Generatore</h1>
      </div>
      <div className="bg-gray-700/30 w-[70vw] lg:w-[60vw] rounded-md mt-4 p-4 text-white">
        <div className="w-full rounded-md overflow-hidden flex mb-4 mx-auto">
          <input
            type="text"
            value={password}
            className="w-full rounded-none p-2 text-orange-500 outline-none border-none tracking-wider text-xl"
            readOnly
            ref={passwordRef}
          />
          <button
            type="button"
            className="shrink-0 bg-green-500 px-2 hover:text-orange-500 hover:bg-green-400 duration-300"
            onClick={copyPassword}
          >Copy</button>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-green-500 px-2 rounded hover:text-orange-500 hover:bg-green-400 duration-300 font-bold text-xl"
              onClick={() => setLength((prev) => prev - 1)}
            >-</button>
            <p>Length ( <span className="text-orange-500 font-bold">{length}</span> )</p>
            <button
              type="button"
              className="bg-green-500 px-2 rounded hover:text-orange-500 hover:bg-green-400 duration-300 font-bold text-xl"
              onClick={() => setLength((prev) => prev + 1)}
            >+</button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="addnumber"
              onChange={() => setAddNum((prev) => !prev)}
            />
            <label htmlFor="addnumber" className={`${addNum && 'text-orange-500'} cursor-pointer`}>Add Number</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="addchar"
              onChange={() => setAddChar((prev) => !prev)}
            />
            <label htmlFor="addchar" className={`${addChar && 'text-orange-500'} cursor-pointer`}>Add Charecters</label>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={passwordGenerator}
            className="bg-green-500 px-2 py-1 rounded my-3 hover:text-orange-500 hover:bg-green-400 duration-300">Generate New</button>
        </div>
      </div>
    </div>
  )
}

export default App
