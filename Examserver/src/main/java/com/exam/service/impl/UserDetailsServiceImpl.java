package com.exam.service.impl;

import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.repo.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username)throws UsernameNotFoundException{
		
		User user = this.userRepository.findByUsername(username);
		if(user==null) {
			System.out.println("User not Found");
			throw new UsernameNotFoundException("No user found !!");
		}
		
		return user;
	}
}
