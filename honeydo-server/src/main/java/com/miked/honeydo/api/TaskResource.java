package com.miked.honeydo.api;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.miked.honeydo.service.TaskService;
import com.miked.honeydo.service.types.Task;

@Path("/tasks")
@Produces("application/json")
public class TaskResource {

	@Inject
	TaskService taskService;
	
	@GET
	@Path("/")
	public Response query(@QueryParam("userId") Long userId){
		List<Task> tasks = taskService.query(userId);
		return Response.ok(tasks).build();
	}
	
	@GET
	@Path("{id}")
	public Response getTask(@PathParam("id") Long id){
		Task returnTask = taskService.getTask(id);
		return Response.ok(returnTask).build();
	}
	
	@POST
	@Path("/")
	public Response saveTask(Task task){
		Task returnTask = taskService.save(task);
		return Response.ok(returnTask).build();
	}
	
	@DELETE
	@Path("{id}")
	public Response deleteTask(@PathParam("id") Long id){
		Task returnTask = taskService.deleteTask(id);
		return Response.ok(returnTask).build();
	}
}
