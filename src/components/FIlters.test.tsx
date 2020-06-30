import React from 'react'
import {render, fireEvent, within, act} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {ManufacturerDTO} from "../models/cars.models";
import {Filters} from "./Filters";

const manufacturersFixture = [{
  name: 'BMW'
}, {
  name: 'Audi'
}, {
  name: 'Mercedes'
}, {
  name: 'Volvo'
}] as ManufacturerDTO[];

const colorsFixture = ["red", "blue", "green", "black", "yellow", "white", "silver"];

describe('Filters component', () => {
  it('should render filters and fire OnSelect with default values when button is pressed', () => {
    const onSelect = jest.fn();
    const {getByText} = render(
      <Filters initialFilters={{manufacturer: '', color: ''}} manufacturers={manufacturersFixture}
               colors={colorsFixture}
               onSelect={onSelect}/>
    );
    fireEvent.click(getByText('Filter'));

    expect(onSelect).toHaveBeenCalledWith({manufacturer: '', color: ''});
  });

  it('should fire OnSelect with selected manufacturer', () => {
    const onSelect = jest.fn();
    const {getByTestId, getByRole, getByText} = render(<Filters initialFilters={{manufacturer: '', color: ''}}
                                                                manufacturers={manufacturersFixture}
                                                                colors={colorsFixture}
                                                                onSelect={onSelect}/>);

    const button = within(getByTestId('manufacturers')).getByRole('button');
    fireEvent.mouseDown(button);
    const listbox = within(getByRole('listbox'));

    act(() => {
        fireEvent.click(listbox.getByText(/audi/i))
      }
    );
    act(() => {
      fireEvent.click(getByText('Filter'));
    });
    expect(onSelect).toHaveBeenCalledWith({manufacturer: 'Audi', color: ''});
  });

  it('should fire OnSelect with selected color', () => {
    const onSelect = jest.fn();
    const {getByTestId, getByRole, getByText} = render(<Filters initialFilters={{manufacturer: '', color: ''}}
                                                                manufacturers={manufacturersFixture}
                                                                colors={colorsFixture}
                                                                onSelect={onSelect}/>);

    const button = within(getByTestId('colors')).getByRole('button');
    fireEvent.mouseDown(button);
    const listbox = within(getByRole('listbox'));

    act(() => {
        fireEvent.click(listbox.getByText(/white/i))
      }
    );
    act(() => {
      fireEvent.click(getByText('Filter'));
    });
    expect(onSelect).toHaveBeenCalledWith({manufacturer: '', color: 'white'});
  });

  it('should fire OnSelect with selected color and manufacturer', () => {
    const onSelect = jest.fn();
    const {getByTestId, getByRole, getByText} = render(<Filters initialFilters={{manufacturer: '', color: ''}}
                                                                manufacturers={manufacturersFixture}
                                                                colors={colorsFixture}
                                                                onSelect={onSelect}/>);
    const buttonManufacturer = within(getByTestId('manufacturers')).getByRole('button');
    const buttonColor = within(getByTestId('colors')).getByRole('button');
    fireEvent.mouseDown(buttonManufacturer);
    let listbox = within(getByRole('listbox'));

    act(() => {
        fireEvent.click(listbox.getByText(/bmw/i))
      }
    );

    fireEvent.mouseDown(buttonColor);
    listbox = within(getByRole('listbox'));

    act(() => {
        fireEvent.click(listbox.getByText(/white/i))
      }
    );

    act(() => {
      fireEvent.click(getByText('Filter'));
    });
    expect(onSelect).toHaveBeenCalledWith({manufacturer: 'BMW', color: 'white'});
  });
});

