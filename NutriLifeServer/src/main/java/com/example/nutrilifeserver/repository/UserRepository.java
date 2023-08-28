package com.example.nutrilifeserver.repository;

import com.example.nutrilifeserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findUserById(int id);

    @Transactional
    void removeUserById(int id);
}
