package com.miked.honeydo.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

@Entity
@NamedQueries({
		@NamedQuery(name = "User.get", query = "SELECT u FROM User u WHERE u.id = :id"),
		@NamedQuery(name = "User.getByUserId", query = "SELECT u FROM User u WHERE u.userName = :userName")})
public class User {

	@Id
	@GeneratedValue
	private Long id;
	
	private String userName;
	
	private String password;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	private List<Task> tasks;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
}
