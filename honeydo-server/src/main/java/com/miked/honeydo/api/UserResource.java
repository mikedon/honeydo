package com.miked.honeydo.api;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * @author miked
 */
@Path("/users")
@Produces("application/json")
public class UserResource {
	@GET
	@Path("/")
	public Response query(){
		return Response.ok().build();
	}
	
	@GET
	@Path("{id}")
	public Response getUser(@PathParam("id") String id){
		return Response.ok().build();
	}
	
	@POST
	@Path("/")
	public Response saveUser(Object user){
		return Response.ok().build();
	}
	
	@DELETE
	@Path("{id}")
	public Response deleteUser(@PathParam("id") String id){
		return Response.ok().build();
	}
}
