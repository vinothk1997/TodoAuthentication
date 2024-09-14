import { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPenToSquare,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
const Todo = ({ todoData }) => {
  const [items, setItems] = useState(todoData);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  function handleAddTodo() {
    if (title == "" || description == "") {
      return;
    }
    if (isEditing) {
      const updatedItems = items.map((item) =>
        item.key == currentItem.key
          ? { ...item, title: title, description: description }
          : item
      );
      setItems(updatedItems);
      setIsEditing(false);
      setTitle("");
      setDescription("");
    } else {
      const newItem = {
        key: items.length + 1,
        title: title,
        description: description,
        isCompleted: false,
      };
      setItems([...items, newItem]);
      setTitle("");
      setDescription("");
    }
  }

  function handleDeleteTodo(key) {
    setItems(items.filter((item) => item.key != key));
  }

  function handleEditTodo(currentItem) {
    const itemToEdit = items.find((item) => item.key == currentItem.key);
    setTitle(itemToEdit.title);
    setDescription(itemToEdit.description);
    setIsEditing(true);
    setCurrentItem(currentItem);
  }

  function handleTodoComplete(key) {
    const updatedItems = items.map((item) =>
      item.key === key ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    console.log(updatedItems);
  }
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
            <Form.Label htmlFor="inputPassword5">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label htmlFor="inputPassword5">Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleAddTodo}
          disabled={title === "" || description === ""}
          className="mt-2"
        >
          {isEditing ? "UpdateTodo" : "AddTodo"}
        </Button>
        <Table striped bordered hover className="mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {items.map((item) => (
            <tbody>
              <tr>
                <td>{item.key}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td
                  onClick={() => handleTodoComplete(item.key)}
                  style={{ border: "none" }}
                >
                  <span className={item.completed ? "text-success" : ""}>{item.completed ? "Completed" : "Not completed"}</span>
                </td>
                <td>
                  <button
                    className="m-2 text-primary"
                    onClick={() => handleEditTodo(item)}
                    style={{ border: "none" }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(item.key)}
                    className="text-danger"
                    style={{ border: "none" }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    </>
  );
};
export default Todo;
