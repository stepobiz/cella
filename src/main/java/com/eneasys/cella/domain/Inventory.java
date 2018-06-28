package com.eneasys.cella.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Inventory.
 */
@Entity
@Table(name = "inventory")
public class Inventory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("")
    private UnitMeasure inventory;

    @ManyToOne
    @JsonIgnoreProperties("")
    private InventoryCategory inventory;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Producer inventory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Inventory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UnitMeasure getInventory() {
        return inventory;
    }

    public Inventory inventory(UnitMeasure unitMeasure) {
        this.inventory = unitMeasure;
        return this;
    }

    public void setInventory(UnitMeasure unitMeasure) {
        this.inventory = unitMeasure;
    }

    public InventoryCategory getInventory() {
        return inventory;
    }

    public Inventory inventory(InventoryCategory inventoryCategory) {
        this.inventory = inventoryCategory;
        return this;
    }

    public void setInventory(InventoryCategory inventoryCategory) {
        this.inventory = inventoryCategory;
    }

    public Producer getInventory() {
        return inventory;
    }

    public Inventory inventory(Producer producer) {
        this.inventory = producer;
        return this;
    }

    public void setInventory(Producer producer) {
        this.inventory = producer;
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
        Inventory inventory = (Inventory) o;
        if (inventory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inventory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Inventory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
