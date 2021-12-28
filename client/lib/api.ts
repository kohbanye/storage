import axios, { AxiosResponse } from 'axios'

const baseURL = 'http://localhost:8000/api/'

export interface MyFile {
  name: string
  modified: string
  size: number
  isDir: boolean
}

export interface DBFile {
  name: string
  path: string
  modified: string
  size: number
}

export const getDirectory = async (path: string): Promise<MyFile[]> => {
  const response = await axios.get(`${baseURL}?path=${path}`)
  return response.data
}

export const uploadFile = async (path: string, file: File): Promise<void> => {
  const formData = new FormData()
  formData.append('file', file)
  await axios.post(`${baseURL}?path=${path}`, formData)
}

export const createFile = async (
  path: string,
  isDir = false
): Promise<void> => {
  await axios.post(`${baseURL}new?path=${path}&is_dir=${isDir}`)
}

export const getRecentFiles = async (): Promise<DBFile[]> => {
  const response: AxiosResponse<DBFile[]> = await axios.get(`${baseURL}recent`)
  const result: DBFile[] = response.data.map((file) => {
    return {
      name: file.name,
      path: file.path,
      modified: file.modified,
      size: file.size,
    }
  })
  return result
}
