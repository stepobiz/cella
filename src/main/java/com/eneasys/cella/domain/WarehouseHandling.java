package com.eneasys.cella.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.eneasys.cella.domain.enumeration.WarehouseHandlingType;

/**
 * A WarehouseHandling.
 */
@Entity
@Table(name = "warehouse_handling")
public class WarehouseHandling implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @Enumerated(EnumType.STRING)
    @Column(name = "warehouse_handling_type")
    private WarehouseHandlingType warehouseHandlingType;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Warehouse warehouseHandling;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Site warehouseHandling;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public WarehouseHandling date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public WarehouseHandlingType getWarehouseHandlingType() {
        return warehouseHandlingType;
    }

    public WarehouseHandling warehouseHandlingType(WarehouseHandlingType warehouseHandlingType) {
        this.warehouseHandlingType = warehouseHandlingType;
        return this;
    }

    public void setWarehouseHandlingType(WarehouseHandlingType warehouseHandlingType) {
        this.warehouseHandlingType = warehouseHandlingType;
    }

    public Warehouse getWarehouseHandling() {
        return warehouseHandling;
    }

    public WarehouseHandling warehouseHandling(Warehouse warehouse) {
        this.warehouseHandling = warehouse;
        return this;
    }

    public void setWarehouseHandling(Warehouse warehouse) {
        this.warehouseHandling = warehouse;
    }

    public Site getWarehouseHandling() {
        return warehouseHandling;
    }

    public WarehouseHandling warehouseHandling(Site site) {
        this.warehouseHandling = site;
        return this;
    }

    public void setWarehouseHandling(Site site) {
        this.warehouseHandling = site;
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
        WarehouseHandling warehouseHandling = (WarehouseHandling) o;
        if (warehouseHandling.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouseHandling.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WarehouseHandling{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", warehouseHandlingType='" + getWarehouseHandlingType() + "'" +
            "}";
    }
}
