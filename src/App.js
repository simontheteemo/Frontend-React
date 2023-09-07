import './App.css'
import { Image, Alert, Button, Container, Row, Col, Form, Table, Stack } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import AddTodoItemContent from './components/addToDoItem'
import CheckList from './components/checkList'
import Footer from './components/footer'

const App = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    // todo
  }, [])

  const renderTodoItemsContent = () => {
    return (
      <>
        <h1>
          Showing {items.length} Item(s){' '}
          <Button variant="primary" className="pull-right" onClick={() => getItems()}>
            Refresh
          </Button>
        </h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                    Mark as completed
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  }

  async function getItems() {
    try {
      alert('todo')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleMarkAsComplete(item) {
    try {
      alert('todo')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Image src="clearPointLogo.png" fluid rounded />
          </Col>
        </Row>
        <Row>
          <Col>
            <CheckList />
          </Col>
        </Row>
        <Row>
          <Col>{AddTodoItemContent()}</Col>
        </Row>
        <br />
        <Row>
          <Col>{renderTodoItemsContent()}</Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default App
