-- Ricerca città per nome
SELECT 
    c.id,
    ce.eng_expression as eng_name,
    ce.ita_expression as ita_name,
    ce.spa_expression as spa_name,
    ce.fra_expression as fra_name,
    ce.deu_expression as deu_name,
    'geo_cities' as type,
    c.administrative_area_id as parent_id,
    c.postal_codes,
    c.latitude,
    c.longitude
FROM geo_cities c
LEFT JOIN i18n_meanings cm ON c.name_id = cm.id
LEFT JOIN i18n_expression_meanings cem ON cm.id = cem.meaning_id
LEFT JOIN i18n_expressions ce ON cem.expression_id = ce.id
WHERE CASE ? 
    WHEN 'eng' THEN ce.eng_expression
    WHEN 'ita' THEN ce.ita_expression
    WHEN 'spa' THEN ce.spa_expression
    WHEN 'fra' THEN ce.fra_expression
    WHEN 'deu' THEN ce.deu_expression
    ELSE ce.eng_expression
END LIKE ?

UNION ALL

-- Ricerca aree amministrative
SELECT 
    a.id,
    ae.eng_expression as eng_name,
    ae.ita_expression as ita_name,
    ae.spa_expression as spa_name,
    ae.fra_expression as fra_name,
    ae.deu_expression as deu_name,
    'geo_administrative_areas' as type,
    a.administrative_region_id as parent_id,
    NULL as postal_codes,
    NULL as latitude,
    NULL as longitude
FROM geo_administrative_areas a
LEFT JOIN i18n_meanings am ON a.name_id = am.id
LEFT JOIN i18n_expression_meanings aem ON am.id = aem.meaning_id
LEFT JOIN i18n_expressions ae ON aem.expression_id = ae.id
WHERE CASE ? 
    WHEN 'eng' THEN ae.eng_expression
    WHEN 'ita' THEN ae.ita_expression
    WHEN 'spa' THEN ae.spa_expression
    WHEN 'fra' THEN ae.fra_expression
    WHEN 'deu' THEN ae.deu_expression
    ELSE ae.eng_expression
END LIKE ?

UNION ALL

-- Ricerca regioni amministrative
SELECT 
    r.id,
    re.eng_expression as eng_name,
    re.ita_expression as ita_name,
    re.spa_expression as spa_name,
    re.fra_expression as fra_name,
    re.deu_expression as deu_name,
    'geo_administrative_regions' as type,
    r.nation_id as parent_id,
    NULL as postal_codes,
    NULL as latitude,
    NULL as longitude
FROM geo_administrative_regions r
LEFT JOIN i18n_meanings rm ON r.name_id = rm.id
LEFT JOIN i18n_expression_meanings rem ON rm.id = rem.meaning_id
LEFT JOIN i18n_expressions re ON rem.expression_id = re.id
WHERE CASE ? 
    WHEN 'eng' THEN re.eng_expression
    WHEN 'ita' THEN re.ita_expression
    WHEN 'spa' THEN re.spa_expression
    WHEN 'fra' THEN re.fra_expression
    WHEN 'deu' THEN re.deu_expression
    ELSE re.eng_expression
END LIKE ?

UNION ALL

-- Ricerca città per codice postale
SELECT 
    c.id,
    ce.eng_expression as eng_name,
    ce.ita_expression as ita_name,
    ce.spa_expression as spa_name,
    ce.fra_expression as fra_name,
    ce.deu_expression as deu_name,
    'geo_cities_postal' as type,
    c.administrative_area_id as parent_id,
    c.postal_codes,
    c.latitude,
    c.longitude
FROM geo_cities c
LEFT JOIN i18n_meanings cm ON c.name_id = cm.id
LEFT JOIN i18n_expression_meanings cem ON cm.id = cem.meaning_id
LEFT JOIN i18n_expressions ce ON cem.expression_id = ce.id
WHERE c.postal_codes LIKE ?;