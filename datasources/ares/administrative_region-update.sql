/**
 * @transaction
 */

-- Ottieni l'ID del significato dalla regione amministrativa
SELECT name_id INTO @meaning_id FROM geo_administrative_regions WHERE id = ?;

-- Aggiorna la regione amministrativa
UPDATE geo_administrative_regions 
SET nation_id = ?,
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