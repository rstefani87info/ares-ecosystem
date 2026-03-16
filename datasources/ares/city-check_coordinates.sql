SELECT 
    c.id,
    c.latitude,
    c.longitude,
    c.postal_codes,
    m.text as name,
    m.language,
    aa.id as administrative_area_id,
    aa_m.text as administrative_area_name,
    ar.id as administrative_region_id,
    ar_m.text as administrative_region_name,
    n.id as nation_id,
    n_m.text as nation_name,
    gps_coords_distance(
        point(?, ?),
        point(c.longitude, c.latitude)
    ) / 1000 as distance_km
FROM 
    geo_cities c
    JOIN i18n_meanings m ON c.name_meaning = m.id
    JOIN geo_administrative_areas aa ON c.administrative_area_id = aa.id
    JOIN i18n_meanings aa_m ON aa.name_meaning = aa_m.id
    JOIN geo_administrative_regions ar ON aa.administrative_region_id = ar.id
    JOIN i18n_meanings ar_m ON ar.name_meaning = ar_m.id
    JOIN geo_nations n ON ar.nation_id = n.id
    JOIN i18n_meanings n_m ON n.name_meaning = n_m.id
WHERE
    m.language = ?
    AND aa_m.language = m.language
    AND ar_m.language = m.language
    AND n_m.language = m.language
    AND ST_Distance_Sphere(
        point(?, ?),
        point(c.longitude, c.latitude)
    ) / 1000 <= ?
ORDER BY 
    distance_km ASC;