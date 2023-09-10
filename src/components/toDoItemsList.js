import '../App.css'
import { Button, Table } from 'react-bootstrap'
import React from 'react'

import ToDoItemsClient from '../clients/toDoItemsClient'

const ToDoItemsList = (props) => {

  const renderTodoItemsContent = () => {
    return (
      <>
        <h1>
          Showing { props.items && props.items.length} Item(s){' '}
          <Button variant="primary" className="pull-right" onClick={() => props.updateList()}>
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
            { props.items && props.items.map((item) => (
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



  async function handleMarkAsComplete({id, description}) {
    ToDoItemsClient.put(`/api/todoitems/${id}`, {
      id,description,isCompleted:true
    })
    .then((response) => {
      console.log('Response:', response.data);
      props.updateList()
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <>{renderTodoItemsContent()}</>
  )
}

export default ToDoItemsList
