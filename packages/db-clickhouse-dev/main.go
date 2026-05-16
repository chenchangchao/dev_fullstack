package main

import (
	"fmt"

	"github.com/ClickHouse/clickhouse-go/v2"
)

func main() {
	conn := clickhouse.OpenDB(&clickhouse.Options{
		Addr:     []string{"127.0.0.1:9000"}, // 9440 is a secure native TCP port
		Protocol: clickhouse.Native,
		// TLS:      &tls.Config{}, // enable secure TLS
		Auth: clickhouse.Auth{
			Username: "default",
			Password: "your_password",
		},
	})
	row := conn.QueryRow("SELECT 1")
	var col uint8
	if err := row.Scan(&col); err != nil {
		fmt.Printf("An error while reading the data: %s", err)
	} else {
		fmt.Printf("Result: %d", col)
	}
}
