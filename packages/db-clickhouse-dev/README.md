```sh
go mod init connect_ck
go get github.com/ClickHouse/clickhouse-go/v2
go build connect_ck.go
go run .\connect_ck.exe
go run -n connect_ck.go ## without build
```

## pg cli
```sh
sudo -u postgres psql
psql -h 10.202.80.105 -p 5432 -d mydb -U  admin -W ## with password 连接远程数据库
psql -h localhost -p 5432 -d mydb -U  admin -W ## 连接本地数据库
psql -h 127.0.0.1 -p 5432 -d mydb -U  admin -W ## 连接本地数据库

```