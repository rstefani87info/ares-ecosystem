-- Ricerca città per nome
SELECT COUNT(*) as count
FROM (
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
JOIN i18n_expression_meanings cem ON cem.meaning_id = c.name_id
JOIN i18n_expressions ce ON ce.id = cem.expression_id
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
JOIN i18n_expression_meanings aem ON aem.meaning_id = a.name_id
JOIN i18n_expressions ae ON ae.id = aem.expression_id
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
JOIN i18n_expression_meanings rem ON rem.meaning_id = r.name_id
JOIN i18n_expressions re ON re.id = rem.expression_id
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
LEFT JOIN i18n_expression_meanings cem ON cem.meaning_id = c.name_id
LEFT JOIN i18n_expressions ce ON ce.id = cem.expression_id
WHERE c.postal_codes IS NOT NULL AND c.postal_codes LIKE ?
) as A;
