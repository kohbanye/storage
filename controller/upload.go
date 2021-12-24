package controller

import (
	"io"
	"io/fs"
	"net/http"
	"os"
	"path/filepath"

	"github.com/kohbanye/storage/config"
	"github.com/kohbanye/storage/model"
	"github.com/kohbanye/storage/repository"
	"github.com/labstack/echo/v4"
)

type UploadController struct {
	Repository *repository.Repository
}

func NewUploadController(repository *repository.Repository) *UploadController {
	return &UploadController{
		Repository: repository,
	}
}

func (controller *UploadController) Upload(c echo.Context) error {
	file, err := c.FormFile("file")
	if err != nil {
		return err
	}

	f, err := file.Open()
	if err != nil {
		return err
	}
	defer f.Close()

	root := config.GetConfig().DataDir
	path := root + c.QueryParam("path")

	err = os.MkdirAll(filepath.Dir(path), fs.ModePerm)
	if err != nil {
		return err
	}
	dst, err := os.Create(path)
	if err != nil {
		return err
	}
	defer dst.Close()

	_, err = io.Copy(dst, f)
	if err != nil {
		return err
	}

	dbFile := &model.DBFile{
		Name:  filepath.Base(path),
		Path:  root + path,
	}
	_, err = dbFile.Create(controller.Repository)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, path)
}
