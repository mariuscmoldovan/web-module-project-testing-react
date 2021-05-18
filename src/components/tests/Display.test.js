import React from 'react';
import {screen, render, waitFor } from '@testing-library/react';
import Display from '../Display';
import userEvent from '@testing-library/user-event';
import mockFetchShow from '../../api/fetchShow'
jest.mock('../../api/fetchShow');

const testShow = {
    //add in approprate test data structure here.
    name: "Test Show",
    summary: "summary of show",
    seasons: [
        {
            id: 1,
            name: 'Season 1',
            episodes: []
        },
        {
            id: 2,
            name: 'Season 2',
            episodes: []
        }
    ]
}

test('Test that the Display component renders without any passed in props', () => {
    render(<Display />);
  })


test('Test that when the fetch button is pressed, the show component will display', async () => {
    render(<Display/>);

    mockFetchShow.mockResolvedValueOnce(testShow);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');

    expect(show).toBeInTheDocument();
    
  })


  test('Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data', async ()=> {

    render(<Display/>);

    mockFetchShow.mockResolvedValueOnce(testShow);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const season = await screen.findAllByTestId('season-option');

    expect(season).toHaveLength(2)

});


test('Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.', ()=> {

    const mockDisplayFunc = jest.fn();
    render(<Display displayFunc={mockDisplayFunc}/>)
    
    mockFetchShow.mockResolvedValueOnce(testShow);
    
    const button = screen.getByRole('button');
    userEvent.click(button);
    
    waitFor(() => expect(mockDisplayFunc).toHaveBeenCalledTimes(1));
    
});

test('test if optional function is being called', ()=>{
    const fakeClick = jest.fn();
    render(<Display handleClick={fakeClick}/>);

    const button = screen.getByRole('button');
    userEvent.click(button);
    
    waitFor(() => expect(fakeClick).toHaveBeenCalledTimes(1))
});





///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.