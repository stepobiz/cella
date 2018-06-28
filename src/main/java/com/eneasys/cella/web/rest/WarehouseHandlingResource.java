package com.eneasys.cella.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eneasys.cella.domain.WarehouseHandling;
import com.eneasys.cella.repository.WarehouseHandlingRepository;
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
 * REST controller for managing WarehouseHandling.
 */
@RestController
@RequestMapping("/api")
public class WarehouseHandlingResource {

    private final Logger log = LoggerFactory.getLogger(WarehouseHandlingResource.class);

    private static final String ENTITY_NAME = "warehouseHandling";

    private final WarehouseHandlingRepository warehouseHandlingRepository;

    public WarehouseHandlingResource(WarehouseHandlingRepository warehouseHandlingRepository) {
        this.warehouseHandlingRepository = warehouseHandlingRepository;
    }

    /**
     * POST  /warehouse-handlings : Create a new warehouseHandling.
     *
     * @param warehouseHandling the warehouseHandling to create
     * @return the ResponseEntity with status 201 (Created) and with body the new warehouseHandling, or with status 400 (Bad Request) if the warehouseHandling has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/warehouse-handlings")
    @Timed
    public ResponseEntity<WarehouseHandling> createWarehouseHandling(@RequestBody WarehouseHandling warehouseHandling) throws URISyntaxException {
        log.debug("REST request to save WarehouseHandling : {}", warehouseHandling);
        if (warehouseHandling.getId() != null) {
            throw new BadRequestAlertException("A new warehouseHandling cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WarehouseHandling result = warehouseHandlingRepository.save(warehouseHandling);
        return ResponseEntity.created(new URI("/api/warehouse-handlings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /warehouse-handlings : Updates an existing warehouseHandling.
     *
     * @param warehouseHandling the warehouseHandling to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated warehouseHandling,
     * or with status 400 (Bad Request) if the warehouseHandling is not valid,
     * or with status 500 (Internal Server Error) if the warehouseHandling couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/warehouse-handlings")
    @Timed
    public ResponseEntity<WarehouseHandling> updateWarehouseHandling(@RequestBody WarehouseHandling warehouseHandling) throws URISyntaxException {
        log.debug("REST request to update WarehouseHandling : {}", warehouseHandling);
        if (warehouseHandling.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WarehouseHandling result = warehouseHandlingRepository.save(warehouseHandling);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, warehouseHandling.getId().toString()))
            .body(result);
    }

    /**
     * GET  /warehouse-handlings : get all the warehouseHandlings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of warehouseHandlings in body
     */
    @GetMapping("/warehouse-handlings")
    @Timed
    public List<WarehouseHandling> getAllWarehouseHandlings() {
        log.debug("REST request to get all WarehouseHandlings");
        return warehouseHandlingRepository.findAll();
    }

    /**
     * GET  /warehouse-handlings/:id : get the "id" warehouseHandling.
     *
     * @param id the id of the warehouseHandling to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the warehouseHandling, or with status 404 (Not Found)
     */
    @GetMapping("/warehouse-handlings/{id}")
    @Timed
    public ResponseEntity<WarehouseHandling> getWarehouseHandling(@PathVariable Long id) {
        log.debug("REST request to get WarehouseHandling : {}", id);
        Optional<WarehouseHandling> warehouseHandling = warehouseHandlingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(warehouseHandling);
    }

    /**
     * DELETE  /warehouse-handlings/:id : delete the "id" warehouseHandling.
     *
     * @param id the id of the warehouseHandling to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/warehouse-handlings/{id}")
    @Timed
    public ResponseEntity<Void> deleteWarehouseHandling(@PathVariable Long id) {
        log.debug("REST request to delete WarehouseHandling : {}", id);

        warehouseHandlingRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
