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
       am.meaning as area_meaning,
       ae.eng_expression as area_eng,
       ae.ita_expression as area_ita,
       ae.spa_expression as area_spa
FROM geo_cities c
JOIN geo_administrative_areas a ON c.administrative_area_id = a.id
LEFT JOIN i18n_meanings cm ON c.name_id = cm.id
LEFT JOIN i18n_expression_meanings cem ON cm.id = cem.meaning_id
LEFT JOIN i18n_expressions ce ON cem.expression_id = ce.id
LEFT JOIN i18n_meanings am ON a.name_id = am.id
LEFT JOIN i18n_expression_meanings aem ON am.id = aem.meaning_id
LEFT JOIN i18n_expressions ae ON aem.expression_id = ae.id
WHERE c.administrative_area_id = ?;