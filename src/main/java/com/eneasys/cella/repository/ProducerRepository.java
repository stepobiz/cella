package com.eneasys.cella.repository;

import com.eneasys.cella.domain.Producer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Producer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProducerRepository extends JpaRepository<Producer, Long> {

}
