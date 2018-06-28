package com.eneasys.cella.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eneasys.cella.domain.WarehouseHandlingItems;
import com.eneasys.cella.repository.WarehouseHandlingItemsRepository;
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
 * REST controller for managing WarehouseHandlingItems.
 */
@RestController
@RequestMapping("/api")
public class WarehouseHandlingItemsResource {

    private final Logger log = LoggerFactory.getLogger(WarehouseHandlingItemsResource.class);

    private static final String ENTITY_NAME = "warehouseHandlingItems";

    private final WarehouseHandlingItemsRepository warehouseHandlingItemsRepository;

    public WarehouseHandlingItemsResource(WarehouseHandlingItemsRepository warehouseHandlingItemsRepository) {
        this.warehouseHandlingItemsRepository = warehouseHandlingItemsRepository;
    }

    /**
     * POST  /warehouse-handling-items : Create a new warehouseHandlingItems.
     *
     * @param warehouseHandlingItems the warehouseHandlingItems to create
     * @return the ResponseEntity with status 201 (Created) and with body the new warehouseHandlingItems, or with status 400 (Bad Request) if the warehouseHandlingItems has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/warehouse-handling-items")
    @Timed
    public ResponseEntity<WarehouseHandlingItems> createWarehouseHandlingItems(@RequestBody WarehouseHandlingItems warehouseHandlingItems) throws URISyntaxException {
        log.debug("REST request to save WarehouseHandlingItems : {}", warehouseHandlingItems);
        if (warehouseHandlingItems.getId() != null) {
            throw new BadRequestAlertException("A new warehouseHandlingItems cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WarehouseHandlingItems result = warehouseHandlingItemsRepository.save(warehouseHandlingItems);
        return ResponseEntity.created(new URI("/api/warehouse-handling-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /warehouse-handling-items : Updates an existing warehouseHandlingItems.
     *
     * @param warehouseHandlingItems the warehouseHandlingItems to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated warehouseHandlingItems,
     * or with status 400 (Bad Request) if the warehouseHandlingItems is not valid,
     * or with status 500 (Internal Server Error) if the warehouseHandlingItems couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/warehouse-handling-items")
    @Timed
    public ResponseEntity<WarehouseHandlingItems> updateWarehouseHandlingItems(@RequestBody WarehouseHandlingItems warehouseHandlingItems) throws URISyntaxException {
        log.debug("REST request to update WarehouseHandlingItems : {}", warehouseHandlingItems);
        if (warehouseHandlingItems.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WarehouseHandlingItems result = warehouseHandlingItemsRepository.save(warehouseHandlingItems);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, warehouseHandlingItems.getId().toString()))
            .body(result);
    }

    /**
     * GET  /warehouse-handling-items : get all the warehouseHandlingItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of warehouseHandlingItems in body
     */
    @GetMapping("/warehouse-handling-items")
    @Timed
    public List<WarehouseHandlingItems> getAllWarehouseHandlingItems() {
        log.debug("REST request to get all WarehouseHandlingItems");
        return warehouseHandlingItemsRepository.findAll();
    }

    /**
     * GET  /warehouse-handling-items/:id : get the "id" warehouseHandlingItems.
     *
     * @param id the id of the warehouseHandlingItems to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the warehouseHandlingItems, or with status 404 (Not Found)
     */
    @GetMapping("/warehouse-handling-items/{id}")
    @Timed
    public ResponseEntity<WarehouseHandlingItems> getWarehouseHandlingItems(@PathVariable Long id) {
        log.debug("REST request to get WarehouseHandlingItems : {}", id);
        Optional<WarehouseHandlingItems> warehouseHandlingItems = warehouseHandlingItemsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(warehouseHandlingItems);
    }

    /**
     * DELETE  /warehouse-handling-items/:id : delete the "id" warehouseHandlingItems.
     *
     * @param id the id of the warehouseHandlingItems to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/warehouse-handling-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteWarehouseHandlingItems(@PathVariable Long id) {
        log.debug("REST request to delete WarehouseHandlingItems : {}", id);

        warehouseHandlingItemsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
