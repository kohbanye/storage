package repository

import (
	"fmt"

	"github.com/kohbanye/storage/config"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository(config *config.Config) (*Repository, error) {
	db, err := connectDatabase(config)
	if err != nil {
		return nil, err
	}
	return &Repository{db}, nil
}

func connectDatabase(config *config.Config) (*gorm.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", config.Database.Username, config.Database.Password, config.Database.Host, config.Database.Port, config.Database.Name)
	return gorm.Open(mysql.Open(dsn), &gorm.Config{})
}
