package com.exam.service.impl;

import com.exam.helper.UserFoundException;
import com.exam.helper.UserNotFoundException;
import com.exam.model.ErrorResponse;
import com.exam.model.ResponseBean;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	// creating user
//	@Override
//	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
//		
//		ErrorResponse e = new ErrorResponse();
//
//		User local = this.userRepository.findByUsername(user.getUsername());
//		if (local != null) {
//			System.out.println("User is already there !!");
//			throw new UserFoundException();
//		} else {
//			// user create
//			for (UserRole ur : userRoles) {
//				roleRepository.save(ur.getRole());
//			}
//
//			//user.getUserRoles().addAll(userRoles);
//			local = this.userRepository.save(user);
//
//		}
//
//		return local;
//	}
	
	@Override
	public ResponseBean createUser(User user) {
		
		String username = user.getUsername().trim();
		ResponseBean bean = new ResponseBean();
		
		User local = userRepository.findByUsername1(username);
		if(local != null) {
			bean.setMessage("User is already exit");
			bean.setErrorCode("1");
			
			return bean;
		}
		
		local = userRepository.save(user);
		bean.setMessage("User details save succesfully");
		bean.setObj(local);
		bean.setErrorCode("0");
		
		return bean;
	}

	// getting user by username
	@Override
	public User getUser(String username) {
		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
	}

	

}
