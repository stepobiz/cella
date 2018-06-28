package com.eneasys.cella.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UnitMeasure.
 */
@Entity
@Table(name = "unit_measure")
public class UnitMeasure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public UnitMeasure description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UnitMeasure unitMeasure = (UnitMeasure) o;
        if (unitMeasure.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), unitMeasure.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UnitMeasure{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
