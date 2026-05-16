SELECT * FROM performance_schema.setup_instruments
WHERE NAME LIKE '%memory%';

-- 1.
DELETE FROM product_det_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM product_det_index  GROUP BY `date`,
item_id,`name`,goods_state,labels,model) AS m );

-- 2.类目指标
DELETE FROM item_category_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM item_category_index  GROUP BY the_date,
primary_category,secondary_category,third_category) AS m );
-- 5.店铺主指标

DELETE FROM main_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM main_index  GROUP BY the_date) AS m );



-- 6. 直播相关指标
 
 
DELETE FROM shop_live_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM shop_live_index  GROUP BY `date`) AS m );

DELETE FROM shop_live_perf_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM shop_live_perf_index  GROUP BY `live_time`) AS m );


DELETE FROM shop_live_turnover_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM shop_live_turnover_index  GROUP BY `stat_date`) AS m );

SET @num := 0;
UPDATE shop_live_index SET id = @num := (@num+1);
ALTER TABLE shop_live_index AUTO_INCREMENT = 1;

SET @num := 0;
UPDATE shop_live_perf_index SET id = @num := (@num+1);
ALTER TABLE shop_live_perf_index AUTO_INCREMENT = 1;

SET @num := 0;
UPDATE shop_live_turnover_index SET id = @num := (@num+1);
ALTER TABLE shop_live_turnover_index AUTO_INCREMENT = 1;
-- 7.单品流量来源

DELETE FROM item_traffic_source_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM item_traffic_source_index  GROUP BY 
the_date,sku_id,traffic_source) AS m );

-- To remove all tabs characters 
UPDATE `item_traffic_source_index` SET `sku_id` = REPLACE(`sku_id`, '\t', '');


-- SET @num := 0;
-- UPDATE item_traffic_source_index SET id = @num := (@num+1);
-- ALTER TABLE item_traffic_source_index AUTO_INCREMENT = 1;

-- 10.内容数据

DELETE FROM content_data_channel_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM content_data_channel_index  GROUP BY the_date,
content_type,channel_name) AS m );


DELETE FROM content_data_single_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM content_data_single_index  GROUP BY the_date,
content_type,content_title,video_id,goods_id) AS m );

DELETE FROM content_data_goods_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM content_data_goods_index  GROUP BY the_date,
content_type,goods_id) AS m );

DELETE FROM content_data_goods_single_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM content_data_goods_single_index  GROUP BY the_date,
content_type,goods_id,video_id) AS m );



DELETE FROM content_data_recommend_weixq_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM content_data_recommend_weixq_index  GROUP BY the_date,
content_title,video_id,goods_id) AS m );



-- 13.明星店铺

DELETE FROM star_shop_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM star_shop_index  GROUP BY `date`,
project,unit,creative,consumption) AS m );



-- UPDATE adbrain_index SET campaign_type='万相台'


-- 14-2 万相台-超级直播去重
DELETE FROM adbrain_live_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM adbrain_live_index  GROUP BY `the_date`,order_id,plan_name) AS m );


-- 14-3 万相台-短视频去重
DELETE FROM adbrain_video_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM adbrain_video_index  GROUP BY `the_date`,plan_id,plan_name) AS m );

-- 14-4 万相台-创意
DELETE FROM adbrain_idea_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM adbrain_idea_index  GROUP BY 
`the_date`,campaign_type,idea_id,product_id) AS m );

-- 14-5 万相台-计划

DELETE FROM adbrain_plan_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM adbrain_plan_index  GROUP BY 
`the_date`,campaign_type,plan_id,plan_name) AS m );


-- -- 16. 淘宝客
-- DELETE FROM taoke_data_index
-- WHERE id NOT IN (
-- SELECT id FROM (
-- SELECT max(id) AS id FROM taoke_data_index  
-- GROUP BY product_id,project_name,account_spending_time,source_or_nickname_for_taoke) AS m );
-- 
-- 
-- 17.C仓库存去重
DELETE FROM jianan_stock_2c_det
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM jianan_stock_2c_det  GROUP BY the_date,item_code) AS m );
DELETE FROM jianan_stock_2c_det where the_date IS NULL;
DELETE FROM jianan_stock_2c_det where stock_cnt=0;


DELETE FROM 360eco_car.jianan_stock_2c_det
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM 360eco_car.jianan_stock_2c_det  GROUP BY the_date,item_code) AS m );
DELETE FROM 360eco_car.jianan_stock_2c_det where the_date IS NULL;
DELETE FROM 360eco_car.jianan_stock_2c_det where stock_cnt=0;


DELETE FROM 360eco_cam.jianan_stock_2c_det
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM 360eco_cam.jianan_stock_2c_det  GROUP BY the_date,warehouse,item_code) AS m );
DELETE FROM 360eco_cam.jianan_stock_2c_det where the_date IS NULL;
DELETE FROM 360eco_cam.jianan_stock_2c_det where stock_cnt=0;

-- 35.换货订单明细

DELETE FROM 360eco_car.tmall_flagship_store_return_det_index
WHERE id NOT IN (
SELECT id FROM (
SELECT max(id) AS id FROM 360eco_car.tmall_flagship_store_return_det_index  
GROUP BY order_no,item_no) AS m );

