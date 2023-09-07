import '../App.css'
import { Button, Table } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

import ToDoItemsClient from '../clients/toDoItemsClient'

const ToDoItemsList = () => {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    getItems();
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
    ToDoItemsClient.get("/api/todoitems")
    .then((response) => {
      console.log('Response:', response.data);
      let sortedItems =  response.data.sort((a, b) => {
        if (a.isCompleted && !b.isCompleted) return -1;
        if (!a.isCompleted && b.isCompleted) return 1;
        return 0;
      });
      setItems(sortedItems)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  async function handleMarkAsComplete({id, description}) {
    ToDoItemsClient.put(`/api/todoitems/${id}`, {
      id,description,isCompleted:true
    })
    .then((response) => {
      console.log('Response:', response.data);
      getItems()
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
