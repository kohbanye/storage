package controller

import (
	"io/fs"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/kohbanye/storage/config"
	"github.com/kohbanye/storage/service/directory"
	"github.com/labstack/echo/v4"
)

type File struct {
	Name     string `json:"name"`
	Modified string `json:"modified"`
	Size     int64  `json:"size"`
	IsDir    bool   `json:"isDir"`
}

// GetFiles returns folders and files in the given path
func GetFiles(c echo.Context) error {
	path := c.QueryParam("path")

	fileInfos, err := ioutil.ReadDir(path)
	if err != nil {
		return err
	}

	var files, dirs []File
	for _, fileInfo := range fileInfos {
		newFile := File{
			Name:     fileInfo.Name(),
			Modified: fileInfo.ModTime().Format(time.RFC3339),
			Size:     fileInfo.Size(),
			IsDir:    fileInfo.IsDir(),
		}

		if fileInfo.IsDir() {
			newFile.Size, err = directory.GetFolderSize(path + "/" + fileInfo.Name())
			if err != nil {
				return err
			}
			dirs = append(dirs, newFile)
		} else {
			files = append(files, newFile)
		}
	}

	return c.JSON(http.StatusOK, append(dirs, files...))
}

// CreateFile creates a new folder or file
func CreateFile(c echo.Context) error {
	path := c.QueryParam("path")
	isDirStr := c.QueryParam("is_dir")

	root := config.GetConfig().DataDir

	if isDirStr == "true" {
		err := os.Mkdir(root+path, fs.ModePerm)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, "directory created")
	} else {
		file, err := os.Create(root + path)
		if err != nil {
			return err
		}
		defer file.Close()

		return c.JSON(http.StatusOK, "file created")
	}
}
