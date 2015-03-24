package com.miked.honeydo.service;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;

import com.miked.honeydo.service.types.User;

@Stateless
public class UserService {

	@Inject
	protected EntityManager em;
	
	public User save(User user){
		Mapper mapper = new DozerBeanMapper();
		com.miked.honeydo.domain.User domainUser = mapper.map(user,
				com.miked.honeydo.domain.User.class);
		em.persist(domainUser);
		User serviceUser = mapper.map(domainUser, User.class);
		return serviceUser;
	}
	
}
