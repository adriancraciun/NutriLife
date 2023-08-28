package com.example.nutrilifeserver.repository;

import com.example.nutrilifeserver.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository

/*
    3. Template Method Pattern

    The template method pattern is a technique that defines the steps required for some action, implementing the
    boilerplate steps, and leaving the customizable steps as abstract. Subclasses can then implement this abstract
    class and provide a concrete implementation for the missing steps.
 */
public interface AccountRepository extends JpaRepository<Account, Long>{
    Optional<Account> findAccountById(int id);
    Optional<Account> findAccountByEmail(String email);
    Optional<Account> findAccountByUsername(String username);
    Optional<Account> findAccountByUsernameEqualsAndPasswordEquals(String username, String password);

    @Transactional
    void removeAccountById(int id);
}
