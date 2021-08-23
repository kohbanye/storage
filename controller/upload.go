package controller

import (
	"io"
	"net/http"
	"os"

	"github.com/kohbanye/storage/config"
	"github.com/labstack/echo/v4"
)

func Upload(c echo.Context) error {
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
	path := root + c.Path() + "/" + file.Filename
	dst, err := os.Create(path)
	if err != nil {
		return err
	}
	defer dst.Close()

	_, err = io.Copy(dst, f)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, path)
}
