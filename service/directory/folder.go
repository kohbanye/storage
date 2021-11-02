package directory

import "io/ioutil"

func GetFolderSize(path string) (int64, error) {
	fileInfos, err := ioutil.ReadDir(path)
	if err != nil {
		return 0, err
	}

	size := int64(0)
	for _, fileInfo := range fileInfos {
		if fileInfo.IsDir() {
			newSize, err := GetFolderSize(path + "/" + fileInfo.Name())
			if err != nil {
				return 0, err
			}
			size += newSize
		} else {
			size += fileInfo.Size()
		}
	}

	return size, nil
}
