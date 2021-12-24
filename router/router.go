package router

import (
	"github.com/kohbanye/storage/controller"
	"github.com/kohbanye/storage/repository"
	"github.com/labstack/echo/v4"
)

func Init(e *echo.Echo, rep *repository.Repository) {
	api := e.Group("/api")

	storage := controller.NewStorageController(rep)
	upload := controller.NewUploadController(rep)

	api.GET("/", func(c echo.Context) error { return storage.GetFiles(c) })
	api.POST("/new", func(c echo.Context) error { return storage.CreateFile(c) })
	api.POST("/", func(c echo.Context) error { return upload.Upload(c) })
	api.GET("/recent", func(c echo.Context) error { return storage.GetRecentFiles(c) })
}
