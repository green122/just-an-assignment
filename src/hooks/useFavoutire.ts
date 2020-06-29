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

function persistInStore(id: string) {
  const data = loadFromStorage();
  const dataToSave = data.includes(id) ? data.filter(storedId => storedId !== id) : data.concat(id);
  localStorage.setItem('favorite', JSON.stringify(dataToSave))
}

export function useFavorite() {
  const [shouldLoad, setShouldLoad] = useState(true);
  const [idsToLoad, setIdsToLoad] = useState<string[]>([]);

  function setFavorite(stockNumber: string) {
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
    const promises = idsToLoad.map(id => axios.get(`https://auto1-mock-server.herokuapp.com/api/cars/${id}`));
    const result = await Promise.all(promises);
    result.forEach(({data}) => favoriteStore[data.car.stockNumber] = data.car)
  }, null, [idsToLoad])

  function getFavorites() {
    return Object.values(favoriteStore);
  }

  function isFavourite(stockNumber: string): boolean {
    return stockNumber in favoriteStore;
  }

  return {setFavorite, getFavorites, isFavourite, isFavoriteLoading: loadFavoritesState.isLoading}
}
