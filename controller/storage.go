package controller

import (
	"io/fs"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/kohbanye/storage/config"
	"github.com/kohbanye/storage/model"
	"github.com/kohbanye/storage/repository"
	"github.com/labstack/echo/v4"
)

type StorageController struct {
	Repository *repository.Repository
}

func NewStorageController(repository *repository.Repository) *StorageController {
	return &StorageController{
		Repository: repository,
	}
}

type File struct {
	Name     string `json:"name"`
	Modified string `json:"modified"`
	Size     int64  `json:"size"`
	IsDir    bool   `json:"isDir"`
}

// GetFiles returns folders and files in the given path
func (controller *StorageController) GetFiles(c echo.Context) error {
	path := c.QueryParam("path")

	root := config.GetConfig().DataDir
	path = root + "/" + path

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
			dirs = append(dirs, newFile)
		} else {
			files = append(files, newFile)
		}
	}

	return c.JSON(http.StatusOK, append(dirs, files...))
}

// CreateFile creates a new folder or file
func (controller *StorageController) CreateFile(c echo.Context) error {
	path := c.QueryParam("path")
	isDir := c.QueryParam("is_dir") == "true"

	root := config.GetConfig().DataDir

	if isDir {
		err := os.MkdirAll(root+path, fs.ModePerm)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, "directory created")
	} else {
		err := os.MkdirAll(root+filepath.Dir(path), fs.ModePerm)
		if err != nil {
			return err
		}
		file, err := os.Create(root + path)
		if err != nil {
			return err
		}
		defer file.Close()

		fileInfo, err := os.Stat(root + path)
		if err != nil {
			return err
		}
		dbFile := &model.DBFile{
			Name:     filepath.Base(path),
			Path:     root + path,
			Modified: fileInfo.ModTime().Format(time.RFC3339),
			Size:     fileInfo.Size(),
		}
		_, err = dbFile.Create(controller.Repository)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, "file created")
	}
}

func (controller *StorageController) GetRecentFiles(c echo.Context) error {
	dbFile := &model.DBFile{}
	files, err := dbFile.GetRecentFiles(controller.Repository)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, files)
}
