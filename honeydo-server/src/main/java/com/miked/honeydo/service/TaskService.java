package com.miked.honeydo.service;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;

import com.miked.honeydo.service.types.Task;

@Stateless
public class TaskService {
	 
	@Inject
	protected EntityManager em;

	public Task save(Task task) {
		Mapper mapper = new DozerBeanMapper();
		com.miked.honeydo.domain.Task domainTask = mapper.map(task,
				com.miked.honeydo.domain.Task.class);
		em.persist(domainTask);
		Task serviceTask = mapper.map(domainTask, Task.class);
		return serviceTask;
	}

	public Task getTask(Long taskId) {
		TypedQuery<com.miked.honeydo.domain.Task> query = em.createNamedQuery(
				"Task.get", com.miked.honeydo.domain.Task.class);
		query.setParameter("id", taskId);
		com.miked.honeydo.domain.Task domainTask = query.getSingleResult();
		Mapper mapper = new DozerBeanMapper();
		Task serviceTask = mapper.map(domainTask, Task.class);
		return serviceTask;
	}
}
