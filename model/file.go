package model

import (
	"github.com/kohbanye/storage/repository"
	"gorm.io/gorm"
)

const maxRecentFiles = 100

type DBFile struct {
	gorm.Model
	Name     string
	Path		 string
	Modified string
	Size     int64
}

func (f *DBFile) Create(rep *repository.Repository) (*DBFile, error) {
	err := rep.DB.Create(f).Error
	if err != nil {
		return nil, err
	}
	return f, nil
}

func (f *DBFile) GetRecentFiles(rep *repository.Repository) ([]*DBFile, error) {
	files := make([]*DBFile, 0, maxRecentFiles)
	err := rep.DB.Limit(maxRecentFiles).Order("created_at DESC").Find(&files).Error
	if err != nil {
		return nil, err
	}
	return files, nil
}
