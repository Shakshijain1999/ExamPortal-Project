package com.exam.service;

import java.util.Set;

import com.exam.model.User;
import com.exam.model.UserRole;

public interface UserService {

	//creating user
	public User createUser(User user,Set<UserRole> userRoles) throws Exception ;
	
//	method- get user by username
	public User getUser(String username);
		
//	delete user by userid
	public void deleteUser(Long userId);
	
}





