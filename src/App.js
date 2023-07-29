import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise-list.component";
import EditExercises from "./components/edit-exercises.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact element={<ExerciseList />} />
        <Route path="/edit/:id" element={<EditExercises />} />
        <Route path="/create" element={<CreateExercise />} />
        <Route path="/user" exact element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
