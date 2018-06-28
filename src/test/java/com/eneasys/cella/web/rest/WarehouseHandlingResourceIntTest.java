package com.eneasys.cella.web.rest;

import com.eneasys.cella.CellaApp;

import com.eneasys.cella.domain.WarehouseHandling;
import com.eneasys.cella.repository.WarehouseHandlingRepository;
import com.eneasys.cella.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static com.eneasys.cella.web.rest.TestUtil.sameInstant;
import static com.eneasys.cella.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.eneasys.cella.domain.enumeration.WarehouseHandlingType;
/**
 * Test class for the WarehouseHandlingResource REST controller.
 *
 * @see WarehouseHandlingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CellaApp.class)
public class WarehouseHandlingResourceIntTest {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final WarehouseHandlingType DEFAULT_WAREHOUSE_HANDLING_TYPE = WarehouseHandlingType.Provision;
    private static final WarehouseHandlingType UPDATED_WAREHOUSE_HANDLING_TYPE = WarehouseHandlingType.Exhaust;

    @Autowired
    private WarehouseHandlingRepository warehouseHandlingRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWarehouseHandlingMockMvc;

    private WarehouseHandling warehouseHandling;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WarehouseHandlingResource warehouseHandlingResource = new WarehouseHandlingResource(warehouseHandlingRepository);
        this.restWarehouseHandlingMockMvc = MockMvcBuilders.standaloneSetup(warehouseHandlingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WarehouseHandling createEntity(EntityManager em) {
        WarehouseHandling warehouseHandling = new WarehouseHandling()
            .date(DEFAULT_DATE)
            .warehouseHandlingType(DEFAULT_WAREHOUSE_HANDLING_TYPE);
        return warehouseHandling;
    }

    @Before
    public void initTest() {
        warehouseHandling = createEntity(em);
    }

    @Test
    @Transactional
    public void createWarehouseHandling() throws Exception {
        int databaseSizeBeforeCreate = warehouseHandlingRepository.findAll().size();

        // Create the WarehouseHandling
        restWarehouseHandlingMockMvc.perform(post("/api/warehouse-handlings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseHandling)))
            .andExpect(status().isCreated());

        // Validate the WarehouseHandling in the database
        List<WarehouseHandling> warehouseHandlingList = warehouseHandlingRepository.findAll();
        assertThat(warehouseHandlingList).hasSize(databaseSizeBeforeCreate + 1);
        WarehouseHandling testWarehouseHandling = warehouseHandlingList.get(warehouseHandlingList.size() - 1);
        assertThat(testWarehouseHandling.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testWarehouseHandling.getWarehouseHandlingType()).isEqualTo(DEFAULT_WAREHOUSE_HANDLING_TYPE);
    }

    @Test
    @Transactional
    public void createWarehouseHandlingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = warehouseHandlingRepository.findAll().size();

        // Create the WarehouseHandling with an existing ID
        warehouseHandling.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWarehouseHandlingMockMvc.perform(post("/api/warehouse-handlings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseHandling)))
            .andExpect(status().isBadRequest());

        // Validate the WarehouseHandling in the database
        List<WarehouseHandling> warehouseHandlingList = warehouseHandlingRepository.findAll();
        assertThat(warehouseHandlingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWarehouseHandlings() throws Exception {
        // Initialize the database
        warehouseHandlingRepository.saveAndFlush(warehouseHandling);

        // Get all the warehouseHandlingList
        restWarehouseHandlingMockMvc.perform(get("/api/warehouse-handlings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(warehouseHandling.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].warehouseHandlingType").value(hasItem(DEFAULT_WAREHOUSE_HANDLING_TYPE.toString())));
    }
    

    @Test
    @Transactional
    public void getWarehouseHandling() throws Exception {
        // Initialize the database
        warehouseHandlingRepository.saveAndFlush(warehouseHandling);

        // Get the warehouseHandling
        restWarehouseHandlingMockMvc.perform(get("/api/warehouse-handlings/{id}", warehouseHandling.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(warehouseHandling.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.warehouseHandlingType").value(DEFAULT_WAREHOUSE_HANDLING_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingWarehouseHandling() throws Exception {
        // Get the warehouseHandling
        restWarehouseHandlingMockMvc.perform(get("/api/warehouse-handlings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWarehouseHandling() throws Exception {
        // Initialize the database
        warehouseHandlingRepository.saveAndFlush(warehouseHandling);

        int databaseSizeBeforeUpdate = warehouseHandlingRepository.findAll().size();

        // Update the warehouseHandling
        WarehouseHandling updatedWarehouseHandling = warehouseHandlingRepository.findById(warehouseHandling.getId()).get();
        // Disconnect from session so that the updates on updatedWarehouseHandling are not directly saved in db
        em.detach(updatedWarehouseHandling);
        updatedWarehouseHandling
            .date(UPDATED_DATE)
            .warehouseHandlingType(UPDATED_WAREHOUSE_HANDLING_TYPE);

        restWarehouseHandlingMockMvc.perform(put("/api/warehouse-handlings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWarehouseHandling)))
            .andExpect(status().isOk());

        // Validate the WarehouseHandling in the database
        List<WarehouseHandling> warehouseHandlingList = warehouseHandlingRepository.findAll();
        assertThat(warehouseHandlingList).hasSize(databaseSizeBeforeUpdate);
        WarehouseHandling testWarehouseHandling = warehouseHandlingList.get(warehouseHandlingList.size() - 1);
        assertThat(testWarehouseHandling.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testWarehouseHandling.getWarehouseHandlingType()).isEqualTo(UPDATED_WAREHOUSE_HANDLING_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingWarehouseHandling() throws Exception {
        int databaseSizeBeforeUpdate = warehouseHandlingRepository.findAll().size();

        // Create the WarehouseHandling

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWarehouseHandlingMockMvc.perform(put("/api/warehouse-handlings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseHandling)))
            .andExpect(status().isBadRequest());

        // Validate the WarehouseHandling in the database
        List<WarehouseHandling> warehouseHandlingList = warehouseHandlingRepository.findAll();
        assertThat(warehouseHandlingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWarehouseHandling() throws Exception {
        // Initialize the database
        warehouseHandlingRepository.saveAndFlush(warehouseHandling);

        int databaseSizeBeforeDelete = warehouseHandlingRepository.findAll().size();

        // Get the warehouseHandling
        restWarehouseHandlingMockMvc.perform(delete("/api/warehouse-handlings/{id}", warehouseHandling.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WarehouseHandling> warehouseHandlingList = warehouseHandlingRepository.findAll();
        assertThat(warehouseHandlingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WarehouseHandling.class);
        WarehouseHandling warehouseHandling1 = new WarehouseHandling();
        warehouseHandling1.setId(1L);
        WarehouseHandling warehouseHandling2 = new WarehouseHandling();
        warehouseHandling2.setId(warehouseHandling1.getId());
        assertThat(warehouseHandling1).isEqualTo(warehouseHandling2);
        warehouseHandling2.setId(2L);
        assertThat(warehouseHandling1).isNotEqualTo(warehouseHandling2);
        warehouseHandling1.setId(null);
        assertThat(warehouseHandling1).isNotEqualTo(warehouseHandling2);
    }
}
