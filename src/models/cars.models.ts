export interface MileageDTO {
  number: number;
  unit: string;
}

export interface CarDTO {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  color: string;
  mileage: MileageDTO;
  fuelType: string;
  pictureUrl: string;
}

export interface CarsListDTO {
  cars: CarDTO[];
  totalPageCount: number;
  totalCarsCount: number;
}


export interface Model {
  name: string;
}

export interface ManufacturerDTO {
  name: string;
  models: Model[];
}
