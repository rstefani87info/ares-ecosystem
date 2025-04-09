SELECT c.*, 
       a.administrative_region_id,
       cm.meaning as city_meaning, 
       cm.tags as city_tags,
       ce.eng_expression as eng_name,
       ce.ita_expression as ita_name,
       ce.spa_expression as spa_name,
       ce.fra_expression as fra_name,
       ce.deu_expression as deu_name,
       ce.por_expression as por_name,
       ce.rus_expression as rus_name,
       ce.zho_expression as zho_name
FROM geo_cities c
JOIN geo_administrative_areas a ON c.administrative_area_id = a.id
LEFT JOIN i18n_meanings cm ON c.name_id = cm.id
LEFT JOIN i18n_expression_meanings cem ON cm.id = cem.meaning_id
LEFT JOIN i18n_expressions ce ON cem.expression_id = ce.id;