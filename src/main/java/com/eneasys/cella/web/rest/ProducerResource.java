package com.eneasys.cella.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eneasys.cella.domain.Producer;
import com.eneasys.cella.repository.ProducerRepository;
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
 * REST controller for managing Producer.
 */
@RestController
@RequestMapping("/api")
public class ProducerResource {

    private final Logger log = LoggerFactory.getLogger(ProducerResource.class);

    private static final String ENTITY_NAME = "producer";

    private final ProducerRepository producerRepository;

    public ProducerResource(ProducerRepository producerRepository) {
        this.producerRepository = producerRepository;
    }

    /**
     * POST  /producers : Create a new producer.
     *
     * @param producer the producer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new producer, or with status 400 (Bad Request) if the producer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/producers")
    @Timed
    public ResponseEntity<Producer> createProducer(@RequestBody Producer producer) throws URISyntaxException {
        log.debug("REST request to save Producer : {}", producer);
        if (producer.getId() != null) {
            throw new BadRequestAlertException("A new producer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Producer result = producerRepository.save(producer);
        return ResponseEntity.created(new URI("/api/producers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /producers : Updates an existing producer.
     *
     * @param producer the producer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated producer,
     * or with status 400 (Bad Request) if the producer is not valid,
     * or with status 500 (Internal Server Error) if the producer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/producers")
    @Timed
    public ResponseEntity<Producer> updateProducer(@RequestBody Producer producer) throws URISyntaxException {
        log.debug("REST request to update Producer : {}", producer);
        if (producer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Producer result = producerRepository.save(producer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, producer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /producers : get all the producers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of producers in body
     */
    @GetMapping("/producers")
    @Timed
    public List<Producer> getAllProducers() {
        log.debug("REST request to get all Producers");
        return producerRepository.findAll();
    }

    /**
     * GET  /producers/:id : get the "id" producer.
     *
     * @param id the id of the producer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the producer, or with status 404 (Not Found)
     */
    @GetMapping("/producers/{id}")
    @Timed
    public ResponseEntity<Producer> getProducer(@PathVariable Long id) {
        log.debug("REST request to get Producer : {}", id);
        Optional<Producer> producer = producerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(producer);
    }

    /**
     * DELETE  /producers/:id : delete the "id" producer.
     *
     * @param id the id of the producer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/producers/{id}")
    @Timed
    public ResponseEntity<Void> deleteProducer(@PathVariable Long id) {
        log.debug("REST request to delete Producer : {}", id);

        producerRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
