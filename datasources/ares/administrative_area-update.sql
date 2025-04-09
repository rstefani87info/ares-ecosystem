

/**
 * @transaction
 */

-- Ottieni l'ID del significato dall'area amministrativa
SELECT name_id INTO @meaning_id FROM geo_administrative_areas WHERE id = ?;

-- Aggiorna l'area amministrativa
UPDATE geo_administrative_areas 
SET symbol = ?,
    administrative_region_id = ?,
    type = ?
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