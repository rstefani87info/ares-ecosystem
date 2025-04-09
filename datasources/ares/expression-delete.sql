/**
 * @transaction
 */

-- Verifica se l'espressione è collegata a significati
SELECT COUNT(*) INTO @count FROM i18n_expression_meanings WHERE expression_id = ?;

-- Se l'espressione è collegata a significati, elimina prima i collegamenti
IF @count > 0 THEN
    DELETE FROM i18n_expression_meanings WHERE expression_id = ?;
END IF;

-- Elimina l'espressione
DELETE FROM i18n_expressions WHERE id = ?;