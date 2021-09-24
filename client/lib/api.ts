import axios from 'axios'

const baseURL = 'http://localhost:8000/api/'

export interface File {
  name: string
  size: number
  isDir: boolean
}

export const getDirectory = async (path: string): Promise<File[]> => {
  const response = await axios.get(`${baseURL}?path=${path}`)
  return response.data
}
