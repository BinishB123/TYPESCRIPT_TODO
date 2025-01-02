
import { ChangeEvent, useState } from 'react'
import './App.css'

interface TodoItems {
  id: number;
  todoName: string;
  isDone: boolean;
}

function App() {
  const [newValue, settingNewTodo] = useState<string>("")
  const [todos, settingTodosArray] = useState<TodoItems[]>([])
  const [editid, setedit] = useState< number | null>(null)


 


  const addTodo = () => {
    if (newValue.trim() != "") {
      const checker: TodoItems | undefined = todos.find((todo) => {
        return todo.todoName.trim() === newValue.trim()
      })
      if (!checker) {
        settingTodosArray([{ id: Date.now(), todoName: newValue, isDone: false }, ...todos,])
        settingNewTodo("")
      }
    }
  }
  const editClick = () => {
    if (newValue.trim() !== '') {
      const checker: TodoItems | undefined = todos.find((todo) => {
        return todo.id === editid
      })
      if (checker) {

        if (checker.todoName !== newValue) {
          const updatedTodo: TodoItems[] = todos.map((item) => {
            if (item.id === editid) {
              return { ...item, todoName: newValue }
            }
            return item
          })
          settingTodosArray(updatedTodo)

        }
      }
    }
    settingNewTodo("")
    setedit(null)
  }

  const removeItem = (id: number) => {
    let arr: TodoItems[] = []
    arr = todos.filter((item) => {
      return item.id !== id
    })
    settingTodosArray(arr)

  }

  const doneClick =(id:number)=>{
    
    
    const updatedTodo: TodoItems[] = todos.map((item) => {
      if (item.id === id) {
        console.log("okkyy");
        
        return { ...item, isDone: !item.isDone }
      }
      return item
    })
    console.log(updatedTodo);
    
    settingTodosArray(updatedTodo)
    setedit(null)
  }


  return (
    <>
      <div className='bg-gray-800 w-[100%] h-[775px]  flex flex-row items-center justify-center'>
        <div className='bg-green-950 w-[40%] h-[500px]  flex flex-col items-center rounded-lg space-y-6'>
          <div className=' w-[90%] h-[50px] flex flex-row justify-center items-end'>
            <h1 className='font-mono font-semibold text-3xl text-yellow-300 '>Todo-List</h1>
          </div>
          <div className=' w-[90%] h-[50px] flex flex-row justify-between '>
            <input className='w-[78%] h-[50px] rounded-lg' value={newValue} onChange={(e: ChangeEvent<HTMLInputElement>) => { settingNewTodo(e.target.value) }}></input>
            {
              editid ? <button className='w-[20%] h-[50px] text-center bg-black rounded-lg text-xl text-yellow-300' onClick={editClick}>Edit</button> :
                <button className='w-[20%] h-[50px] text-center bg-black rounded-lg text-xl text-yellow-300' onClick={addTodo}>Add</button>
            }
          </div>
          <div className=' w-[90%] h-[300px] space-y-3 overflow-y-scroll ' style={{ scrollbarWidth: "none" }}>
            {todos.length > 0 &&
              todos.map((todo) => (
                <div key={todo.id} className="bg-green-500 w-[100%] h-[60px] flex flex-row rounded-lg">
                  <div className="w-[70%] h-[60px] overflow-x-scroll" style={{ scrollbarWidth: 'none' }}>
                    <h1 className={`ml-3 mt-3 font-mono font-medium text-lg ${todo.isDone?'line-through':""}`}>{todo.todoName}</h1>
                  </div>
                  <div className="w-[30%] h-[60px] flex flex-row justify-center cursor-pointer">
                    <i className="ri-check-double-line h-[30px] w-[30%] mt-4" onClick={()=>{
                      doneClick(todo.id)
                    }}></i>
                    <i className="ri-pencil-line h-[30px] w-[30%] mt-4" onClick={() => {
                      setedit(todo.id)
                      settingNewTodo(todo.todoName)
                    }}></i>
                    <i className="ri-delete-bin-6-line h-[30px] w-[30%] mt-4" onClick={() => {
                      removeItem(todo.id)
                    }}></i>
                  </div>
                </div>
              ))}


          </div>

        </div>
      </div>
    </>
  )
}

export default App
