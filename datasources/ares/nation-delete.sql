
/**
 * @transaction
 */

-- Ottieni l'ID del significato dalla nazione
SELECT name_id INTO @meaning_id FROM geo_nations WHERE id = ?;

-- Elimina la nazione
DELETE FROM geo_nations WHERE id = ?;

-- Ottieni l'ID dell'espressione dal significato
SELECT expression_id INTO @expression_id 
FROM i18n_expression_meanings 
WHERE meaning_id = @meaning_id;

-- Elimina il collegamento tra espressione e significato
DELETE FROM i18n_expression_meanings 
WHERE meaning_id = @meaning_id AND expression_id = @expression_id;

-- Elimina l'espressione
DELETE FROM i18n_expressions WHERE id = @expression_id;

-- Elimina il significato
DELETE FROM i18n_meanings WHERE id = @meaning_id;