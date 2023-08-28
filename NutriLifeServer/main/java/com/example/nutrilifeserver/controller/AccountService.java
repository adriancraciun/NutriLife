package com.example.nutrilifeserver.controller;

import com.example.nutrilifeserver.model.Account;
import com.example.nutrilifeserver.model.MD5;
import com.example.nutrilifeserver.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Transactional
    public Account addAccount(Account account){
        MD5 encryption = new MD5();
        account.setPassword(encryption.EncryptPassword(account.getPassword()));

        Account newAccount = new Account();
        newAccount.setUsername(account.getUsername());
        newAccount.setPassword(account.getPassword());
        newAccount.setEmail(account.getEmail());
        newAccount.setType(account.getType());

        return accountRepository.save(newAccount);
    }

    public List<Account> findAllAccounts(){
        return accountRepository.findAll();
    }

    @Transactional
    public Account updateAccount(Account account){
        System.out.println("WE TRIED TO UPDATE");
        MD5 encryption = new MD5();
        account.setPassword(encryption.EncryptPassword(account.getPassword()));

        return accountRepository.save(account);
    }

    public Account findAccountById(int id) throws Throwable {
        return accountRepository.findAccountById(id).
                orElseThrow(() -> new Exception("Account by id " + id + " was not found"));
    }

    public Account findAccountByUsername(String username) throws Throwable {
        return accountRepository.findAccountByUsername(username).
                orElseThrow(() -> new Exception("Account by username " + username + " was not found"));
    }

    public Account findAccountByUsernameAndPassword(String username, String password) throws Throwable {
        MD5 encryption = new MD5();
        password = encryption.EncryptPassword(password);

        return accountRepository.findAccountByUsernameEqualsAndPasswordEquals(username, password).
                orElseThrow(() -> new Exception("Account by username and password " + username + " was not found"));
    }

    /*
        2. Proxy Pattern for Transactions

        Spring uses either JDK proxies (preferred whenever the proxied target implements at least one interface)
        or CGLIB proxies (if the target object does not implement any interfaces) to create the proxy for a given
        target bean.

        In our AccountService class, we annotate the remove method with the @Transactional annotation.
        This annotation instructs Spring to atomically execute our remove method.
        Without a proxy, Spring wouldn't be able to control access to our repository bean and ensure its transactional
        consistency.
     */
    @Transactional
    public void deleteAccountById(int id){
        accountRepository.removeAccountById(id);
    }


}
