package main

import (
	"github.com/kohbanye/storage/config"
	"github.com/kohbanye/storage/router"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	config.Init()
	router.Init(e)

	err := e.Start(":8000")
	if err != nil {
		panic(err)
	}
}
