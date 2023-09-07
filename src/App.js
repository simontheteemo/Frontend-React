import './App.css'
import { Image, Container, Row, Col } from 'react-bootstrap'
import React from 'react'
import CheckList from './components/checkList'
import AddTodoItem from './components/addToDoItem'
import TodoItemsList from './components/toDoItemsList'
import Footer from './components/footer'

const App = () => {
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
          <Col><AddTodoItem /></Col>
        </Row>
        <br />
        <Row>
          <Col><TodoItemsList /></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default App
