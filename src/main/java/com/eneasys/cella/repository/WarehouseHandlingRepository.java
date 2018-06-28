package com.eneasys.cella.repository;

import com.eneasys.cella.domain.WarehouseHandling;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WarehouseHandling entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WarehouseHandlingRepository extends JpaRepository<WarehouseHandling, Long> {

}
