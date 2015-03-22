package com.miked.honeydo.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * @author miked
 */
@Path("/users")
@Produces("application/json")
public class UserResource {

    @GET
    public Response getUser() {
        return Response.ok("Good").build();
    }
}
