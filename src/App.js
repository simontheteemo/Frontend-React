import './App.css'
import { Image, Container, Row, Col } from 'react-bootstrap'
import React from 'react'
import CheckList from './components/checkList'
import AddTodoItem from './components/addToDoItem'
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
          here
          <Col>
            <CheckList />
          </Col>
        </Row>
        <AddTodoItem />
      </Container>
      <Footer />
    </div>
  )
}

export default App
