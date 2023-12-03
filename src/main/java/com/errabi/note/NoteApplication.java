package com.errabi.note;

import com.errabi.note.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NoteApplication implements CommandLineRunner {
     @Autowired
	UserRepository userRepository ;
	public static void main(String[] args) {
		SpringApplication.run(NoteApplication.class, args);
	}

	@Override
	public void run(String... args)  {
		User user = new User();
		user.setUsername("Ayoub");

		userRepository.save(user);
	}
}
