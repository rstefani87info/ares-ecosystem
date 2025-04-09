/**
 * @transaction
 */

-- estrai l'ultimo ID in geo_cities
SET @last_id = (SELECT MAX(id) FROM geo_cities);
-- imposta l'ID per la nuova città
SET @new_id = COALESCE(@last_id, 0) + 1;

-- Inserisci il significato
INSERT INTO i18n_meanings (meaning, tags, table_name, table_id)
VALUES (?, ?, 'geo_cities', @new_id);

-- Ottieni l'ID del significato appena inserito
SET @meaning_id = (SELECT MAX(id) FROM i18n_meanings);

-- Inserisci l'espressione
INSERT INTO i18n_expressions (eng_expression, ita_expression, spa_expression, fra_expression, deu_expression)
VALUES (?, ?, ?, ?, ?);

-- Ottieni l'ID dell'espressione appena inserita
SET @expression_id = (SELECT MAX(id) FROM i18n_expressions);

-- Collega l'espressione al significato
INSERT INTO i18n_expression_meanings (expression_id, meaning_id)
VALUES (@expression_id, @meaning_id);

-- Inserisci la città
INSERT INTO geo_cities (id, administrative_area_id, postal_codes, type, name_id, latitude, longitude)
VALUES (@new_id, ?, ?, ?, @meaning_id, ?, ?);