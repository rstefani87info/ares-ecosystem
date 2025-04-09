-- Ottieni l'ID del significato dalla nazione
SELECT name_id INTO @meaning_id FROM geo_nations WHERE id = ?;

-- Aggiorna la nazione
UPDATE geo_nations 
SET iso3166_2_code = ?,
    iso3166_3_code = ?,
    iso3166_numeric_code = ?,
    type = ?,
    surface_kmq = ?,
    language = ?,
    dependency_id = ?
WHERE id = ?;

-- Ottieni l'ID dell'espressione dal significato
SELECT expression_id INTO @expression_id 
FROM i18n_expression_meanings 
WHERE meaning_id = @meaning_id 
LIMIT 1;

-- Aggiorna l'espressione con le traduzioni fornite
UPDATE i18n_expressions 
SET eng_expression = ?,
    ita_expression = ?,
    spa_expression = ?,
    fra_expression = ?,
    deu_expression = ?
WHERE id = @expression_id;