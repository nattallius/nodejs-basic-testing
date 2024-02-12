// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((cb) => cb),
  };
});

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    mockAxios.create.mockReturnThis();
  });

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(mockAxios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';
    try {
      await throttledGetDataFromApi('/relative-path'); // to catch axios.get error
    } catch (e: any) {
      console.log(e.message);
    }
    expect(spy).toBeCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/relative-path';
    const spy = jest.spyOn(axios.create(), 'get');
    const mockResponse = { data: 'response' };
    mockAxios.get.mockResolvedValue(mockResponse);
    await throttledGetDataFromApi(relativePath);
    expect(spy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockResponse = { data: 'response' };
    mockAxios.get.mockResolvedValue(mockResponse);

    await expect(throttledGetDataFromApi('/posts')).resolves.toEqual(
      mockResponse.data,
    );
  });
});
