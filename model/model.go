package model

import (
	"github.com/kohbanye/storage/config"
	"github.com/kohbanye/storage/repository"
)

func Init() (*repository.Repository, error) {
	rep, err := repository.NewRepository(config.GetConfig())
	if err != nil {
		return nil, err
	}

	rep.DB.AutoMigrate(&DBFile{})

	return rep, nil
}
