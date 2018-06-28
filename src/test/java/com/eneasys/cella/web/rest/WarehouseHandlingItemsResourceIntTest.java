package com.eneasys.cella.web.rest;

import com.eneasys.cella.CellaApp;

import com.eneasys.cella.domain.WarehouseHandlingItems;
import com.eneasys.cella.repository.WarehouseHandlingItemsRepository;
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
import java.util.List;


import static com.eneasys.cella.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WarehouseHandlingItemsResource REST controller.
 *
 * @see WarehouseHandlingItemsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CellaApp.class)
public class WarehouseHandlingItemsResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private WarehouseHandlingItemsRepository warehouseHandlingItemsRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWarehouseHandlingItemsMockMvc;

    private WarehouseHandlingItems warehouseHandlingItems;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WarehouseHandlingItemsResource warehouseHandlingItemsResource = new WarehouseHandlingItemsResource(warehouseHandlingItemsRepository);
        this.restWarehouseHandlingItemsMockMvc = MockMvcBuilders.standaloneSetup(warehouseHandlingItemsResource)
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
    public static WarehouseHandlingItems createEntity(EntityManager em) {
        WarehouseHandlingItems warehouseHandlingItems = new WarehouseHandlingItems()
            .quantity(DEFAULT_QUANTITY);
        return warehouseHandlingItems;
    }

    @Before
    public void initTest() {
        warehouseHandlingItems = createEntity(em);
    }

    @Test
    @Transactional
    public void createWarehouseHandlingItems() throws Exception {
        int databaseSizeBeforeCreate = warehouseHandlingItemsRepository.findAll().size();

        // Create the WarehouseHandlingItems
        restWarehouseHandlingItemsMockMvc.perform(post("/api/warehouse-handling-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseHandlingItems)))
            .andExpect(status().isCreated());

        // Validate the WarehouseHandlingItems in the database
        List<WarehouseHandlingItems> warehouseHandlingItemsList = warehouseHandlingItemsRepository.findAll();
        assertThat(warehouseHandlingItemsList).hasSize(databaseSizeBeforeCreate + 1);
        WarehouseHandlingItems testWarehouseHandlingItems = warehouseHandlingItemsList.get(warehouseHandlingItemsList.size() - 1);
        assertThat(testWarehouseHandlingItems.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createWarehouseHandlingItemsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = warehouseHandlingItemsRepository.findAll().size();

        // Create the WarehouseHandlingItems with an existing ID
        warehouseHandlingItems.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWarehouseHandlingItemsMockMvc.perform(post("/api/warehouse-handling-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseHandlingItems)))
            .andExpect(status().isBadRequest());

        // Validate the WarehouseHandlingItems in the database
        List<WarehouseHandlingItems> warehouseHandlingItemsList = warehouseHandlingItemsRepository.findAll();
        assertThat(warehouseHandlingItemsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWarehouseHandlingItems() throws Exception {
        // Initialize the database
        warehouseHandlingItemsRepository.saveAndFlush(warehouseHandlingItems);

        // Get all the warehouseHandlingItemsList
        restWarehouseHandlingItemsMockMvc.perform(get("/api/warehouse-handling-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(warehouseHandlingItems.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }
    

    @Test
    @Transactional
    public void getWarehouseHandlingItems() throws Exception {
        // Initialize the database
        warehouseHandlingItemsRepository.saveAndFlush(warehouseHandlingItems);

        // Get the warehouseHandlingItems
        restWarehouseHandlingItemsMockMvc.perform(get("/api/warehouse-handling-items/{id}", warehouseHandlingItems.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(warehouseHandlingItems.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }
    @Test
    @Transactional
    public void getNonExistingWarehouseHandlingItems() throws Exception {
        // Get the warehouseHandlingItems
        restWarehouseHandlingItemsMockMvc.perform(get("/api/warehouse-handling-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWarehouseHandlingItems() throws Exception {
        // Initialize the database
        warehouseHandlingItemsRepository.saveAndFlush(warehouseHandlingItems);

        int databaseSizeBeforeUpdate = warehouseHandlingItemsRepository.findAll().size();

        // Update the warehouseHandlingItems
        WarehouseHandlingItems updatedWarehouseHandlingItems = warehouseHandlingItemsRepository.findById(warehouseHandlingItems.getId()).get();
        // Disconnect from session so that the updates on updatedWarehouseHandlingItems are not directly saved in db
        em.detach(updatedWarehouseHandlingItems);
        updatedWarehouseHandlingItems
            .quantity(UPDATED_QUANTITY);

        restWarehouseHandlingItemsMockMvc.perform(put("/api/warehouse-handling-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWarehouseHandlingItems)))
            .andExpect(status().isOk());

        // Validate the WarehouseHandlingItems in the database
        List<WarehouseHandlingItems> warehouseHandlingItemsList = warehouseHandlingItemsRepository.findAll();
        assertThat(warehouseHandlingItemsList).hasSize(databaseSizeBeforeUpdate);
        WarehouseHandlingItems testWarehouseHandlingItems = warehouseHandlingItemsList.get(warehouseHandlingItemsList.size() - 1);
        assertThat(testWarehouseHandlingItems.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingWarehouseHandlingItems() throws Exception {
        int databaseSizeBeforeUpdate = warehouseHandlingItemsRepository.findAll().size();

        // Create the WarehouseHandlingItems

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWarehouseHandlingItemsMockMvc.perform(put("/api/warehouse-handling-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseHandlingItems)))
            .andExpect(status().isBadRequest());

        // Validate the WarehouseHandlingItems in the database
        List<WarehouseHandlingItems> warehouseHandlingItemsList = warehouseHandlingItemsRepository.findAll();
        assertThat(warehouseHandlingItemsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWarehouseHandlingItems() throws Exception {
        // Initialize the database
        warehouseHandlingItemsRepository.saveAndFlush(warehouseHandlingItems);

        int databaseSizeBeforeDelete = warehouseHandlingItemsRepository.findAll().size();

        // Get the warehouseHandlingItems
        restWarehouseHandlingItemsMockMvc.perform(delete("/api/warehouse-handling-items/{id}", warehouseHandlingItems.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WarehouseHandlingItems> warehouseHandlingItemsList = warehouseHandlingItemsRepository.findAll();
        assertThat(warehouseHandlingItemsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WarehouseHandlingItems.class);
        WarehouseHandlingItems warehouseHandlingItems1 = new WarehouseHandlingItems();
        warehouseHandlingItems1.setId(1L);
        WarehouseHandlingItems warehouseHandlingItems2 = new WarehouseHandlingItems();
        warehouseHandlingItems2.setId(warehouseHandlingItems1.getId());
        assertThat(warehouseHandlingItems1).isEqualTo(warehouseHandlingItems2);
        warehouseHandlingItems2.setId(2L);
        assertThat(warehouseHandlingItems1).isNotEqualTo(warehouseHandlingItems2);
        warehouseHandlingItems1.setId(null);
        assertThat(warehouseHandlingItems1).isNotEqualTo(warehouseHandlingItems2);
    }
}
