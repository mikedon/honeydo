package com.miked.honeydo.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries({
		@NamedQuery(name = "Task.get", query = "SELECT t FROM Task t WHERE t.id = :id"),
		@NamedQuery(name = "Task.queryByUser", query = "SELECT t FROM Task t where t.user.id = :userId") })
public class Task {

	@Id
	@GeneratedValue
	private Long id;

	private String name;

	private Date dueDate;

	private Integer priority;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "user")
	private User user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
