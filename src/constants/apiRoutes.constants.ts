export const apiBaseRoute = 'https://auto1-mock-server.herokuapp.com/api';
export const carsRoute = `${apiBaseRoute}/cars`;
export const manufacturersRoute = `${apiBaseRoute}/manufacturers`;;
export const colorsRoute = `${apiBaseRoute}/colors`;;
export const detailsRoute = (stockNumber: number) => `${carsRoute}/${stockNumber}`;

