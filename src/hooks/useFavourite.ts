import {useEffect, useState} from "react";
import axios from 'axios';
import {CarDTO} from "../models/cars.models";
import {useFetching} from "./useFetching";

const favoriteStore: { [stockNumber: string]: CarDTO } = {};

function idsTobeLoaded(ids: string[]): string[] {
  const alreadyLoaded = new Set(Object.keys(favoriteStore));
  return ids.filter(id => !alreadyLoaded.has(id))
}

function loadFromStorage(): string[] {
  const favorites = localStorage.getItem('favorite')
  if (!favorites) {
    return []
  }

  let favoriteIds: string[] = [];
  try {
    favoriteIds = JSON.parse(favorites);
  } catch (e) {
    console.error(e);
  }
  return favoriteIds;
}

function persistInStore(id: number) {
  const data = loadFromStorage();
  const idToString = String(id);
  const dataToSave = data.includes(idToString) ? data.filter(storedId => storedId !== idToString) : data.concat(idToString);
  localStorage.setItem('favorite', JSON.stringify(dataToSave))
}

export function useFavourite() {
  const [shouldLoad, setShouldLoad] = useState(true);
  const [idsToLoad, setIdsToLoad] = useState<string[]>([]);

  function setFavourite(stockNumber: number) {
    if (Number(stockNumber) in favoriteStore) {
      delete favoriteStore[stockNumber]
    }
    persistInStore(stockNumber);
    setShouldLoad(true);
  }

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }
    const favoriteIds = idsTobeLoaded(loadFromStorage());
    if (favoriteIds && favoriteIds.length) {
      setIdsToLoad(favoriteIds);
    }
    setShouldLoad(false);
  }, [shouldLoad]);

  const loadFavoritesState = useFetching(async () => {
    const promises = idsToLoad.map(id => axios.get(`https://auto1-mock-server.herokuapp.com/api/cars/${id}`).catch(e => ({
      data: {
        car: {
          stockNumber: id,
          error: e
        }
      }
    })));
    const resultArray = await Promise.all(promises);
    resultArray.forEach(({data}) => favoriteStore[data.car.stockNumber] = data.car)
  }, null, [idsToLoad])

  function getFavourites() {
    return Object.values(favoriteStore);
  }

  function isFavourite(stockNumber: number): boolean {
    return stockNumber in favoriteStore;
  }

  return {setFavourite, getFavourites, isFavourite, isFavoriteLoading: loadFavoritesState.isLoading}
}
