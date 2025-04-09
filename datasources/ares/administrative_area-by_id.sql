SELECT a.*, 
       r.nation_id,
       am.meaning as area_meaning, 
       am.tags as area_tags,
       ae.eng_expression as area_eng,
       ae.ita_expression as area_ita,
       ae.spa_expression as area_spa,
       ae.fra_expression as area_fra,
       ae.deu_expression as area_deu
FROM geo_administrative_areas a
JOIN geo_administrative_regions r ON a.administrative_region_id = r.id
LEFT JOIN i18n_meanings am ON a.name_id = am.id
LEFT JOIN i18n_expression_meanings aem ON am.id = aem.meaning_id
LEFT JOIN i18n_expressions ae ON aem.expression_id = ae.id
WHERE a.id = ?;