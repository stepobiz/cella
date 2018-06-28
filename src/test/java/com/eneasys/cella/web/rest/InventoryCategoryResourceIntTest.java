package com.eneasys.cella.web.rest;

import com.eneasys.cella.CellaApp;

import com.eneasys.cella.domain.InventoryCategory;
import com.eneasys.cella.repository.InventoryCategoryRepository;
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
 * Test class for the InventoryCategoryResource REST controller.
 *
 * @see InventoryCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CellaApp.class)
public class InventoryCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private InventoryCategoryRepository inventoryCategoryRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInventoryCategoryMockMvc;

    private InventoryCategory inventoryCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InventoryCategoryResource inventoryCategoryResource = new InventoryCategoryResource(inventoryCategoryRepository);
        this.restInventoryCategoryMockMvc = MockMvcBuilders.standaloneSetup(inventoryCategoryResource)
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
    public static InventoryCategory createEntity(EntityManager em) {
        InventoryCategory inventoryCategory = new InventoryCategory()
            .name(DEFAULT_NAME);
        return inventoryCategory;
    }

    @Before
    public void initTest() {
        inventoryCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createInventoryCategory() throws Exception {
        int databaseSizeBeforeCreate = inventoryCategoryRepository.findAll().size();

        // Create the InventoryCategory
        restInventoryCategoryMockMvc.perform(post("/api/inventory-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventoryCategory)))
            .andExpect(status().isCreated());

        // Validate the InventoryCategory in the database
        List<InventoryCategory> inventoryCategoryList = inventoryCategoryRepository.findAll();
        assertThat(inventoryCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        InventoryCategory testInventoryCategory = inventoryCategoryList.get(inventoryCategoryList.size() - 1);
        assertThat(testInventoryCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createInventoryCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inventoryCategoryRepository.findAll().size();

        // Create the InventoryCategory with an existing ID
        inventoryCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInventoryCategoryMockMvc.perform(post("/api/inventory-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventoryCategory)))
            .andExpect(status().isBadRequest());

        // Validate the InventoryCategory in the database
        List<InventoryCategory> inventoryCategoryList = inventoryCategoryRepository.findAll();
        assertThat(inventoryCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInventoryCategories() throws Exception {
        // Initialize the database
        inventoryCategoryRepository.saveAndFlush(inventoryCategory);

        // Get all the inventoryCategoryList
        restInventoryCategoryMockMvc.perform(get("/api/inventory-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inventoryCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getInventoryCategory() throws Exception {
        // Initialize the database
        inventoryCategoryRepository.saveAndFlush(inventoryCategory);

        // Get the inventoryCategory
        restInventoryCategoryMockMvc.perform(get("/api/inventory-categories/{id}", inventoryCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(inventoryCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingInventoryCategory() throws Exception {
        // Get the inventoryCategory
        restInventoryCategoryMockMvc.perform(get("/api/inventory-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInventoryCategory() throws Exception {
        // Initialize the database
        inventoryCategoryRepository.saveAndFlush(inventoryCategory);

        int databaseSizeBeforeUpdate = inventoryCategoryRepository.findAll().size();

        // Update the inventoryCategory
        InventoryCategory updatedInventoryCategory = inventoryCategoryRepository.findById(inventoryCategory.getId()).get();
        // Disconnect from session so that the updates on updatedInventoryCategory are not directly saved in db
        em.detach(updatedInventoryCategory);
        updatedInventoryCategory
            .name(UPDATED_NAME);

        restInventoryCategoryMockMvc.perform(put("/api/inventory-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInventoryCategory)))
            .andExpect(status().isOk());

        // Validate the InventoryCategory in the database
        List<InventoryCategory> inventoryCategoryList = inventoryCategoryRepository.findAll();
        assertThat(inventoryCategoryList).hasSize(databaseSizeBeforeUpdate);
        InventoryCategory testInventoryCategory = inventoryCategoryList.get(inventoryCategoryList.size() - 1);
        assertThat(testInventoryCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingInventoryCategory() throws Exception {
        int databaseSizeBeforeUpdate = inventoryCategoryRepository.findAll().size();

        // Create the InventoryCategory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInventoryCategoryMockMvc.perform(put("/api/inventory-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventoryCategory)))
            .andExpect(status().isBadRequest());

        // Validate the InventoryCategory in the database
        List<InventoryCategory> inventoryCategoryList = inventoryCategoryRepository.findAll();
        assertThat(inventoryCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInventoryCategory() throws Exception {
        // Initialize the database
        inventoryCategoryRepository.saveAndFlush(inventoryCategory);

        int databaseSizeBeforeDelete = inventoryCategoryRepository.findAll().size();

        // Get the inventoryCategory
        restInventoryCategoryMockMvc.perform(delete("/api/inventory-categories/{id}", inventoryCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InventoryCategory> inventoryCategoryList = inventoryCategoryRepository.findAll();
        assertThat(inventoryCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InventoryCategory.class);
        InventoryCategory inventoryCategory1 = new InventoryCategory();
        inventoryCategory1.setId(1L);
        InventoryCategory inventoryCategory2 = new InventoryCategory();
        inventoryCategory2.setId(inventoryCategory1.getId());
        assertThat(inventoryCategory1).isEqualTo(inventoryCategory2);
        inventoryCategory2.setId(2L);
        assertThat(inventoryCategory1).isNotEqualTo(inventoryCategory2);
        inventoryCategory1.setId(null);
        assertThat(inventoryCategory1).isNotEqualTo(inventoryCategory2);
    }
}
