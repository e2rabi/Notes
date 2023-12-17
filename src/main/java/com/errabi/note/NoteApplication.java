package com.errabi.note;

import com.errabi.note.entities.User;
import com.errabi.note.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.sql.DataSource;

@Slf4j
@EnableJpaAuditing
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
		User a = userRepository.findById(1l).get();
		a.setUsername("lalal");
		userRepository.save(a);

	}
}
