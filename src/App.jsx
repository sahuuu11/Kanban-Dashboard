import react from 'react';
import './App.css'
import KanbanBoard from './Components/KanbanBoard'
import { TaskProvider } from './context/TaskContext';

function App() {

  return (
     <TaskProvider>
      <KanbanBoard />
    </TaskProvider>
  )
}

export default App
