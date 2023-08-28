package com.example.nutrilifeserver.requests;

import com.example.nutrilifeserver.controller.AccountService;
import com.example.nutrilifeserver.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.nutrilifeserver.model.MD5;

@RestController
@RequestMapping("/account")
public class AccountResource {
    private final AccountService accountService;

    /*
    4. SINGLETON PATTERN
        Beans defined in spring config files are singletons by default.
        A singleton bean in Spring and the singleton pattern are quite different.
        Singleton pattern says that one and only one instance of a particular class will ever
        be created per classloader.
        The scope of a Spring singleton is described as "per container per bean".
        It is the scope of bean definition to a single object instance per
        Spring IoC container. The default scope in Spring is Singleton.
     */
    @Autowired
    public AccountResource(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Account>> getAllAccounts(){
        List<Account> accounts = accountService.findAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<Account> getAccountById(@RequestBody String id) throws Throwable {
        Account account = accountService.findAccountById(Integer.parseInt(id));
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @GetMapping("/findByUsername")
    public ResponseEntity<Account> getAccountByUsername(@RequestBody String username) throws Throwable {
        Account account = accountService.findAccountByUsername(username);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @PutMapping("/findByUsernameAndPassword")
    public ResponseEntity<Account> getAccountByUsernameAndPassword(@RequestBody Account account) throws Throwable {
        Account find_account = accountService.findAccountByUsernameAndPassword(account.getUsername(), account.getPassword());
        return new ResponseEntity<>(find_account, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Account> addAccount(@RequestBody Account account){
        Account newAccount = accountService.addAccount(account);
        System.out.println("ADD WAS CALLED");
        return new ResponseEntity<>(newAccount, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Account> updateAccount(@RequestBody Account account){
        System.out.println("UPDATE PENDING");
        Account newAccount = accountService.updateAccount(account);
        System.out.println("UPDATE DONE?");
        return new ResponseEntity<>(newAccount, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable("id") String id){
        accountService.deleteAccountById(Integer.parseInt(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}