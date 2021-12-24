package repository

import (
	"fmt"

	"github.com/kohbanye/storage/config"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func NewRepository(config *config.Config) (*Repository, error) {
	db, err := connectDatabase(config)
	if err != nil {
		return nil, err
	}
	return &Repository{db}, nil
}

func connectDatabase(config *config.Config) (*gorm.DB, error) {
	dbConf := config.Database
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbConf.Username, dbConf.Password, dbConf.Host, dbConf.Port, dbConf.Name)

	return gorm.Open(mysql.Open(dsn), &gorm.Config{})
}
