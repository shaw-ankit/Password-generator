import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'
function App() {
  //giving state to the components 
  const[length,setLength] = useState(8)
  const[numberNeeded,setNumberNeeded] = useState(false)
  const[charNeeded,setCharNeeded] = useState(false)
  const[dataInInputfield,setDataInInputfield] = useState("")
    //useREf hook
    const passwordRef = useRef(null)
  //making a password generator method
    const passwordGenerator = useCallback(()=> {
      let pass = ""
      let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if (numberNeeded){ str+= "0123456789" }
      if (charNeeded){ str+= "~!@#$%^&*`-_" }

      for(let i = 1 ; i<=length ; i++){
        let char = ~~(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setDataInInputfield(pass)

    } , [length,numberNeeded,charNeeded,setDataInInputfield])

    const copyPasswordToClipboard = useCallback(()=> {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(dataInInputfield)
    },[dataInInputfield])

    useEffect(()=>{passwordGenerator()
    } ,  [length,numberNeeded,charNeeded,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg rounded-md px-4 my-8 text-green-600 bg-gray-700'>
        <h2 className='text-white text-center my-3 font-medium'>PassWord Generator</h2>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={dataInInputfield}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={5}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className=' flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={numberNeeded}
            id="numberInput"
            onChange={()=>{
              setNumberNeeded((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className=' flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={charNeeded}
            id="characterInput"
            onChange={()=>{
              setCharNeeded((prev) => !prev);
            }}
            />
              <label htmlFor="characterInput">Symbols</label>
          </div>
        </div>
        <button onClick={passwordGenerator}>Regenerate</button>
      </div>

    </>
  )
}

export default App
