import { useEffect, useState, useRef } from "react";
import { fetchTodos } from "../data/todos";
import { Button, Modal, Form, Table, Badge } from "react-bootstrap";

const Todos = () => {
  const idRef = useRef();
  const titleRef = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [todosRaw, setTodosRaw] = useState([]);
  const [onlyWaiting, setOnlywaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    const fetchedTodos = fetchTodos();
    setTodosRaw(fetchedTodos);
  }, []);

  const filteredTodos = onlyWaiting
    ? todosRaw.filter((todo) => !todo.completed)
    : todosRaw;

  const numPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIdx = (curPage - 1) * itemsPerPage;
  const paginatedTodos = filteredTodos.slice(startIdx, startIdx + itemsPerPage);

  const deleteClicked = (id) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  const warningClicked = (id) => {
    const foundTodo = todosRaw.find((todo) => {
      return todo.id === id;
    });
    foundTodo.completed = true;

    setTodosRaw([...todosRaw]);
  };
  const saveClicked = (id, title) => {
    console.log(id, title);
    if (title.trim() !== "") {
      setTodosRaw([
        ...todosRaw,
        {
          userId: 1,
          id,
          title,
          completed: false,
        },
      ]);
    }

    handleClose();
  };
  useEffect(() => {
    setCurPage(1);
  }, [onlyWaiting, itemsPerPage]);

  const nextId =
    todosRaw.reduce((p, todo) => (p < todo.id ? todo.id : p), 0) + 1;

  useEffect(() => {
    idRef.current = nextId;
  }, [nextId]);

  return (
    <div className="todos-container">
      <Form>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex m-2">
            <Form.Check
              type="switch"
              id="custom-switch"
              className="mt-2 me-2"
              label="Show only"
              onChange={(e) => setOnlywaiting(e.target.checked)}
            />
            <Button className="opacity-100" disabled variant="warning">
              Waiting&nbsp;<i className="bi bi-clock"></i>
            </Button>
          </div>

          <Form.Select
            aria-label="Items per page"
            className="w-25"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </Form.Select>
        </div>
      </Form>

      <div>
        <Table striped hover >
          <thead className="table-dark align-middle">
            <tr>
              <th className="text-center" style={{ width: "3rem" }}>
                ID
              </th>
              <th className="text-center ">Title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed
                <Button
                  variant="primary"
                  className="ms-3 btn-plus"
                  onClick={handleShow}
                >
                  +
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTodos.map((todo) => (
              <tr key={todo.id}>
                <td className="text-center">
                  <h5>
                    <Badge bg="secondary">{todo.id}</Badge>
                  </h5>
                </td>
                <td>{todo.title}</td>
                <td className="text-end">
                  {todo.completed ? (
                    <h5>
                      <Badge bg="success">
                        done&nbsp;<i className="bi bi-check"></i>
                      </Badge>
                      <span>
                        <Button
                          onClick={() => deleteClicked(todo.id)}
                          style={{ marginLeft: "15px" }}
                          variant="danger"
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </span>
                    </h5>
                  ) : (
                    <h5>
                      <Button
                        onClick={() => warningClicked(todo.id)}
                        variant="warning"
                      >
                        Waiting&nbsp;<i className="bi bi-clock"></i>
                      </Button>
                      <span>
                        <Button
                          onClick={() => deleteClicked(todo.id)}
                          style={{ marginLeft: "15px" }}
                          variant="danger"
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </span>
                    </h5>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="text-center">
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          disabled={curPage === 1}
          onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage} / {numPages}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          disabled={curPage === numPages}
          onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          disabled={curPage === numPages}
          onClick={() => setCurPage(numPages)}
        >
          Last
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Button className="me-2 btn-plus2">+</Button>Add todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
              <Form.Label>ID:&nbsp;</Form.Label>

              <Form.Label>
                <Badge bg="secondary">{nextId}</Badge>
              </Form.Label>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Title:</Form.Label>
              <Form.Control
                ref={titleRef}
                type="text"
                placeholder="typing your todo title here..."
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              saveClicked(Number(idRef.current), titleRef.current.value)
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Todos;
