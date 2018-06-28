package com.eneasys.cella.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eneasys.cella.domain.UnitMeasure;
import com.eneasys.cella.repository.UnitMeasureRepository;
import com.eneasys.cella.web.rest.errors.BadRequestAlertException;
import com.eneasys.cella.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UnitMeasure.
 */
@RestController
@RequestMapping("/api")
public class UnitMeasureResource {

    private final Logger log = LoggerFactory.getLogger(UnitMeasureResource.class);

    private static final String ENTITY_NAME = "unitMeasure";

    private final UnitMeasureRepository unitMeasureRepository;

    public UnitMeasureResource(UnitMeasureRepository unitMeasureRepository) {
        this.unitMeasureRepository = unitMeasureRepository;
    }

    /**
     * POST  /unit-measures : Create a new unitMeasure.
     *
     * @param unitMeasure the unitMeasure to create
     * @return the ResponseEntity with status 201 (Created) and with body the new unitMeasure, or with status 400 (Bad Request) if the unitMeasure has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/unit-measures")
    @Timed
    public ResponseEntity<UnitMeasure> createUnitMeasure(@RequestBody UnitMeasure unitMeasure) throws URISyntaxException {
        log.debug("REST request to save UnitMeasure : {}", unitMeasure);
        if (unitMeasure.getId() != null) {
            throw new BadRequestAlertException("A new unitMeasure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UnitMeasure result = unitMeasureRepository.save(unitMeasure);
        return ResponseEntity.created(new URI("/api/unit-measures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /unit-measures : Updates an existing unitMeasure.
     *
     * @param unitMeasure the unitMeasure to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated unitMeasure,
     * or with status 400 (Bad Request) if the unitMeasure is not valid,
     * or with status 500 (Internal Server Error) if the unitMeasure couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/unit-measures")
    @Timed
    public ResponseEntity<UnitMeasure> updateUnitMeasure(@RequestBody UnitMeasure unitMeasure) throws URISyntaxException {
        log.debug("REST request to update UnitMeasure : {}", unitMeasure);
        if (unitMeasure.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UnitMeasure result = unitMeasureRepository.save(unitMeasure);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, unitMeasure.getId().toString()))
            .body(result);
    }

    /**
     * GET  /unit-measures : get all the unitMeasures.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of unitMeasures in body
     */
    @GetMapping("/unit-measures")
    @Timed
    public List<UnitMeasure> getAllUnitMeasures() {
        log.debug("REST request to get all UnitMeasures");
        return unitMeasureRepository.findAll();
    }

    /**
     * GET  /unit-measures/:id : get the "id" unitMeasure.
     *
     * @param id the id of the unitMeasure to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the unitMeasure, or with status 404 (Not Found)
     */
    @GetMapping("/unit-measures/{id}")
    @Timed
    public ResponseEntity<UnitMeasure> getUnitMeasure(@PathVariable Long id) {
        log.debug("REST request to get UnitMeasure : {}", id);
        Optional<UnitMeasure> unitMeasure = unitMeasureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(unitMeasure);
    }

    /**
     * DELETE  /unit-measures/:id : delete the "id" unitMeasure.
     *
     * @param id the id of the unitMeasure to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/unit-measures/{id}")
    @Timed
    public ResponseEntity<Void> deleteUnitMeasure(@PathVariable Long id) {
        log.debug("REST request to delete UnitMeasure : {}", id);

        unitMeasureRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
