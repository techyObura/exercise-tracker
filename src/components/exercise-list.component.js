import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `on ${year}-${month}-${day}   | ${hours}:${minutes}`;
};

const Exercise = ({ exercise, deleteExercise }) => {
  const formattedDate = formatDateTime(exercise.date);
  return (
    <tr>
      <td style={{ textTransform: "capitalize" }}>{exercise.username}</td>
      <td style={{ textTransform: "capitalize" }}>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{formattedDate}</td>

      <td>
        <Link to={`/edit/${exercise._id}`}>edit</Link> |
        <button
          onClick={() => {
            deleteExercise(exercise._id);
          }}
        >
          {" "}
          delete
        </button>
      </td>
    </tr>
  );
};

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        const exercises = response.data;
        this.setState({ exercises });
      })
      .catch((error) => console.log(error));
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((response) => console.log(response.data));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
          id={currentExercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
