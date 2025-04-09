SELECT r.*, 
       n.iso3166_2_code, 
       n.iso3166_3_code,
       rm.meaning as region_meaning, 
       rm.tags as region_tags,
       re.eng_expression as region_eng,
       re.ita_expression as region_ita,
       re.spa_expression as region_spa,
       re.fra_expression as region_fra,
       re.deu_expression as region_deu,
       nm.meaning as nation_meaning,
       ne.eng_expression as eng_name,
       ne.ita_expression as ita_name,
       ne.spa_expression as spa_name
FROM geo_administrative_regions r
JOIN geo_nations n ON r.nation_id = n.id
LEFT JOIN i18n_meanings rm ON r.name_id = rm.id
LEFT JOIN i18n_expression_meanings rem ON rm.id = rem.meaning_id
LEFT JOIN i18n_expressions re ON rem.expression_id = re.id
LEFT JOIN i18n_meanings nm ON n.name_id = nm.id
LEFT JOIN i18n_expression_meanings nem ON nm.id = nem.meaning_id
LEFT JOIN i18n_expressions ne ON nem.expression_id = ne.id
WHERE r.id = ?;