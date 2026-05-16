import psycopg2
import dotenv  from 'dotenv'
dotenv.config()

def main():
    try:
        # 建立数据库连接
        connection = psycopg2.connect(
            database=dotenv.get('PG_DATABASE'),
            user=dotenv.get('PG_USER'),
            password=dotenv.get('PG_PASSWORD'),
            host=dotenv.get('PG_HOST'),
            port=dotenv.get('PG_PORT')
        )
        print("成功连接到数据库！")
        print("数据库版本:", connection.server_version)
        # 创建游标对象
        # cursor = connection.cursor()

    except psycopg2.Error as e:
        print(f"连接数据库时出错: {e}")

    # 关闭数据库连接
    connection.close()


if __name__ == "__main__":
    main()