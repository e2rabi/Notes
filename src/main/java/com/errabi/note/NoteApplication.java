package com.errabi.note;

import com.errabi.note.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;

@Slf4j
@SpringBootApplication
public class NoteApplication implements CommandLineRunner {
     @Autowired
	UserRepository userRepository ;
	@Autowired
	private DataSource dataSource;
	public static void main(String[] args) {
		SpringApplication.run(NoteApplication.class, args);
	}

	@Override
	public void run(String... args)  {
		User user = new User();
		user.setUsername("Ayoub");
        log.info("Datasource : {}",dataSource.getClass().getName());
		userRepository.save(user);
	}
}
