SELECT a.*, 
       r.nation_id,
       am.meaning as area_meaning, 
       am.tags as area_tags,
       ae.eng_expression as area_eng,
       ae.ita_expression as area_ita,
       ae.spa_expression as area_spa,
       ae.fra_expression as area_fra,
       ae.deu_expression as area_deu,
       ae.por_expression as area_por,
       ae.rus_expression as area_rus,
       ae.zho_expression as area_zho
FROM geo_administrative_areas a
JOIN geo_administrative_regions r ON a.administrative_region_id = r.id
LEFT JOIN i18n_meanings am ON a.name_id = am.id
LEFT JOIN i18n_expression_meanings aem ON am.id = aem.meaning_id
LEFT JOIN i18n_expressions ae ON aem.expression_id = ae.id
WHERE CASE ? 
    WHEN 'eng' THEN ae.eng_expression
    WHEN 'ita' THEN ae.ita_expression
    WHEN 'spa' THEN ae.spa_expression
    WHEN 'fra' THEN ae.fra_expression
    WHEN 'deu' THEN ae.deu_expression
    WHEN 'por' THEN ae.por_expression
    WHEN 'rus' THEN ae.rus_expression
    WHEN 'zho' THEN ae.zho_expression
    ELSE ae.eng_expression
END LIKE ?;