package com.eneasys.cella.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eneasys.cella.domain.Inventory;
import com.eneasys.cella.repository.InventoryRepository;
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
 * REST controller for managing Inventory.
 */
@RestController
@RequestMapping("/api")
public class InventoryResource {

    private final Logger log = LoggerFactory.getLogger(InventoryResource.class);

    private static final String ENTITY_NAME = "inventory";

    private final InventoryRepository inventoryRepository;

    public InventoryResource(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    /**
     * POST  /inventories : Create a new inventory.
     *
     * @param inventory the inventory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inventory, or with status 400 (Bad Request) if the inventory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inventories")
    @Timed
    public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) throws URISyntaxException {
        log.debug("REST request to save Inventory : {}", inventory);
        if (inventory.getId() != null) {
            throw new BadRequestAlertException("A new inventory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Inventory result = inventoryRepository.save(inventory);
        return ResponseEntity.created(new URI("/api/inventories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inventories : Updates an existing inventory.
     *
     * @param inventory the inventory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inventory,
     * or with status 400 (Bad Request) if the inventory is not valid,
     * or with status 500 (Internal Server Error) if the inventory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inventories")
    @Timed
    public ResponseEntity<Inventory> updateInventory(@RequestBody Inventory inventory) throws URISyntaxException {
        log.debug("REST request to update Inventory : {}", inventory);
        if (inventory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Inventory result = inventoryRepository.save(inventory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, inventory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inventories : get all the inventories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of inventories in body
     */
    @GetMapping("/inventories")
    @Timed
    public List<Inventory> getAllInventories() {
        log.debug("REST request to get all Inventories");
        return inventoryRepository.findAll();
    }

    /**
     * GET  /inventories/:id : get the "id" inventory.
     *
     * @param id the id of the inventory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inventory, or with status 404 (Not Found)
     */
    @GetMapping("/inventories/{id}")
    @Timed
    public ResponseEntity<Inventory> getInventory(@PathVariable Long id) {
        log.debug("REST request to get Inventory : {}", id);
        Optional<Inventory> inventory = inventoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(inventory);
    }

    /**
     * DELETE  /inventories/:id : delete the "id" inventory.
     *
     * @param id the id of the inventory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inventories/{id}")
    @Timed
    public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
        log.debug("REST request to delete Inventory : {}", id);

        inventoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
