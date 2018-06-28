package com.eneasys.cella.repository;

import com.eneasys.cella.domain.InventoryCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InventoryCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventoryCategoryRepository extends JpaRepository<InventoryCategory, Long> {

}
