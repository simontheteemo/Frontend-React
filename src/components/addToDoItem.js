import '../App.css'
import { Image, Alert, Button, Container, Row, Col, Form, Table, Stack } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

import ToDoItemsClient from '../clients/toDoItemsClient'

const AddTodoItemContent = () => {
  const [description, setDescription] = useState('')
  const [addErrorMessage, setAddErrorMessage] = useState('')
  
  useEffect(() => {
    // todo
  }, [])

  const renderAddTodoItemContent = () => {
    return (
      <Container>
        <h1>Add Item</h1>
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

  return (
    <>{renderAddTodoItemContent()}</>
  )
}

export default AddTodoItemContent
