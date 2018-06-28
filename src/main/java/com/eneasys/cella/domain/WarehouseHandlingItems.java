package com.eneasys.cella.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A WarehouseHandlingItems.
 */
@Entity
@Table(name = "warehouse_handling_items")
public class WarehouseHandlingItems implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JsonIgnoreProperties("")
    private WarehouseHandling warehouseHandlingItems;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Inventory warehouseHandlingItems;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public WarehouseHandlingItems quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public WarehouseHandling getWarehouseHandlingItems() {
        return warehouseHandlingItems;
    }

    public WarehouseHandlingItems warehouseHandlingItems(WarehouseHandling warehouseHandling) {
        this.warehouseHandlingItems = warehouseHandling;
        return this;
    }

    public void setWarehouseHandlingItems(WarehouseHandling warehouseHandling) {
        this.warehouseHandlingItems = warehouseHandling;
    }

    public Inventory getWarehouseHandlingItems() {
        return warehouseHandlingItems;
    }

    public WarehouseHandlingItems warehouseHandlingItems(Inventory inventory) {
        this.warehouseHandlingItems = inventory;
        return this;
    }

    public void setWarehouseHandlingItems(Inventory inventory) {
        this.warehouseHandlingItems = inventory;
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
        WarehouseHandlingItems warehouseHandlingItems = (WarehouseHandlingItems) o;
        if (warehouseHandlingItems.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouseHandlingItems.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WarehouseHandlingItems{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
