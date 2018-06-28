package com.eneasys.cella.repository;

import com.eneasys.cella.domain.WarehouseHandlingItems;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WarehouseHandlingItems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WarehouseHandlingItemsRepository extends JpaRepository<WarehouseHandlingItems, Long> {

}
