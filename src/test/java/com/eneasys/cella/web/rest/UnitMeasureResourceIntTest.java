package com.eneasys.cella.web.rest;

import com.eneasys.cella.CellaApp;

import com.eneasys.cella.domain.UnitMeasure;
import com.eneasys.cella.repository.UnitMeasureRepository;
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
 * Test class for the UnitMeasureResource REST controller.
 *
 * @see UnitMeasureResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CellaApp.class)
public class UnitMeasureResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private UnitMeasureRepository unitMeasureRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUnitMeasureMockMvc;

    private UnitMeasure unitMeasure;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UnitMeasureResource unitMeasureResource = new UnitMeasureResource(unitMeasureRepository);
        this.restUnitMeasureMockMvc = MockMvcBuilders.standaloneSetup(unitMeasureResource)
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
    public static UnitMeasure createEntity(EntityManager em) {
        UnitMeasure unitMeasure = new UnitMeasure()
            .description(DEFAULT_DESCRIPTION);
        return unitMeasure;
    }

    @Before
    public void initTest() {
        unitMeasure = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnitMeasure() throws Exception {
        int databaseSizeBeforeCreate = unitMeasureRepository.findAll().size();

        // Create the UnitMeasure
        restUnitMeasureMockMvc.perform(post("/api/unit-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitMeasure)))
            .andExpect(status().isCreated());

        // Validate the UnitMeasure in the database
        List<UnitMeasure> unitMeasureList = unitMeasureRepository.findAll();
        assertThat(unitMeasureList).hasSize(databaseSizeBeforeCreate + 1);
        UnitMeasure testUnitMeasure = unitMeasureList.get(unitMeasureList.size() - 1);
        assertThat(testUnitMeasure.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createUnitMeasureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unitMeasureRepository.findAll().size();

        // Create the UnitMeasure with an existing ID
        unitMeasure.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnitMeasureMockMvc.perform(post("/api/unit-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitMeasure)))
            .andExpect(status().isBadRequest());

        // Validate the UnitMeasure in the database
        List<UnitMeasure> unitMeasureList = unitMeasureRepository.findAll();
        assertThat(unitMeasureList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUnitMeasures() throws Exception {
        // Initialize the database
        unitMeasureRepository.saveAndFlush(unitMeasure);

        // Get all the unitMeasureList
        restUnitMeasureMockMvc.perform(get("/api/unit-measures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unitMeasure.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    

    @Test
    @Transactional
    public void getUnitMeasure() throws Exception {
        // Initialize the database
        unitMeasureRepository.saveAndFlush(unitMeasure);

        // Get the unitMeasure
        restUnitMeasureMockMvc.perform(get("/api/unit-measures/{id}", unitMeasure.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(unitMeasure.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUnitMeasure() throws Exception {
        // Get the unitMeasure
        restUnitMeasureMockMvc.perform(get("/api/unit-measures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnitMeasure() throws Exception {
        // Initialize the database
        unitMeasureRepository.saveAndFlush(unitMeasure);

        int databaseSizeBeforeUpdate = unitMeasureRepository.findAll().size();

        // Update the unitMeasure
        UnitMeasure updatedUnitMeasure = unitMeasureRepository.findById(unitMeasure.getId()).get();
        // Disconnect from session so that the updates on updatedUnitMeasure are not directly saved in db
        em.detach(updatedUnitMeasure);
        updatedUnitMeasure
            .description(UPDATED_DESCRIPTION);

        restUnitMeasureMockMvc.perform(put("/api/unit-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnitMeasure)))
            .andExpect(status().isOk());

        // Validate the UnitMeasure in the database
        List<UnitMeasure> unitMeasureList = unitMeasureRepository.findAll();
        assertThat(unitMeasureList).hasSize(databaseSizeBeforeUpdate);
        UnitMeasure testUnitMeasure = unitMeasureList.get(unitMeasureList.size() - 1);
        assertThat(testUnitMeasure.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingUnitMeasure() throws Exception {
        int databaseSizeBeforeUpdate = unitMeasureRepository.findAll().size();

        // Create the UnitMeasure

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUnitMeasureMockMvc.perform(put("/api/unit-measures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unitMeasure)))
            .andExpect(status().isBadRequest());

        // Validate the UnitMeasure in the database
        List<UnitMeasure> unitMeasureList = unitMeasureRepository.findAll();
        assertThat(unitMeasureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnitMeasure() throws Exception {
        // Initialize the database
        unitMeasureRepository.saveAndFlush(unitMeasure);

        int databaseSizeBeforeDelete = unitMeasureRepository.findAll().size();

        // Get the unitMeasure
        restUnitMeasureMockMvc.perform(delete("/api/unit-measures/{id}", unitMeasure.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UnitMeasure> unitMeasureList = unitMeasureRepository.findAll();
        assertThat(unitMeasureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnitMeasure.class);
        UnitMeasure unitMeasure1 = new UnitMeasure();
        unitMeasure1.setId(1L);
        UnitMeasure unitMeasure2 = new UnitMeasure();
        unitMeasure2.setId(unitMeasure1.getId());
        assertThat(unitMeasure1).isEqualTo(unitMeasure2);
        unitMeasure2.setId(2L);
        assertThat(unitMeasure1).isNotEqualTo(unitMeasure2);
        unitMeasure1.setId(null);
        assertThat(unitMeasure1).isNotEqualTo(unitMeasure2);
    }
}
