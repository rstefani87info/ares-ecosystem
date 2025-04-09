SELECT n.*, 
       m.meaning as name_meaning, 
       m.tags as name_tags,
       e.eng_expression as name_eng,
       e.ita_expression as name_ita,
       e.spa_expression as name_spa,
       e.fra_expression as name_fra,
       e.deu_expression as name_deu,
       e.por_expression as name_por,
       e.rus_expression as name_rus,
       e.zho_expression as name_zho,
       e.jpn_expression as name_jpn,
       e.kor_expression as name_kor,
       e.ara_expression as name_ara
FROM geo_nations n
LEFT JOIN i18n_meanings m ON n.name_id = m.id
LEFT JOIN i18n_expression_meanings em ON m.id = em.meaning_id
LEFT JOIN i18n_expressions e ON em.expression_id = e.id;