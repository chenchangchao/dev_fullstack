import clickhouse_connect
import dotenv  from 'dotenv'
dotenv.config()

if __name__ == '__main__':
    client = clickhouse_connect.get_client(
        host=dotenv.get('CK_HOST'),
        port=int(dotenv.get('CK_PORT')),
        user=dotenv.get('CK_USER'),
        password=dotenv.get('CK_PASSWORD'),
        database=dotenv.get('CK_DATABASE')
    )
    print("Result:", client.query("SHOW DATABASES").result_set)
    #  clickhouse-client --host your_ck_host --port your_ck_port --password your_password
