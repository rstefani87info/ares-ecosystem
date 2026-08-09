
DELETE FROM i18n_expression_meanings;
ALTER TABLE i18n_expression_meanings AUTO_INCREMENT = 1;
DELETE FROM i18n_expressions;
ALTER TABLE i18n_expressions AUTO_INCREMENT = 1;
DELETE FROM i18n_meanings;
ALTER TABLE i18n_meanings AUTO_INCREMENT = 1;
delete from   geo_cities;
ALTER TABLE geo_cities AUTO_INCREMENT = 1;
delete from   geo_administrative_areas;
ALTER TABLE geo_administrative_areas AUTO_INCREMENT = 1;
delete from   geo_administrative_regions;
ALTER TABLE geo_administrative_regions AUTO_INCREMENT = 1;
delete from   geo_nations;
ALTER TABLE geo_nations AUTO_INCREMENT = 1;

INSERT INTO i18n_expressions  (id,eng_expression,ita_expression,grammatical_analysis, tags)
SELECT id,en_name,it_name,'Geograpy.Nation.Name', 'geography;politics;boundaries;nations;world;names;international' from old_ares.geo_nations;

INSERT INTO i18n_meanings  (`id`, `meaning`, `tags`, `table_name`, `table_id`)
SELECT id,'Geograpy.Nation', 'geography;politics;boundaries;nations;world;names;international','geo_nations',id from old_ares.geo_nations;

INSERT INTO i18n_expression_meanings  (`expression_id`, `meaning_id`, `case_tags`, `case_percentage`)
SELECT id, id, 'proper name', 100 from old_ares.geo_nations;

INSERT INTO geo_nations  (`id`, `iso3166_2_code`, `iso3166_3_code`, `iso3166_numeric_code`, `type`, `surface_kmq`, `language`,  `name_id`)
SELECT id,iso3166_2_code,iso3166_3_code,iso3166_numeric_code, `type`, `surface_kmq`, `language`,  id from old_ares.geo_nations;

update geo_nations a join old_ares.geo_nations b on a.id=b.id SET a.dependency_id=b.dependency_id;

SET @maxMeaningID = (SELECT id from i18n_meanings order by id desc limit 1);

INSERT INTO i18n_expressions  (id,eng_expression,ita_expression,grammatical_analysis, tags)
SELECT @maxMeaningID+id,en_name,it_name,'Geograpy.Nation.AdministrativeRegion.Name', 'geography;politics;boundaries;world;names;national;interregional;administrative_regions' from old_ares.geo_administrative_regions;

INSERT INTO i18n_meanings  (`id`, `meaning`, `tags`, `table_name`, `table_id`)
SELECT @maxMeaningID+id,'Geograpy.Nation.AdministrativeRegion', 'geography;politics;boundaries;world;names;national;interregional;administrative_regions','geo_administrative_regions', id from old_ares.geo_administrative_regions;

INSERT INTO i18n_expression_meanings  (`expression_id`, `meaning_id`, `case_tags`, `case_percentage`)
SELECT @maxMeaningID+id, @maxMeaningID+id, 'proper name', 100 from old_ares.geo_administrative_regions;
 
INSERT INTO geo_administrative_regions  (`id`, `surface_kmq`, `nation_id`, `type`,`name_id`)
SELECT id,  `surface_kmq`, `nation_id`, 'administrative_region', id+@maxMeaningID from old_ares.geo_administrative_regions;

SET @maxMeaningID = (SELECT id from i18n_meanings order by id desc limit 1);

INSERT INTO i18n_expressions  (id,eng_expression,ita_expression,grammatical_analysis, tags)
SELECT @maxMeaningID+id,en_name,it_name,'Geograpy.Nation.AdministrativeRegion.AdministrativeArea.Name', 'geography;politics;boundaries;world;names;national;regional;administrative_regions;administrative_areas' from old_ares.geo_administrative_areas;

INSERT INTO i18n_meanings  (`id`, `meaning`, `tags`, `table_name`, `table_id`)
SELECT @maxMeaningID+id,'Geograpy.Nation.AdministrativeRegion.AdministrativeArea', 'geography;politics;boundaries;world;names;national;regional;administrative_regions;administrative_areas','geo_administrative_areas', id from old_ares.geo_administrative_areas;

INSERT INTO i18n_expression_meanings  (`expression_id`, `meaning_id`, `case_tags`, `case_percentage`)
SELECT @maxMeaningID+id, @maxMeaningID+id, 'proper name', 100 from old_ares.geo_administrative_areas;

INSERT INTO geo_administrative_areas  (`id`, `surface_kmq`, `administrative_region_id`, `type`,`name_id`)
SELECT id,  `surface_kmq`, `administrative_region_id`, 'administrative_area', id+@maxMeaningID from old_ares.geo_administrative_areas;

SET @maxMeaningID = (SELECT id from i18n_meanings order by id desc limit 1);

INSERT INTO i18n_expressions  (id,eng_expression,ita_expression,grammatical_analysis, tags)
SELECT @maxMeaningID+id,en_name,it_name,'Geograpy.Nation.AdministrativeRegion.AdministrativeArea.City.Name', 'geography;politics;boundaries;world;names;national;regional;administrative_regions;administrative_areas;cities;municipality,cityzen' from old_ares.geo_cities;

INSERT INTO i18n_meanings  (`id`, `meaning`, `tags`, `table_name`, `table_id`)
SELECT @maxMeaningID+id,'Geograpy.Nation.AdministrativeRegion.AdministrativeArea.City', 'geography;politics;boundaries;world;names;national;regional;administrative_regions;administrative_areas;cities;municipality,cityzen','geo_cities',@maxMeaningID+id from old_ares.geo_cities;

INSERT INTO i18n_expression_meanings  (`expression_id`, `meaning_id`, `case_tags`, `case_percentage`)
SELECT @maxMeaningID+id, @maxMeaningID+id, 'proper name', 100 from old_ares.geo_cities;

INSERT INTO geo_cities  (`id`, `postal_codes`,  `administrative_area_id`, `type`, `name_id`)
SELECT id , `postal_codes`,  `administrative_area_id`,'city',  id+@maxMeaningID from old_ares.geo_cities;

UPDATE geo_cities as c 
join i18n_expressions as e on e.id=c.name_id
join db_it.gi_comuni as gc on e.ita_expression=gc.denominazione_ita

SET c.latitude=gc.lat , c.longitude=gc.lon, c.surface_kmq = gc.superficie_kmq
WHERE c.latitude is null ; 

