package controller

import (
	"bytes"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/kohbanye/storage/test"
	"github.com/labstack/echo/v4"
	"github.com/magiconair/properties/assert"
)

func TestUpload(t *testing.T) {
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, _ := writer.CreateFormFile("file", "test.txt")
	testStr := "This is a test.\nhello"
	part.Write([]byte(testStr))

	e := test.New()
	e.POST("/api/upload", func(c echo.Context) error { return Upload(c) })

	req := httptest.NewRequest(echo.POST, "/api/upload", nil)
	req.Header.Add(echo.HeaderContentType, writer.FormDataContentType())
	rec := httptest.NewRecorder()

	e.ServeHTTP(rec, req)
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Equal(t, testStr, rec.Body.String())
}
