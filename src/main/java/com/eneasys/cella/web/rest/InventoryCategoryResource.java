package com.eneasys.cella.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eneasys.cella.domain.InventoryCategory;
import com.eneasys.cella.repository.InventoryCategoryRepository;
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
 * REST controller for managing InventoryCategory.
 */
@RestController
@RequestMapping("/api")
public class InventoryCategoryResource {

    private final Logger log = LoggerFactory.getLogger(InventoryCategoryResource.class);

    private static final String ENTITY_NAME = "inventoryCategory";

    private final InventoryCategoryRepository inventoryCategoryRepository;

    public InventoryCategoryResource(InventoryCategoryRepository inventoryCategoryRepository) {
        this.inventoryCategoryRepository = inventoryCategoryRepository;
    }

    /**
     * POST  /inventory-categories : Create a new inventoryCategory.
     *
     * @param inventoryCategory the inventoryCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inventoryCategory, or with status 400 (Bad Request) if the inventoryCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inventory-categories")
    @Timed
    public ResponseEntity<InventoryCategory> createInventoryCategory(@RequestBody InventoryCategory inventoryCategory) throws URISyntaxException {
        log.debug("REST request to save InventoryCategory : {}", inventoryCategory);
        if (inventoryCategory.getId() != null) {
            throw new BadRequestAlertException("A new inventoryCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InventoryCategory result = inventoryCategoryRepository.save(inventoryCategory);
        return ResponseEntity.created(new URI("/api/inventory-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inventory-categories : Updates an existing inventoryCategory.
     *
     * @param inventoryCategory the inventoryCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inventoryCategory,
     * or with status 400 (Bad Request) if the inventoryCategory is not valid,
     * or with status 500 (Internal Server Error) if the inventoryCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inventory-categories")
    @Timed
    public ResponseEntity<InventoryCategory> updateInventoryCategory(@RequestBody InventoryCategory inventoryCategory) throws URISyntaxException {
        log.debug("REST request to update InventoryCategory : {}", inventoryCategory);
        if (inventoryCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InventoryCategory result = inventoryCategoryRepository.save(inventoryCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, inventoryCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inventory-categories : get all the inventoryCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of inventoryCategories in body
     */
    @GetMapping("/inventory-categories")
    @Timed
    public List<InventoryCategory> getAllInventoryCategories() {
        log.debug("REST request to get all InventoryCategories");
        return inventoryCategoryRepository.findAll();
    }

    /**
     * GET  /inventory-categories/:id : get the "id" inventoryCategory.
     *
     * @param id the id of the inventoryCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inventoryCategory, or with status 404 (Not Found)
     */
    @GetMapping("/inventory-categories/{id}")
    @Timed
    public ResponseEntity<InventoryCategory> getInventoryCategory(@PathVariable Long id) {
        log.debug("REST request to get InventoryCategory : {}", id);
        Optional<InventoryCategory> inventoryCategory = inventoryCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(inventoryCategory);
    }

    /**
     * DELETE  /inventory-categories/:id : delete the "id" inventoryCategory.
     *
     * @param id the id of the inventoryCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inventory-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteInventoryCategory(@PathVariable Long id) {
        log.debug("REST request to delete InventoryCategory : {}", id);

        inventoryCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
