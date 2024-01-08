package com.errabi.note;


import com.errabi.note.entities.Note;
import com.errabi.note.repository.NoteRepository;
import com.errabi.note.service.UserService;
import com.errabi.note.service.mapper.UserMapper;
import com.errabi.note.service.model.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.sql.DataSource;

@Slf4j
@EnableJpaAuditing
@SpringBootApplication
public class NoteApplication implements ApplicationRunner {
     @Autowired
	 UserService userService ;
    @Autowired
	NoteRepository noteRepository;
	@Autowired
	UserMapper userMapper ;
	@Autowired
	private DataSource dataSource;
	public static void main(String[] args) {
		SpringApplication.run(NoteApplication.class, args);
	}



	@Override
	public void run(ApplicationArguments args) throws Exception {
		UserDto user = new UserDto();
		user.setUsername("Ayoub");
		log.info("Datasource : {}",dataSource.getClass().getName());
		userService.save(user);
		UserDto a = userService.findById(1l);
		a.setUsername("lalal");
		userService.update(a);
		Note note = new Note();
		note.setName("note");
		note.setUser(userMapper.toEntity(a));
		noteRepository.save(note);
		//userService.deleteById(a.getUserId());
		//userRepository.save(a);
	}
}
