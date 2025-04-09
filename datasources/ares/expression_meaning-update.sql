UPDATE i18n_expression_meanings
SET case_tags = ?,
    case_percentage = ?
WHERE expression_id = ? AND meaning_id = ?;