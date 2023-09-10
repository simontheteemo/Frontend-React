import '../App.css'
import { Alert, Button, Container, Row, Col, Form, Stack } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import ToDoItemsClient from '../clients/toDoItemsClient'
import TodoItemsList from './toDoItemsList'

const AddTodoItem = () => {
  const [description, setDescription] = useState('')
  const [addErrorMessage, setAddErrorMessage] = useState('')

  const [items, setItems] = useState([])

  useEffect(() => {
    getItems();
  }, [])

  const renderAddTodoItemContent = () => {
    return (
      <Container>
        <h1>Add a TODO Item</h1>
        <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col md="6">
            <Form.Control
              type="text"
              placeholder="Enter description..."
              value={description}
              onChange={handleDescriptionChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
          <Stack direction="horizontal" gap={2}>
            <Button variant="primary" onClick={() => handleAdd()}>
              Add Item
            </Button>
            <Button variant="secondary" onClick={() => handleClear()}>
              Clear
            </Button>
            {addErrorMessage && <Alert variant="danger">{addErrorMessage}</Alert>}
          </Stack>
        </Form.Group>
      </Container>
    )
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  async function handleAdd() {
    let body = {
      "Description": description
    }
    ToDoItemsClient.post("/api/todoitems", body)
      .then((response) => {
        console.log('Response:', response.data);
        handleClear()
        getItems()
      })
      .catch((error) => {
        console.error('Error:', error);
        setAddErrorMessage(error.response.data)
      });
  }

  function handleClear() {
    setDescription('')
    setAddErrorMessage('')
  }

  async function getItems(isCompleted) {
    var url = isCompleted && isCompleted === true ? 
      "/api/todoitems?isCompleted=true"
      :
      "/api/todoitems"
    ToDoItemsClient.get(url)
      .then((response) => {
        console.log('Response:', response.data);
        let sortedItems = response.data.sort((a, b) => {
          if (a.isCompleted && !b.isCompleted) return 1;
          if (!a.isCompleted && b.isCompleted) return -1;
          return 0;
        });
        setItems(sortedItems)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <Row>
        <Col>{renderAddTodoItemContent()}</Col>
      </Row>
      <br />
      <Row>
        <Col><TodoItemsList items={items} updateList={getItems} /></Col>
      </Row>
    </>
  )
}

export default AddTodoItem
