package router

import (
	"github.com/kohbanye/storage/controller"
	"github.com/labstack/echo/v4"
)

func Init(e *echo.Echo) {
	api := e.Group("/api")

	api.GET("/", func(c echo.Context) error { return controller.GetFiles(c) })
	api.POST("/", func(c echo.Context) error { return controller.Upload(c) })

	api.POST("/new", func(c echo.Context) error { return controller.CreateFile(c) })
}
