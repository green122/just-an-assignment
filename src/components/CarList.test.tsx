import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {CarsList} from "./CarsList";
import {carsFixture} from "./carsFixture";
import {CarsListDTO} from "../models/cars.models";

describe('CarsList component', () => {
  it('should render list of elements correctly when list is not empty', () => {
    const {getAllByTestId} = render(<CarsList list={carsFixture}/>);
    const result = getAllByTestId('car-item');
    expect(result.length).toBe(carsFixture.cars.length);
  });

  it('should return null if  cars list is empty', () => {
    const {queryAllByTestId} = render(<CarsList list={{cars: []} as unknown as CarsListDTO}/>);
    const result = queryAllByTestId('car-item');
    expect(result.length).toBe(0);
  });

  it('should call onPageSelect when click on Pagination button', () => {
    const pageSelectHandler = jest.fn();
    const {getByText} = render(<CarsList list={carsFixture} onPageSelect={pageSelectHandler}/>);
    const pageButton = getByText('3', {selector: 'button'});
    fireEvent.click(pageButton);
    expect(pageSelectHandler).toHaveBeenCalledWith(3);
  });
})

