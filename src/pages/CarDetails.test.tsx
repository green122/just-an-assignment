import React, {useReducer} from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor} from "@testing-library/react";
import {CarDetails} from "./CarDetails";

const mockFetching: any = {
  data: {
    modelName: 'BMW',
    stockNumber: 111,
    mileage: {
      number: 1000,
      unit: 'km'
    },
    color: 'white'
  }
};

const mockHistory = {
  push: jest.fn()
}
const mockRouter = {
  params: ({stockNumber: '111'}),
}

jest.mock('../hooks/useFetching.ts', () => ({
  useFetching: () => mockFetching
}));


jest.mock('react-router', () => ({
  useParams: () => mockRouter.params,
  useHistory: () => mockHistory
}));

describe('Cars Details component', () => {
  it('should render component when data is returned from useFetching', () => {
    const {getByText} = render(
      <CarDetails/>
    );

    expect(getByText('BMW')).toBeInTheDocument();
    expect(getByText(/111/)).toBeInTheDocument();
  });

  it('should redirect to 404 page when 404 response from BE', () => {
    mockFetching.error = {response: {status: 404}};
    const {getByText} = render(
      <CarDetails/>
    );

    expect(mockHistory.push).toHaveBeenCalledWith('/404');
  })

  it('should show error message in the other error cases', () => {
    mockFetching.error = {response: {status: 500}};
    const {getByText} = render(
      <CarDetails/>
    );

    expect(getByText(/Something bad has happened/)).toBeInTheDocument();
  })
})


