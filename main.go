package main

import (
	"net/http"
	"time"

	"github.com/kohbanye/storage/config"
	"github.com/kohbanye/storage/model"
	"github.com/kohbanye/storage/router"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	config.Init()
	time.Sleep(3 * time.Second) // wait for DB container to start
	rep, err := model.Init()
	if err != nil {
		panic(err)
	}
	router.Init(e, rep)

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{
			echo.HeaderAccessControlAllowHeaders,
			echo.HeaderContentType,
			echo.HeaderContentLength,
			echo.HeaderAcceptEncoding,
			echo.HeaderXCSRFToken,
			echo.HeaderAuthorization,
		},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPut,
			http.MethodPatch,
			http.MethodPost,
			http.MethodDelete,
		},
	}))
	e.Use(middleware.Logger())

	err = e.Start(":8000")
	if err != nil {
		panic(err)
	}
}
