package com.miked.honeydo.service;

import java.util.ArrayList;
import java.util.List;

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

	public List<Task> query(Long userId){
		List<Task> serviceTasks = new ArrayList<Task>();
		TypedQuery<com.miked.honeydo.domain.Task> query = em.createNamedQuery("Task.queryByUser", com.miked.honeydo.domain.Task.class);
		query.setParameter("userId", userId);
		List<com.miked.honeydo.domain.Task> domainTasks = query.getResultList();
		Mapper mapper = new DozerBeanMapper();
		for(com.miked.honeydo.domain.Task domainTask : domainTasks){
			serviceTasks.add(mapper.map(domainTask, Task.class));
		}
		return serviceTasks;
	}
	
	public Task save(Task task) {
		Mapper mapper = new DozerBeanMapper();
		com.miked.honeydo.domain.Task domainTask = mapper.map(task,
				com.miked.honeydo.domain.Task.class);
		TypedQuery<com.miked.honeydo.domain.User> query = em.createNamedQuery("User.get", com.miked.honeydo.domain.User.class);
		query.setParameter("id", task.getUserId());
		com.miked.honeydo.domain.User domainUser = query.getSingleResult();
		domainTask.setUser(domainUser);
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
	
	public Task deleteTask(Long taskId){
		TypedQuery<com.miked.honeydo.domain.Task> query = em.createNamedQuery(
				"Task.get", com.miked.honeydo.domain.Task.class);
		query.setParameter("id", taskId);
		com.miked.honeydo.domain.Task domainTask = query.getSingleResult();
		em.remove(domainTask);
		Mapper mapper = new DozerBeanMapper();
		Task serviceTask = mapper.map(domainTask, Task.class);
		return serviceTask;
	}
}
