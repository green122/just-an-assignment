import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {CarsList} from "./CarsList";
import {carsFixture} from "./carsFixture";
import {CarDTO, CarsListDTO} from "../models/cars.models";

describe('CarsList component', () => {
  it('should render list of elements correctly when list is not empty', () => {
    const {getAllByTestId} = render(<CarsList list={carsFixture.cars} totalPageCount={100} page={1}
                                              onPageSelect={jest.fn()}/>);
    const result = getAllByTestId('car-item');
    expect(result.length).toBe(carsFixture.cars.length);
  });

  it('should return null if  cars list is empty', () => {
    const {queryAllByTestId} = render(
      <CarsList
        list={[]}
        page={1}
        totalPageCount={100}
        onPageSelect={jest.fn()}
      />);
    const result = queryAllByTestId('car-item');
    expect(result.length).toBe(0);
  });

  it('should call onPageSelect when click on Pagination button', () => {
    const pageSelectHandler = jest.fn();
    const {getByText} = render(
      <CarsList
        list={carsFixture.cars}
        totalPageCount={100}
        onPageSelect={pageSelectHandler}
        page={1}/>);
    const pageButton = getByText('3', {selector: 'button'});
    fireEvent.click(pageButton);
    expect(pageSelectHandler).toHaveBeenCalledWith(3);
  });
})

