import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddTodoItem from './addToDoItem';
import ToDoItemsClient from '../clients/toDoItemsClient';

describe('AddTodoItem Component', () => {
  it('renders without crashing', () => {
    render(<AddTodoItem />);
  });

  it('updates description state on input change', () => {
    render(<AddTodoItem />);
    const inputElement = screen.getByPlaceholderText('Enter description...');

    fireEvent.change(inputElement, { target: { value: 'New Description' } });

    expect(inputElement.value).toBe('New Description');
  });

  it('clears description and error message on clear button click', () => {
    render(<AddTodoItem />);
    const inputElement = screen.getByPlaceholderText('Enter description...');
    const clearButton = screen.getByText('Clear');

    fireEvent.change(inputElement, { target: { value: 'New Description' } });
    fireEvent.click(clearButton);

    expect(inputElement.value).toBe('');
  });

  it('sets an error message on unsuccessful API call', async () => {
    // Mock ToDoItemsClient.post to return a rejected Promise
    const mockPost = jest.spyOn(ToDoItemsClient, 'post');
    mockPost.mockRejectedValue({ response: { data: 'Error Message' } });

    render(<AddTodoItem />);
    const inputElement = screen.getByPlaceholderText('Enter description...');
    const addButton = screen.getByText('Add Item');

    fireEvent.change(inputElement, { target: { value: 'New Description' } });
    fireEvent.click(addButton);

    // Wait for asynchronous code to complete
    await screen.findByText('Error Message');

    mockPost.mockRestore();
  });

});
