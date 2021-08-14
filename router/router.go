package router

import (
	"github.com/kohbanye/storage/controller"
	"github.com/labstack/echo/v4"
)

func Init(e *echo.Echo) {
	api := e.Group("/api")

	api.POST("/upload", func(c echo.Context) error { return controller.Upload(c) })
}
