package test

import (
	"github.com/kohbanye/storage/config"
	"github.com/labstack/echo/v4"
)

func New() *echo.Echo {
	e := echo.New()
	config.Init()

	return e
}