SELECT
   table_name,
   column_name,
   data_type,
   column_default
FROM
   information_schema.columns
WHERE
   table_name = ' users';

select current_database();
select version();
--select curdate()

SELECT * FROM performance_schema.setup_instruments
WHERE NAME LIKE '%memory%';

select
table_schema as '数据库',
table_name as '表名',
table_rows as '记录数',
truncate(data_length/1024/1024, 2) as '数据容量(MB)',
truncate(index_length/1024/1024, 2) as '索引容量(MB)'
from information_schema.tables
where table_schema='360eco_order'
order by table_rows desc, index_length desc;


SELECT LEFT(reback_date,10) date1,LEFT(send_date,10) date2,
COUNT(1) CNT FROM `360eco_order`.bi_foreign_order_data bfod  GROUP BY 1,2;


SELECT LEFT(reback_date,10) date1,
COUNT(1) CNT FROM `360eco_order`.bi_foreign_order_data bfod where reback_date is not NULL  
GROUP BY 1 order by 1 DESC;


SELECT LEFT(send_date,10) date1,
COUNT(1) CNT FROM `360eco_order`.bi_foreign_order_data bfod where send_date is not NULL  
GROUP BY 1 order by 1 DESC;

SET GLOBAL innodb_lock_wait_timeout = 120;

-- UPDATE `360eco_order`.bi_foreign_order_data_reback AS b
-- INNER JOIN  360eco.dim_stock_product_mapping AS d  
-- ON b.item_no = d.goods_ID
-- SET b.item_name = d.goods_name 
-- WHERE  b.reback_date<'2023-01-01' ;


SELECT * FROM 360eco_order.bi_foreign_order_data_refine 
WHERE item_name='570b9a675efb1174378b4582' AND item_no='570b9a675efb1174378b4582';


SELECT left(send_date,10) the_date,COUNT(1) CNT 
FROM bi_foreign_order_data WHERE LEFT(update_time,10)='2024-11-21' GROUP BY 1 order by 1 DESC;

explain INSERT into bi_foreign_order_data_refine_bak (send_date,sign_date,order_date,order_no,order_type,order_status,item_no,item_name,spec_name,spu,material_no,business_line,category_first,category_second,product_type,custom_name,`storage`,channel_first,channel_second,channel_third,corp_num,corp_price,amount,purchase_price,purchase_cost_sum,item_status,receive_privince,type,update_time,detail_id)
SELECT send_date,sign_date,order_date,order_no,order_type,order_status,item_no,item_name,spec_name,spu,material_no,business_line,category_first,category_second,product_type,custom_name,`storage`,channel_first,channel_second,channel_third,corp_num,corp_price,amount,purchase_price,purchase_cost_sum,item_status,receive_privince,type,update_time,detail_id FROM `360eco_order`.bi_foreign_order_data USE INDEX (idx_composite)
WHERE  sign_date BETWEEN DATE_SUB(CURRENT_DATE,INTERVAL 60 DAY) AND  DATE_SUB(CURRENT_DATE,INTERVAL 40 DAY);


explain SELECT send_date,sign_date,order_date,order_no,order_type,order_status,item_no,item_name,spec_name,spu,material_no,
business_line,category_first,category_second,product_type,custom_name,`storage`,channel_first,channel_second,channel_third,
corp_num,corp_price,amount,purchase_price,purchase_cost_sum,item_status,receive_privince,type,update_time,detail_id 
FROM 360eco_order.bi_foreign_order_data 
-- USE INDEX (idx_composite)
WHERE  send_date BETWEEN DATE_SUB(CURRENT_DATE,INTERVAL 19 DAY) AND  DATE_SUB(CURRENT_DATE,INTERVAL 1 DAY);


DELETE FROM bi_foreign_order_data2024h1
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM bi_foreign_order_data2024h1  GROUP BY 
order_no,item_no,detail_id) AS m );


SELECT LEFT(send_date,10) the_date1,LEFT(reback_date,10) the_date2,COUNT(1) CNT 
FROM 360eco_order.bi_foreign_order_data2024H1  GROUP BY 1,2 ORDER BY 1,2 DESC;

CREATE PROCEDURE BatchInsert()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE batch_size INT DEFAULT 1000;
    DECLARE offset_value INT DEFAULT 0;

    WHILE NOT done DO
        INSERT INTO `360eco_order`.bi_foreign_order_data_refine_bak (
            send_date, sign_date, order_date, order_no, order_type, order_status, item_no, item_name, spec_name,
            spu, material_no, business_line, category_first, category_second, product_type, custom_name,
            `storage`, channel_first, channel_second, channel_third, corp_num, corp_price, amount,
            purchase_price, purchase_cost_sum, item_status, receive_privince, type, update_time, detail_id
        )
        SELECT send_date, sign_date, order_date, order_no, order_type, order_status, item_no, item_name, spec_name,
               spu, material_no, business_line, category_first, category_second, product_type, custom_name,
               `storage`, channel_first, channel_second, channel_third, corp_num, corp_price, amount,
               purchase_price, purchase_cost_sum, item_status, receive_privince, type, update_time, detail_id
        FROM `360eco_order`.bi_foreign_order_data
        WHERE sign_date BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL 60 DAY) 
                            AND DATE_SUB(CURRENT_DATE, INTERVAL 40 DAY)
        LIMIT batch_size OFFSET offset_value;

        SET offset_value = offset_value + batch_size;

        -- Check if the last batch had rows
        IF ROW_COUNT() = 0 THEN
            SET done = TRUE;
        END IF;
    END WHILE;
END;
-- DROP VIEW 360eco_yzmall.view_tmall_so_det2 
-- as SELECT `date` the_date , `item_id`,`item_name`,`num` deal_items,`payment` deal_amt,`refund` refund_amt FROM 360eco_tmall.product_det_index;
