SELECT em.*, 
       m.meaning as meaning_text, 
       m.tags as meaning_tags,
       e.eng_expression,
       e.ita_expression,
       e.spa_expression,
       e.fra_expression,
       e.deu_expression
FROM i18n_expression_meanings em
JOIN i18n_meanings m ON em.meaning_id = m.id
JOIN i18n_expressions e ON em.expression_id = e.id
WHERE em.expression_id = ?;