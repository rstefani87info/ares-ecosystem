SELECT 
    c.id,
    c.name_meaning,
    c.name_tags,
    c.eng_name,
    c.ita_name,
    c.spa_name,
    c.fra_name,
    c.deu_name,
    c.administrative_area_id,
    aa.name_meaning AS administrative_area_name,
    c.nation_id,
    n.name_meaning AS nation_name,
    c.latitude,
    c.longitude,
    c.population,
    c.timezone,
    c.postal_code,
    c.type,
    c.created_at,
    c.updated_at
FROM 
    cities c
LEFT JOIN 
    administrative_areas aa ON c.administrative_area_id = aa.id
LEFT JOIN 
    nations n ON c.nation_id = n.id
WHERE 
    c.id = ?
LIMIT 1;