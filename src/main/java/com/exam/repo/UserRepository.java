package com.exam.repo;

import com.exam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);
    
    @Query("SELECT u FROM User u WHERE u.username = :username")
    public User findByUsername1(@Param("username") String username);

}
