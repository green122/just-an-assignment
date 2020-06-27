import {renderHook, act} from '@testing-library/react-hooks';
import {useFetching} from "./useFetching";

const mockClient = {};

describe('useFetching hook', () => {

  it('should return isLoading flat set to true, then data from promise', async () => {
    const fakeResponse = {
      data: 'someData;'
    }
    const {result, waitForNextUpdate} = renderHook(
      () => useFetching(() => Promise.resolve(fakeResponse), null, [])
    );

    expect(result.current).toEqual({isLoading: true, error: '', data: null});

    await waitForNextUpdate();
    expect(result.current).toEqual({isLoading: false, data: fakeResponse, error: ''});
  })

  it('should return isLoading flat set to true, then error from promise', async () => {

    const {result, waitForNextUpdate} = renderHook(
      () => useFetching(() => Promise.reject(new Error('some error')), null, [])
    );

    expect(result.current).toEqual({isLoading: true, error: '', data: null});

    await waitForNextUpdate();
    expect(result.current).toEqual({isLoading: false, data: null, error: Error('some error')});
  })

});
