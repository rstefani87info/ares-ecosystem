SELECT em.*, 
       e.eng_expression,
       e.ita_expression,
       m.meaning as meaning_text
FROM i18n_expression_meanings em
JOIN i18n_meanings m ON em.meaning_id = m.id
JOIN i18n_expressions e ON em.expression_id = e.id
ORDER BY em.meaning_id, em.expression_id;