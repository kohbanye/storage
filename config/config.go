package config

import (
	"github.com/spf13/viper"
)

type Config struct {
	DataDir  string `yaml:"data_dir" default:"/var/"`
	Database struct {
		Host     string `yaml:"host"`
		Port     string `yaml:"port"`
		Username string `yaml:"username"`
		Password string `yaml:"password"`
		Name     string `yaml:"name"`
	}
}

var c *viper.Viper

func Init() {
	c = viper.New()
	c.SetConfigName("config")
	c.SetConfigType("yaml")
	c.AddConfigPath("./config/")
	c.AddConfigPath("../config/")

	err := c.ReadInConfig()
	if err != nil {
		panic(err)
	}
}

func GetConfig() *Config {
	return &Config{
		DataDir: c.GetString("data_dir"),
	}
}
