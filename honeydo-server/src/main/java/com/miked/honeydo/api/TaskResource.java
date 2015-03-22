package com.miked.honeydo.api;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path("/tasks")
@Produces("application/json")
public class TaskResource {

	@GET
	@Path("/")
	public Response query(){
		return Response.ok().build();
	}
	
	@GET
	@Path("{id}")
	public Response getTask(@PathParam("id") String id){
		return Response.ok().build();
	}
	
	@POST
	@Path("/")
	public Response saveTask(Object task){
		return Response.ok().build();
	}
	
	@DELETE
	@Path("{id}")
	public Response deleteTask(@PathParam("id") String id){
		return Response.ok().build();
	}
}
